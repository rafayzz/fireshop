// ============================================================
// src/components/home/TestimonialsSection.jsx
// ============================================================

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Container } from '../ui/Container';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Verified Buyer',
    rating: 5,
    text: 'FireShop has completely changed my online shopping experience. The quality is unmatched and delivery is always on time.',
    initial: 'S',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    name: 'Mike Chen',
    role: 'Verified Buyer',
    rating: 5,
    text: 'Outstanding product selection and the customer service team goes above and beyond. This is my go-to store for everything.',
    initial: 'M',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Emma Wilson',
    role: 'Verified Buyer',
    rating: 5,
    text: 'The website is beautifully designed and checkout is seamless. I love the curated collections and personalized recommendations.',
    initial: 'E',
    gradient: 'from-violet-500 to-purple-600',
  },
];

export function TestimonialsSection() {
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
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-surface-50 dark:bg-surface-850 rounded-2xl p-7 border border-gray-100 dark:border-white/[0.06] hover:shadow-card-hover transition-all duration-300"
            >
              {/* Quote decoration */}
              <Quote className="w-8 h-8 text-primary-200 dark:text-primary-500/20 mb-4" />

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
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-sm">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/[0.06]">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-md`}>
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
        </div>
      </Container>
    </section>
  );
}

export default TestimonialsSection;
