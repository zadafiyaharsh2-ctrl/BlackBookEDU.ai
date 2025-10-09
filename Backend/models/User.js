// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   userName: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true 
//   },
//   // phone: { 
//   //   type: String 
//   // },
//   // password: { 
//   //   type: String, 
//   //   required: true 
//   // },

//   // Profile extras
//   // avatarUrl: String,
//   // bio: {
//   //   type: String,
//   //   default: null
//   // },

//   // Role-based hierarchy
//   // role: { 
//   //   type: String, 
//   //   enum: ["webappAdmin", "dean", "hod", "teacher", "student", "normalUser"], 
//   //   default: "student" 
//   // },

//   // Relations
//   // institutionId: { 
//   //   type: mongoose.Schema.Types.ObjectId, 
//   //   ref: "Institution", 
//   //   default: null 
//   // },
//   // departmentId: { 
//   //   type: mongoose.Schema.Types.ObjectId, 
//   //   ref: "Department", 
//   //   default: null 
//   // },

//   // Social/Connections
//   // connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // friends/following
//   // achievements: [String], // badges, awards, etc.

//   // Privacy settings for profile visibility
//   // privacySettings: {
//   //   showScores: { type: Boolean, default: false },
//   //   showRecentActivity: { type: Boolean, default: true },
//   //   showBadges: { type: Boolean, default: true },
//   //   showInstitute: { type: Boolean, default: true },
//   // },

//   // Subscription plans
//   plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }]
// }, { timestamps: true });

// const User = mongoose.model("User", UserSchema);

// module.exports = User;

// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Using a fixed ID for simplicity since we're dealing with a single user profile
    _id: {
        type: String,
        default: 'main_user' 
    },
    fullname: {
        type: String,
        default: null
    },
    username: {
        type: String,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    institute: {
        type: String,
        default: null
    },
    rank: {
        type: String,
        default: null
    },
    instituteRank: {
        type: String,
        default: null
    },
    imageUrl: {
        type: String,
        default: null
    }
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
// Ensure only one document exists with the fixed ID
// UserSchema.index({ _id: 1 }, { unique: true });
module.exports = mongoose.model('User', UserSchema);