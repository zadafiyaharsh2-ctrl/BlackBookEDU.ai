const express =require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getToken, verifyToken } = require("../utils/helper");
const passport = require('passport');
const User = require('../models/User');


/// =============SIGNUP ROUTE=================
router.post('/register', async function(req, res){

    let { userName, email, phone, password} = req.body;

    if(!phone || phone.trim() === "") phone = undefined;

    if( !email || !password || !userName )
        return res.status(400).json({ error: "Email, Password and UserName are required fields" });

    const existing = await User.findOne( { email });
    if(existing) return res.status(409).json({ error: "User with this email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        userName,
        email,
        ...(phone && { phone}),
        password: hashed
    });

    const token = await getToken(email, newUser);

    const usertoReturn = { ...newUser.toJSON(), token };

    delete usertoReturn.passport;

    return res.status(201).json(usertoReturn);
});



/// =============LOGIN ROUTE=================

router.post("/login", async function(req, res){
    try{
        const {email, password }= req.body;

        if( !email?.trim() || !password?.trim()){
            return res.status(400).json({
                success: false,
                message: "Email and Password are required fields"
            });
        }

        const user = await User.findOne({
            email: email.trim()
            
        }).select('+password');

        if( !user ){
            console.log("No user found ", email.trim());
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        if( !isMatch ){
            console.log("Password mismatch for user.", user._id);
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id : user._id, 
                email: user.email
            }, process.env.TOKEN,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            success: true,
            token,
            user: usertoReturn
        });
    }
    catch (error) {
        console.error("Login error: ", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});