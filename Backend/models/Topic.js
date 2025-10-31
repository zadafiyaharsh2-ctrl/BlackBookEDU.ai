const mongoose = require('mongoose');
const TopicSchema = new mongoose.Schema({
  chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
  name: { type: String, required: true },
  // Lock higher levels to premium
  levelLock: {
    gold: { type: Boolean, default: false },
    master: { type: Boolean, default: true },
    legend: { type: Boolean, default: true },
  }
}, { timestamps: true });
module.exports = mongoose.model('Topic', TopicSchema);