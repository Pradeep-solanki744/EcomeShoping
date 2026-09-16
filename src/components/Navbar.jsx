import React, { useState } from 'react';
import { ShoppingBag, Heart, ShoppingCart, Search, Menu, X } from 'lucide-react';
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
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Shop<span className="text-blue-600">Easy</span>
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 text-gray-800 text-sm rounded-lg pl-9 pr-8 py-2 border border-gray-300 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-xs text-gray-500 hover:text-gray-800"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-700">
            <button
              onClick={() => handleNavClick('all')}
              className="hover:text-blue-600 cursor-pointer"
            >
              All Items
            </button>
            <button
              onClick={() => handleNavClick('men')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Men
            </button>
            <button
              onClick={() => handleNavClick('women')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Women
            </button>
            <button
              onClick={() => handleNavClick('shoes')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Shoes
            </button>
            <button
              onClick={() => handleNavClick('electronics')}
              className="hover:text-blue-600 cursor-pointer"
            >
              Electronics
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-gray-700 hover:text-red-500 rounded-lg cursor-pointer"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cartCount})</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-100 text-gray-800 text-sm rounded-lg pl-9 pr-8 py-2 border border-gray-300 focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-gray-200 bg-white space-y-1">
            <button
              onClick={() => handleNavClick('all')}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              All Items
            </button>
            <button
              onClick={() => handleNavClick('men')}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Men's Fashion
            </button>
            <button
              onClick={() => handleNavClick('women')}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Women's Wear
            </button>
            <button
              onClick={() => handleNavClick('shoes')}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Footwear
            </button>
            <button
              onClick={() => handleNavClick('electronics')}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Electronics
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
