// ============================================================
// src/components/home/TrustIndicators.jsx
// ============================================================

import { motion } from 'framer-motion';
import { Truck, Shield, Headphones, RotateCcw } from 'lucide-react';
import { Container } from '../ui/Container';

const indicators = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $100',
    gradient: 'from-blue-500 to-cyan-400',
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    color: 'text-blue-500',
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption',
    gradient: 'from-emerald-500 to-green-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    color: 'text-emerald-500',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer service',
    gradient: 'from-violet-500 to-purple-400',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
    color: 'text-violet-500',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
    gradient: 'from-amber-500 to-orange-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
    color: 'text-amber-500',
  },
];

export function TrustIndicators() {
  return (
    <section className="py-16 sm:py-20 bg-surface-50 dark:bg-surface-950 border-y border-gray-100 dark:border-white/[0.04]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {indicators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-5 bg-white dark:bg-surface-850 rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-white/[0.06] shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={24} className={item.color} strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default TrustIndicators;
