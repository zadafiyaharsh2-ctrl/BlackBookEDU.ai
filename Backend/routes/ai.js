const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const { requirePlanTier } = require('../utils/subscription');

// Available choices for language/subject/avatar
router.get('/config', authenticate, async (req, res) => {
  res.json({
    ok: true,
    languages: ['en', 'hi', 'gu'],
    avatars: ['mentor_1', 'mentor_2'],
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'DBMS', 'OS', 'CN', 'SS'],
  });
});

// Start a session (premium-only)
router.post('/sessions', authenticate, requirePlanTier('premium'), async (req, res) => {
  const { language, subject, avatar } = req.body || {};
  res.status(201).json({
    ok: true,
    session: { id: 'sess_1', language, subject, avatar, messages: [] }
  });
});

// List my sessions
router.get('/sessions', authenticate, async (req, res) => {
  res.json({ ok: true, sessions: [] });
});

// Append a message (“Ask anything”) (premium-only)
router.post('/sessions/:sessionId/messages', authenticate, requirePlanTier('premium'), async (req, res) => {
  const { content } = req.body || {};
  res.status(201).json({ ok: true, message: { role: 'user', content }, response: 'Stubbed AI response' });
});

module.exports = router;