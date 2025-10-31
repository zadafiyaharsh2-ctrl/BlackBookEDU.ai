// routes/dashboard.js
const express = require('express');
const router = express.Router();

router.get('/problems', (req, res) => {
  res.json({ message: 'problem route working!' });
});

module.exports = router;
