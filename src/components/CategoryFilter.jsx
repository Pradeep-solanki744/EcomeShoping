import React from 'react';
import { categories } from '../data/products';
import { useShop } from '../context/ShopContext';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const CategoryFilter = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    maxPrice,
    setMaxPrice,
    filteredProducts
  } = useShop();

  return (
    <div id="catalog-section" className="space-y-6 pt-4 pb-2">
      
      {/* Section Title & Quick Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Catalog
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Showing <span className="font-bold text-slate-800">{filteredProducts.length}</span> curated items
          </p>
        </div>

        {/* Sort & Price Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Price Range */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs text-xs font-medium text-slate-700">
            <span className="text-slate-400">Max:</span>
            <span className="font-bold text-rose-600">₹{maxPrice}</span>
            <input
              type="range"
              min="400"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-20 sm:w-28 accent-rose-500 cursor-pointer"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
            </select>
          </div>

        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25 scale-102'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

    </div>
  );
};
