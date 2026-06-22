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

// ── Debug: Check environment variables ────────────────────────
console.debug("[Firebase Config] Environment variables check:");
console.debug("  VITE_FIREBASE_API_KEY:", import.meta.env.VITE_FIREBASE_API_KEY ? "✓ Loaded" : "✗ MISSING");
console.debug("  VITE_FIREBASE_AUTH_DOMAIN:", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? "✓ Loaded" : "✗ MISSING");
console.debug("  VITE_FIREBASE_PROJECT_ID:", import.meta.env.VITE_FIREBASE_PROJECT_ID ? "✓ Loaded" : "✗ MISSING");
console.debug("  VITE_FIREBASE_STORAGE_BUCKET:", import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? "✓ Loaded" : "✗ MISSING");
console.debug("  VITE_FIREBASE_MESSAGING_SENDER_ID:", import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? "✓ Loaded" : "✗ MISSING");
console.debug("  VITE_FIREBASE_APP_ID:", import.meta.env.VITE_FIREBASE_APP_ID ? "✓ Loaded" : "✗ MISSING");

// ── Validate all required variables are present ────────────────
const requiredEnvVars = [
  "VITE_FIREBASE_API_KEY",
  "VITE_FIREBASE_AUTH_DOMAIN",
  "VITE_FIREBASE_PROJECT_ID",
  "VITE_FIREBASE_STORAGE_BUCKET",
  "VITE_FIREBASE_MESSAGING_SENDER_ID",
  "VITE_FIREBASE_APP_ID",
];

const missingVars = requiredEnvVars.filter(
  (varName) => !import.meta.env[varName]
);

if (missingVars.length > 0) {
  console.error("[Firebase Config] ✗ CRITICAL: Missing environment variables:");
  missingVars.forEach((varName) => console.error(`  - ${varName}`));
  console.error("[Firebase Config] ✗ Solution: Check .env.local file exists in /frontend folder");
  console.error("[Firebase Config] ✗ Make sure to RESTART the dev server after creating .env.local");
  throw new Error(
    `Firebase configuration error: Missing ${missingVars.length} environment variable(s). See console for details.`
  );
}

console.debug("[Firebase Config] ✓ All environment variables loaded successfully");

// ── Firebase project config ──────────────────────────────────
// Vite exposes env vars prefixed with VITE_ via import.meta.env
// These values come from your .env.local file (never hardcode them!)
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.debug("[Firebase Config] Configuration loaded:", {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  storageBucket: firebaseConfig.storageBucket,
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

