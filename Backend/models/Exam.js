const mongoose = require('mongoose');
const ExamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // JEE/NEET, CAT, GATE
  slug: { type: String, required: true, unique: true },
}, { timestamps: true });
module.exports = mongoose.model('Exam', ExamSchema);