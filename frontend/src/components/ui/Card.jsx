// ============================================================
// src/components/ui/Card.jsx
// ============================================================

import clsx from 'clsx';
import { motion } from 'framer-motion';

export function Card({
  children,
  className,
  hoverable = false,
  glass = false,
  ...props
}) {
  const Wrapper = hoverable ? motion.div : 'div';
  const wrapperProps = hoverable ? {
    whileHover: { y: -6 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  } : {};

  return (
    <Wrapper {...wrapperProps}>
      <div
        className={clsx(
          'rounded-2xl transition-all duration-300',
          glass
            ? 'glass-card'
            : 'bg-white dark:bg-surface-850 border border-gray-100 dark:border-white/[0.06]',
          hoverable && 'shadow-card hover:shadow-card-hover hover:border-gray-200 dark:hover:border-white/[0.1] cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </Wrapper>
  );
}

export default Card;
