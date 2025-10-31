// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   userName: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   fullName: {
//     type: String,
//     required: true,
//   },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true 
//   },
//   phone: { 
//     type: String 
//   },
//   location: { 
//     type: String 
//   },
//   birthdate: { 
//     type: String
//   },
//   password: { 
//     type: String, 
//     required: true 
//   },

//   // Profile extras
//   avatarUrl: String,
//   bio: {
//     type: String,
//     default: null
//   },

//   // followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
//   // following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

//   // Role-based hierarchy
//   role: { 
//     type: String, 
//     enum: ["webappAdmin", "dean", "hod", "teacher", "student", "normalUser"], 
//     default: "student" 
//   },

//   // Relations
//   // institutionName: { 
//   //   type: String,
//   //   ref: "Institution", 
//   //   default: null 
//   // },
//   departmentId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "Department", 
//     default: null 
//   },

//   // Social/Connections
//   connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], 
//   achievements: [String],

//   // Privacy settings for profile visibility
//   privacySettings: {
//     showScores: { type: Boolean, default: false },
//     showRecentActivity: { type: Boolean, default: true },
//     showBadges: { type: Boolean, default: true },
//     showInstitute: { type: Boolean, default: true },
//   },

//   // Subscription plans
//   plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }]
// }, { timestamps: true });

// const User = mongoose.model("User", UserSchema);

// module.exports = User;

const mongoose = require('mongoose');

const SubjectStatSchema = new mongoose.Schema({
  name: { type: String, required: true },   // e.g., Mathematics, Physics
  solved: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null },
  title: { type: String, default: '' },     // e.g., B.Tech, 11th Grade
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  current: { type: Boolean, default: false },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  // Auth + identity
  userName: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },

  // Contact
  phone: { type: String, default: null },

  // Profile basics
  avatarUrl: { type: String, default: null },
  coverImageUrl: { type: String, default: null },
  bio: { type: String, default: null },        // short bio
  headline: { type: String, default: null },   // card headline under name
  summary: { type: String, default: null },    // longer summary/about
  gender: { type: String, enum: ['male', 'female', 'other', 'prefer_not_to_say', null], default: null },
  location: { type: String, default: null },
  birthdate: { type: Date, default: null },

  // Social links
  website: { type: String, default: null },
  githubUrl: { type: String, default: null },
  linkedinUrl: { type: String, default: null },
  xUrl: { type: String, default: null },       // X (formerly Twitter)

  // Roles
  role: { 
    type: String, 
    enum: ["webappAdmin", "dean", "hod", "teacher", "student", "normalUser"], 
    default: "student" 
  },

  // Org/Dept
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Organization", default: null },
  departmentId:  { type: mongoose.Schema.Types.ObjectId, ref: "Department",   default: null },

  // Education history section (optional, for profile)
  education: [EducationSchema],

  // Social graph and counts
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followersCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },

  // Verification badge on profile
  verified: { type: Boolean, default: false },

  // Profile stats (for the donut charts)
  subjectStats: [SubjectStatSchema],  // [{ name: 'Mathematics', solved: 85, total: 100 }, ...]

  // Activity/usage
  lastActiveAt: { type: Date, default: null },

  // Privacy settings
  privacySettings: {
    showScores: { type: Boolean, default: false },
    showRecentActivity: { type: Boolean, default: true },
    showBadges: { type: Boolean, default: true },
    showInstitute: { type: Boolean, default: true },
  },

  // Subscription and earnings (for “Your subscription”/“My earning” blocks)
  currentPlan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", default: null },
  plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
  totalEarningsCents: { type: Number, default: 0 },
  currency: { type: String, default: 'INR' },

  // Verification/flags
  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },

  // Profile slug (optional pretty URL)
  slug: { type: String, unique: true, sparse: true },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
module.exports = User;