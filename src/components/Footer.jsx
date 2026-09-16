import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer = () => {
  const { setSelectedCategory } = useShop();

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    const catalog = document.getElementById('catalog-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-400 py-10 mt-16 border-t border-gray-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
          
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <ShoppingBag className="w-5 h-5 text-blue-500" />
              <span>ShopEasy</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              A simple online shopping web application built using React, JavaScript, and Tailwind CSS.
            </p>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-bold mb-3">Categories</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => handleCategoryClick('men')} className="hover:text-white cursor-pointer">
                  Men's Fashion
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('women')} className="hover:text-white cursor-pointer">
                  Women's Wear
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('shoes')} className="hover:text-white cursor-pointer">
                  Shoes
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick('electronics')} className="hover:text-white cursor-pointer">
                  Electronics
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-3">Contact & Support</h4>
            <p className="mb-1">Email: contact@shopeasy.com</p>
            <p className="mb-1">Phone: +91 98765 43210</p>
            <p>Location: College Project Demo, India</p>
          </div>

        </div>

        <div className="pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ShopEasy. Built with React & Tailwind CSS for Academic Project.</p>
        </div>
      </div>
    </footer>
  );
};
