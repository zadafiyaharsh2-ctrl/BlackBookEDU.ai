const mongoose = require('mongoose');

// Flexible goals: weekly/monthly/yearly; target types can be rank, percentile, score, solved count, etc.
const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

  // time scope
  scope: { type: String, enum: ['weekly', 'monthly', 'yearly'], required: true },
  startAt: { type: Date, required: true },
  endAt:   { type: Date, required: true },

  // what are we aiming at
  exam:    { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', default: null },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', default: null },

  // type/value pairs, keep generic for future
  targetType: { 
    type: String, 
    enum: ['rank_world','rank_school','percentile','score','problems_solved'],
    required: true 
  },
  targetValue: { type: Number, required: true },

  // progress tracking (optional for later)
  progressValue: { type: Number, default: 0 }, // e.g., problems solved so far
  status: { type: String, enum: ['active', 'paused', 'completed', 'expired'], default: 'active' },

  // metadata for the UI
  label: { type: String, default: '' },
  notes: { type: String, default: '' },
}, { timestamps: true });

GoalSchema.index({ user: 1, startAt: 1, endAt: 1 });

module.exports = mongoose.model('Goal', GoalSchema);