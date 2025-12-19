
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, ChevronRight, ChevronLeft } from 'lucide-react';
import { MOCK_PRODUCTS } from '../constants';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export const PDP: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useStore();
  
  const product = MOCK_PRODUCTS.find(p => p.slug === slug);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImg, setCurrentImg] = useState(0);

  if (!product) {
    return <div className="py-40 text-center">Product not found</div>;
  }

  // Set initial selected values
  React.useEffect(() => {
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
  }, [product]);

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="min-h-screen bg-zinc-950 pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase tracking-widest mb-8">
          <span className="cursor-pointer hover:text-white" onClick={() => navigate('/')}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="cursor-pointer hover:text-white" onClick={() => navigate('/products')}>Catalog</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={product.images[currentImg]} 
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              <button 
                onClick={() => setCurrentImg((prev) => (prev > 0 ? prev - 1 : product.images.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => setCurrentImg((prev) => (prev < product.images.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-4">
              {product.images.map((img, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setCurrentImg(idx)}
                  className={`aspect-square overflow-hidden bg-zinc-900 border-2 transition-colors ${currentImg === idx ? 'border-white' : 'border-transparent'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <div className="border-b border-zinc-900 pb-8 mb-8">
              <div className="flex justify-between items-start mb-2">
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">{product.category}</span>
                <button onClick={() => toggleWishlist(product.id)}>
                  <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-white text-white' : 'text-zinc-500'}`} />
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase italic italic mb-4">{product.name}</h1>
              <div className="flex items-center gap-4">
                {product.discountPrice ? (
                  <>
                    <span className="text-3xl font-bold">${product.discountPrice}</span>
                    <span className="text-xl text-zinc-500 line-through">${product.price}</span>
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase">
                      {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% Off
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold">${product.price}</span>
                )}
              </div>
            </div>

            <div className="space-y-8 flex-1">
              {/* Color Selector */}
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4">Color: <span className="text-white">{selectedColor}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-xs font-bold uppercase tracking-widest transition-colors ${selectedColor === color ? 'bg-white text-black border-white' : 'border-zinc-800 hover:border-zinc-500'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Size: <span className="text-white">{selectedSize}</span></h3>
                  <button className="text-[10px] text-zinc-500 underline uppercase tracking-widest">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[60px] h-[60px] border flex items-center justify-center text-sm font-bold transition-all ${selectedSize === size ? 'bg-white text-black border-white' : 'border-zinc-800 hover:border-zinc-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button 
                  onClick={() => addToCart(product, selectedSize, selectedColor)}
                  className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button className="w-full py-5 border border-white text-white font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">
                  Buy it Now
                </button>
              </div>

              {/* Product Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
                  <Truck className="w-4 h-4" /> <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
                  <RotateCcw className="w-4 h-4" /> <span>14 Day Returns</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 uppercase tracking-tighter">
                  <ShieldCheck className="w-4 h-4" /> <span>Safe & Secure</span>
                </div>
              </div>

              {/* Details & Description */}
              <div className="pt-8 border-t border-zinc-900 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest">Product Details</h3>
                <p className="text-sm text-zinc-400 leading-relaxed uppercase tracking-tight">{product.description}</p>
                <ul className="list-disc pl-4 text-[10px] text-zinc-500 uppercase space-y-2">
                  <li>Oversized Boxy Fit</li>
                  <li>100% Combed Cotton</li>
                  <li>High-density Screen Print</li>
                  <li>Ethically Manufactured</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/80 backdrop-blur-md border-t border-zinc-900 z-50 lg:hidden">
        <button 
          onClick={() => addToCart(product, selectedSize, selectedColor)}
          className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
        >
          Add to Cart — ${product.discountPrice || product.price}
        </button>
      </div>
    </div>
  );
};
