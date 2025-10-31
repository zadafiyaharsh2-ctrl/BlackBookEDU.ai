const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  topic:  { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true, index: true },
  // overall success rate for the topic
  successRate: { type: Number, default: 0 }, // 0..100
  // highest level reached (bronze..legend)
  level: { type: String, enum: ['bronze','silver','gold','master','legend'], default: 'bronze' },
  attempts: { type: Number, default: 0 },
  correct:  { type: Number, default: 0 },
}, { timestamps: true });

ProgressSchema.index({ user: 1, topic: 1 }, { unique: true });

module.exports = mongoose.model('Progress', ProgressSchema);