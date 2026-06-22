// ============================================================
// src/services/orderService.js
// ============================================================
// PURPOSE: Handle order creation and retrieval.
//
// FIRESTORE SCHEMA — orders collection:
// ┌─────────────────────────────────────────────────────────┐
// │  orders/                      ← Collection              │
// │    {orderId}/                 ← Document (auto-ID)      │
// │      userId:    string        ← who placed the order    │
// │      items:     array         ← snapshot of cart items  │
// │      total:     number        ← total price at checkout  │
// │      status:    string        ← "pending"|"shipped"|…   │
// │      createdAt: timestamp                                │
// └─────────────────────────────────────────────────────────┘
//
// WHY SNAPSHOT ITEMS?
//   We copy item details (name, price) into the order.
//   If a product price changes later, the order still shows
//   what the customer actually paid. This is standard practice.
// ============================================================

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";
import { clearCart } from "./cartService";
import { updateProductStock } from "./productService";

// ── PLACE ORDER ───────────────────────────────────────────────
// Creates an order document and clears the cart.
export async function placeOrder(userId, items, total) {
  // ── FIRESTORE LESSON: addDoc() ───────────────────────────
  // We use addDoc() here (not setDoc) because we don't care
  // what the order ID is — Firestore can generate a unique one.
  // The returned ref contains the new document's auto-generated ID.
  const orderRef = await addDoc(collection(db, "orders"), {
    userId,
    items,           // snapshot of cart at time of purchase
    total,
    status:    "pending",           // initial status
    createdAt: serverTimestamp(),   // server clock
  });

  // Optionally reduce stock for each product ordered
  // (In production you'd do this in a Cloud Function to avoid
  //  race conditions if two people buy the last item at once)
  for (const item of items) {
    // We'd need current stock to subtract — skipping for simplicity
    // In a real app: use Firestore transactions for this
  }

  // Clear the user's cart after successful order
  await clearCart(userId);

  return orderRef.id; // return the new order ID
}

// ── FETCH USER'S ORDERS ───────────────────────────────────────
// ── FIRESTORE LESSON: Filtering with where() ─────────────────
// We use where("userId", "==", userId) to only fetch THIS
// user's orders — not everyone's orders.
//
// WHY IS THIS IMPORTANT FOR SECURITY?
//   Firestore Security Rules enforce this on the server side too.
//   But filtering client-side means we only download what we need.
//
// IMPORTANT: This query requires a Firestore composite index
// because we combine where() + orderBy() on different fields.
// Firestore will throw an error with a link to create the index.
export async function fetchUserOrders(userId) {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),    // only this user's orders
    orderBy("createdAt", "desc")      // newest first
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ── FETCH SINGLE ORDER ────────────────────────────────────────
export async function fetchOrder(orderId) {
  const ref      = doc(db, "orders", orderId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}
