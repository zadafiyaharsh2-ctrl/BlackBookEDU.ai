const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String 
  },
  location: { 
    type: String 
  },
  birthdate: { 
    type: String
  },
  password: { 
    type: String, 
    required: true 
  },

  // Profile extras
  avatarUrl: String,
  bio: {
    type: String,
    default: null
  },

  // Role-based hierarchy
  role: { 
    type: String, 
    enum: ["webappAdmin", "dean", "hod", "teacher", "student", "normalUser"], 
    default: "student" 
  },

  // Relations
  // institutionName: { 
  //   type: String,
  //   ref: "Institution", 
  //   default: null 
  // },
  departmentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Department", 
    default: null 
  },

  // Social/Connections
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
  achievements: [String],

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
