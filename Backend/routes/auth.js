const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Contact = require("../models/Contact");
const Otp = require("../models/Otp")
const nodemailer = require("nodemailer");
const multer = require('multer');

require('dotenv').config();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'), false);
  }
});

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



router.post("/send-otp", async(req, res) => {
  const { email } = req.body;
  if(!email) return res.status(400).json({message:"Email is required."});

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: "Email already registered."});

  //generate 6 digit
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  // save & update in collection
  await Otp.findOneAndUpdate({ email }, { otp: hashedOtp }, { upsert: true });

  //send email
  try{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { 
        user: process.env.EMAIL_USER,
        pass:  process.env.EMAIL_PASS 
      }
    });
    await transporter.sendMail({
      from: '"Study Platform" <noreply@study.com>',
      to: email,
      subject: "Your Verification Code",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`
    });
    res.status(200).json({ success: true, message: "OTP sent to email." });
  } catch(err){
    res.status(500).json({ message: "Failed to send email." });
    console.error("Email error:",err);
  }
});


// --- SIGNUP ---
router.post("/register", async (req, res) => {
  let { userName,  email, phone, password, role, institutionId, departmentId, otp } = req.body;

  // validation
  if( !email || !password || !otp) return res.status(400).json({ message: "missing field."});

  // verify otp
  const otpRecord = await Otp.findOne({ email });
  if (!otpRecord) return res.status(400).json({ message: "OTP expired or not requested." });

  const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
  if (!isOtpValid) return res.status(400).json({ message: "Invalid OTP." });


  // If valid, delete the OTP record so it can't be reused
  await Otp.deleteOne({ email });

  if (!userName  || !email || !password)
    return res.status(400).json({ message: "Missing required fields." });

  // Assign default role if not provided
  role = role || "student";

  if (await User.findOne({ email })) return res.status(409).json({ message: "Email already registered." });
  if (await User.findOne({ userName })) return res.status(409).json({ message: "userName already taken." });
  if (await User.findOne({ phone }) || phone === undefined ) return res.status(409).json({ message: "phone already taken." });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    userName,
    fullName: userName,
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
router.get("/me", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: "User not found." });
  res.json(user);
});


router.post("/contact", authenticate ,  async (req, res) => {
  const { subject, message } = req.body;

  if (!subject || !message) {
    return res.status(400).json({ message: "Subject and message are required" });
  }

  try {
    const contact = new Contact({
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
router.put('/me', authenticate, upload.single('avatar'), async (req, res) => {
  try {
    const updateFields = {};
    ['userName', 'fullName', 'email', 'phone', 'birthdate', 'location', 'bio'].forEach(f => {
      if (req.body[f] !== undefined) updateFields[f] = req.body[f];
    });

    // If username/email provided, check if someone else already has it
    if (updateFields.userName) {
      const other = await User.findOne({ userName: updateFields.userName, _id: { $ne: req.user.id } });
      if (other) return res.status(409).json({ message: 'Username already taken.' });
    }
    if (updateFields.email) {
      const other = await User.findOne({ email: updateFields.email, _id: { $ne: req.user.id } });
      if (other) return res.status(409).json({ message: 'Email already in use.' });
    }

    if (req.file) {
      // convert to data URL (or ideally upload to cloud and set URL)
      const mimeType = req.file.mimetype;
      const base64Data = req.file.buffer.toString('base64');
      updateFields.avatarUrl = `data:${mimeType};base64,${base64Data}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateFields, { new: true }).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
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
  if (!oldPassword || !newPassword) return res.status(400).json({ 
    message: "All fields required." 
  });
  const user = await User.findById(req.user.id).select('+password');
  if (!user) return res.status(404).json({ 
    message: "User not found." 
  });
  if (!(await bcrypt.compare(oldPassword, user.password))) return res.status(400).json({ 
    message: "Old password incorrect." 
  });
  if (newPassword.length < 6) return res.status(400).json({ 
    message: "Password must be at least 6 characters." });
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












 // --- SUBMISSION ROUTES ---// Heatmap and submission recording
const correctAnswers = { q1: 'Paris', q2: 'Mars', q3: 'H2O' };

const Submission = require('../models/SubmissionModel');
const auth = require('../utils/helper').verifyToken;
router.post('/submit', authenticate, async (req, res) => {
  const userAnswers = req.body;
  let score = 0;

  for (const questionId in userAnswers) {
    if (userAnswers[questionId] === correctAnswers[questionId]) {
      score++;
    }
  }

  if (score === 0) {
    return res.status(200).json({ message: 'No new correct answers to record.' });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // We now filter by date AND user ID from the token
    const result = await Submission.findOneAndUpdate(
      { date: today, user: req.user.id },
      { $inc: { count: score }, $setOnInsert: { user: req.user.id } },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: 'Submission recorded!', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Error recording submission', error });
  }
});

// GET route to fetch heatmap data (now protected)
router.get('/data', authenticate, async (req, res) => {
  try {
    // We only find data for the logged-in user
    const data = await Submission.find({ user: req.user.id });
    const formattedData = data.map(item => ({
      date: item.date.toISOString().split('T')[0],
      count: item.count
    }));
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
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