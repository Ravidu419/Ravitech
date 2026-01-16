require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
  {
    name: "Apple iPhone 15",
    price: "Rs. 250,000",
    image: "/images/iphone15.jpg", 
    category: "Mobile",
    description: "The latest iPhone 15 features a durable color-infused glass and aluminum design."
  },
  {
    name: "Sony Headphones",
    price: "Rs. 45,000",
    image: "/images/head.jpg",
    category: "Audio",
    description: "Experience premium sound quality with noise cancellation."
  },
  {
    name: "Air pods Pro",
    price: "Rs. 25,000",
    image: "/images/airpods.jpg" ,
    category: "Accessories",
    description: "Active Noise Cancellation and Personalized Spatial Audio."
  },
  {
    name: "Apple MacBook Pro",
    price: "Rs. 315,000",
    image: "/images/mac.jpg" ,
    category: "Mobile",
    description: "Powerful performance with M-series chips."
  },
  {
    name: "Gaming Mouse",
    price: "Rs. 8,500",
    image: "/images/mouse1.jpg",
    category: "Accessories",
    description: "Ergonomic wired gaming mouse with RGB."
  },
  {
    name: "Mechanical Keyboard",
    price: "Rs. 15,000",
    image: "/images/key.jpg" ,
    category: "Accessories",
    description: "Description for Mechanical Keyboard."
  },
  {
    name: "Iphone 17 Pro Max",
    price: "Rs. 615,000",
    image: "/images/i17.jpg" ,
    category: "Mobile",
    description: "Description for Iphone 17 Pro Max."
  },
  {
    name: "Gaming Monitor",
    price: "Rs. 125,000",
    image: "/images/moniter.jpg" ,
    category: "Accessories",
    description: "Description for Gaming Monitor."
  },
  {
    name: "samsung Galaxy S24",
    price: "Rs. 295,000",
    image: "/images/s24.jpg" ,
    category: "Mobile",
    description: "Description for Samsung Galaxy S24."
  },
  {
    name: "HP pavilion Laptop",
    price: "Rs. 215,000",
    image: "/images/hp.jpg" ,
    category: "Accessories",
    description: "Description for HP pavilion Laptop."
  },
  {
    name: "Apple iPad Pro",
    price: "Rs. 215,000",
    image: "/images/ipad.jpg" ,
    category: "Mobile",
    description: "Tactile blue switches and vibrant backlighting."
  }
];

// logic to upload initial products to DB
const seedDB = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB connection success!");

    console.log("Clearing existing product data...");
    await Product.deleteMany({});
    
    console.log("Uploading new products to store...");
    await Product.insertMany(products);
    console.log("✅ Products added successfully!");

    mongoose.connection.close();
    console.log("Connection closed. Seed process done.");
  } catch (err) {
    console.error("❌ Something went wrong:", err.message);
    process.exit(1);
  }
};

seedDB();