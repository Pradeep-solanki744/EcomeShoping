import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartSubtotal,
    discountAmount,
    shippingFee,
    clearCart,
    showToast
  } = useShop();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const generatedId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderComplete(true);
    clearCart();
    showToast('Order placed successfully!');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderComplete(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <h3 className="font-bold text-gray-900 text-base">
            {orderComplete ? 'Order Placed' : 'Checkout & Payment'}
          </h3>
          <button
            onClick={handleClose}
            className="p-1 text-gray-500 hover:text-gray-800 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {orderComplete ? (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
              <h4 className="text-xl font-bold text-gray-900">Thank You!</h4>
              <p className="text-sm text-gray-600">
                Your order <strong className="text-blue-600">#{orderId}</strong> has been successfully placed.
              </p>
              
              <div className="bg-gray-50 border border-gray-200 rounded p-4 text-left text-xs space-y-2">
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Address:</strong> {formData.address}, {formData.city} - {formData.pincode}</p>
                <p><strong>Payment Mode:</strong> {paymentMethod.toUpperCase()}</p>
                <p><strong>Total Amount:</strong> ₹{cartTotal}</p>
              </div>

              <button
                onClick={handleClose}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded cursor-pointer"
              >
                Back to Store
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="space-y-2">
                <h4 className="font-bold text-gray-800">1. Customer Information</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    required
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <input
                  required
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    required
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    required
                    type="text"
                    name="pincode"
                    placeholder="PIN Code"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                  <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-200">
                <h4 className="font-bold text-gray-800">2. Payment Method</h4>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                    />
                    <span>UPI / QR</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                    />
                    <span>Debit/Credit Card</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Order total */}
              <div className="bg-gray-50 p-3 rounded border border-gray-200 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items):</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-gray-900 pt-1 border-t border-gray-200">
                  <span>Total Due:</span>
                  <span className="text-blue-600">₹{cartTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded cursor-pointer"
              >
                Place Order (₹{cartTotal})
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
