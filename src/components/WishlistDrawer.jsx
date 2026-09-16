import React from 'react';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart
  } = useShop();

  if (!isWishlistOpen) return null;

  const handleMoveToCart = (product) => {
    addToCart(product);
    toggleWishlist(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsWishlistOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-lg">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Your Wishlist</h2>
                <p className="text-xs text-slate-500">{wishlist.length} saved product(s)</p>
              </div>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-rose-50 text-rose-300 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto">
                  Click the heart icon on any product to save it here for later.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="bg-slate-900 hover:bg-rose-500 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
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
                          onClick={() => toggleWishlist(item)}
                          className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] font-bold text-rose-500 uppercase">{item.category}</span>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200/60">
                      <span className="text-sm font-black text-slate-900">
                        ₹{item.price}
                      </span>

                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-1.5 bg-slate-900 hover:bg-rose-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => {
                  wishlist.forEach((prod) => addToCart(prod));
                  setIsWishlistOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-xs"
              >
                <span>Add All Items to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
