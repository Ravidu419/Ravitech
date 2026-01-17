import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', password: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({ name: parsedUser.name, password: '' });
      fetchOrders(parsedUser._id); 
    }
  }, [navigate]);

  // fetch previous orders for this user
 const fetchOrders = async (userId) => {
  try {
    const res = await axios.get(`http://3.95.228.87:5000/api/orders/myorders/${userId}`);
    setOrders(res.data);
  } catch (err) {
    console.error("Fetch error:", err.message);
  }
};

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://3.95.228.87:5000/api/auth/profile', {
        email: user.email,
        name: formData.name,
        password: formData.password
      });

      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        setIsEditing(false);
        toast.success("Profile Updated!");
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-10">
        
        {/* User Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-10 border border-slate-100">
          <div className="bg-blue-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-white text-4xl font-black">
                  {user.name?.charAt(0)}
                </div>
              </div>
            </div>
            
            <h2 className="text-3xl font-black text-slate-800">{user.name}</h2>
            <p className="text-slate-500 mb-6">{user.email}</p>

            {isEditing ? (
              <form onSubmit={handleUpdate} className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">New Password (optional)</label>
                  <input 
                    type="password" 
                    placeholder="Leave blank to keep same"
                    value={formData.password} 
                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">Save Changes</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-300 transition">Cancel</button>
                </div>
              </form>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-slate-800 text-white rounded-xl font-bold shadow-md hover:bg-slate-900 transition">Edit Profile</button>
                <button onClick={handleLogout} className="px-6 py-2 bg-red-50 text-red-500 rounded-xl font-bold hover:bg-red-100 transition">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Orders List Section */}
        <h3 className="text-2xl font-black text-slate-800 mb-6 font-mono tracking-tight">ORDER HISTORY</h3>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center text-slate-400 border border-dashed border-slate-200 font-medium">No order data available.</div>
          ) : (
            orders.map((order) => (
              <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-full md:w-auto">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">ID: #{order._id.slice(-6).toUpperCase()}</p>
                  <p className="text-slate-500 text-sm font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {order.orderItems.map((item, index) => (
                      <span key={index} className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded-md font-black uppercase">
                        {item.name} x{item.qty}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-center md:text-right w-full md:w-auto border-t md:border-none pt-4 md:pt-0">
                  <p className="text-xl font-black text-slate-800">Rs. {order.totalAmount.toLocaleString()}</p>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
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