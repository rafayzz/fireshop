// ============================================================
// src/components/home/CategoriesSection.jsx
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Cpu, Shirt, Watch, UtensilsCrossed, Dumbbell, Headphones,
} from 'lucide-react';
import { Container } from '../ui/Container';

const categories = [
  {
    name: 'Electronics',
    icon: Cpu,
    gradient: 'from-indigo-500 via-blue-500 to-cyan-400',
    shadow: 'shadow-blue-500/25',
    count: '5 Products',
  },
  {
    name: 'Clothing',
    icon: Shirt,
    gradient: 'from-pink-500 via-rose-500 to-fuchsia-400',
    shadow: 'shadow-pink-500/25',
    count: '4 Products',
  },
  {
    name: 'Accessories',
    icon: Watch,
    gradient: 'from-amber-500 via-orange-500 to-yellow-400',
    shadow: 'shadow-amber-500/25',
    count: '3 Products',
  },
  {
    name: 'Kitchen',
    icon: UtensilsCrossed,
    gradient: 'from-emerald-500 via-green-500 to-teal-400',
    shadow: 'shadow-emerald-500/25',
    count: '3 Products',
  },
  {
    name: 'Fitness',
    icon: Dumbbell,
    gradient: 'from-violet-500 via-purple-500 to-indigo-400',
    shadow: 'shadow-violet-500/25',
    count: '3 Products',
  },
  {
    name: 'Audio',
    icon: Headphones,
    gradient: 'from-red-500 via-rose-500 to-pink-400',
    shadow: 'shadow-red-500/25',
    count: '2 Products',
  },
];

export function CategoriesSection() {
  return (
    <section className="section bg-surface-50 dark:bg-surface-950">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <p className="section-label">Shop by Category</p>
          <h2 className="section-title">Explore Our Collections</h2>
          <p className="section-description">
            Find exactly what you're looking for in our curated categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 lg:gap-6">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link to={`/shop?category=${encodeURIComponent(category.name)}`}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group relative bg-white dark:bg-surface-850 rounded-2xl p-6 sm:p-7 text-center border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient glow behind icon on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-500`} />

                    {/* Icon Container */}
                    <div className={`relative w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} ${category.shadow} shadow-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <Icon size={26} className="text-white" strokeWidth={1.8} />
                    </div>

                    <h3 className="relative font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors mb-1">
                      {category.name}
                    </h3>

                    <p className="relative text-xs text-gray-400 dark:text-gray-500">
                      {category.count}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default CategoriesSection;
