const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products from the database
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        // returning 500 if something goes wrong on the server side
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;