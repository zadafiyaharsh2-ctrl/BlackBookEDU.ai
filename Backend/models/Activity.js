const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['quiz', 'material', 'achievement', 'profileUpdate'] },
  details: mongoose.Schema.Types.Mixed, // quiz info, material name, score, etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', activitySchema);