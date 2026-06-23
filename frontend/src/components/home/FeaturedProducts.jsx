// ============================================================
// src/components/home/FeaturedProducts.jsx
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ProductCard } from '../products/ProductCard';
import { ProductCardSkeleton } from '../ui/SkeletonLoader';
import { useState, useEffect } from 'react';

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts([
        { id: 1, name: 'Premium Wireless Headphones', price: 199.99, originalPrice: 249.99, rating: 4.8, reviews: 245, image: '🎧', discount: 20 },
        { id: 2, name: 'Smart Watch Pro', price: 299.99, originalPrice: 349.99, rating: 4.9, reviews: 189, image: '⌚', discount: 15, isNew: true },
        { id: 3, name: 'Professional Camera', price: 1499.99, rating: 4.7, reviews: 156, image: '📷', isTrending: true },
        { id: 4, name: 'Portable Charger', price: 49.99, originalPrice: 59.99, rating: 4.6, reviews: 512, image: '🔋', discount: 10 },
        { id: 5, name: 'Gaming Mouse', price: 79.99, rating: 4.8, reviews: 328, image: '🖱️' },
        { id: 6, name: 'Mechanical Keyboard', price: 149.99, rating: 4.9, reviews: 437, image: '⌨️', isNew: true },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section bg-white dark:bg-surface-900">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="section-label">Featured For You</p>
            <h2 className="text-heading font-bold text-gray-900 dark:text-white">
              Our Best Sellers
            </h2>
          </div>
          <Link to="/shop" className="hidden sm:block">
            <Button variant="ghost" className="gap-2 text-primary-500 dark:text-primary-400">
              View All
              <ArrowRight size={16} />
            </Button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : (
            products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          )}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedProducts;
