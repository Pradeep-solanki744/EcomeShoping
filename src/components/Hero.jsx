import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero = () => {
  const { setSelectedCategory } = useShop();

  const handleShopNow = () => {
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Hero Top Content */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            Online Shopping Store
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Welcome to ShopEasy Store
          </h1>

          <p className="text-gray-600 text-sm sm:text-base">
            Find the best quality products at affordable prices. Browse through clothing, shoes, electronics, and daily essentials.
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleShopNow}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg cursor-pointer"
            >
              Shop Now
            </button>
            <button
              onClick={() => {
                setSelectedCategory('electronics');
                handleShopNow();
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-5 py-2.5 rounded-lg border border-gray-300 cursor-pointer"
            >
              View Electronics
            </button>
          </div>
        </div>

        {/* Feature Icons Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-gray-200 text-center">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Truck className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-gray-800">Free Delivery</h4>
            <p className="text-[11px] text-gray-500">On orders above ₹1,500</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <ShieldCheck className="w-5 h-5 text-green-600 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-gray-800">Secure Payment</h4>
            <p className="text-[11px] text-gray-500">100% safe transactions</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <RefreshCw className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-gray-800">7 Days Return</h4>
            <p className="text-[11px] text-gray-500">Easy return policy</p>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <Headphones className="w-5 h-5 text-purple-600 mx-auto mb-1.5" />
            <h4 className="text-xs font-bold text-gray-800">Customer Support</h4>
            <p className="text-[11px] text-gray-500">24/7 online help</p>
          </div>
        </div>

      </div>
    </div>
  );
};
