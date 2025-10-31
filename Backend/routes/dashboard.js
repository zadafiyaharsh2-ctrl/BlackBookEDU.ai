// routes/dashboard.js
const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Dashboard route working!' });
});

module.exports = router;
