// ============================================================
// src/components/layout/Footer.jsx
// ============================================================

import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, Send, Hash } from 'lucide-react';
import { Container } from '../ui/Container';
import { Flame } from 'lucide-react';

export function Footer() {
  const links = {
    Shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/shop?sort=new' },
      { name: 'Best Sellers', href: '/shop?sort=popular' },
      { name: 'Sale', href: '/shop?sale=true' },
    ],
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
    Support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Track Order', href: '/track' },
      { name: 'Returns', href: '/returns' },
      { name: 'Shipping Info', href: '/shipping' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookies', href: '/cookies' },
    ],
  };

  return (
    <footer className="relative bg-gray-50 dark:bg-surface-950 border-t border-gray-100 dark:border-white/[0.04]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md shadow-primary-500/20">
                <Flame size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">
                FireShop
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              Your trusted destination for premium products and an exceptional shopping experience.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-gray-400 dark:text-gray-500 shrink-0" />
                <span>support@fireshop.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={14} className="text-gray-400 dark:text-gray-500 shrink-0 mt-0.5" />
                <span>123 Commerce St, Market City</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 mt-6">
              {[Send, Hash, Globe].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/[0.04] hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-500 dark:hover:text-primary-400 transition-all duration-200"
                  aria-label="Social link"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 dark:border-white/[0.04] py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} FireShop. All rights reserved.
            </p>

            {/* Payment Methods */}
            <div className="flex items-center gap-2">
              {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map(method => (
                <span
                  key={method}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.06]"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
