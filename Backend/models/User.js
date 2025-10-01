const mongoose = require('mongoose');

// ================= USER MODEL =================
const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  name: { 
    type: String, 
    required: true 
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

  // Role-based hierarchy
  role: { 
    type: String, 
    enum: ["webappAdmin", "dean", "hod", "teacher", "student", "normalUser"], 
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
  }

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);


// ================= INSTITUTION MODEL =================
const InstitutionSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ["school", "college", "institute"], 
    required: true 
  },
  dean: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  departments: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Department" 
  }]
}, { timestamps: true });

const Institution = mongoose.model("Institution", InstitutionSchema);


// ================= DEPARTMENT MODEL =================
const DepartmentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  institutionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Institution", 
    required: true 
  },
  hod: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
  teachers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  students: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }]
}, { timestamps: true });

const Department = mongoose.model("Department", DepartmentSchema);


// ================= WEBAPP ADMIN MODEL =================
const WebAppAdminSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  permissions: [{ 
    type: String 
  }] 
}, { timestamps: true });

const WebAppAdmin = mongoose.model("WebAppAdmin", WebAppAdminSchema);


// ================= EXPORT MODELS =================
module.exports = { User, Institution, Department, WebAppAdmin };
