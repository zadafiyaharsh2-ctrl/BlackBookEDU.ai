const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../utils/authentication');
const { requirePlanTier } = require('../utils/subscription');
const PaidContent = require('../models/PaidContent');
const ContentPurchase = require('../models/ContentPurchase');

// List paid content and public posts mixed (for "Paid Content" tab and feed side)
router.get('/', authenticate, async (req, res) => {
  const items = await PaidContent.find().select('title priceCents currency visibility creator createdAt');
  res.json({ ok: true, items });
});

// Create paid content (teachers only)
router.post('/', authenticate, requireRole('teacher','hod','dean','webappAdmin'), async (req, res) => {
  const { title, description, mediaUrls = [], priceCents = 0, currency = 'INR', tags = [] } = req.body || {};
  if (!title) return res.status(400).json({ message: 'title required' });
  const pc = await PaidContent.create({ creator: req.user.id, title, description, mediaUrls, priceCents, currency, tags, visibility: priceCents > 0 ? 'paid' : 'public' });
  res.status(201).json({ ok: true, content: pc });
});

// Get content (gate if paid and not purchased)
router.get('/:contentId', authenticate, async (req, res) => {
  const c = await PaidContent.findById(req.params.contentId);
  if (!c) return res.status(404).json({ message: 'Not found' });
  if (c.visibility === 'paid') {
    const purchase = await ContentPurchase.findOne({ user: req.user.id, content: c._id, status: 'paid' });
    if (!purchase) return res.status(402).json({ message: 'Content locked. Purchase required.' });
  }
  res.json({ ok: true, content: c });
});

// Purchase content (stub, ties into Payment later)
router.post('/:contentId/purchase', authenticate, async (req, res) => {
  const c = await PaidContent.findById(req.params.contentId);
  if (!c) return res.status(404).json({ message: 'Not found' });
  if (await ContentPurchase.findOne({ user: req.user.id, content: c._id })) {
    return res.json({ ok: true, message: 'Already purchased' });
  }
  await ContentPurchase.create({
    user: req.user.id,
    content: c._id,
    amountCents: c.priceCents,
    currency: c.currency,
    provider: 'manual',
    providerRef: ''
  });
  await PaidContent.findByIdAndUpdate(c._id, { $inc: { 'analytics.purchases': 1 } });
  res.status(201).json({ ok: true, message: 'Purchased' });
});

module.exports = router;