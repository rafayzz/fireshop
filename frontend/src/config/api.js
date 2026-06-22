// ============================================================
// src/config/api.js
// ============================================================
// PURPOSE: Centralized API configuration for the frontend
//          Allows easy switching between localhost and network addresses
// ============================================================

// Get backend URL from environment or default to localhost
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

console.debug('[API Config] Backend URL:', BACKEND_URL);

// API endpoints
export const API = {
  // Health checks
  HEALTH: `${BACKEND_URL}/health`,
  FIREBASE_HEALTH: `${BACKEND_URL}/firebase/health`,
  
  // Users
  USERS: `${BACKEND_URL}/api/users`,
  USER_PROFILE: (uid) => `${BACKEND_URL}/api/users/${uid}`,
  
  // Products
  PRODUCTS: `${BACKEND_URL}/api/products`,
  PRODUCT: (id) => `${BACKEND_URL}/api/products/${id}`,
  
  // Cart
  CART: (uid) => `${BACKEND_URL}/api/cart/${uid}`,
  
  // Orders
  ORDERS: (uid) => `${BACKEND_URL}/api/orders/${uid}`,
  ORDER: (uid, orderId) => `${BACKEND_URL}/api/orders/${uid}/${orderId}`,
};

// Fetch wrapper with error logging
export async function fetchAPI(url, options = {}) {
  try {
    console.debug('[API] Request:', {
      method: options.method || 'GET',
      url: url,
    });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: response.statusText }));
      console.error('[API] Response error:', {
        status: response.status,
        error: error,
      });
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.debug('[API] Response success:', data);
    return data;
  } catch (error) {
    console.error('[API] Fetch error:', error.message);
    throw error;
  }
}

export default API;
