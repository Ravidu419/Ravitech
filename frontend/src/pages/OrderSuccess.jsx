import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center pt-20 px-4">
        
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full border border-slate-100">
          
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-black text-slate-800 mb-4">Order Successful! 🎉</h1>
          <p className="text-slate-500 text-lg mb-8">
            Thank you for your purchase.<br/> Your order has been placed successfully.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/profile')}
              className="w-full bg-slate-800 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-900 transition shadow-lg shadow-slate-200"
            >
              View Order History
            </button>
            <button 
              onClick={() => navigate('/home')}
              className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition"
            >
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;