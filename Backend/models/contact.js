const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Phone:{
        type: String,
        required: True
    },
    Subject:{
        type: String,

    },
    Message:{
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Contact', contactSchema);