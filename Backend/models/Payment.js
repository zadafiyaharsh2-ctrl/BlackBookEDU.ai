const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
  amount: Number,
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  transactionId: String,
  paidAt: Date,
  paymentGateway: String
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);