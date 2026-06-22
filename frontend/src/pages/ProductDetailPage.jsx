// ============================================================
// src/pages/ProductDetailPage.jsx
// ============================================================
// FIRESTORE LESSON: getDoc() — fetch ONE document by ID
// The product ID comes from the URL: /products/:productId
// ============================================================

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function ProductDetailPage() {
  const { productId }  = useParams();      // from URL: /products/:productId
  const navigate       = useNavigate();
  const { addToCart }  = useCart();
  const { currentUser }= useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded]     = useState(false);

  useEffect(() => {
    // getDoc() — reads ONE document by its exact path
    fetchProduct(productId)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  async function handleAddToCart() {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    await addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse flex gap-10">
          <div className="w-96 h-80 bg-gray-200 rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-24" />
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Product not found.</p>
        <button onClick={() => navigate("/")} className="mt-4 text-brand-500 underline">
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-gray-400 hover:text-gray-700 text-sm mb-6 flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Image */}
        <div className="md:w-96 shrink-0">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-72 object-cover rounded-2xl shadow"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            {product.category}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2">
            {product.name}
          </h1>

          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="flex items-end gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className={`text-sm mb-1 ${product.stock === 0 ? "text-red-500" : "text-green-600"}`}>
              {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-semibold transition-all
              ${added
                ? "bg-green-500 text-white"
                : "bg-brand-500 text-white hover:bg-brand-600"
              } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </button>

          {/* Firestore learning note */}
          <p className="mt-8 text-xs text-gray-300 border-t pt-4">
            📚 This page used <code>getDoc()</code> to fetch document ID: <code>{product.id}</code>
          </p>
        </div>
      </div>
    </div>
  );
}
