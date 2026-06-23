// ============================================================
// src/pages/SignupPage.jsx
// ============================================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Flame, Shield } from "lucide-react";
import { signUp } from "../services/authService";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";

export default function SignupPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const passwordStrength = form.password.length === 0
    ? 0
    : form.password.length < 6
      ? 1
      : form.password.length < 10
        ? 2
        : 3;

  const strengthLabels = ['', 'Weak', 'Good', 'Strong'];
  const strengthColors = ['', 'bg-error-500', 'bg-warning-500', 'bg-success-500'];

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await signUp(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
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
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
            className="absolute top-28 right-16 w-56 h-56 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10"
          />
          <motion.div
            animate={{ y: [0, 12, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 11, repeat: Infinity }}
            className="absolute bottom-20 left-20 w-40 h-40 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
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
            Start your
            <br />
            <span className="text-white/80">shopping journey</span>
          </h2>
          <p className="text-white/60 text-lg max-w-md">
            Create an account to unlock exclusive deals, track your orders, and enjoy a personalized experience.
          </p>

          <div className="flex items-center gap-3 mt-10 pt-10 border-t border-white/10">
            <Shield size={18} className="text-white/50" />
            <span className="text-white/50 text-sm">Your data is protected with enterprise-grade security</span>
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create account</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Join FireShop and start exploring premium products
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              icon={User}
            />

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

            <div>
              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Min. 6 characters"
                icon={Lock}
              />
              {/* Password strength indicator */}
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(level => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          passwordStrength >= level ? strengthColors[passwordStrength] : 'bg-gray-200 dark:bg-white/[0.06]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs mt-1 ${
                    passwordStrength === 1 ? 'text-error-500' : passwordStrength === 2 ? 'text-warning-500' : 'text-success-500'
                  }`}>
                    {strengthLabels[passwordStrength]}
                  </p>
                </div>
              )}
            </div>

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
              Create Account
              <ArrowRight size={16} />
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-500 dark:text-primary-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
