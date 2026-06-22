// ============================================================
// backend/server.js
// ============================================================
// PURPOSE: Express server with Firebase Admin SDK integration
//          Handles authentication, data persistence, and API requests
// ============================================================

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const path = require("path");

// ── Initialize Express ───────────────────────────────────────
const app = express();
const PORT = process.env.PORT || 5000;

console.debug("[Server] Starting FireShop Backend...");
console.debug("[Server] Environment:", process.env.NODE_ENV || "development");
console.debug("[Server] Port:", PORT);

// ── Middleware ───────────────────────────────────────────────
app.use(cors({
  // Allow requests from frontend (both localhost and network IP)
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5175',
      'http://localhost:5174',
      'http://localhost:5173',
      'http://127.0.0.1:5175',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:5173',
      // Network IPs will be allowed dynamically
      ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
    ];
    
    // Allow requests without Origin header (e.g., from curl, mobile apps)
    if (!origin) return callback(null, true);
    
    // Allow if in whitelist
    if (allowedOrigins.includes(origin)) return callback(null, true);
    
    // Allow if from local network (192.168.x.x, 10.x.x.x, etc)
    if (origin.match(/^http:\/\/(192\.168|10|172)\.\d+\.\d+:\d+$/)) {
      return callback(null, true);
    }
    
    console.warn('[CORS] Blocked origin:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

console.debug("[Server] CORS configured for network access");
console.debug("[Server] Allowed origins: localhost, 127.0.0.1, local network (192.168.*, 10.*, 172.*)");


// ── Initialize Firebase Admin SDK ────────────────────────────
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./firebase-adminsdk.json";

console.debug("[Firebase Admin] Initializing with service account...", {
  path: serviceAccountPath,
  projectId: process.env.FIREBASE_PROJECT_ID,
});

try {
  const serviceAccount = require(path.resolve(serviceAccountPath));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });

  console.debug("[Firebase Admin] ✓ Initialized successfully");
  console.debug("[Firebase Admin] Project ID:", serviceAccount.project_id);
  console.debug("[Firebase Admin] Service Account Email:", serviceAccount.client_email);
} catch (error) {
  console.error("[Firebase Admin] ✗ Initialization failed:", error.message);
  process.exit(1);
}

// ── Get Firebase services ────────────────────────────────────
const db = admin.firestore();
const auth = admin.auth();

console.debug("[Firebase Admin] Firestore database connected ✓");
console.debug("[Firebase Admin] Authentication service connected ✓");

// ============================================================
// HEALTH CHECK ROUTES
// ============================================================

// ── Route: GET /health ────────────────────────────────────────
// Check if server is running
app.get("/health", (req, res) => {
  console.debug("[Route] GET /health");
  res.json({
    status: "✓ Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// ── Route: GET /firebase/health ───────────────────────────────
// Check if Firebase is connected
app.get("/firebase/health", async (req, res) => {
  try {
    console.debug("[Route] GET /firebase/health");

    // Test Firestore connection
    const docRef = db.collection("_health_check").doc("test");
    await docRef.set({ timestamp: new Date(), status: "ok" });
    await docRef.delete();

    console.debug("[Route] Firebase connection test passed ✓");
    res.json({
      status: "✓ Firebase is connected",
      projectId: process.env.FIREBASE_PROJECT_ID,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Route] Firebase health check failed:", error.message);
    res.status(500).json({
      status: "✗ Firebase connection failed",
      error: error.message,
    });
  }
});

// ============================================================
// USER ROUTES
// ============================================================

// ── Route: GET /api/users/:uid ────────────────────────────────
// Get user profile from Firestore
app.get("/api/users/:uid", async (req, res) => {
  const { uid } = req.params;
  console.debug("[Route] GET /api/users/:uid", { uid });

  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      console.debug("[Route] User not found:", uid);
      return res.status(404).json({ error: "User not found" });
    }

    const userData = { id: userDoc.id, ...userDoc.data() };
    console.debug("[Route] User fetched successfully:", userData);
    res.json(userData);
  } catch (error) {
    console.error("[Route] Error fetching user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ── Route: POST /api/users ───────────────────────────────────
// Create or update user profile
app.post("/api/users", async (req, res) => {
  const { uid, name, email, role } = req.body;
  console.debug("[Route] POST /api/users", { uid, email });

  if (!uid || !email) {
    console.debug("[Route] Missing required fields (uid, email)");
    return res.status(400).json({ error: "uid and email are required" });
  }

  try {
    await db.collection("users").doc(uid).set({
      name,
      email,
      role: role || "customer",
      updatedAt: new Date(),
    });

    console.debug("[Route] User created/updated successfully:", uid);
    res.json({ success: true, uid });
  } catch (error) {
    console.error("[Route] Error creating/updating user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// PRODUCT ROUTES (PLACEHOLDER)
// ============================================================

// ── Route: GET /api/products ──────────────────────────────────
// Get all products
app.get("/api/products", async (req, res) => {
  console.debug("[Route] GET /api/products");

  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.debug("[Route] Products fetched:", products.length);
    res.json(products);
  } catch (error) {
    console.error("[Route] Error fetching products:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// CART ROUTES (PLACEHOLDER)
// ============================================================

// ── Route: GET /api/cart/:uid ──────────────────────────────────
// Get user's cart
app.get("/api/cart/:uid", async (req, res) => {
  const { uid } = req.params;
  console.debug("[Route] GET /api/cart/:uid", { uid });

  try {
    const cartDoc = await db.collection("carts").doc(uid).get();

    if (!cartDoc.exists) {
      console.debug("[Route] Cart not found for user:", uid);
      return res.json({ items: [], total: 0 });
    }

    const cartData = cartDoc.data();
    console.debug("[Route] Cart fetched successfully:", cartData);
    res.json(cartData);
  } catch (error) {
    console.error("[Route] Error fetching cart:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// ERROR HANDLING
// ============================================================

// ── 404 Not Found ────────────────────────────────────────────
app.use((req, res) => {
  console.debug("[Route] 404 Not Found:", req.method, req.path);
  res.status(404).json({ error: "Route not found" });
});

// ── Global Error Handler ────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("[Error Handler] Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ============================================================
// START SERVER
// ============================================================

const os = require('os');

// Get local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const localIP = getLocalIP();

app.listen(PORT, '0.0.0.0', () => {
  console.log("\n" + "=".repeat(70));
  console.log("[Server] ✓ FireShop Backend is running!");
  console.log("=".repeat(70));
  console.log(`[Server] ✓ Local:        http://localhost:${PORT}`);
  console.log(`[Server] ✓ Network:      http://${localIP}:${PORT}`);
  console.log(`[Server] ✓ API:          http://${localIP}:${PORT}/api`);
  console.log(`[Server] ✓ Health Check: http://${localIP}:${PORT}/health`);
  console.log("=".repeat(70));
  console.log("[Server] Share network URL to access from other devices on same WiFi!");
  console.log("=".repeat(70) + "\n");
});

module.exports = app;
