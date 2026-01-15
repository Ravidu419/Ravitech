import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        fetchOrders(parsedUser._id);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const fetchOrders = async (userId) => {
    setOrdersLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      toast.error('Could not load order history');
    } finally {
      setOrdersLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-xl font-bold text-blue-600 animate-bounce">Loading Profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-xl font-bold text-slate-600 mb-4">Please log in to view your profile</p>
          <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onSearch={() => {}} /> 
      
      <div className="max-w-6xl mx-auto p-8 mt-10">
        {/* User Info Card */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 mb-10">
          <div className="bg-blue-600 p-12 text-center text-white">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full mb-4">
              <PersonIcon sx={{ fontSize: 80 }} className="text-blue-600" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">{user.name}</h2>
            <p className="opacity-80 font-medium">Verified RaviTECH Member</p>
          </div>

          <div className="p-10 space-y-6">
            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <EmailIcon className="text-blue-600" />
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Registered Email</p>
                <p className="text-lg font-bold text-slate-800">{user.email}</p>
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
               <button className="w-full md:w-auto bg-slate-800 text-white px-8 py-4 rounded-2xl font-bold hover:bg-blue-600 transition-all">
                  Edit Profile Information
               </button>
            </div>
          </div>
        </div>

        {/* Order History Section */}
        <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
          <div className="bg-blue-600 p-8 text-white flex items-center gap-3">
            <ShoppingBagIcon sx={{ fontSize: 32 }} />
            <h3 className="text-2xl font-bold">Order History</h3>
          </div>

          <div className="p-10">
            {ordersLoading ? (
              <div className="text-center py-10">
                <p className="text-blue-600 font-bold animate-bounce">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingBagIcon sx={{ fontSize: 64 }} className="text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 text-lg font-medium">No orders yet</p>
                <button 
                  onClick={() => navigate('/home')}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="border border-slate-200 rounded-2xl p-6 hover:border-blue-300 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Order ID</p>
                        <p className="text-slate-800 font-bold">{order._id.slice(-8)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                        <p className={`font-bold ${order.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                          {order.status}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4 pb-4 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2">Items</p>
                      {order.orderItems.map((item, idx) => (
                        <p key={idx} className="text-slate-700 font-semibold">
                          {item.name} x {item.qty} - Rs. {(item.price * item.qty).toLocaleString()}
                        </p>
                      ))}
                    </div>

                    <div className="flex justify-between items-end">
                      <p className="text-xs text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xl font-black text-blue-600">Rs. {order.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;