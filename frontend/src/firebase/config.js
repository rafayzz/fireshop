// ============================================================
// src/firebase/config.js
// ============================================================
// PURPOSE: Initialize Firebase once and export the services
//          we need throughout the app (auth + firestore).
//
// WHY ONE FILE?
//   Firebase should only be initialized ONCE in your app.
//   If you call initializeApp() in multiple files, you get errors.
//   By centralizing it here, every other file just imports from
//   this single source of truth.
// ============================================================

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// ── Firebase project config ──────────────────────────────────
// Uses env vars when available (local dev), falls back to hardcoded
// values for production builds (e.g. Vercel).
// NOTE: Firebase client-side keys are safe to expose — security is
//       enforced by Firebase Security Rules, not by hiding these keys.
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || "AIzaSyDyxRtEBZholZStYK7ubKhsV_8yNgAUzuI",
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || "fireshop-d2eed.firebaseapp.com",
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || "fireshop-d2eed",
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || "fireshop-d2eed.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "878799241322",
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || "1:878799241322:web:c9315407e6141e3d334a13",
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     || "G-PZKC59J04E",
};

console.debug("[Firebase Config] Configuration loaded:", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  usingEnvVars: !!import.meta.env.VITE_FIREBASE_API_KEY,
});

// ── Initialize Firebase ──────────────────────────────────────
// initializeApp() connects your app to your Firebase project.
// It returns an "app" object that the other services need.
let app;
try {
  app = initializeApp(firebaseConfig);
  console.debug("[Firebase Config] ✓ Firebase App initialized successfully");
} catch (error) {
  console.error("[Firebase Config] ✗ Failed to initialize Firebase App:", error.message);
  throw error;
}

// ── Initialize Analytics ─────────────────────────────────────
// Optional but recommended for tracking user interactions
let analytics;
try {
  analytics = getAnalytics(app);
  console.debug("[Firebase Config] ✓ Analytics initialized successfully");
} catch (error) {
  console.warn("[Firebase Config] ⚠ Analytics initialization warning:", error.message);
  // Don't throw - analytics is optional
}

// ── Export individual services ───────────────────────────────
// getAuth(app)      → Firebase Authentication service
// getFirestore(app) → Cloud Firestore database service
//
// We export these so any file can do:
//   import { db, auth } from '../firebase/config'
let auth;
let db;

try {
  auth = getAuth(app);
  console.debug("[Firebase Config] ✓ Auth service initialized");
} catch (error) {
  console.error("[Firebase Config] ✗ Failed to initialize Auth service:", error.message);
  throw error;
}

try {
  db = getFirestore(app);
  console.debug("[Firebase Config] ✓ Firestore service initialized");
} catch (error) {
  console.error("[Firebase Config] ✗ Failed to initialize Firestore service:", error.message);
  throw error;
}

console.debug("[Firebase Config] ✓✓✓ ALL SERVICES READY ✓✓✓\n");

export { auth, db };

