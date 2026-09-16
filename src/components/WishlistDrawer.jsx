import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 bg-black/50">
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-lg flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-base font-bold text-gray-900">
                Wishlist ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-800 rounded cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-sm">
                <p>Your wishlist is currently empty.</p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-3 bg-blue-600 text-white text-xs px-4 py-2 rounded font-medium cursor-pointer"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div
                  key={item.id}
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
                          onClick={() => toggleWishlist(item)}
                          className="text-gray-400 hover:text-red-500 p-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-blue-600 uppercase font-semibold">{item.category}</span>
                    </div>

                    <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-200">
                      <span className="text-xs font-bold text-gray-900">
                        ₹{item.price}
                      </span>

                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-2.5 py-1 rounded cursor-pointer"
                      >
                        <ShoppingCart className="w-3 h-3" />
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
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  wishlist.forEach((p) => addToCart(p));
                  setIsWishlistOpen(false);
                }}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium py-2 rounded cursor-pointer"
              >
                Add All to Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
