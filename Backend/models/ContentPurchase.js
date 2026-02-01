const mongoose = require('mongoose');

const ContentPurchaseSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: mongoose.Schema.Types.ObjectId, ref: 'PaidContent', required: true },

    amountCents: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },

    provider: { type: String, default: 'manual' },       // e.g., 'manual', 'razorpay', 'stripe'
    providerRef: { type: String, default: '' },           // gateway reference/receipt id if any

    // routes/content.js checks for status === 'paid'
    status: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'paid' },
  },
  { timestamps: true }
);

// Ensure one purchase per user per content
ContentPurchaseSchema.index({ user: 1, content: 1 }, { unique: true });

module.exports = mongoose.model('ContentPurchase', ContentPurchaseSchema);