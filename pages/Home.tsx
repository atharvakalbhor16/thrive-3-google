
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const featured = MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="container mx-auto px-4 z-10 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-zinc-400 text-xs font-bold uppercase tracking-[0.5em] mb-4"
          >
            Limited Drop 003 / Archive
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-6xl md:text-9xl font-bold tracking-tighter italic mb-8"
          >
            THRIVE <span className="text-outline">STREETS</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link to="/products" className="px-12 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
              Explore Collection
            </Link>
            <Link to="/products?category=Jackets" className="px-12 py-4 border border-white text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
              Shop Outerwear
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-b border-zinc-900 bg-zinc-950">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-900 rounded-lg"><Zap className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Fast Shipping</p>
              <p className="text-[10px] text-zinc-500 uppercase">2-3 Day Delivery Worldwide</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-900 rounded-lg"><Shield className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Secure Payment</p>
              <p className="text-[10px] text-zinc-500 uppercase">100% Secure Checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-zinc-900 rounded-lg"><RefreshCcw className="w-5 h-5" /></div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Easy Returns</p>
              <p className="text-[10px] text-zinc-500 uppercase">14-Day Free Exchange</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Trending Now</span>
            <h2 className="text-4xl font-bold tracking-tighter uppercase italic">Best Sellers</h2>
          </div>
          <Link to="/products" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:underline">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Category Quick Access */}
      <section className="py-20 bg-zinc-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold tracking-tighter uppercase mb-12 italic text-center underline underline-offset-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products?category=T-Shirts" className="group relative h-96 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Tees" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-3xl font-bold uppercase italic tracking-tighter border-b-2 border-white">T-Shirts</span>
              </div>
            </Link>
            <div className="grid grid-rows-2 gap-6">
              <Link to="/products?category=Cargo Pants" className="group relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Bottoms" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-2xl font-bold uppercase italic tracking-tighter">Bottoms</span>
                </div>
              </Link>
              <Link to="/products?category=Jackets" className="group relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Outerwear" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-2xl font-bold uppercase italic tracking-tighter">Outerwear</span>
                </div>
              </Link>
            </div>
            <Link to="/products?category=Accessories" className="group relative h-96 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1511499767390-a7335958beba?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Accs" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-3xl font-bold uppercase italic tracking-tighter">Accessories</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof Placeholder */}
      <section className="py-20 container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold uppercase tracking-[0.3em] mb-12">#THRIVE3COMMUNITY</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="aspect-square bg-zinc-900 overflow-hidden">
              <img src={`https://picsum.photos/seed/insta${i}/500`} className="w-full h-full object-cover hover:opacity-70 transition-opacity" alt="Social" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
