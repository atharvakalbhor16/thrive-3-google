
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        <Link to={`/product/${product.slug}`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.discountPrice && (
            <span className="bg-white text-black text-[10px] font-bold px-2 py-1 uppercase">Sale</span>
          )}
          {product.stockStatus === 'Low Stock' && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase">Low Stock</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition-colors z-10"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white text-white' : 'text-white'}`} />
        </button>

        {/* Quick Add (Desktop) */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, product.sizes[0], product.colors[0]);
            }}
            className="w-full bg-white text-black py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
          >
            <ShoppingBag className="w-3 h-3" /> Quick Add
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.slug}`} className="text-xs font-bold uppercase tracking-tighter group-hover:underline">
            {product.name}
          </Link>
          <div className="text-xs font-bold">
            {product.discountPrice ? (
              <div className="flex gap-2">
                <span className="text-zinc-500 line-through">${product.price}</span>
                <span className="text-white">${product.discountPrice}</span>
              </div>
            ) : (
              <span>${product.price}</span>
            )}
          </div>
        </div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{product.category}</p>
      </div>
    </motion.div>
  );
};
