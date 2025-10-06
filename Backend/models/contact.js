const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    
    // userId: {
    // type: mongoose.Schema.Types.ObjectId,
    // required: true,
    // ref: 'User' 
    // },
    firstName:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: false
    },
    subject:{
        type: String,
        required: true

    },
    message:{
        type: String,
        required: true
    }

}, {
    timestamps:true
});

module.exports = mongoose.model('Contact', contactSchema);