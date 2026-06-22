// ============================================================
// src/routes/ProtectedRoute.jsx
// ============================================================
// PURPOSE: Block unauthenticated users from accessing pages
//          like /cart, /orders, /profile.
//
// HOW IT WORKS:
//   If currentUser exists → render the requested page
//   If not → redirect to /login (React Router's <Navigate>)
//
// The `replace` prop replaces the current history entry so
// clicking Back after login doesn't send the user back to /login.
// ============================================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Not logged in → send to login page
    return <Navigate to="/login" replace />;
  }

  // Logged in → render the actual page
  return children;
}
