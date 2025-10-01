const mongoose = require('mongoose');

const StudentsSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required : true,
    },
    studentEmail : {
        type : String, 
        required : true,
        unique : true,
    },
    StudentNumber : {
        type: String,
        unique : true,
    },
    RollNo : {
        type : String,
        required : true,
        unique : true,
    },
}, { _id: false });

const InstituteSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
}, {
  timestamps: true,
});

const Institute = mongoose.model('User', InstituteSchema);

module.exports= Institute;
