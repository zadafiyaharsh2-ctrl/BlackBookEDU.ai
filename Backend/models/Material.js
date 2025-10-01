const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  subject: String,
  examType: String, // JEE, NEET, GATE, etc.
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileUrl: String,
  tags: [String],
  isPaid: { type: Boolean, default: false },
  price: Number
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);