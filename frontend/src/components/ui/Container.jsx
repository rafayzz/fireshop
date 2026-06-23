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
    <div className={clsx('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}

export default Container;
