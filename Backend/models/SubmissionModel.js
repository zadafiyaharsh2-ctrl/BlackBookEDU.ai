const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
    date: { 
        type: Date,
        required: true
    },
    count: {
        type: Number,
        required: true,
        default: 0
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

});

SubmissionSchema.index({ date: 1, user: 1 }, { unique: true });

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;