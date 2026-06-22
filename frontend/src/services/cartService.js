// ============================================================
// src/services/cartService.js
// ============================================================
// PURPOSE: Manage shopping cart data in Firestore.
//
// ── DESIGN DECISION: Why store cart in Firestore? ────────────
// Option A — localStorage (browser):
//   ✅ Instant (no network delay)
//   ❌ Lost when user clears browser data
//   ❌ Not synced across devices
//
// Option B — Firestore (cloud):
//   ✅ Persists across devices (add on phone, buy on laptop)
//   ✅ Survives browser clears
//   ✅ Can be used for analytics
//   ❌ Slight network delay
//
// We chose Firestore because this is a learning project and
// it demonstrates real-world multi-device cart sync.
//
// FIRESTORE SCHEMA — carts collection:
// ┌─────────────────────────────────────────────────────────┐
// │  carts/                       ← Collection              │
// │    {userId}/                  ← Document (= user's UID) │
// │      items: [                 ← Array of cart items      │
// │        {                                                 │
// │          productId: string,                              │
// │          name:      string,   ← Denormalized for speed   │
// │          price:     number,                              │
// │          imageUrl:  string,                              │
// │          quantity:  number,                              │
// │        }                                                 │
// │      ]                                                   │
// └─────────────────────────────────────────────────────────┘
//
// WHY DENORMALIZE (store name/price in cart)?
//   If we only stored productId, we'd need to fetch each product
//   separately to show the cart. Denormalizing trades a little
//   extra storage for much faster reads.
// ============================================================

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

// ── FETCH CART ────────────────────────────────────────────────
export async function fetchCart(userId) {
  const ref      = doc(db, "carts", userId); // path: carts/{userId}
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return []; // empty cart for new users
  return snapshot.data().items || [];
}

// ── SAVE ENTIRE CART ──────────────────────────────────────────
// We overwrite the whole items array each time.
// This is simpler than updating individual array elements
// and works well for small carts.
async function saveCart(userId, items) {
  const ref = doc(db, "carts", userId);
  // setDoc with the whole document — safe here because we're
  // intentionally replacing the entire cart state
  await setDoc(ref, { items, updatedAt: serverTimestamp() });
}

// ── ADD ITEM TO CART ──────────────────────────────────────────
// If the item already exists, increment quantity.
// Otherwise, add it as a new item.
export async function addToCart(userId, product) {
  const currentItems = await fetchCart(userId);

  // Check if product is already in cart
  const existingIndex = currentItems.findIndex(
    (item) => item.productId === product.id
  );

  if (existingIndex !== -1) {
    // Already in cart — just increase quantity
    currentItems[existingIndex].quantity += 1;
  } else {
    // New item — add with quantity 1
    // We store key product details (denormalization) so we
    // don't have to fetch the product again when showing the cart
    currentItems.push({
      productId: product.id,
      name:      product.name,
      price:     product.price,
      imageUrl:  product.imageUrl,
      quantity:  1,
    });
  }

  await saveCart(userId, currentItems);
  return currentItems;
}

// ── REMOVE ITEM FROM CART ─────────────────────────────────────
export async function removeFromCart(userId, productId) {
  const currentItems = await fetchCart(userId);
  const updated = currentItems.filter((item) => item.productId !== productId);
  await saveCart(userId, updated);
  return updated;
}

// ── UPDATE QUANTITY ───────────────────────────────────────────
// ── FIRESTORE LESSON: updateDoc() ────────────────────────────
// We could use updateDoc() with arrayRemove/arrayUnion for
// array manipulation, but that's complex for beginners.
// Instead we fetch → modify in JS → save back.
// This "read-modify-write" pattern is common and easy to understand.
export async function updateCartItemQuantity(userId, productId, newQuantity) {
  const currentItems = await fetchCart(userId);

  const updated = currentItems.map((item) =>
    item.productId === productId
      ? { ...item, quantity: newQuantity }
      : item
  );

  await saveCart(userId, updated);
  return updated;
}

// ── CLEAR CART (after order placed) ──────────────────────────
export async function clearCart(userId) {
  await saveCart(userId, []);
}

// ── CALCULATE TOTAL ───────────────────────────────────────────
// Pure JS — no Firestore needed for math!
export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
