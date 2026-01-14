const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// හැම product එකක්ම ලබාගන්න (Get all products)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;