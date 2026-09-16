import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Check, Shield, Truck, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductQuickView = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isWishlisted
  } = useShop();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedColor(quickViewProduct.colors?.[0] || null);
      setSelectedSize(quickViewProduct.sizes?.[0] || null);
      setQuantity(1);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-slate-100 text-slate-700 shadow-xs cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image Column */}
        <div className="md:w-1/2 bg-slate-100 relative aspect-square md:aspect-auto">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
          {quickViewProduct.badge && (
            <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
              {quickViewProduct.badge}
            </span>
          )}
        </div>

        {/* Product Info Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                {quickViewProduct.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{quickViewProduct.rating}</span>
                <span className="text-slate-400">({quickViewProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-black text-slate-900">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  ₹{quickViewProduct.originalPrice}
                </span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                In Stock & Ready to Ship
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {quickViewProduct.description}
            </p>

            {/* Colors */}
            {quickViewProduct.colors && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800">
                  Select Color:
                </label>
                <div className="flex items-center gap-2">
                  {quickViewProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'border-rose-500 scale-110 shadow-sm ring-2 ring-rose-200'
                          : 'border-white shadow-xs'
                      }`}
                    >
                      {selectedColor === color && (
                        <Check className={`w-3.5 h-3.5 ${color === '#ffffff' ? 'text-slate-900' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {quickViewProduct.sizes && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800">
                  Select Size / Option:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-rose-500 bg-rose-50 text-rose-600'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-1">
              <span className="text-xs font-bold text-slate-800">Qty:</span>
              <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-l-lg"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-slate-800">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart • ₹{quickViewProduct.price * quantity}</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  wishlisted
                    ? 'border-rose-200 bg-rose-50 text-rose-500'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
                title="Save to wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Mini Trust Details */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-slate-400" /> Fast Dispatch
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-slate-400" /> 100% Authentic
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> 7 Days Return
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
