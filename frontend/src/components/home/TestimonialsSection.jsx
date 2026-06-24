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

// Duplicate the array to create a seamless infinite loop
const infiniteTestimonials = [...testimonials, ...testimonials];

export function TestimonialsSection() {
  return (
    <section className="section bg-white dark:bg-surface-900 overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header relative z-10"
        >
          <p className="section-label">Customer Reviews</p>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-description">
            Trusted by thousands of happy customers worldwide
          </p>
        </motion.div>
      </Container>

      {/* Infinite Marquee Slider */}
      <div className="relative mt-8 sm:mt-12 flex overflow-hidden group">
        {/* Left and Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-white dark:from-surface-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-white dark:from-surface-900 to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex gap-6 sm:gap-8 w-max animate-marquee hover:[animation-play-state:paused] px-4">
          {infiniteTestimonials.map((testimonial, i) => (
            <div
              key={`${testimonial.name}-${i}`}
              className="w-[320px] sm:w-[380px] lg:w-[420px] shrink-0 bg-surface-50 dark:bg-surface-850 rounded-2xl p-7 sm:p-8 border border-gray-100 dark:border-white/[0.06] hover:shadow-card-hover transition-all duration-300 relative group-hover:opacity-60 hover:!opacity-100"
            >
              {/* Quote */}
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
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
