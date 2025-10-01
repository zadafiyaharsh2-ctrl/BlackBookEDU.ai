// ================= USER MODEL =================
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { 
    type: String, 
    enum: ["webappAdmin", "dean", "hod", "teacher", "student", "normalUser"], 
    default: "student" 
  },
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution", default: null },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Department", default: null }
});

// ================= INSTITUTION MODEL =================
const InstitutionSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["school", "college", "institute"] },
  dean: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  departments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }]
});

// ================= DEPARTMENT MODEL =================
const DepartmentSchema = new mongoose.Schema({
  name: String,
  institutionId: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  hod: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

// ================= WEBAPP ADMIN MODEL =================
const WebAppAdminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  permissions: [String] 
});
