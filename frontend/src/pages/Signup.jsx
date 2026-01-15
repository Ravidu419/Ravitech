import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // පේජ් එක Refresh වීම නවත්වනවා
    
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields!");
    }

    try {
      // URL එක හරියටම 'auth' ලෙස තිබිය යුතුයි
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      
      if (res.status === 201 || res.data.message === "Success") {
        toast.success("Account Created Successfully! 🎉");
        navigate('/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup Failed");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
        <h2 className="text-3xl font-black text-slate-800 mb-2 text-center">Create Account</h2>
        <p className="text-slate-400 mb-8 font-medium text-center">Join <span className="text-blue-600 mb-8 font-bold text-center">RAVI</span><span className="text-slate-600 mb-8 font-bold text-center">TECH.com</span>  today!</p>
        
        {/* onSubmit එක මෙතන තියෙන්න ඕනේ */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            autoComplete="off"
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Password"
            autoComplete="new-password" 
            className="w-full p-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          {/* type="submit" එක අනිවාර්යයි */}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            SIGN UP
          </button>
        </form>
        <p className="mt-6 text-center text-slate-500">
          Already have an account? <span onClick={() => navigate('/login')} className="text-blue-600 font-bold cursor-pointer hover:underline">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;