const express = require('express');
const router = express.Router();
const User = require('../models/User'); // extension එක හරි නේද බලන්න

// 1. Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // ඊමේල් එක දැනටමත් පාවිච්චි කරලාද බලනවා
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });

        const newUser = new User({ name, email, password });
        await newUser.save();
        
        res.status(201).json({ message: "Success" }); // 👈 'Success' පණිවිඩය අනිවාර්යයි
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: "User not found!" });
        if (user.password !== password) return res.status(400).json({ message: "Invalid password!" });

        res.status(200).json({ 
            message: "Login successful", 
            user: { name: user.name, email: user.email } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;