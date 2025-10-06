const express = require('express');
const router = express.Router();
const { Contact } = require('../models/contact');


// const { verifyToken } = require("../utils/helper");

router.post('/contact', async (req,res) =>{
    try{
        const { firstName , lastName, email, phone, subject, message }  = req.body;

        if ( !firstName || !lastName || !email || !phone || !subject || !message ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newContactMessage = await Contact.create({
            userId: req.user._id,
            firstName,
            lastName,
            email,
            phone,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: "Your message has been received. We'll get back to you shortly.",
            data: newContactMessage
        });
    } catch(error){
        console.error("Error submitting contact form:", error);
         if (error.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: error.message });
        }
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
    
});

module.exports = router;