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
    text: 'FireShop has completely changed my online shopping experience. The quality is unmatched and delivery is always on time!',
    initial: 'S',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Mike Chen',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Outstanding product selection and the customer service team goes above and beyond. My go-to store for everything.',
    initial: 'M',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Emma Wilson',
    role: 'Verified Buyer',
    rating: 5,
    text: 'The website is beautifully designed and checkout is seamless. I love the curated collections and recommendations.',
    initial: 'E',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'James Rodriguez',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Best online store I\'ve used in years. Premium packaging, fast shipping, and products exactly as described.',
    initial: 'J',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Aisha Patel',
    role: 'Verified Buyer',
    rating: 5,
    text: 'I appreciate the attention to detail — from product photography to the delivery experience. Sets the standard!',
    initial: 'A',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'David Kim',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Incredible quality at fair prices. The customer support resolved my query in minutes. Will keep coming back!',
    initial: 'D',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

// How many cards to show per page at each breakpoint
// We show 3 on desktop, but render all in a sliding window
const CARDS_PER_PAGE = 3;

export function TestimonialsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalPages = Math.ceil(testimonials.length / CARDS_PER_PAGE);

  const paginate = useCallback((dir) => {
    setCurrentPage((prev) => (prev + dir + totalPages) % totalPages);
  }, [totalPages]);

  // Auto-advance
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  // Current visible testimonials (3 per page)
  const startIdx = currentPage * CARDS_PER_PAGE;
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + CARDS_PER_PAGE);

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

        {/* Testimonials Grid — 3 visible at a time */}
        <div
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
            >
              {visibleTestimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="relative bg-surface-50 dark:bg-surface-850 rounded-2xl p-7 sm:p-8 border border-gray-100 dark:border-white/[0.06] hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Quote decoration */}
                  <Quote className="w-9 h-9 text-primary-200 dark:text-primary-500/20 mb-5" strokeWidth={1.5} />

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        className={j < testimonial.rating ? 'fill-warning-400 text-warning-400' : 'text-gray-200 dark:text-gray-700'}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-7 text-sm sm:text-base">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100 dark:border-white/[0.06]">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-white text-sm font-bold">{testimonial.initial}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 sm:mt-10">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === currentPage
                      ? 'w-8 h-2.5 bg-primary-500'
                      : 'w-2.5 h-2.5 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20'
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(-1)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all"
                aria-label="Previous"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => paginate(1)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/[0.06] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/[0.1] hover:text-gray-900 dark:hover:text-white transition-all"
                aria-label="Next"
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
