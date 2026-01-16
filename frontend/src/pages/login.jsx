import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import LoginIcon from "@mui/icons-material/Login";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // connecting to the login endpoint
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      if (res.status === 200) {
        toast.success(`Welcome back, ${res.data.user.name}! 👋`);
        
        // save user details for profile and checkout
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/home");
      }
    } catch (err) {
      // showing backend error message or default
      toast.error(err.response?.data?.message || "Login Failed! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[2.5rem] shadow-xl border-2 border-blue-600">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-6 shadow-lg shadow-blue-100">
            <span className="text-white text-4xl font-black">RT</span>
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">
            RAVI<span className="text-blue-600">TECH</span>
          </h1>
          <p className="text-slate-400 mt-3 font-medium">Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <EmailOutlinedIcon fontSize="small" />
              </div>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full bg-slate-50 border border-slate-200 px-12 py-4 rounded-2xl text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition-all"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <LockOutlinedIcon fontSize="small" />
              </div>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 px-12 py-4 rounded-2xl text-slate-800 outline-none focus:border-blue-600 focus:bg-white transition-all"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 mt-4 rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all flex items-center justify-center gap-2"
          >
            Sign In <LoginIcon />
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm font-medium">
            New here?
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-bold ml-2 cursor-pointer hover:underline"
            >
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;