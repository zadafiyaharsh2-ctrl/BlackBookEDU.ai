const mongoose = require('mongoose');

const LeaderboardSchema = new mongoose.Schema({
  scope: { type: String, enum: ['class','institution','world'], required: true },
  exam:  { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', default: null },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', default: null },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null },
  department:  { type: mongoose.Schema.Types.ObjectId, ref: 'Department', default: null },
  // Aggregated list [{ user, points, rank }]
  entries: { type: Array, default: [] },
  // Optional snapshot date for caching
  snapshotAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);