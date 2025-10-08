// server/routes/user.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');

// Configure multer to store files in memory as Buffer
const storage = multer.memoryStorage();

// File filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// GET User Profile
// Fetches or creates the single user profile
router.get('/profile', async (req, res) => {
    try {
        let user = await User.findById('main_user');
        if (!user) {
            // If no user exists, create one with default null values
            user = new User();
            await user.save();
        }
        res.json(user);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// PUT Update User Profile
router.put('/profile', upload.single('profileImage'), async (req, res) => {
    const { fullname, username, email, bio, institute } = req.body;

    try {
        let updateData = { fullname, username, email, bio, institute };

        // If a file was uploaded, convert it to Base64 and store in database
        if (req.file) {
            const base64Image = req.file.buffer.toString('base64');
            const mimeType = req.file.mimetype;
            // Store as data URL format: data:image/jpeg;base64,/9j/4AAQSkZJRgABA...
            updateData.imageUrl = `data:${mimeType};base64,${base64Image}`;
        }

        let user = await User.findByIdAndUpdate(
            'main_user',
            updateData,
            { new: true, upsert: true } // new: return modified doc, upsert: create if it doesn't exist
        );
        res.json(user);
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).json({ error: 'Server Error', message: err.message });
    }
});

module.exports = router; 