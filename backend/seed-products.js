// ============================================================
// backend/seed-products.js
// ============================================================
// Run: node seed-products.js
// Adds demo products to Firestore using Admin SDK (bypasses rules)
// ============================================================

require("dotenv").config();
const admin = require("firebase-admin");
const path = require("path");

// Initialize Firebase Admin
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "./firebase-adminsdk.json";
const serviceAccount = require(path.resolve(serviceAccountPath));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();

const products = [
  // ── Electronics ──────────────────────────────────────────
  {
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with 30-hour battery life, active noise cancellation, and Hi-Res audio. Perfect for travel and focused work sessions.",
    price: 79.99,
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    category: "Electronics",
    stock: 25,
  },
  {
    name: "Mechanical Keyboard — TKL",
    description: "Tenkeyless mechanical keyboard with tactile brown switches, USB-C connectivity, PBT keycaps, and premium aluminum frame. RGB backlit.",
    price: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    category: "Electronics",
    stock: 12,
  },
  {
    name: "Ultra-Slim Wireless Mouse",
    description: "Ergonomic wireless mouse with silent clicks, 4000 DPI precision sensor, USB-C rechargeable. Works on any surface.",
    price: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80",
    category: "Electronics",
    stock: 40,
  },
  {
    name: "Portable Bluetooth Speaker",
    description: "Waterproof IPX7 portable speaker with 360° sound, 20-hour battery, and built-in microphone for calls. Deep bass technology.",
    price: 59.99,
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    category: "Electronics",
    stock: 18,
  },
  {
    name: "Smart Watch Pro",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, sleep analysis, and 7-day battery. Water resistant to 50m.",
    price: 199.99,
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    category: "Electronics",
    stock: 8,
  },

  // ── Clothing ─────────────────────────────────────────────
  {
    name: "Organic Cotton T-Shirt",
    description: "Soft, sustainably made everyday tee. 100% GOTS-certified organic cotton with a relaxed fit. Available in S–XXL.",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    category: "Clothing",
    stock: 100,
  },
  {
    name: "Premium Denim Jacket",
    description: "Classic denim jacket crafted from heavyweight selvedge denim. Vintage wash with copper rivets and horn buttons.",
    price: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    category: "Clothing",
    stock: 15,
  },
  {
    name: "Merino Wool Sweater",
    description: "Lightweight yet warm merino wool crew neck. Temperature regulating, moisture-wicking, and naturally odor resistant.",
    price: 74.99,
    imageUrl: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a00?w=600&q=80",
    category: "Clothing",
    stock: 22,
  },

  // ── Accessories ──────────────────────────────────────────
  {
    name: "Minimalist Leather Wallet",
    description: "Slim bifold wallet in full-grain Italian leather. Holds up to 8 cards and cash. RFID blocking technology built in.",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    category: "Accessories",
    stock: 50,
  },
  {
    name: "Canvas Backpack — 25L",
    description: "Waxed canvas daypack with padded laptop sleeve, water-resistant zippers, and vegetable-tanned leather accents.",
    price: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80",
    category: "Accessories",
    stock: 30,
  },
  {
    name: "Polarized Sunglasses",
    description: "Classic wayframe sunglasses with UV400 polarized lenses, lightweight acetate frame, and spring hinges for comfort.",
    price: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
    category: "Accessories",
    stock: 35,
  },

  // ── Kitchen ──────────────────────────────────────────────
  {
    name: "Ceramic Pour-Over Coffee Set",
    description: "Handcrafted ceramic dripper with matching mug. Makes the perfect single cup every time. Dishwasher safe.",
    price: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    category: "Kitchen",
    stock: 15,
  },
  {
    name: "Cast Iron Skillet — 12 inch",
    description: "Pre-seasoned cast iron skillet. Even heat distribution, oven safe to 500°F. A kitchen essential that lasts generations.",
    price: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80",
    category: "Kitchen",
    stock: 20,
  },
  {
    name: "Japanese Chef Knife — 8 inch",
    description: "Damascus steel chef knife with 67 layers. Pakkawood handle, razor sharp edge. Comes in a magnetic gift box.",
    price: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80",
    category: "Kitchen",
    stock: 10,
  },

  // ── Fitness ──────────────────────────────────────────────
  {
    name: "Yoga Mat — 6mm Premium",
    description: "Non-slip natural rubber yoga mat. 183cm × 61cm with alignment lines. Includes carrying strap. Eco-friendly materials.",
    price: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1601925228270-7e7a9f5d8a1e?w=600&q=80",
    category: "Fitness",
    stock: 30,
  },
  {
    name: "Adjustable Dumbbell Set",
    description: "Space-saving adjustable dumbbells from 5 to 52.5 lbs. Quick-change weight system with ergonomic grip.",
    price: 249.99,
    imageUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80",
    category: "Fitness",
    stock: 5,
  },
  {
    name: "Resistance Bands Set",
    description: "5-piece resistance band set with varying tensions. Includes door anchor, ankle straps, and carry bag. Latex-free.",
    price: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&q=80",
    category: "Fitness",
    stock: 45,
  },

  // ── Out of Stock (demo) ──────────────────────────────────
  {
    name: "Limited Edition Sneakers",
    description: "Collaboration series sneakers with premium suede upper, memory foam insole, and hand-painted details. Collector's item.",
    price: 189.99,
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    category: "Clothing",
    stock: 0,
  },
  {
    name: "Vintage Film Camera",
    description: "Fully restored 35mm film camera from the 1970s. Includes 50mm f/1.4 lens. A beautiful piece of photographic history.",
    price: 349.99,
    imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
    category: "Electronics",
    stock: 0,
  },
];

async function seed() {
  console.log("🌱 Seeding products to Firestore...\n");

  const batch = db.batch();

  for (const product of products) {
    const ref = db.collection("products").doc();
    batch.set(ref, {
      ...product,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log(`  ✓ ${product.name} — $${product.price} (${product.stock} in stock)`);
  }

  await batch.commit();
  console.log(`\n✅ Successfully added ${products.length} products to Firestore!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
