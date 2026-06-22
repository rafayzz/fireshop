// ============================================================
// src/App.jsx
// ============================================================
// PURPOSE: Define all routes and wrap the app in providers.
//
// PROVIDER ORDER MATTERS:
//   AuthProvider must wrap CartProvider because CartProvider
//   calls useAuth() internally. Inner providers can use outer ones.
// ============================================================

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";

// Pages
import HomePage         from "./pages/HomePage";
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
      <AuthProvider>
        <CartProvider>
          {/* Navbar sits outside Routes so it always shows */}
          <Navbar />

          <Routes>
            {/* Public routes — anyone can visit */}
            <Route path="/"                  element={<HomePage />} />
            <Route path="/products/:productId" element={<ProductDetailPage />} />
            <Route path="/login"             element={<LoginPage />} />
            <Route path="/signup"            element={<SignupPage />} />

            {/* Protected routes — must be logged in */}
            <Route path="/cart"    element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/orders"  element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="/orders/:orderId" element={<ProtectedRoute><OrderDetailPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            {/* 404 */}
            <Route path="*" element={
              <div className="text-center py-20">
                <p className="text-6xl mb-4">🔍</p>
                <p className="text-gray-500 font-medium">Page not found</p>
              </div>
            } />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
