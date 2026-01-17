import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://3.95.228.87:5000/api/products`);
        
        const foundProduct = res.data.find(p => p._id === id);
        setProduct(foundProduct);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="p-10 text-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <button 
          onClick={() => navigate('/home')} 
          className="group mb-10 flex items-center gap-3 text-slate-500 hover:text-blue-600 transition-all duration-300"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 border border-slate-200 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all">
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </div>
          <span className="font-bold uppercase text-xs tracking-widest">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-slate-50 rounded-[3rem] p-12 flex items-center justify-center border border-slate-100 shadow-sm">
            <img src={product.image} alt={product.name} className="w-full h-auto max-h-[400px] object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="bg-blue-50 text-blue-600 font-bold px-4 py-1 rounded-full text-xs w-fit mb-4 uppercase tracking-wider">{product.category}</span>
            <h2 className="text-5xl font-black text-slate-900 mb-4 leading-tight">{product.name}</h2>
            <p className="text-2xl font-bold text-blue-600 mb-6">{product.price}</p>
            <div className="border-t border-b border-slate-100 py-6 mb-8">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Product Description</h4>
              <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
            </div>
            <button 
              onClick={() => addToCart(product)}
              className="flex items-center justify-center gap-3 bg-blue-600 text-white py-5 px-10 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all"
            >
              <ShoppingCartOutlinedIcon /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;