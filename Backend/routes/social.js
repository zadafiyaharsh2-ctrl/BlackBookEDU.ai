// routes/dashboard.js
const express = require('express');
const router = express.Router();

router.get('/social', (req, res) => {
  res.json({ message: 'social route working!' });
});

module.exports = router;
