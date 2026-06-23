// ============================================================
// src/components/ui/Badge.jsx
// ============================================================

import clsx from 'clsx';

export function Badge({ children, variant = 'primary', size = 'md', className }) {
  const variants = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-500/15 dark:text-primary-300',
    success: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400',
    warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400',
    danger: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400',
    gray: 'bg-gray-100 text-gray-700 dark:bg-white/[0.06] dark:text-gray-300',
    outline: 'border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 bg-transparent',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs font-medium',
    md: 'px-2.5 py-1 text-xs font-semibold',
    lg: 'px-3.5 py-1.5 text-sm font-semibold',
  };

  return (
    <span className={clsx('inline-flex items-center rounded-full', variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}

export default Badge;
