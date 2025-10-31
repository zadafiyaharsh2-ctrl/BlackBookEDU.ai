const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const Plan = require('../models/Plan');
const Payment = require('../models/Payment');
const User = require('../models/User');

// List available plans for pricing/CTA
router.get('/plans', async (req, res) => {
  const plans = await Plan.find().sort({ price: 1 });
  res.json({ ok: true, plans });
});

// Current user's plans
router.get('/me', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).populate('plans').select('plans');
  res.json({ ok: true, plans: user?.plans || [] });
});

// Checkout stub (integrate provider later)
router.post('/checkout', authenticate, async (req, res) => {
  // Expect { planId } and create a pending payment intent here
  const { planId } = req.body || {};
  if (!planId) return res.status(400).json({ message: 'planId required' });
  // TODO: create gateway session; for now pretend success and attach plan
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { plans: planId } });
  res.status(201).json({ ok: true, message: 'Plan activated' });
});

module.exports = router;