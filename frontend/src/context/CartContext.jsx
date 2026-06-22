// ============================================================
// src/context/CartContext.jsx
// ============================================================
// PURPOSE: Share cart state across the app (Navbar badge,
//          Cart page, Product page add-to-cart button).
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  fetchCart,
  addToCart as addToCartService,
  removeFromCart as removeFromCartService,
  updateCartItemQuantity as updateQtyService,
  calculateTotal,
} from "../services/cartService";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart whenever user logs in/out
  useEffect(() => {
    console.debug("[CartContext] User changed", {
      isUserLoggedIn: !!currentUser,
      uid: currentUser?.uid || null,
    });

    if (currentUser) {
      setLoading(true);
      console.debug("[CartContext] Fetching cart for UID:", currentUser.uid);
      fetchCart(currentUser.uid)
        .then((cartItems) => {
          console.debug("[CartContext] Cart fetched successfully", {
            itemCount: cartItems.length,
            total: cartItems.reduce((sum, item) => sum + item.quantity, 0),
          });
          setItems(cartItems);
        })
        .catch((error) => {
          console.error("[CartContext] Error fetching cart:", error);
        })
        .finally(() => setLoading(false));
    } else {
      console.debug("[CartContext] User logged out, clearing cart");
      setItems([]); // clear cart when logged out
    }
  }, [currentUser]);

  async function addToCart(product) {
    if (!currentUser) return;
    const updated = await addToCartService(currentUser.uid, product);
    setItems(updated);
  }

  async function removeFromCart(productId) {
    if (!currentUser) return;
    const updated = await removeFromCartService(currentUser.uid, productId);
    setItems(updated);
  }

  async function updateQuantity(productId, newQty) {
    if (!currentUser) return;
    if (newQty < 1) {
      await removeFromCart(productId);
      return;
    }
    const updated = await updateQtyService(currentUser.uid, productId, newQty);
    setItems(updated);
  }

  const total      = calculateTotal(items);
  const itemCount  = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, total, itemCount, loading, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
