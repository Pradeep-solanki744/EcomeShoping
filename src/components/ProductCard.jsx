import React from 'react';
import { Star, Heart, Eye, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct } = useShop();
  const wishlisted = isWishlisted(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs">
            {product.badge}
          </span>
        )}

        {/* Discount Tag */}
        {discountPercent > 0 && (
          <span className="absolute bottom-3 left-3 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
            {discountPercent}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            wishlisted
              ? 'bg-rose-50 text-rose-500 shadow-md'
              : 'bg-white/80 text-slate-600 hover:bg-white hover:text-rose-500 shadow-xs'
          }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button (hover overlay) */}
        <button
          onClick={() => setQuickViewProduct(product)}
          className="absolute inset-x-4 bottom-3 hidden group-hover:flex items-center justify-center gap-1.5 bg-white/95 hover:bg-white text-slate-900 text-xs font-bold py-2 rounded-xl shadow-md backdrop-blur-xs transition-all cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-rose-500" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-slate-900 text-sm sm:text-base line-clamp-1 hover:text-rose-600 transition-colors cursor-pointer"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-slate-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-rose-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs hover:shadow-rose-500/30 cursor-pointer active:scale-95"
            title="Add to Cart"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

      </div>

    </div>
  );
};
