import React, { useState } from 'react';
import { ShoppingBag, Heart, ShoppingCart, Search, Menu, X, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    searchQuery,
    setSearchQuery,
    setSelectedCategory
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (cat = 'all') => {
    setSelectedCategory(cat);
    setIsMobileMenuOpen(false);
    const element = document.getElementById('catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-header border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-2xl font-black tracking-tight text-slate-900 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span>
              Shop<span className="text-rose-500">Easy</span>
            </span>
          </a>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products, shoes, dresses, tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/90 hover:bg-slate-100 text-slate-800 text-sm rounded-full pl-10 pr-10 py-2.5 border border-transparent focus:border-rose-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-2.5 text-xs bg-slate-200 hover:bg-slate-300 rounded-full w-5 h-5 flex items-center justify-center text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <button
              onClick={() => handleNavClick('all')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              All Store
            </button>
            <button
              onClick={() => handleNavClick('men')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Men
            </button>
            <button
              onClick={() => handleNavClick('women')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Women
            </button>
            <button
              onClick={() => handleNavClick('electronics')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Electronics
            </button>
            <button
              onClick={() => handleNavClick('shoes')}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Footwear
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 text-slate-700 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all cursor-pointer"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-slate-900 hover:bg-rose-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all shadow-sm hover:shadow-md hover:shadow-rose-500/20 cursor-pointer group"
              title="View Cart"
            >
              <ShoppingCart className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              <span className="hidden sm:inline">Cart</span>
              <span className="bg-rose-500 group-hover:bg-white group-hover:text-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full transition-colors">
                {cartCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden pb-3 pt-1">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 text-slate-800 text-sm rounded-full pl-9 pr-8 py-2 border border-transparent focus:border-rose-400 focus:bg-white focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2 text-xs bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 bg-white space-y-2 rounded-b-2xl shadow-xl px-2">
            <button
              onClick={() => handleNavClick('all')}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
            >
              🛍️ All Products
            </button>
            <button
              onClick={() => handleNavClick('men')}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
            >
              👕 Men's Fashion
            </button>
            <button
              onClick={() => handleNavClick('women')}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
            >
              👗 Women's Fashion
            </button>
            <button
              onClick={() => handleNavClick('shoes')}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
            >
              👟 Footwear
            </button>
            <button
              onClick={() => handleNavClick('electronics')}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
            >
              🎧 Electronics
            </button>
            <button
              onClick={() => handleNavClick('accessories')}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
            >
              🕶️ Accessories
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
