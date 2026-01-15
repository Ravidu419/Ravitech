// src/pages/Account.jsx
import React from 'react';
import Navbar from '../components/Navbar';

const Account = () => {
  // දැනට අපි ලෝකල් ස්ටෝරේජ් එකෙන් යූසර්ව ගමු
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-20 p-10 bg-white rounded-[3rem] shadow-xl text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-black">
          {user?.name?.charAt(0)}
        </div>
        <h2 className="text-3xl font-black text-slate-800">Hello, {user?.name}!</h2>
        <p className="text-slate-500 mt-2">{user?.email}</p>
        <button 
          onClick={() => { localStorage.clear(); window.location.href='/'; }}
          className="mt-10 bg-red-50 text-red-500 px-8 py-3 rounded-2xl font-bold hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};