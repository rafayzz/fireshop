// ============================================================
// src/pages/ProfilePage.jsx
// ============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, Calendar, Check } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../services/authService";
import { Layout } from "../components/layout/Layout";
import { Container } from "../components/ui/Container";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";

export default function ProfilePage() {
  const { currentUser, userProfile, setUserProfile } = useAuth();
  const [name, setName] = useState(userProfile?.name || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    await updateUserProfile(currentUser.uid, { name });
    setUserProfile((prev) => ({ ...prev, name }));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <Layout>
      <Container size="sm">
        <div className="py-8 lg:py-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-heading font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-surface-850 rounded-2xl border border-gray-100 dark:border-white/[0.06] overflow-hidden"
          >
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-bold border border-white/20">
                  {userProfile?.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {userProfile?.name || "User"}
                  </h2>
                  <p className="text-white/70 text-sm">{currentUser?.email}</p>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="p-6 space-y-6">
              <form onSubmit={handleSave} className="space-y-5">
                <Input
                  label="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={User}
                />

                <Input
                  label="Email Address"
                  type="email"
                  value={currentUser?.email || ""}
                  disabled
                  icon={Mail}
                  containerClassName="opacity-60"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                  <Badge variant="primary" size="md" className="gap-1.5">
                    <Shield size={12} />
                    {userProfile?.role || "customer"}
                  </Badge>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Member Since</label>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar size={14} />
                    {userProfile?.createdAt?.toDate
                      ? userProfile.createdAt.toDate().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                      : "Today"}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/[0.06]">
                  <Button
                    type="submit"
                    loading={saving}
                    fullWidth
                    size="lg"
                    className={saved ? 'bg-success-500 hover:bg-success-600 from-success-500 to-success-600' : ''}
                  >
                    {saving ? "Saving…" : saved ? (
                      <span className="flex items-center gap-2"><Check size={18} /> Saved!</span>
                    ) : "Save Changes"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </Layout>
  );
}
