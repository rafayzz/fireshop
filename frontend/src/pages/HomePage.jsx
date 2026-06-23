// ============================================================
// src/pages/HomePage.jsx
// ============================================================

import { HeroSection } from '../components/home/HeroSection';
import { FeaturedProducts } from '../components/home/FeaturedProducts';
import { CategoriesSection } from '../components/home/CategoriesSection';
import { TrustIndicators } from '../components/home/TrustIndicators';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { NewsletterSection } from '../components/home/NewsletterSection';
import { Layout } from '../components/layout/Layout';

export function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <TrustIndicators />
      <FeaturedProducts />
      <CategoriesSection />
      <TestimonialsSection />
      <NewsletterSection />
    </Layout>
  );
}

export default HomePage;
