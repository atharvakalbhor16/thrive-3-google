
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../constants';
import { ProductCard } from '../components/ProductCard';
import { SortOption } from '../types';

export const PLP: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.NEW_ARRIVALS);

  const activeCategory = searchParams.get('category');
  const searchQuery = searchParams.get('q');

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];
    if (activeCategory) {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchQuery) {
      result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.includes(searchQuery.toLowerCase())));
    }

    // Apply Sorting
    switch (sortBy) {
      case SortOption.PRICE_LOW_HIGH:
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case SortOption.PRICE_HIGH_LOW:
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      default:
        // Already sorted by 'id' which acts as arrival sequence here
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-zinc-950 pt-10 pb-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold tracking-tighter uppercase italic italic">
            {activeCategory || (searchQuery ? `Results for "${searchQuery}"` : 'Everything')}
          </h1>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mt-2">{filteredProducts.length} Products Found</p>
        </div>

        {/* Filters & Sorting Bar */}
        <div className="sticky top-[73px] z-40 bg-zinc-950 py-4 border-b border-zinc-900 flex justify-between items-center mb-10">
          <div className="flex gap-4">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 border border-zinc-800 hover:border-white transition-colors"
            >
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-500 uppercase font-bold hidden sm:block">Sort By</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent border border-zinc-800 text-xs font-bold uppercase tracking-widest px-4 py-2 outline-none focus:border-white transition-colors"
            >
              <option value={SortOption.NEW_ARRIVALS} className="bg-zinc-950">New Arrivals</option>
              <option value={SortOption.POPULARITY} className="bg-zinc-950">Popularity</option>
              <option value={SortOption.PRICE_LOW_HIGH} className="bg-zinc-950">Price: Low to High</option>
              <option value={SortOption.PRICE_HIGH_LOW} className="bg-zinc-950">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop Filter Sidebar */}
          {isFilterOpen && (
            <aside className="w-64 hidden lg:block space-y-10">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Categories</h3>
                <div className="flex flex-col space-y-3">
                  <button onClick={() => setSearchParams({})} className={`text-left text-sm hover:text-white transition-colors uppercase ${!activeCategory ? 'text-white font-bold' : 'text-zinc-500'}`}>All Products</button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat} 
                      onClick={() => setSearchParams({ category: cat })}
                      className={`text-left text-sm hover:text-white transition-colors uppercase ${activeCategory === cat ? 'text-white font-bold' : 'text-zinc-500'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest mb-6">Price Range</h3>
                <div className="space-y-4">
                  <input type="range" className="w-full accent-white" />
                  <div className="flex justify-between text-xs text-zinc-500 font-bold uppercase">
                    <span>$0</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <p className="text-zinc-500 uppercase tracking-widest">No products found matching your criteria.</p>
                <button onClick={() => setSearchParams({})} className="mt-4 underline text-sm uppercase">Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
