// ============================================================
// src/pages/OrdersPage.jsx
// ============================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, ArrowRight, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { fetchUserOrders } from "../services/orderService";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/Container";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { SkeletonLoader } from "../components/ui/SkeletonLoader";

const STATUS_CONFIG = {
  pending:   { color: 'warning', icon: Clock, label: 'Pending' },
  shipped:   { color: 'primary', icon: Truck, label: 'Shipped' },
  delivered: { color: 'success', icon: CheckCircle, label: 'Delivered' },
  cancelled: { color: 'danger', icon: XCircle, label: 'Cancelled' },
};

export default function OrdersPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserOrders(currentUser.uid)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [currentUser.uid]);

  if (loading) {
    return (
      <Layout>
        <Container size="md">
          <div className="py-12">
            <SkeletonLoader className="h-10 w-48 mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => <SkeletonLoader key={i} className="h-24 w-full rounded-2xl" />)}
            </div>
          </div>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container size="md">
        <div className="py-8 lg:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-heading font-bold text-gray-900 dark:text-white">Order History</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {orders.length === 0 ? 'No orders yet' : `${orders.length} order${orders.length !== 1 ? 's' : ''}`}
            </p>
          </motion.div>

          {orders.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center mb-6">
                <Package size={32} className="text-gray-300 dark:text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders yet</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8">Start shopping to see your orders here.</p>
              <Link to="/shop">
                <Button size="lg" className="gap-2">
                  Start Shopping
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, i) => {
                const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
                const StatusIcon = status.icon;
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/orders/${order.id}`}
                      className="block bg-white dark:bg-surface-850 rounded-2xl border border-gray-100 dark:border-white/[0.06] p-5 hover:shadow-card-hover hover:border-gray-200 dark:hover:border-white/[0.1] transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-white/[0.04] flex items-center justify-center">
                            <Package size={20} className="text-gray-400 dark:text-gray-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                                #{order.id.slice(0, 8)}
                              </p>
                              <Badge variant={status.color} size="sm" className="gap-1">
                                <StatusIcon size={10} />
                                {status.label}
                              </Badge>
                            </div>
                            <p className="font-semibold text-gray-900 dark:text-white mt-1 text-sm">
                              {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                              {order.createdAt?.toDate
                                ? order.createdAt.toDate().toLocaleDateString("en-US", {
                                    year: "numeric", month: "short", day: "numeric"
                                  })
                                : "Just now"}
                            </p>
                          </div>
                        </div>

                        <div className="text-right flex items-center gap-4">
                          <p className="text-lg font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                          <ArrowRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </Layout>
  );
}
