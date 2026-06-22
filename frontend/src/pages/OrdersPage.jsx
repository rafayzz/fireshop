// ============================================================
// src/pages/OrdersPage.jsx
// ============================================================
// FIRESTORE: getDocs() with where() + orderBy()
// Fetches only THIS user's orders.
// ============================================================

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchUserOrders } from "../services/orderService";

const STATUS_COLORS = {
  pending:   "bg-yellow-100 text-yellow-700",
  shipped:   "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrdersPage() {
  const { currentUser } = useAuth();
  const [orders, setOrders]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // getDocs() with where("userId", "==", uid) + orderBy("createdAt", "desc")
    fetchUserOrders(currentUser.uid)
      .then(setOrders)
      .finally(() => setLoading(false));
  }, [currentUser.uid]);

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading orders…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📦</p>
          <p className="text-gray-500">No orders yet</p>
          <Link to="/" className="mt-4 inline-block text-brand-500 underline text-sm">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="block bg-white border border-gray-100 rounded-xl p-5 shadow-sm
                         hover:shadow-md hover:border-brand-200 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-400 font-mono">#{order.id.slice(0, 8)}…</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleDateString("en-US", {
                          year: "numeric", month: "short", day: "numeric"
                        })
                      : "Just now"}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      STATUS_COLORS[order.status] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="font-bold text-gray-900 mt-2">${order.total.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
