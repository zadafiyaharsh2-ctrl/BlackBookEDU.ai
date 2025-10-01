const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: [String],
  correctOption: Number,
  explanation: String,
  type: { type: String, enum: ['mcq', 'subjective'], default: 'mcq' },
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);