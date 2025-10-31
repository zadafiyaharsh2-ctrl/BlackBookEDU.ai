const mongoose = require('mongoose');

const TeacherApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName: String,
  dob: Date,
  contactNumber: String,
  email: String,
  highestQualification: String,
  specializations: [String],
  university: String,
  graduationYear: Number,
  yearsExperience: Number,
  currentPosition: String,
  subjectsTaught: [String],
  documents: [String], // URLs to docs
  status: { type: String, enum: ['pending','approved','rejected'], default: 'pending' },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reviewedAt: { type: Date, default: null },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('TeacherApplication', TeacherApplicationSchema);