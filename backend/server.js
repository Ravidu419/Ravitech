const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// --- 1. ROUTES IMPORTS (මේ තුනම තියෙන්න ඕනේ) ---
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// --- 2. ROUTES USE (මේ පාරවල් තුනම පෙන්නන්න ඕනේ) ---
app.use('/api/auth', authRoutes);      // Login & Signup සඳහා
app.use('/api/products', productRoutes); // බඩු පෙන්වන්න
app.use('/api/orders', orderRoutes);     // ඕඩර් දාන්න

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.log("❌ DB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));