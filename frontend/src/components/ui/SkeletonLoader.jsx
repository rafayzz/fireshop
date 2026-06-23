// ============================================================
// src/components/ui/SkeletonLoader.jsx
// ============================================================

import clsx from 'clsx';

export function SkeletonLoader({ count = 1, className, variant = 'rect' }) {
  const items = Array.from({ length: count });

  const variants = {
    rect: 'rounded-xl',
    circle: 'rounded-full w-12 h-12',
    text: 'rounded-lg h-4',
  };

  return (
    <>
      {items.map((_, i) => (
        <div
          key={i}
          className={clsx(
            'relative overflow-hidden',
            'bg-gray-100 dark:bg-white/[0.04]',
            variants[variant],
            className
          )}
        >
          <div className="absolute inset-0 shimmer bg-gradient-to-r from-transparent via-gray-200/50 dark:via-white/[0.04] to-transparent" />
        </div>
      ))}
    </>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/[0.06]">
      <SkeletonLoader className="h-56 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <SkeletonLoader className="h-4 w-3/4" />
        <SkeletonLoader className="h-3 w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <SkeletonLoader className="h-6 w-20" />
          <SkeletonLoader className="h-8 w-8 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonLoader;
