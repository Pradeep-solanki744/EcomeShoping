import React, { useState } from 'react';
import { ShoppingBag, Send, ShieldCheck, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const { setSelectedCategory, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast('🎉 Subscribed to newsletter! Check your inbox for 10% coupon.');
    setNewsletterEmail('');
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Box */}
        <div className="bg-gradient-to-r from-rose-900/40 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="text-center lg:text-left space-y-2 max-w-lg">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Unlock 10% Off Your First Order
            </h3>
            <p className="text-sm text-slate-400">
              Join over 50,000+ members receiving weekly VIP discounts, flash sales, and early product drops.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-slate-800/90 text-white placeholder-slate-400 text-xs sm:text-sm rounded-full pl-10 pr-4 py-3 border border-slate-700 focus:outline-none focus:border-rose-500"
              />
            </div>
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer shrink-0"
            >
              <span>Join</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5 text-2xl font-black text-white">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span>Shop<span className="text-rose-500">Easy</span></span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              ShopEasy is your premier online shopping hub offering high-quality fashion, modern electronics, comfort footwear, and lifestyle essentials with nationwide express shipping.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-2">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-rose-400" /> SSL Secured</span>
              <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-rose-400" /> Made for Shoppers</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => handleCategoryClick('men')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Men's Fashion
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('women')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Women's Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('shoes')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Footwear & Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('electronics')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Smart Tech & Audio
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('accessories')} className="hover:text-rose-400 transition-colors cursor-pointer">
                  Watches & Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#" className="hover:text-rose-400 transition-colors">Order Tracking</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>+91 1800 123 4567</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <span>support@shopeasy.com</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Tech Park, MG Road, Bengaluru, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ShopEasy Store Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Powered by React + Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
