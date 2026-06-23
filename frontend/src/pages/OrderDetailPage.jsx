// ============================================================
// src/pages/OrderDetailPage.jsx
// ============================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Package, Clock, Truck, CheckCircle, XCircle } from "lucide-react";
import { fetchOrder } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
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

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(orderId).then((data) => {
      if (data && data.userId === currentUser.uid) {
        setOrder(data);
      }
      setLoading(false);
    });
  }, [orderId, currentUser.uid]);

  if (loading) {
    return (
      <Layout>
        <Container size="sm">
          <div className="py-12 space-y-4">
            <SkeletonLoader className="h-6 w-32" />
            <SkeletonLoader className="h-48 w-full rounded-2xl" />
          </div>
        </Container>
      </Layout>
    );
  }

  if (!order) {
    return (
      <Layout>
        <Container size="sm">
          <div className="text-center py-24">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-100 dark:bg-white/[0.04] flex items-center justify-center mb-6">
              <Package size={32} className="text-gray-300 dark:text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Order not found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">This order doesn't exist or you don't have access.</p>
            <Button onClick={() => navigate("/orders")} variant="outline" className="gap-2">
              <ArrowLeft size={16} />
              Back to Orders
            </Button>
          </div>
        </Container>
      </Layout>
    );
  }

  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const StatusIcon = status.icon;

  return (
    <Layout>
      <Container size="sm">
        <div className="py-8 lg:py-12">
          {/* Back button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <button
              onClick={() => navigate("/orders")}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to orders
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-surface-850 rounded-2xl border border-gray-100 dark:border-white/[0.06] overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-white/[0.06]">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">Order Details</h1>
                  <p className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-1">#{order.id}</p>
                  {order.createdAt?.toDate && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {order.createdAt.toDate().toLocaleDateString("en-US", {
                        year: "numeric", month: "long", day: "numeric"
                      })}
                    </p>
                  )}
                </div>
                <Badge variant={status.color} size="md" className="gap-1.5">
                  <StatusIcon size={14} />
                  {status.label}
                </Badge>
              </div>
            </div>

            {/* Items */}
            <div className="p-6 space-y-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-white/[0.03] flex items-center justify-center overflow-hidden shrink-0">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package size={18} className="text-gray-300 dark:text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-sm text-gray-900 dark:text-white">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="p-6 border-t border-gray-100 dark:border-white/[0.06] bg-gray-50 dark:bg-white/[0.02]">
              <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white">
                <span>Total</span>
                <span className="text-primary-500">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Layout>
  );
}
