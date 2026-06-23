// ============================================================
// src/components/ui/Input.jsx
// ============================================================

import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export function Input({
  label,
  error,
  icon: Icon,
  type = 'text',
  className,
  containerClassName,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={clsx('w-full', containerClassName)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
            <Icon size={18} />
          </div>
        )}

        <input
          type={inputType}
          className={clsx(
            'w-full px-4 py-2.5 rounded-xl text-sm',
            'bg-white dark:bg-white/[0.04]',
            'border border-gray-200 dark:border-white/[0.08]',
            'text-gray-900 dark:text-white',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'transition-all duration-250',
            'focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20',
            'dark:focus:border-primary-400 dark:focus:ring-primary-400/20',
            'hover:border-gray-300 dark:hover:border-white/[0.12]',
            Icon && 'pl-11',
            isPassword && 'pr-11',
            error && 'border-error-500 focus:border-error-500 focus:ring-error-500/20',
            className
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-sm text-error-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default Input;
