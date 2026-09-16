import React from 'react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const ProductGrid = () => {
  const { filteredProducts, setSearchQuery, setSelectedCategory, setMaxPrice } = useShop();

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxPrice(5000);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200 my-4">
        <p className="text-gray-600 font-medium text-sm">No products match your current filters.</p>
        <button
          onClick={handleReset}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-4 py-2 rounded cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 py-4">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
