const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/helper");
const { User } = require('../models/User');

// ======== Middleware for role-based access =========
const auth = require('../middleware/auth'); // JWT auth, sets req.user
const isRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: 'Forbidden' });
  }
  next();
};

// =============== REGISTER ==============
router.post('/register', async (req, res) => {
  try {
    const { userName, name, email, phone, password, avatarUrl, bio, role, institutionId, departmentId } = req.body;
    if (!userName || !name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email or username already exists.' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName, name, email, phone, password: hash, avatarUrl, bio, role, institutionId, departmentId
    });

    const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({ success: true, token, user: userObj });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== LOGIN ==============
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken(user);

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json({ success: true, token, user: userObj });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== GET OWN PROFILE ==============
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('institutionId departmentId plans')
      .select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== EDIT PROFILE ==============
router.put('/me', auth, async (req, res) => {
  try {
    const allowedFields = ['phone', 'avatarUrl', 'bio', 'name'];
    let updateFields = {};
    for (let key of allowedFields) {
      if (req.body[key] !== undefined) updateFields[key] = req.body[key];
    }
    const user = await User.findByIdAndUpdate(req.user.id, updateFields, { new: true }).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== VIEW PUBLIC PROFILE ==============
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('institutionId departmentId')
      .select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    // Apply privacy settings for lower-level users
    let userObj = user.toObject();
    if (userObj.privacySettings) {
      if (!userObj.privacySettings.showScores) userObj.scores = undefined;
      if (!userObj.privacySettings.showBadges) userObj.achievements = undefined;
      if (!userObj.privacySettings.showInstitute) userObj.institutionId = undefined;
      // Add more privacy filtering as needed
    }

    res.json({ success: true, user: userObj });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== PRIVACY SETTINGS ==============
router.put('/me/privacy', auth, async (req, res) => {
  try {
    const { privacySettings } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { privacySettings },
      { new: true }
    ).select('-password');
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== ADD CONNECTION (FRIEND/FOLLOW) ==============
router.post('/connect/:id', auth, async (req, res) => {
  try {
    const targetId = req.params.id;
    if (req.user.id === targetId) return res.status(400).json({ success: false, message: 'Cannot connect to self.' });

    await User.findByIdAndUpdate(req.user.id, { $addToSet: { connections: targetId } });
    res.json({ success: true, message: 'Connection added.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== REMOVE CONNECTION (UNFRIEND/UNFOLLOW) ==============
router.delete('/connect/:id', auth, async (req, res) => {
  try {
    const targetId = req.params.id;
    await User.findByIdAndUpdate(req.user.id, { $pull: { connections: targetId } });
    res.json({ success: true, message: 'Connection removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== GET ALL CONNECTIONS ==============
router.get('/me/connections', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('connections', 'userName name avatarUrl role');
    res.json({ success: true, connections: user.connections });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== ACHIEVEMENTS ==============
router.get('/me/achievements', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('achievements');
    res.json({ success: true, achievements: user.achievements });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== ADD ACHIEVEMENT ==============
router.post('/me/achievements', auth, async (req, res) => {
  try {
    const { achievement } = req.body;
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { achievements: achievement } });
    res.json({ success: true, message: 'Achievement added.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== REMOVE ACHIEVEMENT ==============
router.delete('/me/achievements', auth, async (req, res) => {
  try {
    const { achievement } = req.body;
    await User.findByIdAndUpdate(req.user.id, { $pull: { achievements: achievement } });
    res.json({ success: true, message: 'Achievement removed.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// =============== DASHBOARD DATA ==============
router.get('/me/dashboard', auth, async (req, res) => {
  // TODO: Aggregate quizzes, materials accessed, connections, etc.
  res.json({ success: true, dashboard: {/* fill with summary data from other models */} });
});

// =============== ROLE CHECK EXAMPLE ==============
// Example: Only admin/dean/hod can access this
router.get('/admin/data', auth, isRole('webappAdmin', 'dean', 'hod'), async (req, res) => {
  // Admin data access
  res.json({ success: true, adminData: {/* fill as needed */} });
});

// =============== GET ALL USERS (FOR ADMIN) ==============
router.get('/', auth, isRole('webappAdmin', 'dean'), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;