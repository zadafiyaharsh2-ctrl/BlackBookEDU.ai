const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const Organization = require('../models/Organization');
const User = require('../models/User');

// Join organization via school code
// POST /organizations/join { code: "XXXX" }
router.post('/join', authenticate, async (req, res) => {
  const { code } = req.body || {};
  if (!code) return res.status(400).json({ message: 'School code is required.' });

  const org = await Organization.findOne({ code });
  if (!org) return res.status(404).json({ message: 'Invalid school code.' });

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { institutionId: org._id },
    { new: true }
  ).select('-password');

  return res.json({ ok: true, organization: { id: org._id, name: org.name, code: org.code }, user });
});

// Get my organization
// GET /organizations/me
router.get('/me', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).select('institutionId').lean();
  if (!user) return res.status(404).json({ message: 'User not found.' });
  if (!user.institutionId) return res.json({ ok: true, organization: null });

  const org = await Organization.findById(user.institutionId).select('name code createdAt');
  return res.json({ ok: true, organization: org });
});

// Leave organization
// POST /organizations/leave
router.post('/leave', authenticate, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.user.id, { institutionId: null }, { new: true }).select('-password');
  return res.json({ ok: true, user: updated });
});

module.exports = router;