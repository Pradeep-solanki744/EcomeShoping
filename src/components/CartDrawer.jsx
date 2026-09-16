import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    cartTotal,
    discountAmount,
    discountPercent,
    shippingFee,
    couponCode,
    setCouponCode,
    applyCoupon,
    couponError,
    setIsCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  const handleProceed = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-lg flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-gray-900">
                Shopping Cart ({cart.length})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-800 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-sm">
                <p>Your shopping cart is currently empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 bg-blue-600 text-white text-xs px-4 py-2 rounded font-medium cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded bg-white border border-gray-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-gray-400 hover:text-red-500 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        ₹{item.price} each
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-200">
                      <span className="text-xs font-bold text-gray-900">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-gray-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-gray-600 hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-gray-200 bg-gray-50 space-y-3">
              
              {/* Promo code */}
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. SHOPEASY10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 text-xs uppercase bg-white border border-gray-300 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-[11px] text-red-500 mt-1">{couponError}</p>}
                {discountPercent > 0 && (
                  <p className="text-[11px] text-green-600 font-medium mt-1">
                    Coupon applied! {discountPercent}% discount.
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-1 text-xs text-gray-600 border-t border-gray-200 pt-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-1 border-t border-gray-200">
                  <span>Total:</span>
                  <span className="text-blue-600">₹{cartTotal}</span>
                </div>
              </div>

              <button
                onClick={handleProceed}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded cursor-pointer"
              >
                Proceed to Checkout (₹{cartTotal})
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
