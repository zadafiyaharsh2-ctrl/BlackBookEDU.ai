const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../utils/auth');
const User = require('../models/User');
const Organization = require('../models/Organization');
const Department = require('../models/Department');

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

module.exports = router;