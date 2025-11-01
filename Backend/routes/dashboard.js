const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');

// Simple dash welcome (kept for compatibility)
router.get('/', authenticate, (req, res) => {
  res.json({
    ok: true,
    widgets: {
      tasksDue: 0,
      recentActivity: [],
      quickLinks: ['problems', 'analytics', 'social'],
    },
  });
});

// Main dashboard data for the KPI strip, ranking change, competitor, and the two progress cards
// GET /dashboard/overview?examId=&subjectId=&targetId=
router.get('/overview', authenticate, async (req, res) => {
  const { examId = null, subjectId = null, targetId = null } = req.query;

  // NOTE: Replace this stub with real aggregations from your attempts/Progress/Leaderboard models
  res.json({
    ok: true,
    filters: { examId, subjectId, targetId },
    kpis: {
      studentName: 'Student Name',
      worldRank: 23453,
      schoolRank: 23453,
      worldRankChange: +300,
      stateRankChange: -300,
      schoolRankChange: -300,
      nextCompetitor: {
        name: 'Name of the student',
        worldRank: 23453,
        schoolRank: 23453,
      },
    },
    cards: [
      {
        examName: 'GATE',
        subjectName: 'DBMS',
        solved: 58,
        total: 200,
        percent: 29,        // solved/total * 100
        accuracy: 45,       // correct/attempted * 100 (if you track it)
        donutPercent: 45,   // duplicate for the donut gauge in UI
        bars: [
          { label: 'Ch1', value: 80 },
          { label: 'Ch2', value: 70 },
          { label: 'Ch3', value: 60 },
          { label: 'Ch4', value: 40 },
          { label: 'Ch5', value: 25 },
          { label: 'Ch6', value: 20 },
          { label: 'Ch7', value: 18 },
        ],
      },
      {
        examName: 'GATE',
        subjectName: 'Operating System',
        solved: 58,
        total: 200,
        percent: 29,
        accuracy: 45,
        donutPercent: 45,
        bars: [
          { label: 'Ch1', value: 80 },
          { label: 'Ch2', value: 70 },
          { label: 'Ch3', value: 60 },
          { label: 'Ch4', value: 40 },
          { label: 'Ch5', value: 25 },
          { label: 'Ch6', value: 20 },
          { label: 'Ch7', value: 18 },
        ],
      },
    ],
    // Optional: leave present but your UI can ignore until ready
    // goalsSnapshot: { weekly: {...}, monthly: {...}, yearly: {...} }
  });
});

module.exports = router;