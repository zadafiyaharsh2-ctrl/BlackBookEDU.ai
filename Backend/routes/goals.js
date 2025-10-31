const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/auth');
const Goal = require('../models/Goal');

// List goals (optionally filter by scope)
router.get('/', authenticate, async (req, res) => {
  const { scope } = req.query;
  const q = { user: req.user.id };
  if (scope) q.scope = scope;
  const goals = await Goal.find(q).sort({ createdAt: -1 });
  res.json({ ok: true, goals });
});

// Create a goal (driven by the "+" in Select Target)
router.post('/', authenticate, async (req, res) => {
  const body = req.body || {};
  const required = ['scope','startAt','endAt','targetType','targetValue'];
  for (const k of required) {
    if (body[k] === undefined) return res.status(400).json({ message: `Missing ${k}` });
  }
  const created = await Goal.create({ user: req.user.id, ...body });
  res.status(201).json({ ok: true, goal: created });
});

// Update a goal (pause, complete, edit value/label, etc.)
router.patch('/:goalId', authenticate, async (req, res) => {
  const updated = await Goal.findOneAndUpdate(
    { _id: req.params.goalId, user: req.user.id },
    req.body,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Goal not found' });
  res.json({ ok: true, goal: updated });
});

// Delete a goal
router.delete('/:goalId', authenticate, async (req, res) => {
  const del = await Goal.findOneAndDelete({ _id: req.params.goalId, user: req.user.id });
  if (!del) return res.status(404).json({ message: 'Goal not found' });
  res.json({ ok: true, deleted: true });
});

module.exports = router;