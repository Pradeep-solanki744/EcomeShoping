import React from 'react';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-xs flex flex-col justify-between overflow-hidden">
      
      {/* Product Image */}
      <div className="relative aspect-4/3 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-2 right-2 p-1.5 rounded-full bg-white border border-gray-200 cursor-pointer ${
            wishlisted ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
          }`}
          title="Wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {product.badge && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
            {product.badge}
          </span>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="uppercase font-semibold text-blue-600">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-semibold text-gray-900 text-sm line-clamp-1 hover:text-blue-600 cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-base font-bold text-gray-900">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1.5">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setQuickViewProduct(product)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded font-medium cursor-pointer"
            >
              View
            </button>
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
