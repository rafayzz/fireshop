// ============================================================
// src/components/products/ProductCard.jsx
// ============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Star, TrendingUp, Check } from 'lucide-react';
import clsx from 'clsx';
import { Badge } from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function ProductCard({
  product = {
    id: 1,
    name: 'Premium Product',
    price: 99.99,
    originalPrice: 0,
    rating: 4.8,
    reviews: 245,
    image: '🛍️',
    discount: 0,
    isNew: false,
    isTrending: false,
  },
}) {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAddedNotif, setShowAddedNotif] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      return;
    }
    addToCart(product);
    setShowAddedNotif(true);
    setTimeout(() => setShowAddedNotif(false), 2000);
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const { name, price, originalPrice = 0, rating = 4.8, reviews = 0, image = '🛍️', discount = 0, isNew = false, isTrending = false } = product;

  return (
    <Link to={`/products/${product.id}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group cursor-pointer"
      >
        <div className="relative bg-white dark:bg-surface-850 rounded-2xl border border-gray-100 dark:border-white/[0.06] overflow-hidden transition-all duration-300 shadow-card group-hover:shadow-card-hover group-hover:border-gray-200 dark:group-hover:border-white/[0.1]">
          {/* Image Container */}
          <div className="relative h-52 sm:h-60 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-white/[0.02] dark:to-white/[0.01] overflow-hidden">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex gap-2">
              {discount > 0 && (
                <Badge variant="danger" size="sm">-{discount}%</Badge>
              )}
              {isNew && (
                <Badge variant="success" size="sm">New</Badge>
              )}
              {isTrending && (
                <Badge variant="warning" size="sm" className="flex items-center gap-1">
                  <TrendingUp size={10} />
                  Hot
                </Badge>
              )}
            </div>

            {/* Product Image */}
            <motion.div
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full h-full flex items-center justify-center text-6xl select-none"
            >
              {image}
            </motion.div>

            {/* Favorite Button */}
            <motion.button
              onClick={toggleFavorite}
              whileTap={{ scale: 0.9 }}
              className={clsx(
                'absolute top-3 right-3 p-2 rounded-xl backdrop-blur-sm transition-all duration-200 z-20',
                isFavorite
                  ? 'bg-error-50 dark:bg-error-500/20'
                  : 'bg-white/70 dark:bg-white/[0.08] opacity-0 group-hover:opacity-100'
              )}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                size={16}
                className={clsx(
                  'transition-colors',
                  isFavorite ? 'fill-error-500 text-error-500' : 'text-gray-500 dark:text-gray-400'
                )}
              />
            </motion.button>

            {/* Quick Add to Cart */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-3 left-3 right-3 z-10"
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gray-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-gray-900 text-sm font-semibold hover:bg-gray-900 dark:hover:bg-white transition-colors"
                  >
                    {showAddedNotif ? (
                      <>
                        <Check size={16} />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={16} />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-5">
            {/* Name */}
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors mb-2">
              {name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={clsx(
                      i < Math.floor(rating)
                        ? 'fill-warning-400 text-warning-400'
                        : 'text-gray-200 dark:text-gray-700'
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                ({reviews})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${price.toFixed(2)}
              </span>
              {originalPrice > 0 && originalPrice > price && (
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductCard;
