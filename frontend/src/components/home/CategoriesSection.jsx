// ============================================================
// src/components/home/CategoriesSection.jsx
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Smartphone, Shirt, Home, Dumbbell, BookOpen, Gamepad2 } from 'lucide-react';
import { Container } from '../ui/Container';

const categories = [
  { id: 1, name: 'Electronics', icon: Smartphone, gradient: 'from-blue-500 to-indigo-600' },
  { id: 2, name: 'Fashion', icon: Shirt, gradient: 'from-pink-500 to-rose-600' },
  { id: 3, name: 'Home & Garden', icon: Home, gradient: 'from-emerald-500 to-teal-600' },
  { id: 4, name: 'Sports', icon: Dumbbell, gradient: 'from-amber-500 to-orange-600' },
  { id: 5, name: 'Books', icon: BookOpen, gradient: 'from-violet-500 to-purple-600' },
  { id: 6, name: 'Gaming', icon: Gamepad2, gradient: 'from-red-500 to-rose-600' },
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
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={`/shop?category=${category.id}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="group relative bg-white dark:bg-surface-850 rounded-2xl p-6 text-center border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300"
                  >
                    {/* Icon Container */}
                    <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>

                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                      {category.name}
                    </h3>
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
