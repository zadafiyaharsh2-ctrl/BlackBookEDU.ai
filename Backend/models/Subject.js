const mongoose = require('mongoose');
const SubjectSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Subject', SubjectSchema);