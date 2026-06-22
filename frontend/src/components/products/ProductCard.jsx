// ============================================================
// src/components/products/ProductCard.jsx
// ============================================================

import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { currentUser } = useAuth();

  async function handleAddToCart() {
    if (!currentUser) {
      alert("Please log in to add items to your cart.");
      return;
    }
    await addToCart(product);
  }

  const outOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Product image */}
      <Link to={`/products/${product.id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2">
        {/* Category badge */}
        <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full w-fit">
          {product.category}
        </span>

        {/* Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-brand-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Price + stock */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className={`text-xs ${outOfStock ? "text-red-500" : "text-green-600"}`}>
            {outOfStock ? "Out of stock" : `${product.stock} left`}
          </span>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAddToCart}
          disabled={outOfStock}
          className="w-full mt-2 bg-brand-500 text-white py-2 rounded-lg text-sm font-medium
                     hover:bg-brand-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
