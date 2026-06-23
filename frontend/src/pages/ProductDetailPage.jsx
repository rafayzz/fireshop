// ============================================================
// src/pages/ProductDetailPage.jsx
// ============================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, ShoppingBag, Heart, Shield, Truck, RotateCcw, Check, Package, Minus, Plus } from "lucide-react";
import { fetchProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchProduct(productId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  async function handleAddToCart() {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    await addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  if (loading) {
    return (
      <Layout>
        <Container>
          <div className="py-8 sm:py-12">
            <SkeletonLoader className="h-4 w-32 mb-8 rounded-lg" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <SkeletonLoader className="h-72 sm:h-96 w-full rounded-2xl" />
              <div className="space-y-4">
                <SkeletonLoader className="h-6 w-24 rounded-lg" />
                <SkeletonLoader className="h-10 w-3/4 rounded-lg" />
                <SkeletonLoader className="h-4 w-full rounded-lg" />
                <SkeletonLoader className="h-4 w-2/3 rounded-lg" />
                <SkeletonLoader className="h-12 w-40 mt-4 rounded-xl" />
              </div>
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <Container>
          <div className="text-center py-20 sm:py-24">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center mb-5 sm:mb-6">
              <Package size={28} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">Product Not Found</h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/shop")} variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Back to Shop
            </Button>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <div className="py-6 sm:py-8 lg:py-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6 sm:mb-8 overflow-x-auto"
          >
            <Link to="/" className="hover:text-primary-500 transition-colors shrink-0">Home</Link>
            <span className="shrink-0">/</span>
            <Link to="/shop" className="hover:text-primary-500 transition-colors shrink-0">Shop</Link>
            <span className="shrink-0">/</span>
            <span className="text-gray-900 dark:text-white font-medium truncate">{product.name}</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="lg:sticky lg:top-24 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-white/[0.03] dark:to-white/[0.01] border border-gray-100 dark:border-white/[0.06] overflow-hidden">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 sm:h-80 lg:h-[500px] object-cover"
                  />
                ) : (
                  <div className="w-full h-64 sm:h-80 lg:h-[500px] flex items-center justify-center">
                    <Package size={64} className="text-gray-200 dark:text-gray-700" />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-5 sm:space-y-6"
            >
              {/* Category */}
              {product.category && (
                <Badge variant="primary" size="md">{product.category}</Badge>
              )}

              {/* Name */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-warning-400 text-warning-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">4.8 out of 5</span>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Price */}
              <div className="flex items-end gap-4 pb-5 sm:pb-6 border-b border-gray-100 dark:border-white/[0.06]">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
                {product.stock !== undefined && (
                  <Badge variant={product.stock === 0 ? 'danger' : 'success'} size="md">
                    {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
                  </Badge>
                )}
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center border border-gray-200 dark:border-white/[0.08] rounded-xl self-start">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 sm:px-4 py-3 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 sm:px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white min-w-[2.5rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 sm:px-4 py-3 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  size="lg"
                  className="flex-1 gap-2"
                >
                  {added ? (
                    <><Check size={18} /> Added to Cart</>
                  ) : (
                    <><ShoppingBag size={18} /> Add to Cart</>
                  )}
                </Button>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3.5 rounded-xl border transition-all shrink-0 ${
                    isFavorite
                      ? 'border-error-200 dark:border-error-500/30 text-error-500 bg-error-50 dark:bg-error-500/10'
                      : 'border-gray-200 dark:border-white/[0.08] text-gray-400 hover:text-error-500 hover:border-error-200 dark:hover:border-error-500/30'
                  }`}
                  aria-label="Add to wishlist"
                >
                  <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
                </motion.button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-gray-100 dark:border-white/[0.06]">
                {[
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: Shield, text: 'Secure Payment' },
                  { icon: RotateCcw, text: '30-Day Returns' },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-50 dark:bg-white/[0.04] flex items-center justify-center">
                        <Icon size={18} className="text-gray-400 dark:text-gray-500" />
                      </div>
                      <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
