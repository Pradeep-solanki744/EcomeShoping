import React, { useState } from 'react';
import { X, CheckCircle2, CreditCard, Wallet, Truck, ShieldCheck, ArrowLeft, ShoppingBag } from 'lucide-react';
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

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const generatedId = 'SE-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderComplete(true);
    clearCart();
    showToast('🎉 Order placed successfully!', 'success');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderComplete(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">
                {orderComplete ? 'Order Confirmation' : 'Complete Your Order'}
              </h3>
              <p className="text-xs text-slate-500">
                {orderComplete ? 'Thank you for shopping with ShopEasy' : 'Secure 256-Bit SSL Checkout'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {orderComplete ? (
            // Success Receipt
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <h4 className="text-2xl font-black text-slate-900">Payment Confirmed!</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Your order <span className="font-bold text-rose-600">#{orderId}</span> has been confirmed.
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  A tracking notification has been sent to <strong>{formData.email || 'your email address'}</strong>.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Recipient:</span>
                  <span className="font-bold text-slate-800">{formData.fullName || 'Customer'}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Delivery Address:</span>
                  <span className="font-bold text-slate-800 text-right max-w-xs">{formData.address}, {formData.city} - {formData.pincode}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="font-bold uppercase text-slate-800">{paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-black text-slate-900">
                  <span>Total Paid:</span>
                  <span className="text-rose-600">₹{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="bg-slate-900 hover:bg-rose-500 text-white font-bold text-xs px-8 py-3.5 rounded-full transition-all shadow-md cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            // Checkout Form
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Shipping Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <Truck className="w-4 h-4" /> Shipping Address
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      name="fullName"
                      placeholder="e.g. John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="e.g. john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Street Address</label>
                    <input
                      required
                      type="text"
                      name="address"
                      placeholder="Flat / House No, Street, Landmark"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">City</label>
                    <input
                      required
                      type="text"
                      name="city"
                      placeholder="City / District"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">PIN / Postal Code</label>
                    <input
                      required
                      type="text"
                      name="pincode"
                      placeholder="e.g. 560001"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Select Payment Method
                </h4>

                <div className="grid grid-cols-3 gap-3">
                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-200'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="hidden"
                    />
                    <Wallet className="w-5 h-5 text-rose-500 mb-1" />
                    <span className="text-xs font-bold text-slate-800">UPI / QR</span>
                    <span className="text-[10px] text-slate-500">GPay, PhonePe</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-200'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="hidden"
                    />
                    <CreditCard className="w-5 h-5 text-rose-500 mb-1" />
                    <span className="text-xs font-bold text-slate-800">Card</span>
                    <span className="text-[10px] text-slate-500">Debit / Credit</span>
                  </label>

                  <label
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-rose-500 bg-rose-50/60 ring-2 ring-rose-200'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="hidden"
                    />
                    <Truck className="w-5 h-5 text-rose-500 mb-1" />
                    <span className="text-xs font-bold text-slate-800">Cash on Delivery</span>
                    <span className="text-[10px] text-slate-500">Pay at doorstep</span>
                  </label>
                </div>
              </div>

              {/* Order Summary Recap */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.length} items):</span>
                  <span className="font-semibold text-slate-800">₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="font-semibold text-slate-800">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Due:</span>
                  <span className="text-rose-600 text-base">₹{cartTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-rose-500/25 transition-all cursor-pointer text-sm"
              >
                Place Order & Pay ₹{cartTotal}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
