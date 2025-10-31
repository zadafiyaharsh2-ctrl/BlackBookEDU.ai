const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../utils/auth');
const TeacherApplication = require('../models/TeacherApplication');

// Submit application
router.post('/apply', authenticate, async (req, res) => {
  const exists = await TeacherApplication.findOne({ user: req.user.id });
  if (exists) return res.status(409).json({ message: 'Application already submitted' });
  const app = await TeacherApplication.create({ user: req.user.id, ...req.body });
  res.status(201).json({ ok: true, application: app });
});

// My application status
router.get('/me', authenticate, async (req, res) => {
  const app = await TeacherApplication.findOne({ user: req.user.id });
  res.json({ ok: true, application: app || null });
});

// Admin review
router.post('/:id/approve', authenticate, requireRole('webappAdmin','dean'), async (req, res) => {
  const app = await TeacherApplication.findByIdAndUpdate(req.params.id, { status: 'approved', reviewedBy: req.user.id, reviewedAt: new Date() }, { new: true });
  res.json({ ok: true, application: app });
});
router.post('/:id/reject', authenticate, requireRole('webappAdmin','dean'), async (req, res) => {
  const app = await TeacherApplication.findByIdAndUpdate(req.params.id, { status: 'rejected', reviewedBy: req.user.id, reviewedAt: new Date() }, { new: true });
  res.json({ ok: true, application: app });
});

module.exports = router;