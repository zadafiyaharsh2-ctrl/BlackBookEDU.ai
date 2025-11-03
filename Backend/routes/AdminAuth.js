const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../utils/authentication');
const User = require('../models/User');
const Organization = require('../models/Organization');
const Department = require('../models/Department');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const { createAccessToken, createRefreshToken, verifyToken, isAdmin, validateBody } = require('../utils/helper');
const passport = require('passport');
const bcrypt = require('bcrypt');


// Admin overview
router.get('/', authenticate, requireRole('webappAdmin', 'dean', 'hod'), (req, res) => {
  res.json({ ok: true, route: 'GET /admin' });
});

// Users management
router.get('/users', authenticate, requireRole('webappAdmin', 'dean', 'hod'), async (req, res) => {
  const users = await User.find().select('userName email role departmentId createdAt');
  res.json({ ok: true, users });
});

router.get('/users/:id', authenticate, requireRole('webappAdmin', 'dean', 'hod'), async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found.' });
  res.json({ ok: true, user });
});

router.patch('/users/:id/role', authenticate, requireRole('webappAdmin', 'dean'), async (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ message: 'Role required.' });
  const updated = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
  if (!updated) return res.status(404).json({ message: 'User not found.' });
  res.json({ ok: true, user: updated });
});


// Admins can manage organizations and departments
router.post('/organizations', authenticate, requireRole('webappAdmin', 'dean'), async (req, res) => {
  const { name, code } = req.body;
  if (!name || !code) return res.status(400).json({ message: 'Name and code are required.' });
  const existing = await Organization.findOne({ code });
  if (existing) return res.status(409).json({ message: 'Organization code already exists.' });
  const org = await Organization.create({ name, code });
  res.status(201).json({ ok: true, organization: org });
});

router.post('/departments', authenticate, requireRole('webappAdmin', 'dean', 'hod'), async (req, res) => {
  const { name, code, organizationId } = req.body;
  if (!name || !code || !organizationId)
    return res.status(400).json({ message: 'Name, code, and organizationId are required.' });
  const existing = await Department.findOne({ code });
  if (existing) return res.status(409).json({ message: 'Department code already exists.' });
  const dept = await Department.create({ name, code, organization: organizationId });
  res.status(201).json({ ok: true, department: dept });
});


// Organization management
router.get('/organizations', authenticate, requireRole('webappAdmin', 'dean'), async (req, res) => {
  const orgs = await Organization.find().select('name code createdAt');
  res.json({ ok: true, organizations: orgs });
});

// Department management
router.get('/departments', authenticate, requireRole('webappAdmin', 'dean', 'hod'), async (req, res) => {
  const depts = await Department.find().select('name code organization createdAt');
  res.json({ ok: true, departments: depts });
});


router.get('/departments/:id', authenticate, requireRole('webappAdmin', 'dean', 'hod'), async (req, res) => {
  const dept = await Department.findById(req.params.id).populate('organization', 'name code');
  if (!dept) return res.status(404).json({ message: 'Department not found.' });
  res.json({ ok: true, department: dept });
});


router.delete('/departments/:id', authenticate, requireRole('webappAdmin', 'dean'), async (req, res) => {
  const deleted = await Department.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Department not found.' });
  res.json({ ok: true, message: 'Department deleted.' });
});





/**
 * Admin Authentication
 */

// Middleware: check masterKey OR logged-in admin
const adminOrMasterKey = async (req, res, next) => {
    const { masterKey } = req.body;
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
        if (!masterKey || masterKey !== process.env.ADMIN_MASTER_KEY)
            return res.status(403).json({ err: 'Invalid master key' });
        return next();
    } else {
        passport.authenticate('admin-jwt', { session: false }, (err, user) => {
            if (err || !user || user.role !== 'admin')
                return res.status(403).json({ err: 'Admin privileges required' });
            req.user = user;
            return next();
        })(req, res, next);
    }
};

// Register admin
router.post('/register',
    body('phone').isMobilePhone('any').withMessage('Invalid phone number'),
    body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }).withMessage('Weak password'),
    adminOrMasterKey,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { phone, password, email, firstName, lastName } = req.body;
        if (!phone || !password || !email || !firstName || !lastName)
            return res.status(400).json({ error: "Phone, email, password, firstName and lastName are required" });
        try {
            if (await Admin.findOne({ phone }))
                return res.status(409).json({ err: 'Phone already exists' });
            const admin = await Admin.create({ firstName, lastName, ...(email && { email }), phone, password });
            return res.status(201).json({ msg: 'Admin created successfully' });
        } catch (err) {
            console.error('Admin registration error:', err);
            return res.status(500).json({ err: 'Server error' });
        }
    }
);

// Login admin
router.post('/login',
    body('phone').isMobilePhone('any'),
    body('password').exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { phone, password } = req.body;
        const admin = await Admin.findOne({ phone });
        if (!admin || !(await admin.comparePassword(password)))
            return res.status(401).json({ err: 'Invalid credentials' });
        const accessToken = createAccessToken({ id: admin._id, role: admin.role });
        const refreshToken = createRefreshToken({ id: admin._id });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        const safeAdmin = admin.toObject();
        delete safeAdmin.password;
        return res.status(200).json({ admin: safeAdmin, accessToken });
    }
);

// Logout admin
router.post('/logout', (req, res) => {
    res.clearCookie('refreshToken');
    res.json({ msg: 'Logged out' });
});

// Refresh token
router.post('/token', (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token)
        return res.status(401).json({ err: 'No refresh token' });
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
        if (err)
            return res.status(403).json({ err: 'Invalid refresh token' });
        const newAccess = createAccessToken({ id: payload.id, role: payload.role });
        res.json({ accessToken: newAccess });
    });
});

// Get admin profile
router.get('/me', passport.authenticate('admin-jwt', { session: false }), async (req, res) => {
    try {
        const admin = await Admin.findById(req.user._id).select('-password');
        if (!admin) return res.status(404).json({ err: 'Admin not found' });
        res.json({ admin });
    } catch (err) {
        res.status(500).json({ err: 'Server error' });
    }
});

/**
 * User Management (CRUD)
 */

// Add user
router.post('/add-user',
    passport.authenticate('admin-jwt', { session: false }),
    [
        body('firstName').notEmpty().withMessage('First name is required'),
        body('phone').notEmpty().withMessage('Phone number is required'),
        body('password').notEmpty().withMessage('Password is required'),
        body('email').optional({ checkFalsy: true }).isEmail().withMessage('Email must be valid'),
        body('lastName').optional({ checkFalsy: true }).trim()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(400).json({ error: 'Validation failed', details: errors.array() });
        const { firstName, lastName, email, phone, password } = req.body;
        try {
            if (await User.findOne({ phone }))
                return res.status(409).json({ error: 'Phone number already exists' });
            if (email && await User.findOne({ email }))
                return res.status(409).json({ error: 'Email already exists' });
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                firstName, lastName, phone, password: hashedPassword, ...(email && { email })
            });
            res.status(201).json({ message: 'User created successfully', user });
        } catch (err) {
            console.error('Error adding user:', err);
            res.status(500).json({ error: 'Server error' });
        }
    }
);

// Delete user
router.delete('/delete-user/:id',
    passport.authenticate('admin-jwt', { session: false }),
    async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id))
                return res.status(400).json({ error: 'Invalid user ID' });
            const user = await User.findByIdAndDelete(id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            await History.create({
                type: 'user-deletion', performedBy: req.user?._id || null, data: user, timestamp: new Date()
            });
            res.json({ message: 'User deleted and logged in history' });
        } catch (err) {
            console.error('Delete error:', err);
            res.status(500).json({ error: 'Failed to delete user' });
        }
    }
);

// Get user deletion history
router.get('/deleted-history',
    passport.authenticate('admin-jwt', { session: false }),
    async (req, res) => {
        try {
            const logs = await History.find({ type: 'user-deletion' })
                .populate('performedBy', 'firstName lastName email')
                .sort({ timestamp: -1 });
            res.json({ history: logs });
        } catch (err) {
            console.error('Error fetching history:', err);
            res.status(500).json({ error: 'Failed to fetch history' });
        }
    }
);

// Get users (with pagination)
router.get('/users', passport.authenticate('admin-jwt', { session: false }), async (req, res) => {
    try {
        const countOnly = req.query.count === 'true';
        let totalUsers = 0;
        if (countOnly) totalUsers = await User.countDocuments();
        const skip = parseInt(req.query.skip) || 0;
        const users = await User.find({})
            .select('firstName lastName email phone purchased_history dues cart wishlist')
            .skip(skip);
        res.json({ totalUsers, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user
router.put('/user/:id',
    passport.authenticate('admin-jwt', { session: false }),
    async (req, res) => {
        try {
            const updateFields = { ...req.body };
            if ('password' in updateFields && !updateFields.password) delete updateFields.password;
            const user = await User.findByIdAndUpdate(req.params.id, updateFields, { new: true, runValidators: true });
            if (!user) return res.status(404).json({ error: "User not found" });
            res.json({ message: "User updated successfully", user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to update user" });
        }
    }
);


/**
 * Contact/Message Management
 */

// Get contact messages
router.get('/contact/messages', passport.authenticate('admin-jwt', { session: false }), async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 }).exec();
        res.json({ success: true, messages });
    } catch (err) {
        console.error('Error fetching messages:', err);
        res.status(500).json({ success: false, error: 'Failed to fetch messages' });
    }
});

// Delete a message
router.delete('/contact/message/:id', passport.authenticate('admin-jwt', { session: false }), async (req, res) => {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ error: 'Message not found' });
    await History.create({
        type: 'contact-message-deletion',
        performedBy: req.user._id,
        data: message,
        timestamp: new Date()
    });
    res.json({ message: 'Message deleted and logged in history' });
});

module.exports = router;