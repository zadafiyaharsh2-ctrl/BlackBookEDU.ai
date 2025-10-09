const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const passport = require("passport");

// Helper: issue JWT with user role and org/dept info
function issueJwt(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      institutionId: user.institutionId,
      departmentId: user.departmentId
    },
    process.env.TOKEN,
    { expiresIn: "30d" }
  );
}

// Helper: role based middleware
function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden." });
    }
    next();
  };
}

// Helper: JWT auth middleware (sets req.user)
function authenticate(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'No token.' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.TOKEN);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid/expired token.' });
  }
}

// --- SIGNUP ---
router.post("/register", async (req, res) => {
  let { userName, email, phone, password, role, institutionId, departmentId } = req.body;
  if (!userName  || !email || !password)
    return res.status(400).json({ message: "Missing required fields." });

  // Assign default role if not provided
  role = role || "student";

  // Optionally: auto-assign role based on email domain or invite code logic here

  // Uniqueness checks
  if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered." });
  if (await User.findOne({ userName })) return res.status(409).json({ message: "userName already taken." });
  if (await User.findOne({ phone }) || phone === undefined ) return res.status(409).json({ message: "phone already taken." });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    email,
    phone,
    password: hashed,
    role,
    institutionId: institutionId || undefined,
    departmentId: departmentId || undefined
  });

  const token = issueJwt(newUser);
  const userToReturn = newUser.toObject();
  delete userToReturn.password;
  res.status(201).json({ success: true, token, user: userToReturn });
});

// --- LOGIN (by email, role auto-included in JWT) ---
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  // email = typeof email === 'string' ? email.trim().toLowerCase() : '';
  // password = typeof password === 'string' ? password.trim() : '';
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });

  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(401).json({ message: "Invalid credentials." });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials." });

  const token = issueJwt(user);
  const userToReturn = user.toObject();
  delete userToReturn.password;
  res.status(200).json({ success: true, token, user: userToReturn });
});

// --- GET OWN PROFILE ---
// router.get("/me", authenticate, async (req, res) => {
//   const user = await User.findById(req.user.id).select('-password');
//   if (!user) return res.status(404).json({ message: "User not found." });
//   res.json(user);
// });


// router.get('/profile', async ( req, res) => {
//   try {
//     let user = await User.findById('main_user');
//     if(!user){
//       user = new User();
//       await user.save();
//     }
//     res.json(user);
//   } catch (err) {
//     res.status(500).send('Server Error ');
//   }
// });


router.post("/contact", passport.authenticate("user-jwt" , { session:false }) ,  async (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ message: "Subject and message are required" });
  }

  try {
    const contact = new Contact({
      user: req.user._id,
      subject,
      message,
    });

    const savedMessage = await contact.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- EDIT PROFILE (only self, or admin for others) ---
router.put("/me", authenticate, async (req, res) => {
  const updateFields = {};
  ["userName", "email", "phone", "avatarUrl", "bio"].forEach(field => {
    if (req.body[field]) updateFields[field] = req.body[field];
  });
  const user = await User.findByIdAndUpdate(req.user.id, updateFields, { new: true }).select('-password');
  res.json(user);
});


router.put('/profile', async (req, res) => {
  const { name, email, phone, avatarUrl, bio } = req.body;
  try{
    let user = await User.findByIdAndUpdate('main_user',
      { name, email , phone, avatarUrl, bio },
      { new:true , user: true}
    );
    res.json(user);

    
  }catch(err){
    res.status(500).send('Server Error');
  }
});

// --- GET USER PROFILE BY ID (public, privacy-aware) ---
router.get("/get/user/:userId", authenticate, async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password');
  if (!user) return res.status(404).json({ message: "User not found." });
  // Optionally filter fields based on privacySettings
  res.json(user);
});

// --- CHANGE PASSWORD ---
router.post("/change-password", authenticate, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ message: "All fields required." });
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found." });
  if (!(await bcrypt.compare(oldPassword, user.password))) return res.status(400).json({ message: "Old password incorrect." });
  if (newPassword.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
  res.json({ message: "Password successfully changed." });
});

// --- ADMIN ONLY: GET ALL USERS ---
router.get("/users", authenticate, requireRole("webappAdmin", "dean" , "student"), async (req, res) => {
  const users = await User.find().select("userName email phone role institutionId departmentId createdAt updatedAt");
  res.json({ users });
});

// --- GET USERS IN ORGANIZATION/DEPARTMENT (hod/dean/admin) ---
router.get("/org/:orgId/users", authenticate, requireRole("webappAdmin", "dean", "hod"), async (req, res) => {
  const users = await User.find({ institutionId: req.params.orgId }).select("userName email phone role departmentId");
  res.json({ users });
});
router.get("/dept/:deptId/users", authenticate, requireRole("webappAdmin", "dean", "hod", "teacher"), async (req, res) => {
  const users = await User.find({ departmentId: req.params.deptId }).select("userName email phone role");
  res.json({ users });
});

// --- SET ROLE FOR USER (admin only) ---
router.patch("/set-role/:userId", authenticate, requireRole("webappAdmin", "dean"), async (req, res) => {
  const { role } = req.body;
  if (!role) return res.status(400).json({ message: "Role required." });
  const user = await User.findByIdAndUpdate(req.params.userId, { role }, { new: true }).select('-password');
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json({ user });
});

module.exports = router;