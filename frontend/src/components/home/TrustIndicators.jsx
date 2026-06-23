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
  },
  {
    icon: Shield,
    title: 'Secure Payment',
    description: '256-bit SSL encryption',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Dedicated customer service',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy',
  },
];

export function TrustIndicators() {
  return (
    <section className="py-12 bg-surface-50 dark:bg-surface-950 border-y border-gray-100 dark:border-white/[0.04]">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {indicators.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 flex items-center justify-center shrink-0">
                  <Icon size={22} className="text-primary-500 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
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
