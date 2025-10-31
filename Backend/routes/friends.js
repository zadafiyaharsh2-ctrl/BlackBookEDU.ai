const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');

// Search by name with filters
router.get('/search', authenticate, async (req, res) => {
  const { q = '', examId, subjectId, role } = req.query;
  res.json({ ok: true, data: [], filters: { q, examId, subjectId, role } });
});

// My friends list
router.get('/', authenticate, async (req, res) => {
  res.json({ ok: true, friends: [] });
});

// Requests
router.post('/requests', authenticate, async (req, res) => {
  res.status(201).json({ ok: true, requestId: 'req_1' });
});
router.post('/requests/:id/accept', authenticate, async (req, res) => {
  res.json({ ok: true, accepted: req.params.id });
});
router.post('/requests/:id/reject', authenticate, async (req, res) => {
  res.json({ ok: true, rejected: req.params.id });
});

module.exports = router;