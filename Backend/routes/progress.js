const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const Progress = require('../models/Progress');

// Summary for charts; filter by exam/subject
router.get('/summary', authenticate, async (req, res) => {
  const { examId, subjectId } = req.query;
  res.json({ ok: true, examId, subjectId, summary: { solved: 0, attempted: 0, percent: 0 } });
});

// Topic-level detail
router.get('/topic/:topicId', authenticate, async (req, res) => {
  const { topicId } = req.params;
  const progress = await Progress.findOne({ user: req.user.id, topic: topicId });
  res.json({ ok: true, progress: progress || { level: 'bronze', successRate: 0 } });
});

// Record attempt outcome to drive success-rate and badges
router.post('/attempts', authenticate, async (req, res) => {
  const { topicId, correct, total } = req.body || {};
  if (!topicId || typeof correct !== 'number' || typeof total !== 'number') {
    return res.status(400).json({ message: 'topicId, correct, total required' });
  }
  // TODO: upsert Progress; for now stub:
  res.status(201).json({ ok: true, saved: { topicId, correct, total } });
});

module.exports = router;