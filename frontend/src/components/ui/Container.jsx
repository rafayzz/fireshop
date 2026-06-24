// ============================================================
// src/components/ui/Container.jsx
// ============================================================

import clsx from 'clsx';

export function Container({ children, className, size = 'lg' }) {
  const sizes = {
    xs: 'max-w-lg',
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    full: 'max-w-full',
  };

  return (
    <div className={clsx('mx-auto px-6 sm:px-8 lg:px-12 xl:px-16', sizes[size], className)}>
      {children}
    </div>
  );
}

export default Container;
