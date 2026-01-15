import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // 💡 මෙතන නම 'cart' ලෙසම තියාගමු (Navbar එකේ මකන නමමයි)
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // 🛡️ අලුතින් ඇඩ් කළා: Logout වෙද්දී කාර්ට් එක Reset කිරීමට
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item._id === product._id);
      
      if (isExist) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });

    toast.success(`${product.name} Added! 🛒`, {
      duration: 2000,
      position: 'top-right',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
    toast.error("Item removed");
  };

  const updateQty = (productId, type) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === productId) {
          const newQty = type === 'inc' ? item.qty + 1 : item.qty - 1;
          return { ...item, qty: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);