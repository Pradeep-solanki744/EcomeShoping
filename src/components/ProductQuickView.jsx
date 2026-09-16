import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingCart } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 bg-gray-100">
          <img
            src={quickViewProduct.image}
            alt={quickViewProduct.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-5 overflow-y-auto space-y-4 flex flex-col justify-between">
          
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase text-blue-600">
              {quickViewProduct.category}
            </span>

            <h2 className="text-lg font-bold text-gray-900">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                ₹{quickViewProduct.price}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{quickViewProduct.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600">
              {quickViewProduct.description}
            </p>

            {/* Colors */}
            {quickViewProduct.colors && (
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Color:</label>
                <div className="flex gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      style={{ backgroundColor: c }}
                      className={`w-6 h-6 rounded-full border-2 ${
                        selectedColor === c ? 'border-blue-600 scale-110' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {quickViewProduct.sizes && (
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Size:</label>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-2.5 py-1 text-xs rounded border ${
                        selectedSize === s
                          ? 'border-blue-600 bg-blue-50 text-blue-600 font-bold'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2 py-0.5 text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2.5 px-4 rounded cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart (₹{quickViewProduct.price * quantity})</span>
            </button>

            <button
              onClick={() => toggleWishlist(quickViewProduct)}
              className={`p-2.5 rounded border border-gray-300 ${
                wishlisted ? 'text-red-500 bg-red-50' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
