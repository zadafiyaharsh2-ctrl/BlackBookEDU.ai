const express =require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getToken, verifyToken } = require("../utils/helper");
const passport = require('passport');
const { User } = require('../models/User');


/// =============SIGNUP ROUTE=================

router.post('/register', async function(req, res) {
    try {
        let { userName, email, phone, password } = req.body;

        // Normalize inputs
        userName = typeof userName === 'string' ? userName.trim() : '';
        email = typeof email === 'string' ? email.trim().toLowerCase() : '';
        phone = typeof phone === 'string' ? phone.trim() : '';
        password = typeof password === 'string' ? password.trim() : '';

        // Empty phone should not be stored
        if (!phone) phone = undefined;

        // Required fields - compute missing for better UX
        const missing = [];
        if (!userName) missing.push('userName');
        if (!email) missing.push('email');
        if (!password) missing.push('password');
        if (missing.length) {
            return res.status(400).json({
                success: false,
                message: `Missing required field(s): ${missing.join(', ')}`,
                missing
            });
        }

        // Basic email format check
        const emailOk = /.+@.+\..+/.test(email);
        if (!emailOk) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Basic password policy
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        
        const existing1 = await User.findOne({ userName });
        if (existing1) {
            return res.status(409).json({
                success: false,
                message: "userName already taken"
            });
        }

        
    const hashed = await bcrypt.hash(password, 10);

        
        const newUser = await User.create({
            userName,
            name: userName,
            email,
            ...(phone && { phone }),
            password: hashed
        });

        
        const token = await getToken(email, newUser);

        
        const usertoReturn = newUser.toObject();
        delete usertoReturn.password;

        
        return res.status(201).json({
            success: true,
            token,
            user: usertoReturn
        });
    } catch (error) {
        console.error("Register error: ", error);
        // Handle duplicate key from MongoDB just in case race condition
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern || {})[0] || 'field';
            return res.status(409).json({
                success: false,
                message: `${field} already exists`
            });
        }
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

//=========== will be deleted using for getting data of backend ===

router.get('/users', passport.authenticate('user-jwt', { session: false }), async (req, res) => {
  try {
    const countOnly = req.query.count === 'true';
    let totalUsers = 0;
    if (countOnly) {
      totalUsers = await User.countDocuments() ;
    }
    const limit = Math.min(parseInt(req.query.limit) || 5, 100);
    const skip = parseInt(req.query.skip) || 0;

        const users = await User.find({})
            .select('userName name email phone createdAt updatedAt')
      .limit(limit)
      .skip(skip);

    res.json({ totalUsers, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


/// =============LOGIN ROUTE=================

router.post("/login", async function(req, res){
    try{
        let {email, password }= req.body;

        email = typeof email === 'string' ? email.trim().toLowerCase() : '';
        password = typeof password === 'string' ? password.trim() : '';

        if( !email?.trim() || !password?.trim()){
            return res.status(400).json({
                success: false,
                message: "Email and Password are required fields"
            });
        }

        const user = await User.findOne({
            email
        }).select('+password');

        if( !user ){
            console.log("No user found ", email.trim());
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        
    const isMatch = await bcrypt.compare(password , user.password);

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

        const usertoReturn = user.toObject();
        delete usertoReturn.password;


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

module.exports = router;