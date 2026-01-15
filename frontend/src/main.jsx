// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1. මේ Import එක තියෙනවද බලන්න
import { CartProvider } from './context/CartContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
 
    <CartProvider>
      <App />
    </CartProvider>
    
  
)