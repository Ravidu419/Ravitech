const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists!" });

        const newUser = new User({ name, email, password });
        await newUser.save();
        
        res.status(201).json({ message: "Success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) return res.status(400).json({ message: "User not found!" });
        
        // plain text password check for now
        if (user.password !== password) return res.status(400).json({ message: "Invalid password!" });

        res.status(200).json({ 
            message: "Login successful", 
            user: { 
                _id: user._id, 
                name: user.name, 
                email: user.email 
            } 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Profile and Address
router.put('/profile', async (req, res) => {
    try {
        const { email, name, password, address, city, country } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        // updating user fields
        user.name = name || user.name;
        if (password) user.password = password;
        
        user.address = address || user.address;
        user.city = city || user.city;
        user.country = country || user.country;

        const updatedUser = await user.save();
        
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            address: updatedUser.address,
            city: updatedUser.city,
            country: updatedUser.country,
            token: "dummy-token"
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;