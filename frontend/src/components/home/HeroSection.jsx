// ============================================================
// src/components/home/HeroSection.jsx
// ============================================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Shield, Truck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../../services/productService';

export function HeroSection() {
  const [featuredProduct, setFeaturedProduct] = useState(null);

  useEffect(() => {
    fetchProducts().then((data) => {
      if (data.length > 0) setFeaturedProduct(data[0]);
    }).catch(() => {});
  }, []);

  return (
    <section className="relative min-h-[80vh] sm:min-h-[85vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-surface-50 dark:bg-surface-900">
        <div className="absolute inset-0 bg-mesh-gradient" />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-[20%] w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-primary-500/10 dark:bg-primary-500/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-[10%] w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-secondary-500/8 dark:bg-secondary-500/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-purple-500/5 blur-3xl"
        />
      </div>

      <Container size="lg" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center py-16 sm:py-20 lg:py-0">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 sm:space-y-10 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center lg:justify-start"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 text-sm font-medium text-primary-600 dark:text-primary-400">
                <Sparkles size={14} />
                New Collection 2026
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-display tracking-tight text-gray-900 dark:text-white font-extrabold leading-[1.1]"
            >
              Discover{' '}
              <span className="text-gradient">Premium</span>
              <br className="hidden sm:block" />
              {' '}Products
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              Curated selection of premium products with guaranteed quality, fast shipping, and an exceptional shopping experience you'll love.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <Link to="/shop">
                <Button size="lg" fullWidth className="sm:w-auto gap-2.5 shadow-lg shadow-primary-500/25">
                  Browse Collection
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/shop?sort=newest">
                <Button size="lg" variant="outline" fullWidth className="sm:w-auto gap-2">
                  New Arrivals
                </Button>
              </Link>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-10 border-t border-gray-200 dark:border-white/[0.06]"
            >
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '4.9', label: 'Average Rating' },
                { value: '24/7', label: 'Support' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left px-2 sm:px-3">
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-tight">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Floating Product Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative h-[520px]">
              {/* Main floating card */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 left-8 right-8 bg-white dark:bg-surface-850 rounded-3xl p-8 shadow-elevated border border-gray-100 dark:border-white/[0.06]"
              >
                <div className="flex gap-6">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-500/10 dark:to-primary-400/5 flex items-center justify-center shrink-0 overflow-hidden">
                    {featuredProduct?.imageUrl ? (
                      <img src={featuredProduct.imageUrl} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">🎧</span>
                    )}
                  </div>
                  <div className="py-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                      {featuredProduct?.category || 'Bestseller'}
                    </p>
                    <h3 className="font-bold text-gray-900 dark:text-white mt-1.5 line-clamp-1 text-lg">
                      {featuredProduct?.name || 'Premium Wireless Headphones'}
                    </h3>
                    <div className="flex items-center gap-1 mt-2.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={13} className="fill-warning-400 text-warning-400" />
                      ))}
                      <span className="text-xs text-gray-400 ml-1.5">(245)</span>
                    </div>
                    <p className="text-xl font-bold text-primary-500 mt-3">
                      ${featuredProduct?.price?.toFixed(2) || '199.99'}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Secondary floating card */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-20 left-0 bg-white dark:bg-surface-850 rounded-2xl p-5 shadow-glass border border-gray-100 dark:border-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-success-50 dark:bg-success-500/10 flex items-center justify-center">
                    <Shield size={22} className="text-success-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Secure Payment</p>
                    <p className="text-xs text-gray-500 mt-0.5">256-bit SSL</p>
                  </div>
                </div>
              </motion.div>

              {/* Third floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute bottom-8 right-0 bg-white dark:bg-surface-850 rounded-2xl p-5 shadow-glass border border-gray-100 dark:border-white/[0.06]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center">
                    <Truck size={22} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Free Shipping</p>
                    <p className="text-xs text-gray-500 mt-0.5">On orders $100+</p>
                  </div>
                </div>
              </motion.div>

              {/* Background decoration */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-br from-primary-200/30 to-secondary-200/20 dark:from-primary-500/10 dark:to-secondary-500/5 blur-2xl" />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default HeroSection;
