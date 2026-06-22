// ============================================================
// src/components/Navbar.jsx
// ============================================================

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { logOut } from "../services/authService";

export default function Navbar() {
  const { currentUser } = useAuth();
  const { itemCount }   = useCart();
  const navigate        = useNavigate();

  useEffect(() => {
    console.debug("[Navbar] render", {
      currentUser: currentUser ? { uid: currentUser.uid, email: currentUser.email } : null,
      itemCount,
    });
  }, [currentUser, itemCount]);

  async function handleLogout() {
    try {
      console.debug("[Navbar] handleLogout start", {
        currentUserEmail: currentUser?.email,
      });
      await logOut();
      console.debug("[Navbar] handleLogout success");
      navigate("/login");
    } catch (error) {
      console.error("[Navbar] handleLogout error", error);
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-brand-600">
          🔥 FireShop
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-brand-600 transition-colors">
            Products
          </Link>

          {currentUser ? (
            <>
              {/* Cart icon with badge */}
              <Link to="/cart" className="relative hover:text-brand-600 transition-colors">
                🛒 Cart
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link to="/orders" className="hover:text-brand-600 transition-colors">
                Orders
              </Link>

              <Link to="/profile" className="hover:text-brand-600 transition-colors">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-brand-600 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-brand-500 text-white px-4 py-1.5 rounded-lg hover:bg-brand-600 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
