// ============================================================
// src/pages/ProfilePage.jsx
// ============================================================
// FIRESTORE: updateDoc() — partial update of user document
// ============================================================

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/authService";

export default function ProfilePage() {
  const { currentUser, userProfile, setUserProfile } = useAuth();
  const [name, setName]       = useState(userProfile?.name || "");
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);

    // updateDoc() — only the "name" field changes; email/role untouched
    await updateUserProfile(currentUser.uid, { name });

    // Update local state so Navbar shows new name instantly
    setUserProfile((prev) => ({ ...prev, name }));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Profile</h1>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {/* Avatar placeholder */}
        <div className="w-16 h-16 rounded-full bg-brand-100 flex items-center justify-center text-2xl mb-6">
          {userProfile?.name?.charAt(0).toUpperCase() || "?"}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Full name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              value={currentUser?.email || ""}
              disabled
              className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2.5 text-sm text-gray-400 cursor-not-allowed"
            />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed here</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Role</label>
            <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
              {userProfile?.role || "customer"}
            </span>
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-2.5 rounded-lg font-semibold transition-colors
              ${saved
                ? "bg-green-500 text-white"
                : "bg-brand-500 text-white hover:bg-brand-600"
              } disabled:opacity-60`}
          >
            {saving ? "Saving…" : saved ? "✓ Saved!" : "Save Changes"}
          </button>
        </form>

        <div className="mt-6 border-t pt-4 text-xs text-gray-400 space-y-1">
          <p>📚 <strong>Firestore path:</strong> <code>users/{currentUser?.uid}</code></p>
          <p>📚 <strong>Operation:</strong> <code>updateDoc()</code> — only updates the "name" field</p>
          <p>📚 <strong>Joined:</strong> {userProfile?.createdAt?.toDate
            ? userProfile.createdAt.toDate().toLocaleDateString()
            : "Today"}</p>
        </div>
      </div>
    </div>
  );
}
