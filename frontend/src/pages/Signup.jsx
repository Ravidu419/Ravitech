import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email address.";
    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);
    setErrors({});
    try {
      const res = await axios.post("http://3.95.228.87:5000/api/auth/signup", formData);

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
        <p className="text-slate-400 mb-8 font-medium text-center">Join <span className="text-blue-600 mb-8 font-bold text-center">RAVI</span><span className="text-slate-600 mb-8 font-bold text-center">TECH.lk</span>  today!</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            className={`w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:ring-2 ${errors.name ? 'border-red-400 focus:ring-red-300' : 'border-transparent focus:ring-blue-500'}`}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
          <input 
            type="email" 
            placeholder="Email Address" 
            autoComplete="off"
            className={`w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:ring-2 ${errors.email ? 'border-red-400 focus:ring-red-300' : 'border-transparent focus:ring-blue-500'}`}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
          <input 
            type="password" 
            placeholder="Password"
            autoComplete="new-password" 
            className={`w-full p-4 bg-slate-50 rounded-2xl border outline-none focus:ring-2 ${errors.password ? 'border-red-400 focus:ring-red-300' : 'border-transparent focus:ring-blue-500'}`}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          {errors.password && <p className="text-red-500 text-xs ml-1">{errors.password}</p>}
          
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            SIGN UP
          </button>
        </form>
        <p className="mt-6 text-center text-slate-500">
          Already Have an account? <span onClick={() => navigate('/login')} className="text-blue-600 font-bold cursor-pointer hover:underline">Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;