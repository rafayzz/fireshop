// ============================================================
// src/context/AuthContext.jsx
// ============================================================
// PURPOSE: Share the current user's auth state across the
//          entire app without prop-drilling.
//
// HOW IT WORKS:
//   1. We create a React Context (a global store)
//   2. AuthProvider wraps the whole app and listens to Firebase
//      auth state changes via onAuthStateChanged()
//   3. Any component can call useAuth() to get the current user
//
// WHY onAuthStateChanged()?
//   Firebase Auth is async. When the page loads, Firebase needs
//   a moment to check if the user is still logged in (checks
//   the stored token). onAuthStateChanged() fires automatically:
//   - When the page loads (with current user or null)
//   - When user logs in
//   - When user logs out
//   This is the correct way to track auth state in Firebase.
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { fetchUserProfile } from "../services/authService";

// Create the context — this is just an empty container for now
const AuthContext = createContext(null);

// ── AuthProvider ──────────────────────────────────────────────
// Wrap your app with this. It manages auth state and provides
// it to all child components via context.
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser]   = useState(null); // Firebase Auth user
  const [userProfile, setUserProfile]   = useState(null); // Firestore profile data
  const [loading, setLoading]           = useState(true); // waiting for Firebase

  useEffect(() => {
    // onAuthStateChanged returns an UNSUBSCRIBE function.
    // We call it in the cleanup to stop listening when component unmounts.
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.debug("[AuthContext] onAuthStateChanged fired", {
        isUserLoggedIn: !!firebaseUser,
        uid: firebaseUser?.uid || null,
        email: firebaseUser?.email || null,
      });

      if (firebaseUser) {
        // User is logged in — fetch their Firestore profile
        setCurrentUser(firebaseUser);
        console.debug("[AuthContext] Fetching Firestore profile for UID:", firebaseUser.uid);
        try {
          const profile = await fetchUserProfile(firebaseUser.uid);
          setUserProfile(profile);
          console.debug("[AuthContext] Profile fetched successfully:", profile);
        } catch (error) {
          console.error("[AuthContext] Error fetching profile:", error);
        }
      } else {
        // User is logged out — clear everything
        console.debug("[AuthContext] User logged out, clearing state");
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false); // Firebase has responded — stop showing spinner
      console.debug("[AuthContext] Loading state set to false");
    });

    return unsubscribe; // cleanup: stop listening on unmount
  }, []);

  const value = {
    currentUser,   // Firebase Auth object (has .uid, .email, .displayName)
    userProfile,   // Firestore data (has .name, .role, .createdAt)
    setUserProfile,// so profile page can update it locally after saving
    loading,       // true while Firebase checks auth state on page load
  };

  // Don't render children until Firebase tells us who's logged in.
  // Without this, protected routes would briefly show before redirecting.
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-900">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 dark:border-white/10 border-t-primary-500"></div>
          <p className="text-sm text-gray-400 dark:text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ── useAuth() hook ────────────────────────────────────────────
// Custom hook so components don't import AuthContext directly.
// Usage: const { currentUser, userProfile } = useAuth();
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return context;
}
