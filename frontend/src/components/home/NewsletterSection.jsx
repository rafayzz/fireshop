// ============================================================
// src/components/home/NewsletterSection.jsx
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500">
        <div className="absolute inset-0 bg-mesh-gradient opacity-40" />
        {/* Decorative circles */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
            <Mail size={24} className="text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Stay in the Loop
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Get exclusive deals, new arrivals, and insider updates delivered to your inbox.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 text-white"
            >
              <CheckCircle size={24} />
              <span className="text-lg font-semibold">You're subscribed! Welcome aboard.</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all text-sm"
              />
              <Button
                type="submit"
                className="bg-white text-primary-600 hover:bg-white/90 shadow-lg gap-2 shrink-0"
                size="md"
              >
                Subscribe
                <ArrowRight size={16} />
              </Button>
            </form>
          )}

          <p className="text-white/40 text-xs mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export default NewsletterSection;
