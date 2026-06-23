// ============================================================
// src/pages/CartPage.jsx
// ============================================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../services/orderService';
import { Layout } from '../components/layout/Layout';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

export function CartPage() {
  const { items, total, loading, removeFromCart, updateQuantity } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [placing, setPlacing] = useState(false);

  const applyCoupon = () => {
    if (couponCode === 'SAVE10') { setDiscount(0.1); setCouponCode(''); }
    else if (couponCode === 'SAVE20') { setDiscount(0.2); setCouponCode(''); }
  };

  const subtotal = total;
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = (subtotal - discountAmount + shipping) * 0.1;
  const finalTotal = subtotal - discountAmount + shipping + tax;

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;
    setPlacing(true);
    try {
      const orderId = await placeOrder(currentUser.uid, items, finalTotal);
      navigate(`/orders/${orderId}`);
    } catch (err) {
      alert('Failed to place order: ' + err.message);
    } finally {
      setPlacing(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <div className="py-12">
            <SkeletonLoader className="h-10 w-48 mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2].map(i => <SkeletonLoader key={i} className="h-28 w-full rounded-2xl" />)}
              </div>
              <SkeletonLoader className="h-80 w-full rounded-2xl" />
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <div className="py-8 lg:py-12">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="text-heading font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {items.length === 0 ? 'Your cart is empty' : `${items.length} item${items.length !== 1 ? 's' : ''} in cart`}
            </p>
          </motion.div>

          {items.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center mb-6">
                <ShoppingBag size={32} className="text-gray-300 dark:text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm mx-auto">
                Looks like you haven't added any products yet. Start shopping to fill it up!
              </p>
              <Link to="/shop">
                <Button size="lg" className="gap-2">
                  Browse Products
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.productId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white dark:bg-surface-850 rounded-2xl border border-gray-100 dark:border-white/[0.06] p-5 flex gap-5 hover:shadow-card-hover transition-shadow"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 rounded-xl bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center shrink-0 overflow-hidden">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <Package size={24} className="text-gray-300 dark:text-gray-600" />
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/products/${item.productId}`}
                          className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-500 dark:hover:text-primary-400 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-primary-500 font-bold mt-1">${item.price.toFixed(2)}</p>

                        {/* Quantity */}
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex items-center border border-gray-200 dark:border-white/[0.08] rounded-xl">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm font-semibold text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="p-1.5 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="flex flex-col items-end justify-between">
                        <span className="text-base font-bold text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeFromCart(item.productId)}
                          className="p-2 rounded-xl text-gray-400 hover:text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 transition-all"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div>
                <div className="sticky top-24 space-y-5">
                  {/* Coupon */}
                  <div className="bg-primary-50 dark:bg-primary-500/5 rounded-2xl p-5 border border-primary-100 dark:border-primary-500/10">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2 text-sm">
                      <Tag size={16} className="text-primary-500" />
                      Have a Coupon?
                    </h4>
                    <div className="flex gap-2">
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Enter code"
                        containerClassName="flex-1"
                      />
                      <Button onClick={applyCoupon} disabled={!couponCode} size="sm">
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Try: SAVE10 or SAVE20</p>
                  </div>

                  {/* Summary */}
                  <div className="bg-white dark:bg-surface-850 rounded-2xl p-6 border border-gray-100 dark:border-white/[0.06] space-y-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Order Summary</h4>

                    <div className="space-y-3 text-sm border-b border-gray-100 dark:border-white/[0.06] pb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                        <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                      </div>
                      {discount > 0 && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex justify-between text-success-500">
                          <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </motion.div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                        <span className="font-medium">{shipping === 0 ? <span className="text-success-500">Free</span> : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Tax (10%)</span>
                        <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span className="text-primary-500">${finalTotal.toFixed(2)}</span>
                    </div>

                    <Button onClick={handlePlaceOrder} loading={placing} disabled={placing} fullWidth size="lg" className="gap-2">
                      Proceed to Checkout
                      <ArrowRight size={18} />
                    </Button>

                    <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
                      Secure checkout · Free returns within 30 days
                    </p>
                  </div>

                  {/* Free Shipping Banner */}
                  {shipping > 0 && (
                    <div className="bg-secondary-50 dark:bg-secondary-500/5 rounded-2xl p-4 border border-secondary-100 dark:border-secondary-500/10">
                      <p className="text-sm text-secondary-700 dark:text-secondary-400">
                        Add <span className="font-bold">${(100 - subtotal).toFixed(2)}</span> more for <span className="font-bold">free shipping</span>
                      </p>
                      <div className="mt-2 h-1.5 bg-secondary-100 dark:bg-secondary-500/10 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-500 rounded-full transition-all" style={{ width: `${Math.min(100, (subtotal / 100) * 100)}%` }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
}

export default CartPage;
