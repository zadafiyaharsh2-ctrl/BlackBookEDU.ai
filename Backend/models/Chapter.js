const mongoose = require('mongoose');
const ChapterSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  name: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });
module.exports = mongoose.model('Chapter', ChapterSchema);