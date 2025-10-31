const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const Progress = require('../models/Progress');

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



// Summary for charts; accepts exam/subject for filtering
router.get('/summary', authenticate, async (req, res) => {
  const { examId = null, subjectId = null } = req.query;
  // TODO: real aggregation
  res.json({
    ok: true,
    examId, subjectId,
    summary: {
      solved: 0,
      attempted: 0,
      percent: 0,
      bands: { bronze: 0, silver: 0, gold: 0, master: 0, legend: 0 },
    },
  });
});

// Weak points = topics with lowest successRate given enough attempts
// GET /progress/weak-points?subjectId=&limit=5&minAttempts=3&maxSuccessRate=60
router.get('/weak-points', authenticate, async (req, res) => {
  const limit = Number(req.query.limit || 5);
  const minAttempts = Number(req.query.minAttempts || 3);
  const maxSuccessRate = Number(req.query.maxSuccessRate || 60);
  const subjectId = req.query.subjectId || null;

  // NOTE: add a join to Topic->Chapter->Subject if you want to filter by subjectId.
  // Here we fetch by user and then (TODO) filter by subject if needed.
  const list = await Progress.find({ user: req.user.id, attempts: { $gte: minAttempts } })
    .sort({ successRate: 1, attempts: -1 })
    .limit(limit)
    .lean();

  // If subject filtering is required, filter by populated topic.chapter.subject here.
  res.json({
    ok: true,
    filters: { subjectId, limit, minAttempts, maxSuccessRate },
    data: list
      .filter(p => (p.successRate ?? 0) <= maxSuccessRate)
      .map(p => ({
        topicId: String(p.topic),
        attempts: p.attempts,
        correct: p.correct,
        successRate: p.successRate,
        level: p.level,
      })),
  });
});


module.exports = router;