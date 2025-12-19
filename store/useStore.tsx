
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, User, Address } from '../types';

interface AppState {
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  user: User | null;
  isAuthenticated: boolean;
  isCartOpen: boolean;
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  openCart: () => void;
  closeCart: () => void;
  login: (email: string) => void;
  logout: () => void;
  clearCart: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persistence
  useEffect(() => {
    const savedCart = localStorage.getItem('thrive3_cart');
    const savedWishlist = localStorage.getItem('thrive3_wishlist');
    const savedUser = localStorage.getItem('thrive3_user');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('thrive3_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('thrive3_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item => item === existing ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        quantity: 1,
        size,
        color,
        image: product.images[0]
      }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const login = (email: string) => {
    const newUser: User = {
      id: 'u1',
      email,
      name: email.split('@')[0],
      orders: [],
      addresses: [
        { id: 'a1', fullName: 'John Doe', street: '123 Urban Avenue', city: 'Cyber City', zip: '10001', country: 'United States', isDefault: true }
      ]
    };
    setUser(newUser);
    localStorage.setItem('thrive3_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('thrive3_user');
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      cart, wishlist, user, isAuthenticated: !!user, isCartOpen,
      addToCart, removeFromCart, updateQuantity, toggleWishlist,
      openCart, closeCart, login, logout, clearCart
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useStore must be used within AppProvider');
  return context;
};
