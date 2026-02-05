const express = require('express');
const axios = require('axios');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const { requirePlanTier } = require('../utils/subscription');

// router.get('/config', authenticate, async (req, res) => {
//   res.json({
//     ok: true,
//     languages: ['en','hi','gu'],
//     avatars: ['mentor_1','mentor_2'],
//     subjects: ['Mathematics','Physics','Chemistry','Biology','DBMS','OS','CN','SS'],
//   });
// });

// router.post('/sessions', authenticate, requirePlanTier('premium'), async (req, res) => {
//   const { language, subject, avatar } = req.body || {};
//   res.status(201).json({
//     ok: true,
//     session: { id: 'sess_1', language, subject, avatar, messages: [] }
//   });
// });

// router.get('/sessions', authenticate, async (req, res) => {
//   res.json({ ok: true, sessions: [] });
// });

// router.post('/sessions/:sessionId/messages', authenticate, requirePlanTier('premium'), async (req, res) => {
//   const { content } = req.body || {};
//   res.status(201).json({ ok: true, message: { role: 'user', content }, response: 'AI response (stub)' });
// });
router.get('/query', async (req, res) => {
  // res.json({ ok: true, message: 'AI query' });
  console.log("AI query")
})


router.post('/query', authenticate, async (req, res) => {
  const { query } = req.body;

  try {
    // Attempt to forward to Python AI server
    const response = await axios.post('http://localhost:8000/query', {
      query: query,
      top_k: 3
    });

    const aiResponse = {
      role: "assistant",
      content: response.data.answer
    };
    res.json({ ok: true, aiResponse });

  } catch (err) {
    console.error("AI Server Error (Port 8000):", err.message);

    // Fallback stub if AI server is down
    const aiResponse = {
      role: "assistant",
      content: "I am currently unable to reach the AI engine (Port 8000 is unavailable). This is a stub response."
    };
    res.json({ ok: true, aiResponse });
  }
});
module.exports = router;