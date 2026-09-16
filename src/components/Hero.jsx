import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Headphones, Flame } from 'lucide-react';
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
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-white to-slate-50 border-b border-slate-200/60">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 border border-rose-200 text-rose-700 text-xs font-bold tracking-wide uppercase">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-bounce" />
              <span>Mega Seasonal Sale Up to 60% Off</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Shop the Latest Styles & Tech at <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600">Unbeatable Deals</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Explore handpicked curated collections in fashion, footwear, electronics, and accessories. Premium quality, lightning-fast delivery, and guaranteed customer satisfaction.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={handleShopNow}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold px-7 py-3.5 rounded-full shadow-lg shadow-rose-500/30 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('electronics');
                  handleShopNow();
                }}
                className="bg-white hover:bg-slate-100 text-slate-800 font-semibold px-6 py-3.5 rounded-full border border-slate-300 shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Trending Tech 🔥
              </button>
            </div>

            {/* Mini Trust Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-center lg:text-left">
              <div>
                <p className="text-2xl font-bold text-slate-900">50K+</p>
                <p className="text-xs text-slate-500 font-medium">Happy Shoppers</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-xs text-slate-500 font-medium">Original Gear</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4.9★</p>
                <p className="text-xs text-slate-500 font-medium">Customer Rating</p>
              </div>
            </div>

          </div>

          {/* Right Showcase Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-3xl bg-white p-3 shadow-2xl shadow-rose-900/10 border border-slate-100">
              
              <div className="relative overflow-hidden rounded-2xl aspect-4/3 sm:aspect-square bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                  alt="Featured Hero Product"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                  Deal of the Day
                </span>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">AcousticMax Pro ANC</h4>
                    <p className="text-xs text-slate-500">Hi-Res Audio • 45h Battery</p>
                  </div>
                  <div className="text-right">
                    <p className="text-rose-600 font-extrabold text-base">₹3,999</p>
                    <p className="text-[10px] text-slate-400 line-through">₹6,999</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Badges Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Free Express Delivery</p>
              <p className="text-[11px] text-slate-500">On all orders over ₹1,500</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Secure Payments</p>
              <p className="text-[11px] text-slate-500">Encrypted 256-bit SSL</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">7-Day Free Returns</p>
              <p className="text-[11px] text-slate-500">Hassle-free guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">24/7 Dedicated Support</p>
              <p className="text-[11px] text-slate-500">Live chat assistance</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
