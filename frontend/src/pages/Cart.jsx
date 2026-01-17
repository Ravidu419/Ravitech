import React from 'react';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import toast from 'react-hot-toast';

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  // helper function to calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      // cleaning price string if it contains "Rs." or commas
      const price = typeof item.price === 'string' 
        ? parseInt(item.price.replace(/[^0-9]/g, "")) 
        : item.price;
      return total + (price * item.qty);
    }, 0);
  };

  const handleCheckout = () => {
    const userData = localStorage.getItem('user');
    
    // check if user is logged in before proceeding
    if (!userData) {
      toast.error("Please login to checkout!");
      return navigate('/login');
    }

    // redirect to order details to fill address
    navigate('/order-details');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        
        <button 
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 mb-8 text-gray-600 hover:text-blue-600 font-semibold group"
        >
          <div className="bg-white p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
            <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
          </div>
          Continue Shopping
        </button>

        <h2 className="text-4xl font-black text-gray-800 mb-10">Your Cart <span className="text-blue-600">({cart.length})</span></h2>

        {cart.length === 0 ? (
          <div className="bg-white p-20 rounded-3xl shadow-sm text-center">
            <p className="text-2xl text-gray-400 font-medium">Your cart is feeling light! 🛒</p>
            <button 
              onClick={() => navigate('/home')}
              className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Start Adding Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="bg-white p-5 rounded-2xl shadow-sm flex items-center gap-6 border border-transparent hover:border-blue-100 transition-all">
                  {/* Fixed Image Source for Frontend public folder */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-xl bg-slate-50" 
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-blue-600 font-bold mb-2">
                      {typeof item.price === 'number' ? `Rs. ${item.price.toLocaleString()}` : item.price}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => updateQty(item._id, 'dec')} className="p-1 px-2 hover:bg-gray-100 transition"><RemoveIcon sx={{ fontSize: 18 }} /></button>
                        <span className="px-4 font-bold text-gray-700">{item.qty}</span>
                        <button onClick={() => updateQty(item._id, 'inc')} className="p-1 px-2 hover:bg-gray-100 transition"><AddIcon sx={{ fontSize: 18 }} /></button>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition">
                    <DeleteOutlineIcon />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">Rs. {calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="text-green-500 font-semibold uppercase">Free</span>
                  </div>
                  <hr className="border-gray-100" />
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-2xl font-black text-blue-600">Rs. {calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 hover:shadow-xl transition-all active:scale-95"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;