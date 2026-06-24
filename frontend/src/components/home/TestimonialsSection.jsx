// ============================================================
// src/components/home/TestimonialsSection.jsx
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../ui/Container';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    rating: 5,
    text: 'FireShop has completely changed my online shopping experience. The quality is unmatched and delivery is always on time. I couldn\'t be happier with every single purchase!',
    initial: 'S',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Mike Chen',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Outstanding product selection and the customer service team goes above and beyond. This is my go-to store for everything from electronics to kitchen essentials.',
    initial: 'M',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Emma Wilson',
    role: 'Verified Buyer',
    rating: 5,
    text: 'The website is beautifully designed and checkout is seamless. I love the curated collections and how easy it is to find exactly what I need.',
    initial: 'E',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'James Rodriguez',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Best online store I\'ve used in years. The packaging is premium, shipping is fast, and the products are exactly as described. Highly recommended!',
    initial: 'J',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Aisha Patel',
    role: 'Verified Buyer',
    rating: 5,
    text: 'I appreciate the attention to detail — from the product photography to the delivery experience. FireShop sets the standard for modern eCommerce.',
    initial: 'A',
    gradient: 'from-amber-500 to-orange-600',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

export function TestimonialsSection() {
  const [[currentIndex, direction], setSlide] = useState([0, 0]);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection) => {
    setSlide(([prev]) => {
      const next = (prev + newDirection + testimonials.length) % testimonials.length;
      return [next, newDirection];
    });
  }, []);

  // Auto-advance slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  const current = testimonials[currentIndex];

  return (
    <section className="section bg-white dark:bg-surface-900">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <p className="section-label">Customer Reviews</p>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Trusted by thousands of happy customers worldwide
          </p>
        </motion.div>

        {/* Slider */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-3xl bg-surface-50 dark:bg-surface-850 border border-gray-100 dark:border-white/[0.06] shadow-card min-h-[280px] sm:min-h-[260px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="p-8 sm:p-10 lg:p-12"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-primary-200 dark:text-primary-500/20 mb-6" strokeWidth={1.5} />

                {/* Rating */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className={j < current.rating ? 'fill-warning-400 text-warning-400' : 'text-gray-200 dark:text-gray-700'}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base sm:text-lg mb-8">
                  "{current.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${current.gradient} flex items-center justify-center shadow-lg`}>
                    <span className="text-white text-sm font-bold">{current.initial}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {current.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {current.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide([i, i > currentIndex ? 1 : -1])}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentIndex
                      ? 'w-8 h-2.5 bg-primary-500'
                      : 'w-2.5 h-2.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
