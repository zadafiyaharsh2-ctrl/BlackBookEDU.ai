const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const { requirePlanTier } = require('../utils/subscription');

router.get('/config', authenticate, async (req, res) => {
  res.json({
    ok: true,
    languages: ['en','hi','gu'],
    avatars: ['mentor_1','mentor_2'],
    subjects: ['Mathematics','Physics','Chemistry','Biology','DBMS','OS','CN','SS'],
  });
});

router.post('/sessions', authenticate, requirePlanTier('premium'), async (req, res) => {
  const { language, subject, avatar } = req.body || {};
  res.status(201).json({
    ok: true,
    session: { id: 'sess_1', language, subject, avatar, messages: [] }
  });
});

router.get('/sessions', authenticate, async (req, res) => {
  res.json({ ok: true, sessions: [] });
});

router.post('/sessions/:sessionId/messages', authenticate, requirePlanTier('premium'), async (req, res) => {
  const { content } = req.body || {};
  res.status(201).json({ ok: true, message: { role: 'user', content }, response: 'AI response (stub)' });
});

module.exports = router;