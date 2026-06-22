// ============================================================
// src/pages/OrderDetailPage.jsx
// ============================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrder } from "../services/orderService";
import { useAuth } from "../context/AuthContext";

export default function OrderDetailPage() {
  const { orderId }    = useParams();
  const navigate       = useNavigate();
  const { currentUser }= useAuth();
  const [order, setOrder]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(orderId).then((data) => {
      // Security: only show this order if it belongs to the current user
      if (data && data.userId === currentUser.uid) {
        setOrder(data);
      }
      setLoading(false);
    });
  }, [orderId, currentUser.uid]);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading…</div>;

  if (!order) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Order not found.</p>
        <button onClick={() => navigate("/orders")} className="mt-4 text-brand-500 underline">
          Back to orders
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate("/orders")}
        className="text-gray-400 hover:text-gray-700 text-sm mb-6"
      >
        ← Back to orders
      </button>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order Details</h1>
            <p className="text-xs text-gray-400 font-mono mt-1">#{order.id}</p>
          </div>
          <span className="text-sm font-medium bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
            {order.status}
          </span>
        </div>

        {/* Items */}
        <div className="space-y-3 mb-6">
          {order.items.map((item) => (
            <div key={item.productId} className="flex gap-3 items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t pt-4 flex justify-between font-bold text-gray-900">
          <span>Total</span>
          <span>${order.total.toFixed(2)}</span>
        </div>

        <p className="text-xs text-gray-300 mt-4 text-center">
          📚 Fetched with <code>getDoc(db, "orders", "{orderId}")</code>
        </p>
      </div>
    </div>
  );
}
