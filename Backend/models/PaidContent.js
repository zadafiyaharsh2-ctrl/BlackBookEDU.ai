const mongoose = require('mongoose');

const PaidContentSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:   { type: String, required: true },
  description: { type: String, default: '' },
  mediaUrls: [String], // host externally or later upload
  priceCents: { type: Number, default: 0 },
  currency:   { type: String, default: 'INR' },
  tags: [String],
  visibility: { type: String, enum: ['public','paid'], default: 'paid' },
  analytics: {
    views: { type: Number, default: 0 },
    purchases: { type: Number, default: 0 },
  }
}, { timestamps: true });

module.exports = mongoose.model('PaidContent', PaidContentSchema);