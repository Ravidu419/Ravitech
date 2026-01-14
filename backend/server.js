require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes Import කිරීම
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log("✅ MongoDB database connection established successfully!"))
  .catch(err => console.log("❌ Database connection error:", err));

// API Routes (මේ කොටස අනිවාර්යයෙන්ම බලන්න)
app.use('/api/products', productRoutes); 
app.use('/api/auth', authRoutes); // 👈 මෙතන 'authRoutes' එක හරියටම තියෙනවාද බලන්න

// Health Check
app.get('/', (req, res) => {
  res.send('RaviTech Backend is Running! 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});