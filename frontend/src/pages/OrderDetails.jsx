import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const OrderDetails = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "Sri Lanka",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

  // total calculation logic
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price =
        typeof item.price === "string"
          ? parseInt(item.price.replace(/[^0-9]/g, ""))
          : item.price;
      return total + price * item.qty;
    }, 0);
  };

  const totalAmount = calculateTotal();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // simple form validation
    if (!address.address || !address.city || !address.postalCode || !address.country) {
      return toast.error("Please fill in all address fields!");
    }

    const userData = localStorage.getItem("user");
    if (!userData) {
      toast.error("User not found. Please login.");
      return navigate("/login");
    }
    const user = JSON.parse(userData);

    // format items to match backend schema
    const formattedOrderItems = cart.map((item) => ({
      name: item.name,
      qty: item.qty,
      image: item.image,
      price:
        typeof item.price === "string"
          ? parseInt(item.price.replace(/[^0-9]/g, ""))
          : item.price,
      product: item._id,
    }));

    const orderData = {
      user: user._id,
      orderItems: formattedOrderItems,
      shippingAddress: address,
      paymentMethod: paymentMethod,
      totalAmount: totalAmount,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/orders/create", orderData);
      
      if (res.status === 201) {
        clearCart();
        toast.success("Order Placed Successfully! 🎉");
        navigate("/order-success");
      }
    } catch (err) {
      console.error("Order creation failed:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "Order Failed! Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 mt-6">
        <h2 className="text-3xl font-black text-slate-800 mb-6">Checkout Details 📦</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Shipping Details */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold mb-6">Shipping Address</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Home Address</label>
                <input
                  type="text"
                  placeholder="Home Address"
                  required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={address.address}
                  onChange={(e) => setAddress({ ...address, address: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="Colombo"
                  required
                  className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    placeholder="10100"
                    required
                    className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Country</label>
                  <select
                    className="w-full p-3 border rounded-xl bg-white outline-none"
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  >
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </form>
          </div>

          {/* Payment & Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-4">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-slate-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="font-semibold">Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-slate-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="Card"
                    checked={paymentMethod === "Card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="font-semibold">Credit/Debit Card (Online)</span>
                </label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>Total:</span>
                <span className="text-blue-600">Rs. {totalAmount.toLocaleString()}</span>
              </div>
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;