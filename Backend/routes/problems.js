// routes/dashboard.js
const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem'); // <-- CORRECTED: Use require() for the model
const { authenticate } = require('../utils/authentication');


router.get('/problems', authenticate, (req, res) => {
   Problem.find({}, (err, problems) => {
    if (err) {

      console.error('Database Error:', err);
      return res.status(500).json({ error: 'Internal server error' });
 }
 // Success: Send the array of problems to the client
  res.json({ problems });
});
});

module.exports = router;