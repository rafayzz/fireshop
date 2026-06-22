// ============================================================
// src/pages/HomePage.jsx
// ============================================================
// PURPOSE: Show all products. Supports search + category filter.
//
// FIRESTORE OPERATIONS USED:
//   fetchProducts()           → getDocs() with orderBy()
//   fetchProductsByCategory() → getDocs() with where() + orderBy()
//   searchProducts()          → fetchProducts() + client-side filter
// ============================================================

import { useEffect, useState } from "react";
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
} from "../services/productService";
import ProductCard from "../components/products/ProductCard";

// Available filter categories
const CATEGORIES = [
  "All",
  "Electronics",
  "Clothing",
  "Accessories",
  "Kitchen",
  "Fitness",
];

export default function HomePage() {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [category, setCategory]     = useState("All");
  const [error, setError]           = useState("");

  // Fetch products whenever category changes
  useEffect(() => {
    setLoading(true);
    setError("");

    const loadProducts = async () => {
      try {
        let data;
        if (category === "All") {
          // getDocs() on the full collection with orderBy
          data = await fetchProducts();
        } else {
          // getDocs() filtered with where("category", "==", category)
          data = await fetchProductsByCategory(category);
        }
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Check your Firestore setup.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category]); // re-run when category changes

  // Client-side search filter (no extra Firestore read)
  const displayed = search.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase())
      )
    : products;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Products</h1>
        <p className="text-gray-500 text-sm">
          {products.length} items from Firestore
        </p>
      </div>

      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search input */}
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); setSearch(""); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${category === cat
                  ? "bg-brand-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 rounded-lg p-4 mb-6 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-xl h-72 animate-pulse" />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-medium">No products found</p>
          <p className="text-sm mt-1">
            {search ? "Try a different search term" : "Run seedProducts() to add sample data"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
