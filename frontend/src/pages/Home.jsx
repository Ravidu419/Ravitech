import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import toast from 'react-hot-toast';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

 useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const res = await axios.get("http://3.95.228.87:5000/api/products");
        
        setProducts(res.data);
        setFilteredProducts(res.data); 
      } catch (err) {
        console.error("Error fetching data:", err.message);
      }
    };
    fetchProducts();
}, []);

  // filter products based on user search query
  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar onSearch={handleSearch} /> 
      
      {/* Floating cart button for quick access */}
      <button 
        onClick={() => navigate('/cart')}
        className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white p-5 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <div className="relative">
          <ShoppingCartIcon sx={{ fontSize: 28 }} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {cart.length}
            </span>
          )}
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold whitespace-nowrap">
          GO TO CART
        </span>
      </button>

      <div className="max-w-[1500px] mx-auto p-6">
        
        <div className="flex justify-between items-end mt-10 mb-12">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight leading-none">EXPLORE OUR</h1>
            <h2 className="text-5xl font-black text-blue-600 tracking-tighter">COLLECTION</h2>
          </div>
          
          <div className="hidden md:flex flex-col items-end gap-2">
            <p className="text-slate-400 font-medium text-sm">
              {filteredProducts.length} items found
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col">
              
              <div className="relative h-60 bg-slate-50 flex items-center justify-center p-8 overflow-hidden">
              <img 
                  src={`http://3.95.228.87:5000${product.image}`} 
                  alt={product.name} 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                />
              </div>

              <div className="p-6 flex flex-grow flex-col">
                <span className="text-blue-600 font-bold text-[10px] uppercase tracking-widest mb-1">{product.category}</span>
                <h3 className="text-lg font-black text-slate-800 mb-1 leading-tight truncate">{product.name}</h3>
                <p className="text-lg font-bold text-slate-400 mb-6">Rs. {product.price.toLocaleString()}</p>
                
                <div className="mt-auto flex gap-3">
                  <button 
                    onClick={() => {
                        addToCart(product);
                        toast.success(`${product.name} added!`);
                    }}
                    className="flex-1 h-12 bg-blue-600 text-white rounded-xl font-bold text-[11px] flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-md"
                  >
                    <AddShoppingCartIcon sx={{ fontSize: 18 }} />
                    <span>ADD TO CART</span>
                  </button>

                  <button 
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center hover:bg-slate-200 transition-all border border-slate-200"
                  >
                    <VisibilityIcon sx={{ fontSize: 20 }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-slate-400 font-bold text-xl">
            No items found for your search. 😕
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;