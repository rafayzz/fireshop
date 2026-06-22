// ============================================================
// src/services/productService.js
// ============================================================
// PURPOSE: All Firestore operations for the "products" collection.
//
// FIRESTORE SCHEMA — products collection:
// ┌─────────────────────────────────────────────────────────┐
// │  products/                    ← Collection               │
// │    {productId}/               ← Document (auto-ID)       │
// │      name:        string                                 │
// │      description: string                                 │
// │      price:       number  (in USD)                       │
// │      imageUrl:    string  (URL to product image)         │
// │      category:    string  ("Electronics", "Clothing"…)   │
// │      stock:       number  (units available)              │
// │      createdAt:   timestamp                              │
// └─────────────────────────────────────────────────────────┘
// ============================================================

import {
  collection,   // reference to a collection
  doc,          // reference to a specific document
  addDoc,       // add document with auto-generated ID
  getDoc,       // read one document
  getDocs,      // read multiple documents
  query,        // build a query
  where,        // filter condition
  orderBy,      // sort results
  limit,        // cap the number of results
  updateDoc,    // partially update a document
  deleteDoc,    // delete a document
  serverTimestamp, // Firestore's server-side timestamp (more reliable than new Date())
} from "firebase/firestore";

import { db } from "../firebase/config";

// ── FETCH ALL PRODUCTS ────────────────────────────────────────
// ── FIRESTORE LESSON: getDocs() ──────────────────────────────
// getDocs() reads MULTIPLE documents from a collection or query.
// It returns a QuerySnapshot containing all matching documents.
//
//   snapshot.docs         → array of DocumentSnapshots
//   snapshot.docs.map()   → transform each into a plain object
//   doc.id                → the document's Firestore ID
//   doc.data()            → the stored data object
//
// WHY orderBy("createdAt", "desc")?
//   Shows newest products first. Firestore doesn't sort by default.
//   NOTE: orderBy requires a Firestore index if combined with where().
//   Firestore will show a link to create the index in the console.
export async function fetchProducts() {
  // query() builds a query — it does NOT fetch yet
  const q = query(
    collection(db, "products"),     // target collection
    orderBy("createdAt", "desc")    // sort newest first
  );

  const snapshot = await getDocs(q); // NOW it fetches

  // Transform each DocumentSnapshot into a plain JS object
  return snapshot.docs.map((doc) => ({
    id: doc.id,          // Firestore auto-generated ID
    ...doc.data(),       // spread all stored fields
  }));
}

// ── FETCH PRODUCTS BY CATEGORY ────────────────────────────────
// ── FIRESTORE LESSON: where() ────────────────────────────────
// where(field, operator, value) filters documents.
// Common operators: "==", "!=", "<", ">", "<=", ">=",
//                   "in", "array-contains"
//
// IMPORTANT: Firestore queries are shallow — they only return
// documents from the collection you query. Sub-collections
// are NOT included automatically.
export async function fetchProductsByCategory(category) {
  const q = query(
    collection(db, "products"),
    where("category", "==", category), // only this category
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

// ── FETCH SINGLE PRODUCT ──────────────────────────────────────
// ── FIRESTORE LESSON: getDoc() vs getDocs() ──────────────────
// getDoc()  → one document, by exact path (fast, cheap)
// getDocs() → many documents, via a query (more expensive)
//
// Always prefer getDoc() when you know the exact document ID.
export async function fetchProduct(productId) {
  const ref      = doc(db, "products", productId);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

// ── SEARCH PRODUCTS ───────────────────────────────────────────
// Firestore does NOT support full-text search natively.
// For small datasets, we fetch all products and filter client-side.
// For production at scale, use Algolia or Typesense.
export async function searchProducts(searchTerm) {
  const all = await fetchProducts();
  const term = searchTerm.toLowerCase();

  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
  );
}

// ── ADD A PRODUCT (admin only) ────────────────────────────────
// ── FIRESTORE LESSON: addDoc() ───────────────────────────────
// addDoc(collectionRef, data) creates a new document with a
// FIRESTORE-GENERATED random ID (e.g. "K3mXp9qR2vBt...").
//
// Use addDoc() when:
//   ✅ You don't care what the ID is
//   ✅ You're adding items to a list (products, orders, posts)
//
// Use setDoc() when:
//   ✅ You WANT a specific ID (e.g. user profile = user's UID)
//
// serverTimestamp() is better than new Date() because:
//   - It uses the Firebase server's clock (not the user's device)
//   - Prevents issues with wrong device clocks
export async function addProduct(productData) {
  const ref = await addDoc(collection(db, "products"), {
    ...productData,
    createdAt: serverTimestamp(), // server clock, not client clock
  });
  return ref.id; // returns the new document's auto-generated ID
}

// ── UPDATE PRODUCT STOCK ──────────────────────────────────────
// ── FIRESTORE LESSON: updateDoc() ────────────────────────────
// updateDoc() only changes the fields you specify.
// Other fields in the document are left completely alone.
//
// BEGINNER MISTAKE: Using setDoc() without { merge: true }
// to update — this DELETES all other fields!
export async function updateProductStock(productId, newStock) {
  const ref = doc(db, "products", productId);
  await updateDoc(ref, { stock: newStock }); // only "stock" changes
}

// ── DELETE A PRODUCT (admin only) ────────────────────────────
// ── FIRESTORE LESSON: deleteDoc() ────────────────────────────
// deleteDoc() permanently removes the document.
// NOTE: Deleting a document does NOT delete its sub-collections!
// You must delete sub-collection documents separately.
export async function deleteProduct(productId) {
  const ref = doc(db, "products", productId);
  await deleteDoc(ref);
}

// ── SEED SAMPLE DATA (run once to populate your database) ────
// Call this from the browser console or a one-time script.
// After running, delete or comment it out.
export async function seedProducts() {
  const sampleProducts = [
    {
      name: "Wireless Noise-Cancelling Headphones",
      description: "Premium over-ear headphones with 30-hour battery life and active noise cancellation. Perfect for travel and focused work.",
      price: 79.99,
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      category: "Electronics",
      stock: 25,
    },
    {
      name: "Minimalist Leather Wallet",
      description: "Slim bifold wallet in genuine leather. Holds up to 8 cards and cash. Available in black and brown.",
      price: 34.99,
      imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
      category: "Accessories",
      stock: 50,
    },
    {
      name: "Ceramic Pour-Over Coffee Set",
      description: "Handcrafted ceramic dripper with matching mug. Makes the perfect single cup. Dishwasher safe.",
      price: 44.99,
      imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500",
      category: "Kitchen",
      stock: 15,
    },
    {
      name: "Organic Cotton T-Shirt",
      description: "Soft, sustainably made everyday tee. 100% GOTS-certified organic cotton. Available in S–XXL.",
      price: 29.99,
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      category: "Clothing",
      stock: 100,
    },
    {
      name: "Mechanical Keyboard — TKL",
      description: "Tenkeyless mechanical keyboard with tactile brown switches. USB-C, PBT keycaps, aluminum frame.",
      price: 119.99,
      imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
      category: "Electronics",
      stock: 12,
    },
    {
      name: "Yoga Mat — 6mm",
      description: "Non-slip natural rubber yoga mat. 183cm × 61cm. Includes carrying strap. Eco-friendly materials.",
      price: 54.99,
      imageUrl: "https://images.unsplash.com/photo-1601925228270-7e7a9f5d8a1e?w=500",
      category: "Fitness",
      stock: 30,
    },
  ];

  for (const product of sampleProducts) {
    await addProduct(product);
  }

  console.log("✅ Sample products added to Firestore!");
}
