const express = require('express');
const router = express.Router();
const { authenticate } = require('../utils/authentication');
const Exam = require('../models/Exam');
const Subject = require('../models/Subject');
const Chapter = require('../models/Chapter');
const Topic = require('../models/Topic');

router.get('/exams', authenticate, async (req, res) => {
  const exams = await Exam.find().select('name slug');
  res.json({ ok: true, exams });
});

router.get('/exams/:examId/subjects', authenticate, async (req, res) => {
  const subjects = await Subject.find({ exam: req.params.examId }).select('name slug');
  res.json({ ok: true, subjects });
});

router.get('/subjects/:subjectId/chapters', authenticate, async (req, res) => {
  const chapters = await Chapter.find({ subject: req.params.subjectId }).select('name order');
  res.json({ ok: true, chapters });
});

router.get('/chapters/:chapterId/topics', authenticate, async (req, res) => {
  const topics = await Topic.find({ chapter: req.params.chapterId }).select('name levelLock');
  res.json({ ok: true, topics });
});

module.exports = router;