const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const jwt = require('jsonwebtoken');


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

// POST /contact/submit
// Requires authentication. Uses req.user.id from JWT as userId.
router.post('/submit', authenticate, async (req, res) => {
  try {
    // Trim inputs defensively
    const firstName = req.body.firstName?.trim();
    const lastName = req.body.lastName?.trim();
    const email = req.body.email?.trim().toLowerCase();
    const phone = req.body.phone?.trim();
    const subject = req.body.subject?.trim();
    const message = req.body.message?.trim();

    // Validate presence
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Optional basic email/phone checks
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
    if (phone.length < 8) {
      return res.status(400).json({ success: false, message: 'Invalid phone number' });
    }

    // Require authenticated user id
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const newContactMessage = await Contact.create({
      userId: req.user.id,
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Your message has been received. We'll get back to you shortly.",
      data: newContactMessage,
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: error.message });
    }
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});

module.exports = router;