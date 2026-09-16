import React from 'react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { SearchX, RotateCcw } from 'lucide-react';

export const ProductGrid = () => {
  const { filteredProducts, setSearchQuery, setSelectedCategory, setMaxPrice } = useShop();

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxPrice(5000);
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-slate-200/80 my-6 shadow-xs max-w-xl mx-auto">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No matching products found</h3>
        <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
          We couldn't find any products matching your search criteria or price filters.
        </p>
        <button
          onClick={handleResetFilters}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-rose-500 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 py-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
