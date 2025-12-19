
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Heart, Menu, X, Search, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { cart, wishlist, user, openCart } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Menu Mobile */}
        <button className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
          <Menu className="w-6 h-6" />
        </button>

        {/* Left: Nav Links Desktop */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/products" className="text-sm font-medium tracking-widest uppercase hover:text-white/60 transition-colors">Shop All</Link>
          <Link to="/products?category=T-Shirts" className="text-sm font-medium tracking-widest uppercase hover:text-white/60 transition-colors">T-Shirts</Link>
          <Link to="/products?category=Cargo Pants" className="text-sm font-medium tracking-widest uppercase hover:text-white/60 transition-colors">Bottoms</Link>
        </nav>

        {/* Center: Brand Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter brand-font italic">
          THRIVE <span className="text-zinc-500">3</span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(true)} className="hover:text-zinc-400 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link to="/wishlist" className="relative hover:text-zinc-400 transition-colors">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{wishlist.length}</span>}
          </Link>
          <button onClick={openCart} className="relative hover:text-zinc-400 transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>}
          </button>
          <Link to={user ? "/account" : "/auth"} className="hidden sm:block hover:text-zinc-400 transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-[60]"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-zinc-950 z-[70] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="brand-font text-xl">THRIVE 3</span>
                <button onClick={() => setIsMenuOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="flex flex-col space-y-6">
                <Link onClick={() => setIsMenuOpen(false)} to="/" className="text-2xl font-bold tracking-tight">Home</Link>
                <Link onClick={() => setIsMenuOpen(false)} to="/products" className="text-2xl font-bold tracking-tight">Catalog</Link>
                <Link onClick={() => setIsMenuOpen(false)} to="/wishlist" className="text-2xl font-bold tracking-tight">Wishlist</Link>
                <Link onClick={() => setIsMenuOpen(false)} to="/account" className="text-2xl font-bold tracking-tight">Account</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-zinc-950 z-[100] flex flex-col items-center justify-start pt-20 px-4"
          >
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-6 right-6"><X className="w-8 h-8" /></button>
            <div className="w-full max-w-2xl">
              <input 
                autoFocus
                type="text" 
                placeholder="SEARCH FOR STREETWEAR..." 
                className="w-full bg-transparent border-b-2 border-zinc-800 text-3xl font-bold tracking-tighter py-4 outline-none focus:border-white transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/products?q=${(e.target as HTMLInputElement).value}`);
                    setIsSearchOpen(false);
                  }
                }}
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="text-zinc-500 text-xs uppercase tracking-widest w-full mb-2">Trending</span>
                {['Cargo Pants', 'Graphic Hoodies', 'Oversized Tees', 'Jackets'].map(t => (
                  <button key={t} onClick={() => { navigate(`/products?q=${t}`); setIsSearchOpen(false); }} className="px-4 py-2 bg-zinc-900 rounded-full text-sm hover:bg-zinc-800">{t}</button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, cart, removeFromCart, updateQuantity } = useStore();
  const navigate = useNavigate();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[100]"
            onClick={closeCart}
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] bg-zinc-950 z-[110] flex flex-col"
          >
            <div className="p-6 flex justify-between items-center border-b border-zinc-900">
              <h2 className="text-xl font-bold tracking-tighter">YOUR CART ({cart.length})</h2>
              <button onClick={closeCart}><X className="w-6 h-6" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-zinc-800" />
                  <p className="text-zinc-500 uppercase tracking-widest text-sm">Your cart is empty</p>
                  <button onClick={() => { closeCart(); navigate('/products'); }} className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs">Shop Now</button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-32 object-cover bg-zinc-900" />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-bold uppercase">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)}><X className="w-4 h-4 text-zinc-500" /></button>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 uppercase">{item.color} / {item.size}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-zinc-800">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 hover:bg-zinc-900">-</button>
                          <span className="px-3 py-1 text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 hover:bg-zinc-900">+</button>
                        </div>
                        <span className="font-bold">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-900 bg-zinc-950 space-y-4">
                <div className="flex justify-between text-sm uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="font-bold">${subtotal}</span>
                </div>
                <p className="text-[10px] text-zinc-500 uppercase">Shipping and taxes calculated at checkout.</p>
                <button 
                  onClick={() => { closeCart(); navigate('/checkout'); }}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  Checkout <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="brand-font text-2xl font-bold tracking-tighter">THRIVE 3</h3>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs uppercase tracking-tighter">
              Defining the future of urban wear. High-quality essentials designed for the concrete jungle.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="#" className="hover:text-white transition-colors uppercase tracking-tight">Returns & Exchanges</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors uppercase tracking-tight">Shipping Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors uppercase tracking-tight">Size Guide</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors uppercase tracking-tight">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><Link to="#" className="hover:text-white transition-colors uppercase tracking-tight">Terms of Service</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors uppercase tracking-tight">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors uppercase tracking-tight">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6">Stay Updated</h4>
            <p className="text-sm text-zinc-500 mb-4 uppercase tracking-tighter">Unlock 10% off your first order.</p>
            <div className="flex">
              <input type="email" placeholder="ENTER EMAIL" className="bg-zinc-900 border border-zinc-800 px-4 py-2 flex-1 outline-none text-sm" />
              <button className="bg-white text-black px-4 py-2 text-xs font-bold uppercase">Join</button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-zinc-900 text-[10px] text-zinc-600 uppercase tracking-widest">
          <p>© 2024 THRIVE 3. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Instagram</span>
            <span>X (Twitter)</span>
            <span>TikTok</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartDrawer />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};
