const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

const { authenticate } = require('../utils/authentication');



router.get("/", authenticate, async (req, res) => {
  try{
      const problems = await Problem.find({});

      if(!problems){
        return res.status(404).json({ message: "No problems found" });
      }
      res.json({ problems: problems });

  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ message: "Server error while fetching problems" });
  }

});
module.exports = router;
