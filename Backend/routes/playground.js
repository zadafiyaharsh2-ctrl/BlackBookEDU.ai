// routes/dashboard.js
const express = require('express');
const router = express.Router();

router.get('/playground', (req, res) => {
  res.json({ message: 'playground route working!' });
});

module.exports = router;
