import React from 'react';
import { categories } from '../data/products';
import { useShop } from '../context/ShopContext';

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
    <div id="catalog-section" className="py-4 space-y-4">
      
      {/* Title & Filters Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Products ({filteredProducts.length})
          </h2>
          <p className="text-xs text-gray-500">
            Select a category or use filters to find items
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Price Range */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-300">
            <span className="text-gray-600">Max Price:</span>
            <span className="font-bold text-blue-600">₹{maxPrice}</span>
            <input
              type="range"
              min="400"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-300">
            <span className="text-gray-600">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-medium text-gray-800 focus:outline-none cursor-pointer"
            >
              <option value="popular">Popularity</option>
              <option value="rating">Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap border cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'
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
