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



const ChatHistory = require('../models/chatHistory');

router.get('/history', authenticate, async (req, res) => {
  try {
    const history = await ChatHistory.findOne({ userId: req.user.id });
    res.json({ ok: true, messages: history ? history.messages : [] });
  } catch (err) {
    console.error("Error fetching chat history:", err);
    res.status(500).json({ ok: false, message: "Failed to fetch chat history" });
  }
});

router.post('/query', authenticate, async (req, res) => {
  const { query } = req.body;
  const userId = req.user.id; 

  if (!query) {
    return res.status(400).json({ ok: false, message: "Query is required" });
  }

  try {
    let chatHistory = await ChatHistory.findOne({ userId });
    if (!chatHistory) {
      chatHistory = new ChatHistory({ userId, messages: [] });
    }

    const userMessage = { role: "user", content: query };
    chatHistory.messages.push(userMessage);

    let aiResponseContent = "";
    try {
      const response = await axios.post('http://localhost:8000/query', {
        query: query,
        top_k: 3
      });
      aiResponseContent = response.data.answer;
    } catch (err) {
      console.error("AI Server Error (Port 8000):", err.message);
      aiResponseContent = "I am currently unable to reach the AI engine. This is a stub response.";
    }

    const aiMessage = { role: "assistant", content: aiResponseContent };
    chatHistory.messages.push(aiMessage);

    await chatHistory.save();

    res.json({ ok: true, session: { id: chatHistory._id, messages: [aiMessage] }, aiResponse: aiMessage });

  } catch (err) {
    console.error("Error processing AI query:", err);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
});
module.exports = router;