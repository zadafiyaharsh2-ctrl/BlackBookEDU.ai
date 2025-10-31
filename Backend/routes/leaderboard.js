const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');

// Class leaderboard
router.get('/class', authenticate, async (req, res) => {
  const { departmentId, examId, subjectId } = req.query;
  res.json({
    ok: true,
    scope: 'class',
    departmentId, examId, subjectId,
    bands: ['bronze','silver','gold','master','legend'],
    entries: [],
    stats: { avgTime: '3:30', dailyAttempts: 50, avgPoints: 2000 }
  });
});

// Institution leaderboard
router.get('/institution', authenticate, async (req, res) => {
  const { institutionId, examId, subjectId } = req.query;
  res.json({ ok: true, scope: 'institution', institutionId, examId, subjectId, entries: [] });
});

// World leaderboard
router.get('/world', authenticate, async (req, res) => {
  const { examId, subjectId } = req.query;
  res.json({ ok: true, scope: 'world', examId, subjectId, entries: [] });
});

module.exports = router;