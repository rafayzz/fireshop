// ============================================================
// src/components/products/ProductCard.jsx
// ============================================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Star, TrendingUp, Check, Package } from 'lucide-react';
import clsx from 'clsx';
import { Badge } from '../ui/Badge';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showAddedNotif, setShowAddedNotif] = useState(false);

  if (!product) return null;

  const {
    id,
    name = 'Product',
    price = 0,
    originalPrice,
    rating,
    reviews,
    imageUrl,
    image,
    category,
    stock,
    discount,
    isNew = false,
    isTrending = false,
  } = product;

  // Calculate discount percentage from original price if not provided
  const discountPercent = discount || (originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      navigate('/login');
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

  // Display image: prefer imageUrl from Firestore, fall back to emoji, then icon
  const renderImage = () => {
    if (imageUrl) {
      return (
        <motion.img
          src={imageUrl}
          alt={name}
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      );
    }
    if (image) {
      return (
        <motion.div
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full h-full flex items-center justify-center text-6xl select-none"
        >
          {image}
        </motion.div>
      );
    }
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Package size={48} className="text-gray-200 dark:text-gray-700" />
      </div>
    );
  };

  return (
    <Link to={`/products/${id}`}>
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group cursor-pointer h-full"
      >
        <div className="relative bg-white dark:bg-surface-850 rounded-2xl border border-gray-100 dark:border-white/[0.06] overflow-hidden transition-all duration-300 shadow-card group-hover:shadow-card-hover group-hover:border-gray-200 dark:group-hover:border-white/[0.1] h-full flex flex-col">
          {/* Image Container */}
          <div className="relative h-48 sm:h-56 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-white/[0.02] dark:to-white/[0.01] overflow-hidden">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5">
              {discountPercent > 0 && (
                <Badge variant="danger" size="sm">-{discountPercent}%</Badge>
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
              {stock !== undefined && stock === 0 && (
                <Badge variant="gray" size="sm">Sold Out</Badge>
              )}
            </div>

            {/* Product Image */}
            {renderImage()}

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
              {isHovered && stock !== 0 && (
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
          <div className="p-4 sm:p-5 flex-1 flex flex-col">
            {/* Category */}
            {category && (
              <p className="text-xs font-medium text-primary-500 dark:text-primary-400 mb-1.5 uppercase tracking-wider">
                {category}
              </p>
            )}

            {/* Name */}
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors mb-2 flex-1">
              {name}
            </h3>

            {/* Rating */}
            {rating !== undefined && (
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
                {reviews !== undefined && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    ({reviews})
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-auto">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${typeof price === 'number' ? price.toFixed(2) : price}
              </span>
              {originalPrice && originalPrice > price && (
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
