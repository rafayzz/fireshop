// ============================================================
// src/pages/CartPage.jsx
// ============================================================
// FIRESTORE OPERATIONS: updateDoc (quantity), deleteDoc (remove)
// Cart data comes from CartContext (already fetched from Firestore)
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { placeOrder } from "../services/orderService";

export default function CartPage() {
  const { items, total, loading, removeFromCart, updateQuantity } = useCart();
  const { currentUser } = useAuth();
  const navigate        = useNavigate();
  const [placing, setPlacing] = useState(false);

  async function handlePlaceOrder() {
    if (items.length === 0) return;
    setPlacing(true);

    try {
      // addDoc() → creates order in Firestore → clears cart
      const orderId = await placeOrder(currentUser.uid, items, total);
      navigate(`/orders/${orderId}`);
    } catch (err) {
      alert("Failed to place order: " + err.message);
    } finally {
      setPlacing(false);
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-gray-400">Loading cart…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-gray-500 font-medium">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-brand-500 underline text-sm"
          >
            Browse products
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart items */}
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg shrink-0"
              />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">{item.name}</p>
                <p className="text-brand-600 font-bold mt-1">${item.price.toFixed(2)}</p>

                {/* Quantity controls */}
                {/* updateDoc() is called inside updateQuantity() */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-bold transition-colors"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <span className="font-semibold text-gray-700 text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
                {/* deleteDoc() is called inside removeFromCart() */}
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Order summary */}
          <div className="bg-gray-50 rounded-xl p-5 mt-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-lg border-t pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={placing}
              className="w-full mt-4 bg-brand-500 text-white py-3 rounded-xl font-semibold
                         hover:bg-brand-600 transition-colors disabled:opacity-60"
            >
              {placing ? "Placing order…" : "Place Order"}
            </button>

            <p className="text-xs text-gray-400 text-center mt-2">
              📚 Places order with <code>addDoc()</code> → clears cart
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
