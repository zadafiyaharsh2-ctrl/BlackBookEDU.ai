const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String 
  },
  password: { 
    type: String, 
    required: true 
  },

  // Profile extras
  avatarUrl: String,
  bio: String,

  // Role-based hierarchy
  role: { 
    type: String, 
    enum: ["admin", "dean", "hod", "teacher", "student", "normalUser"], 
    default: "student" 
  },

  // Relations
  institutionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Institution", 
    default: null 
  },
  departmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Department", 
    default: null 
  },

  // Social/Connections
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // friends/following
  achievements: [String], // badges, awards, etc.

  // Privacy settings for profile visibility
  privacySettings: {
    showScores: { type: Boolean, default: false },
    showRecentActivity: { type: Boolean, default: true },
    showBadges: { type: Boolean, default: true },
    showInstitute: { type: Boolean, default: true },
  },

  // Subscription plans
  plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;