// routes/dashboard.js
const express = require('express');
const router = express.Router();

router.get('/analytics', (req, res) => {
  res.json({ message: 'analytics route working!' });
});

module.exports = router;
