// ============================================================
// src/components/home/CategoriesSection.jsx
// ============================================================

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Container } from '../ui/Container';

const categories = [
  {
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
    count: '5 Products',
  },
  {
    name: 'Clothing',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
    count: '4 Products',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    count: '3 Products',
  },
  {
    name: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    count: '3 Products',
  },
  {
    name: 'Fitness',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80',
    count: '3 Products',
  },
  {
    name: 'Audio',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',
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
          {categories.map((category, i) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link to={`/shop?category=${encodeURIComponent(category.name)}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group relative bg-white dark:bg-surface-850 rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  </div>

                  {/* Text overlay on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                    <h3 className="font-bold text-white text-sm sm:text-base drop-shadow-lg">
                      {category.name}
                    </h3>
                    <p className="text-xs text-white/70 mt-0.5 drop-shadow">
                      {category.count}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CategoriesSection;
