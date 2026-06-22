// ============================================================
// src/services/authService.js
// ============================================================
// PURPOSE: All Authentication logic lives here.
//          Pages and components call these functions —
//          they never touch Firebase directly.
//
// WHY A SERVICE LAYER?
//   Keeps your components clean. If Firebase ever changes its
//   API, you only update this one file, not every component.
// ============================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  doc,      // creates a reference to a specific document
  setDoc,   // writes data to a document (overwrites or creates)
  getDoc,   // reads a single document
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

// ── SIGN UP ──────────────────────────────────────────────────
// Creates a new user in Firebase Auth AND stores their profile
// in Firestore under: users/{userId}
//
// WHY TWO STEPS?
//   Firebase Auth only stores email + password.
//   Any extra info (name, role, etc.) lives in Firestore.
export async function signUp(name, email, password) {
  try {
    console.debug("[authService] signUp started", { email });
    // Step 1: Create the user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user; // the newly created user object
    console.debug("[authService] User created in Firebase Auth", {
      uid: user.uid,
      email: user.email,
    });

    // Step 2: Update the display name in Auth (optional but nice)
    await updateProfile(user, { displayName: name });
    console.debug("[authService] Display name updated");

    // Step 3: Create Firestore profile
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role: "customer",
      createdAt: new Date(),
    });
    console.debug("[authService] Firestore user profile created");

    return user;
  } catch (error) {
    console.error("[authService] signUp error:", error.message);
    throw error;
  }
}

// ── LOG IN ───────────────────────────────────────────────────
export async function logIn(email, password) {
  try {
    console.debug("[authService] logIn started", { email });
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.debug("[authService] logIn successful", {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
    });
    return userCredential.user;
  } catch (error) {
    console.error("[authService] logIn error:", error.message);
    throw error;
  }
}

// ── LOG OUT ──────────────────────────────────────────────────
export async function logOut() {
  try {
    console.debug("[authService] logOut started");
    await signOut(auth);
    console.debug("[authService] logOut successful");
  } catch (error) {
    console.error("[authService] logOut error:", error.message);
    throw error;
  }
}

// ── FETCH USER PROFILE FROM FIRESTORE ────────────────────────
// ── FIRESTORE LESSON: getDoc() ────────────────────────────────
// getDoc(ref) reads ONE specific document by its exact path.
// It returns a DocumentSnapshot.
//   snapshot.exists() → true if the document was found
//   snapshot.data()   → the actual object stored in Firestore
//
// Use getDoc() when you know EXACTLY which document you want.
// Contrast with getDocs() which reads MULTIPLE documents.
export async function fetchUserProfile(uid) {
  try {
    console.debug("[authService] fetchUserProfile started", { uid });
    const ref      = doc(db, "users", uid);   // pointer to users/{uid}
    const snapshot = await getDoc(ref);        // actually read it

    if (snapshot.exists()) {
      const profileData = { id: snapshot.id, ...snapshot.data() };
      console.debug("[authService] fetchUserProfile successful", profileData);
      return profileData;
    }

    console.warn("[authService] User profile not found in Firestore", { uid });
    return null; // document doesn't exist (shouldn't happen after sign up)
  } catch (error) {
    console.error("[authService] fetchUserProfile error:", error.message);
    throw error;
  }
}

// ── UPDATE USER PROFILE ───────────────────────────────────────
// ── FIRESTORE LESSON: updateDoc() ────────────────────────────
// updateDoc() MERGES your changes into the existing document.
// Only the fields you pass are updated — others stay untouched.
//
// COMMON MISTAKE: Using setDoc() to update — that REPLACES the
// entire document, deleting fields you didn't include!
// Always use updateDoc() when you only want partial changes.
import { updateDoc } from "firebase/firestore";

export async function updateUserProfile(uid, updates) {
  try {
    console.debug("[authService] updateUserProfile started", { uid, updates });
    const ref = doc(db, "users", uid);
    await updateDoc(ref, updates);
    console.debug("[authService] updateUserProfile successful");
  } catch (error) {
    console.error("[authService] updateUserProfile error:", error.message);
    throw error;
  }
}
