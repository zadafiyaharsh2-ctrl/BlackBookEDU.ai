const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    default: [],
  },
    answer: {
    type: String,
    default: "",
  },
})

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem;