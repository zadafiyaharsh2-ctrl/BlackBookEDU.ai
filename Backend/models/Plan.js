const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  features: [String],
  price: { type: Number, default: 0 },
  tier: { type: String, enum: ['free', 'basic', 'premium', 'institute'], default: 'free' },
  isOrgPlan: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);