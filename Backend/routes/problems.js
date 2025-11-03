const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const mongoose = require('mongoose');
const { authenticate } = require('../utils/authentication');



router.get("/", authenticate, async (req, res) => {
  try{
      const problems = await Problem.find({}).select('-answer');

      if(!problems){
        return res.status(404).json({ message: "No problems found" });
      }
      res.json({ problems: problems });

  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ message: "Server error while fetching problems" });
  }

});


router.post("/check", authenticate, async (req, res) => {
  const { problemId , userAnswer } = req.body;

  if(!problemId || !userAnswer){
    return  res.status(400).json({ message: "problemId and userAnswer are required" });
  }
  try{
    const problem = await Problem.findById(problemId).select('answer');

  if(!problem){
    return res.status(404).json({ message: "Problem not found" });
  }
  // CHECK THE ANSWER
  const isCorrect = problem.answer === userAnswer;


  //SEND BACK ONLY THE RESULT AND THE CORRECT ANSWER
  res.json(
    {
      isCorrect: isCorrect,
      correctAnswer: problem.answer   //Only sent after the user attempts the question
    }
  );

  } catch (error) {
    console.error("Error checking answer:", error);
    res.status(500).json({ message: "Server error while checking answer" });
  }
})

module.exports = router;
