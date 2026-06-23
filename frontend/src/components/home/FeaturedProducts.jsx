// ============================================================
// src/components/home/FeaturedProducts.jsx
// ============================================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { ProductCard } from '../products/ProductCard';
import { ProductCardSkeleton } from '../ui/SkeletonLoader';
import { fetchProducts } from '../../services/productService';

export function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        // Show up to 6 featured products
        setProducts(data.slice(0, 6));
      })
      .catch((err) => {
        console.error('[FeaturedProducts] Error fetching products:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section bg-white dark:bg-surface-900">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <p className="section-label">Featured For You</p>
            <h2 className="text-heading font-bold text-gray-900 dark:text-white">
              Our Best Sellers
            </h2>
          </div>
          <Link to="/shop">
            <Button variant="ghost" className="gap-2 text-primary-500 dark:text-primary-400">
              View All
              <ArrowRight size={16} />
            </Button>
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">No products available yet.</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Check back soon!</p>
            </div>
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
        {products.length > 0 && (
          <div className="mt-8 text-center sm:hidden">
            <Link to="/shop">
              <Button variant="outline" className="gap-2">
                View All Products
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}

export default FeaturedProducts;
