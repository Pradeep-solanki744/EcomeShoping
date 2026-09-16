import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
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

  const freeShippingThreshold = 1500;
  const progressToFreeShipping = Math.min(
    100,
    Math.round((cartSubtotal / freeShippingThreshold) * 100)
  );
  const amountNeededForFreeShipping = freeShippingThreshold - cartSubtotal;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Shopping Cart</h2>
                <p className="text-xs text-slate-500">{cart.length} unique item(s)</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {cart.length > 0 && (
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                {amountNeededForFreeShipping > 0 ? (
                  <span className="text-slate-700">
                    Add <strong className="text-rose-600">₹{amountNeededForFreeShipping}</strong> more for <strong className="text-emerald-600">FREE Shipping!</strong>
                  </span>
                ) : (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                    Congratulations! You unlocked FREE Express Delivery!
                  </span>
                )}
                <span className="text-slate-500">{progressToFreeShipping}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-rose-500 to-emerald-500 h-full transition-all duration-500"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                  Looks like you haven't added anything to your cart yet. Explore our top deals!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-slate-900 hover:bg-rose-500 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-4 p-3 bg-slate-50/70 rounded-2xl border border-slate-200/60"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-white border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                        {item.selectedSize && <span>Size: <strong className="text-slate-700">{item.selectedSize}</strong></span>}
                        {item.selectedColor && (
                          <span className="flex items-center gap-1">
                            Color:
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-slate-300 inline-block"
                              style={{ backgroundColor: item.selectedColor }}
                            />
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60">
                      <span className="text-sm font-black text-slate-900">
                        ₹{item.price * item.quantity}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="px-2.5 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="px-2.5 py-0.5 text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
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

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Promo Code Box */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. SHOPEASY10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="w-full text-xs uppercase font-semibold bg-white border border-slate-300 rounded-xl px-3 py-2 pl-8 focus:outline-none focus:border-rose-500"
                    />
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                  <button
                    onClick={applyCoupon}
                    className="bg-slate-900 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-rose-500 mt-1">{couponError}</p>
                )}
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Coupon applied ({discountPercent}% discount)
                  </p>
                )}
              </div>

              {/* Order Summary */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">₹{cartSubtotal}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({discountPercent}%):</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${shippingFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-rose-600 text-base">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-rose-500/25 hover:shadow-rose-500/35 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout • ₹{cartTotal}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
