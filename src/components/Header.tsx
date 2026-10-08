import React, { useState } from 'react';
import { Phone, MessageCircle, Menu, X, Sun, ShieldCheck, SlidersHorizontal } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppGeneralUrl } from '../config';

interface HeaderProps {
  config: AppConfig;
  onOpenCustomizer: () => void;
}

export const Header: React.FC<HeaderProps> = ({ config, onOpenCustomizer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Packages', href: '#packages' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Coverage', href: '#coverage' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Notification / Emergency Wire */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-neutral-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-emerald-400">Harare Dispatch:</span>
            <span>Same-day free site visits available in {config.serviceAreas.slice(0, 3).join(', ')} & surrounds</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hidden sm:inline">Certified ZETDC Solar Electricians</span>
            <button
              onClick={onOpenCustomizer}
              className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-medium transition-colors"
              title="Customize contractor template details"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                {config.businessName}
              </div>
              <div className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
                <span className="text-amber-400">●</span>
                <span>Harare & Greater Zimbabwe</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="hidden xl:inline">{config.phoneNumber}</span>
              <span className="xl:hidden">Call</span>
            </a>

            <a
              href={buildWhatsAppGeneralUrl(config.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-lg shadow-emerald-900/30 transition-all hover:shadow-emerald-700/40 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Quote</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={buildWhatsAppGeneralUrl(config.whatsappNumber)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="px-3 py-2 text-base font-semibold text-neutral-200 hover:bg-neutral-900 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2.5">
              <a
                href={buildWhatsAppGeneralUrl(config.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp Now</span>
              </a>
              <a
                href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-neutral-200 bg-neutral-900 border border-neutral-800 rounded-lg"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Direct Call: {config.phoneNumber}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCustomizer();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Change Template Settings / Numbers</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
