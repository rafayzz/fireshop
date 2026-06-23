// ============================================================
// src/App.jsx
// ============================================================
// PURPOSE: Define all routes and wrap the app in providers.
//
// PROVIDER ORDER MATTERS:
//   ThemeProvider → AuthProvider → CartProvider
//   Auth and Cart depend on theme being available.
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./routes/ProtectedRoute";

// Pages
import HomePage         from "./pages/HomePage";
import ShopPage         from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LoginPage        from "./pages/LoginPage";
import SignupPage       from "./pages/SignupPage";
import CartPage         from "./pages/CartPage";
import OrdersPage       from "./pages/OrdersPage";
import OrderDetailPage  from "./pages/OrderDetailPage";
import ProfilePage      from "./pages/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/"                    element={<HomePage />} />
              <Route path="/shop"                element={<ShopPage />} />
              <Route path="/products/:productId" element={<ProductDetailPage />} />
              <Route path="/login"               element={<LoginPage />} />
              <Route path="/signup"              element={<SignupPage />} />

              {/* Protected routes */}
              <Route path="/cart"    element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/orders"  element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
              <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

              {/* 404 */}
              <Route path="*" element={
                <div className="min-h-screen flex flex-col items-center justify-center bg-surface-50 dark:bg-surface-900">
                  <div className="text-8xl mb-6 opacity-20">404</div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Page not found</h1>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">The page you're looking for doesn't exist.</p>
                  <a href="/" className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-md hover:shadow-glow transition-shadow">
                    Go Home
                  </a>
                </div>
              } />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
