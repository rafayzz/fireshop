// ============================================================
// src/pages/ShopPage.jsx
// ============================================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, SlidersHorizontal, X } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/products/ProductCard';
import { Pagination } from '../components/ui/Pagination';
import { ProductCardSkeleton } from '../components/ui/SkeletonLoader';

const PRODUCTS_PER_PAGE = 12;
const PRICE_RANGE = [0, 5000];

export function ShopPage() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [priceRange, setPriceRange] = useState(PRICE_RANGE);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'popular');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery] = useState(searchParams.get('search') || '');

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProducts([
        { id: 1, name: 'Premium Wireless Headphones', price: 199.99, category: 'Electronics', rating: 4.8, reviews: 245, image: '🎧', discount: 20, originalPrice: 249.99 },
        { id: 2, name: 'Smart Watch Pro', price: 299.99, category: 'Electronics', rating: 4.9, reviews: 189, image: '⌚', discount: 15, originalPrice: 349.99, isNew: true },
        { id: 3, name: 'Professional Camera', price: 1499.99, category: 'Electronics', rating: 4.7, reviews: 156, image: '📷', isTrending: true },
        { id: 4, name: 'Portable Charger', price: 49.99, category: 'Accessories', rating: 4.6, reviews: 512, image: '🔋', discount: 10, originalPrice: 59.99 },
        { id: 5, name: 'Gaming Mouse', price: 79.99, category: 'Electronics', rating: 4.8, reviews: 328, image: '🖱️' },
        { id: 6, name: 'Mechanical Keyboard', price: 149.99, category: 'Electronics', rating: 4.9, reviews: 437, image: '⌨️', isNew: true },
        { id: 7, name: 'USB-C Cable', price: 15.99, category: 'Accessories', rating: 4.5, reviews: 891, image: '🔌' },
        { id: 8, name: 'Phone Stand', price: 24.99, category: 'Accessories', rating: 4.3, reviews: 234, image: '📱', discount: 25, originalPrice: 34.99 },
        { id: 9, name: 'Screen Protector', price: 9.99, category: 'Accessories', rating: 4.2, reviews: 567, image: '🛡️' },
        { id: 10, name: 'Laptop Stand', price: 69.99, category: 'Accessories', rating: 4.7, reviews: 345, image: '💻' },
        { id: 11, name: 'Wireless Mouse', price: 39.99, category: 'Electronics', rating: 4.4, reviews: 612, image: '🖱️', discount: 30, originalPrice: 59.99 },
        { id: 12, name: 'USB Hub', price: 29.99, category: 'Accessories', rating: 4.6, reviews: 423, image: '🔌' },
      ]);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'new': return b.id - a.id;
      default: return b.reviews - a.reviews;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ['Electronics', 'Accessories', 'Fashion', 'Home & Garden'];

  const resetFilters = () => {
    setSelectedCategory('');
    setPriceRange(PRICE_RANGE);
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Filter sidebar content (shared between desktop and mobile)
  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
            className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
              selectedCategory === '' ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04]'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(selectedCategory === cat ? '' : cat); setCurrentPage(1); }}
              className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                selectedCategory === cat ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
          Price Range
        </h3>
        <input
          type="range"
          min="0"
          max="5000"
          step="50"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full accent-primary-500"
        />
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Button variant="outline" fullWidth onClick={resetFilters} size="sm">
        Reset Filters
      </Button>
    </div>
  );

  return (
    <Layout>
      <Container>
        <div className="py-8 lg:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-heading font-bold text-gray-900 dark:text-white mb-2">
              {searchQuery ? `Results for "${searchQuery}"` : 'Shop Our Collection'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Showing {filteredProducts.length} products
            </p>
          </motion.div>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-white/[0.04] rounded-xl p-1">
                <button
                  onClick={() => setGridView(true)}
                  className={`p-2 rounded-lg transition-all ${gridView ? 'bg-white dark:bg-white/[0.1] shadow-sm text-gray-900 dark:text-white' : 'text-gray-400'}`}
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setGridView(false)}
                  className={`p-2 rounded-lg transition-all ${!gridView ? 'bg-white dark:bg-white/[0.1] shadow-sm text-gray-900 dark:text-white' : 'text-gray-400'}`}
                >
                  <List size={16} />
                </button>
              </div>

              {/* Mobile Filter */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden gap-2"
              >
                <SlidersHorizontal size={14} />
                Filters
              </Button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 rounded-xl text-sm border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            >
              <option value="popular">Most Popular</option>
              <option value="new">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <FilterContent />
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className={`grid ${gridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : paginatedProducts.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-6">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                  <Button onClick={resetFilters} variant="outline">Clear Filters</Button>
                </div>
              ) : (
                <>
                  <div className={`grid ${gridView ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                    {paginatedProducts.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 left-0 h-full w-80 max-w-[calc(100vw-3rem)] bg-white dark:bg-surface-900 z-50 lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/[0.06]">
                <span className="font-bold text-gray-900 dark:text-white">Filters</span>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.06]">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default ShopPage;
