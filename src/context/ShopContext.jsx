import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

export const ShopProvider = ({ children }) => {
  // Cart state with localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopeasy_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopeasy_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [maxPrice, setMaxPrice] = useState(5000);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Discount & Coupon
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');

  // Toast
  const [toasts, setToasts] = useState([]);

  // Persist cart & wishlist
  useEffect(() => {
    localStorage.setItem('shopeasy_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopeasy_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  };

  const addToCart = (product, selectedColor = null, selectedSize = null, quantity = 1) => {
    const color = selectedColor || product.colors?.[0] || 'Default';
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prevCart.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            cartItemId,
            selectedColor: color,
            selectedSize: size,
            quantity,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" to cart! 🛍️`);
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist ❤️`);
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'SHOPEASY10' || code === 'SAVE10') {
      setDiscountPercent(10);
      setCouponError('');
      showToast('🎉 Coupon applied! 10% discount added.');
    } else if (code === 'SUPER20') {
      setDiscountPercent(20);
      setCouponError('');
      showToast('🎉 Super deal applied! 20% discount added.');
    } else {
      setDiscountPercent(0);
      setCouponError('Invalid promo code. Try "SHOPEASY10" or "SUPER20"');
    }
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const shippingFee = cartSubtotal > 1500 || cartSubtotal === 0 ? 0 : 99;
  const cartTotal = cartSubtotal - discountAmount + shippingFee;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtered Products
  const filteredProducts = products
    .filter((product) => {
      const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = product.price <= maxPrice;
      return matchCategory && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id - a.id;
      return b.rating * b.reviewsCount - a.rating * a.reviewsCount; // Popularity default
    });

  return (
    <ShopContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        wishlist,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        maxPrice,
        setMaxPrice,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isWishlisted,
        couponCode,
        setCouponCode,
        applyCoupon,
        couponError,
        discountPercent,
        discountAmount,
        shippingFee,
        cartSubtotal,
        cartTotal,
        cartCount,
        toasts,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
