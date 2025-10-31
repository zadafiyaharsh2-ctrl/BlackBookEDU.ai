const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const User = require('../models/User');

// GET /settings -> return profile settings snapshot
router.get('/', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).select(
    '-password -plans -connections -followersCount -followingCount'
  );
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json({ ok: true, data: user });
});

// PATCH /settings -> update profile fields you showed in the UI
router.patch('/', authenticate, async (req, res) => {
  try {
    const allowed = [
      'fullName','userName','bio','headline','summary','gender',
      'website','githubUrl','linkedinUrl','xUrl',
      'location','birthdate','avatarUrl','coverImageUrl',
      'privacySettings',
      'subjectStats' // optional: allow front-end to push chart data initially
    ];

    const update = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) update[key] = req.body[key];
    }

    // unique checks similar to your auth.js route
    if (update.userName) {
      const taken = await User.findOne({ userName: update.userName, _id: { $ne: req.user.id } });
      if (taken) return res.status(409).json({ message: 'Username already taken.' });
    }

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true }).select('-password');
    res.json({ ok: true, user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;