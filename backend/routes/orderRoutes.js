const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create New Order
router.post('/create', async (req, res) => {
    try {
        // destructing all needed fields from request body
        const { user, orderItems, shippingAddress, paymentMethod, totalAmount } = req.body;

        const newOrder = new Order({
            user,
            orderItems,
            shippingAddress, 
            paymentMethod,   
            totalAmount
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        // debug error message in console if order fails
        console.error("Error in Create Order:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// Get User Orders for Profile page
router.get('/myorders/:userId', async (req, res) => {
    try {
        // find orders by user id and sort by latest first
        const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;