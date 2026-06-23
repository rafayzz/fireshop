// ============================================================
// src/pages/LoginPage.jsx
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Flame, Sparkles } from "lucide-react";
import { logIn } from "../services/authService";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await logIn(form.email, form.password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-surface-50 dark:bg-surface-900">
      {/* Left: Brand Side */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500">
          <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
          {/* Decorative elements */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 right-20 w-64 h-64 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
          />
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-32 left-16 w-48 h-48 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <Flame size={24} />
            </div>
            <span className="text-2xl font-bold">FireShop</span>
          </div>

          <h2 className="text-4xl font-bold leading-tight mb-4">
            Welcome back to
            <br />
            <span className="text-white/80">your favorite store</span>
          </h2>
          <p className="text-white/60 text-lg max-w-md">
            Sign in to access your account, track orders, and enjoy a personalized shopping experience.
          </p>

          <div className="flex items-center gap-3 mt-10 pt-10 border-t border-white/10">
            <Sparkles size={18} className="text-white/50" />
            <span className="text-white/50 text-sm">Trusted by 50,000+ customers worldwide</span>
          </div>
        </div>
      </div>

      {/* Right: Form Side */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md shadow-primary-500/20">
              <Flame size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">FireShop</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              icon={Mail}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              icon={Lock}
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-error-500 bg-error-50 dark:bg-error-500/10 rounded-xl px-4 py-3 border border-error-100 dark:border-error-500/20"
              >
                {error}
              </motion.div>
            )}

            <Button type="submit" loading={loading} fullWidth size="lg" className="gap-2">
              Sign In
              <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary-500 dark:text-primary-400 font-semibold hover:underline">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
