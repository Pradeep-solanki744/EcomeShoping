import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
        
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <Hero />

        {/* Main Product Catalog */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          <CategoryFilter />
          <ProductGrid />
        </main>

        {/* Modals, Drawers & Overlays */}
        <ProductQuickView />
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <Toast />

        {/* Footer */}
        <Footer />

      </div>
    </ShopProvider>
  );
}

export default App;
