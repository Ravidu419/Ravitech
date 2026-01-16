import React, { useEffect, useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import LogoutIcon from '@mui/icons-material/Logout'; 
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { cart } = useCart(); 
  const [userName, setUserName] = useState('Guest');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserName(user.name || 'Guest');
      } catch (error) {
        setUserName('Guest');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // clearing everything at once
    window.location.href = '/login'; 
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md flex justify-between items-center sticky top-0 z-50">
      
      <div className="cursor-pointer" onClick={() => navigate('/home')}>
        <h1 className="text-4xl font-black text-slate-800 tracking-tight">
          RAVI<span className="text-white">TECH</span>
        </h1>
      </div>

      <div className="hidden md:flex flex-1 max-w-sm ml-4 mr-auto relative group">
        <input 
          type="text" 
          placeholder="Search gadgets..." 
          className="w-full py-2 px-12 rounded-full text-slate-800 outline-none border-2 border-slate-900 transition-all hover:border-4 focus:scale-105"
          onChange={(e) => onSearch && onSearch(e.target.value)} 
        />
        <SearchIcon className="absolute left-4 top-2.5 text-slate-400 group-hover:text-slate-900" fontSize="small" />
      </div>
      
      <div className="flex items-center gap-6">
        <div 
          onClick={() => navigate('/profile')}
          className="hidden lg:flex items-center gap-2 bg-blue-700 px-4 py-2 rounded-full cursor-pointer hover:bg-slate-800 transition-all border border-blue-500"
        >
          <PersonOutlineIcon fontSize="small" />
          <span className="font-bold uppercase text-xs">Hi, {userName}</span>
        </div>

        <div onClick={() => navigate('/cart')} className="relative cursor-pointer hover:opacity-80 transition">
          <ShoppingCartIcon fontSize="large" />
          <span className="absolute -top-2 -right-2 bg-slate-800 text-xs rounded-full px-2 py-0.5 font-bold">
            {cart.length}
          </span>
        </div>  

        <button onClick={handleLogout} className="flex items-center gap-1 bg-slate-800 hover:bg-red-500 px-4 py-2 rounded-lg font-bold transition">
          <LogoutIcon fontSize="small" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;