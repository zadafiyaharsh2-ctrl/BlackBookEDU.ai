const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  examType: String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  tags: [String],
  isPaid: { type: Boolean, default: false },
  price: Number
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);