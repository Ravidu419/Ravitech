import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      fetchOrders(parsedUser._id); 
    }
  }, [navigate]);

  // fetching user specific orders from backend
  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/myorders/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching history:", err.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    window.location.href = '/login';
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-10">
        
        {/* User Info Header */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-10 border border-slate-100">
          <div className="bg-blue-600 h-24"></div>
          <div className="px-8 pb-8 text-center md:text-left">
            <div className="relative -mt-12 mb-4 flex justify-center md:justify-start">
              <div className="w-24 h-24 bg-white rounded-full p-2 shadow-md">
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-white text-3xl font-black">
                  {user.name?.charAt(0)}
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-black text-slate-800">{user.name}</h2>
            <p className="text-slate-500 mb-6">{user.email}</p>
            <button onClick={handleLogout} className="px-6 py-2 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition">
              Logout
            </button>
          </div>
        </div>

        {/* Order History List */}
        <h3 className="text-2xl font-black text-slate-800 mb-6">Recent Orders 🕒</h3>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center text-slate-400">No orders found.</div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Order ID: #{order._id.slice(-6)}</p>
                  <p className="text-slate-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {order.orderItems.map((item, index) => (
                      <span key={index} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-lg font-bold">
                        {item.name} x{item.qty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-xl font-black text-blue-600">Rs. {order.totalAmount.toLocaleString()}</p>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;