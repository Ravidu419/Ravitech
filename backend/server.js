const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path'); 
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Import Routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Database Connection logic
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Database connection established"))
    .catch(err => console.log("❌ MongoDB Error:", err.message));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});