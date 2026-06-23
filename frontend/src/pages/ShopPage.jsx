// ============================================================
// src/pages/ShopPage.jsx
// ============================================================

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, SlidersHorizontal, X, Search } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/products/ProductCard';
import { Pagination } from '../components/ui/Pagination';
import { ProductCardSkeleton } from '../components/ui/SkeletonLoader';
import { fetchProducts, searchProducts } from '../services/productService';

const PRODUCTS_PER_PAGE = 12;

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gridView, setGridView] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  // Fetch products from Firestore
  useEffect(() => {
    setLoading(true);
    const query = searchParams.get('search') || '';

    const fetcher = query
      ? searchProducts(query)
      : fetchProducts();

    fetcher
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error('[ShopPage] Error fetching products:', err);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  // Derive unique categories from real data
  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category).filter(Boolean))];
    return cats.sort();
  }, [products]);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }
    result = result.filter(p => p.price <= maxPrice);

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Already sorted by createdAt desc from Firestore
        break;
    }
    return result;
  }, [products, selectedCategory, maxPrice, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput.trim() });
      setSearchQuery(searchInput.trim());
    } else {
      setSearchParams({});
      setSearchQuery('');
    }
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategory('');
    setMaxPrice(5000);
    setSortBy('newest');
    setCurrentPage(1);
  };

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileFilterOpen]);

  // Filter sidebar content (shared between desktop and mobile)
  const FilterContent = () => (
    <div className="space-y-8">
      {/* Search (mobile only — desktop has Navbar search) */}
      <div className="lg:hidden">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
          Search
        </h3>
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-gray-100 dark:bg-white/[0.04] border border-transparent focus:border-primary-500/30 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all"
            />
          </div>
        </form>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
          Categories
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => { setSelectedCategory(''); setCurrentPage(1); }}
            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
              selectedCategory === ''
                ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04]'
            }`}
          >
            All Products
            <span className="ml-1 text-xs text-gray-400">({products.length})</span>
          </button>
          {categories.map(cat => {
            const count = products.filter(p => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(selectedCategory === cat ? '' : cat);
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04]'
                }`}
              >
                {cat}
                <span className="ml-1 text-xs text-gray-400">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
          Max Price
        </h3>
        <input
          type="range"
          min="0"
          max="5000"
          step="10"
          value={maxPrice}
          onChange={(e) => { setMaxPrice(parseInt(e.target.value)); setCurrentPage(1); }}
          className="w-full accent-primary-500"
        />
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>$0</span>
          <span className="font-medium text-gray-900 dark:text-white">${maxPrice}</span>
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
        <div className="py-6 sm:py-8 lg:py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-heading font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
              {searchQuery ? `Results for "${searchQuery}"` : 'Shop Our Collection'}
            </h1>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              {loading ? 'Loading products...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
            </p>
          </motion.div>

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100 dark:border-white/[0.06]">
            <div className="flex items-center gap-2">
              {/* View Toggle */}
              <div className="hidden sm:flex items-center bg-gray-100 dark:bg-white/[0.04] rounded-xl p-1">
                <button
                  onClick={() => setGridView(true)}
                  className={`p-2 rounded-lg transition-all ${gridView ? 'bg-white dark:bg-white/[0.1] shadow-sm text-gray-900 dark:text-white' : 'text-gray-400'}`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  onClick={() => setGridView(false)}
                  className={`p-2 rounded-lg transition-all ${!gridView ? 'bg-white dark:bg-white/[0.1] shadow-sm text-gray-900 dark:text-white' : 'text-gray-400'}`}
                  aria-label="List view"
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
                {(selectedCategory || maxPrice < 5000) && (
                  <span className="w-2 h-2 rounded-full bg-primary-500" />
                )}
              </Button>
            </div>

            {/* Desktop Search Form */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 flex-1 max-w-xs ml-4">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-gray-100/70 dark:bg-white/[0.04] border border-transparent focus:border-primary-500/30 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all"
                />
              </div>
            </form>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
              className="px-3 sm:px-4 py-2 rounded-xl text-sm border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.04] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-10">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <FilterContent />
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {loading ? (
                <div className={`grid ${gridView ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-5 sm:gap-6`}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : paginatedProducts.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 sm:py-20"
                >
                  <div className="text-5xl sm:text-6xl mb-5 sm:mb-6">🔍</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                  <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                  <Button onClick={resetFilters} variant="outline">Clear Filters</Button>
                </motion.div>
              ) : (
                <>
                  <div className={`grid ${gridView ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-5 sm:gap-6`}>
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
                    <div className="mt-10 sm:mt-12 flex justify-center">
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
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
                  aria-label="Close filters"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <FilterContent />
              </div>
              <div className="p-4 border-t border-gray-100 dark:border-white/[0.06]">
                <Button fullWidth onClick={() => setIsMobileFilterOpen(false)}>
                  Show {filteredProducts.length} Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default ShopPage;
