import React, { useState, useEffect } from 'react';
import { INITIAL_CONFIG } from './config';
import { AppConfig } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { PackagesGrid } from './components/PackagesGrid';
import { SolarCalculator } from './components/SolarCalculator';
import { Portfolio } from './components/Portfolio';
import { CoverageTrust } from './components/CoverageTrust';
import { WhatsAppReviews } from './components/WhatsAppReviews';
import { FaqAccordion } from './components/FaqAccordion';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MobileActionBar } from './components/MobileActionBar';
import { ConfigCustomizerModal } from './components/ConfigCustomizerModal';

export default function App() {
  const [config, setConfig] = useState<AppConfig>(INITIAL_CONFIG);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  // Register minimal service worker for offline & low-bandwidth performance if supported
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration note:', err);
      });
    }
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950 pb-16 sm:pb-0">
      {/* 1. Header with Sticky Navigation & Quick CTAs */}
      <Header
        config={config}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      <main className="flex-1">
        {/* 2. Hero Section: High-Converting Headline, Harare Load-Shedding Context, CTAs */}
        <Hero
          config={config}
          onExplorePackages={() => scrollToSection('packages')}
          onOpenCalculator={() => scrollToSection('calculator')}
        />

        {/* 3. Trust & Proof Strip: 500+ Installs, 5-Yr Warranty, Brand Trust Badges */}
        <TrustStrip config={config} />

        {/* 4. Pricing Packages Grid (USD Tier Cards) */}
        <PackagesGrid config={config} />

        {/* 5. Solar Load & System Calculator */}
        <SolarCalculator config={config} />

        {/* 6. Interactive Portfolio & Past Harare Installations */}
        <Portfolio config={config} />

        {/* 7. Service Coverage & Trust Guarantees */}
        <CoverageTrust config={config} />

        {/* 8. WhatsApp-Style Testimonials */}
        <WhatsAppReviews config={config} />

        {/* 9. Frequently Asked Questions (Accordion) */}
        <FaqAccordion config={config} />
      </main>

      {/* 10. Footer with Complete Business Info & Certifications */}
      <Footer
        config={config}
        onOpenCustomizer={() => setCustomizerOpen(true)}
      />

      {/* 11. Floating WhatsApp Bubble with Pulse Animation */}
      <FloatingWhatsApp config={config} />

      {/* 12. Fixed Mobile Bottom Action Bar (Call + WhatsApp) */}
      <MobileActionBar config={config} />

      {/* 13. Contractor Fast Onboarding Customizer Modal */}
      <ConfigCustomizerModal
        isOpen={customizerOpen}
        onClose={() => setCustomizerOpen(false)}
        config={config}
        onUpdateConfig={(newConfig) => setConfig(newConfig)}
      />
    </div>
  );
}
