const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const { requirePlanTier } = require('../utils/subscription');
const Progress = require('../models/Progress');

// Problems per topic/level view (bronze..legend)
// Gate higher levels to premium
router.get('/by-topic/:topicId', authenticate, async (req, res) => {
  const { level = 'bronze' } = req.query;
  // If level is master/legend, require premium plan at controller level
  const premiumLevels = new Set(['master','legend']);
  if (premiumLevels.has(level)) {
    return requirePlanTier('premium')(req, res, () => {
      res.json({ ok: true, topicId: req.params.topicId, level, problems: [] });
    });
  }
  res.json({ ok: true, topicId: req.params.topicId, level, problems: [] });
});

// Topic status for donut/success rate
router.get('/status/:topicId', authenticate, async (req, res) => {
  const pr = await Progress.findOne({ user: req.user.id, topic: req.params.topicId });
  res.json({ ok: true, status: pr || { level: 'bronze', successRate: 0 } });
});

// Record attempt, update success rate and level up
router.post('/attempts', authenticate, async (req, res) => {
  const { topicId, correct, total } = req.body || {};
  if (!topicId || typeof correct !== 'number' || typeof total !== 'number') {
    return res.status(400).json({ message: 'topicId, correct, total required' });
  }
  // Simplified stat update — replace with real aggregation later
  let pr = await Progress.findOne({ user: req.user.id, topic: topicId });
  if (!pr) pr = new Progress({ user: req.user.id, topic: topicId });
  pr.attempts += 1;
  pr.correct  += correct;
  const pct = Math.round((pr.correct / Math.max(pr.attempts * total, 1)) * 100);
  pr.successRate = Math.max(0, Math.min(100, pct));
  // Level thresholds example
  if (pr.successRate >= 95) pr.level = 'legend';
  else if (pr.successRate >= 89) pr.level = 'master';
  else if (pr.successRate >= 78) pr.level = 'gold';
  else if (pr.successRate >= 62) pr.level = 'silver';
  else pr.level = 'bronze';
  await pr.save();
  res.status(201).json({ ok: true, progress: pr });
});

module.exports = router;