const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact.js");
const User = require("../models/User.js");
const passport = require("passport");


// POST /contact/submit
// Only logged-in users can submit. Identity is fetched from DB.
router.post('/submit', passport.authenticate("user-jwt" , { session:false }) , async (req, res) => {
  try {
    // Only accept subject and message from client
    const subject = req.body.subject?.trim();
    const message = req.body.message?.trim();

    if (!subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Subject and message are required.',
      });
    }

    // Fetch the full user to attach identity fields to the contact record
    const user = await User.findById(req.user.id).select('userName email phone');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found or unauthorized.' });
    }

    const userName = user.userName || 'NA';
    const email = user.email || 'no-email@unknown.local';
    const phone = user.phone || 'NA';

    const contactDoc = await Contact.create({
      userId: req.user.id,
      userName,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been received. We'll get back to you shortly.",
      data: contactDoc,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

// (Optional) GET /contact/mine - list current user's messages
router.get('/mine', passport.authenticate("user-jwt" , { session:false }) , async (req, res) => {
  try {
    const docs = await Contact.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, messages: docs });
  } catch (err) {
    console.error('GET /contact/mine error:', err);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

module.exports = router;