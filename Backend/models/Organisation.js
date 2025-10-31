const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: { type: String, unique: true, sparse: true }, // add this to support “school code” join
  address: String,
  logo: String,
  contactEmail: String,
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
  purchasedPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }],
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);