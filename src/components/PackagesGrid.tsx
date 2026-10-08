import React from 'react';
import { MessageCircle, Check, Zap, Sparkles, Clock, ShieldCheck } from 'lucide-react';
import { AppConfig, SolarPackage } from '../types';
import { buildWhatsAppQuoteUrl } from '../config';

interface PackagesGridProps {
  config: AppConfig;
}

export const PackagesGrid: React.FC<PackagesGridProps> = ({ config }) => {
  return (
    <section id="packages" className="py-16 md:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Turnkey Solar Packages</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Clear USD Pricing. Zero Hidden Fees.
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Full complete kits including inverters, lithium batteries, solar panels, DC/AC protection, trunking, and ZETDC-compliant installation.
          </p>
          <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 font-medium inline-block">
            ⚡ {config.pricingNote}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {config.packages.map((pkg) => {
            const isPopular = pkg.popular;
            const waUrl = buildWhatsAppQuoteUrl(
              config.whatsappNumber,
              pkg.name,
              pkg.price,
              config.currencySymbol
            );

            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-200 ${
                  isPopular
                    ? 'bg-neutral-900/95 border-2 border-amber-400/80 shadow-2xl shadow-amber-950/20 md:-translate-y-2'
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Popular Ribbon */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-400 text-neutral-950 text-xs font-black uppercase tracking-wider py-1 px-4 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    <span>Most Popular in Harare</span>
                  </div>
                )}

                {/* Card Top Content */}
                <div className="p-6 sm:p-7 space-y-6">
                  {/* Title & Price */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {pkg.name}
                    </h3>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold text-neutral-400">
                        {config.currencySymbol}
                      </span>
                      <span className="text-4xl font-black tracking-tight text-white">
                        ${pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium ml-1">
                        / all-inclusive
                      </span>
                    </div>
                  </div>

                  {/* Ideal For Target Box */}
                  <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                      Best For Your Home:
                    </div>
                    <div className="text-xs sm:text-sm text-neutral-300 font-medium leading-snug">
                      {pkg.idealFor}
                    </div>
                  </div>

                  {/* Key Hardware Specs Chips */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">Inverter</span>
                      <span className="font-bold text-neutral-200">{pkg.inverterRating || 'Hybrid Inverter'}</span>
                    </div>
                    <div className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                      <span className="text-neutral-500 block text-[10px]">Battery</span>
                      <span className="font-bold text-neutral-200">{pkg.batteryCapacity || 'LiFePO4 Storage'}</span>
                    </div>
                  </div>

                  {/* Detailed Specs List */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Package Includes:
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-300">
                      {pkg.specs.map((spec, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Bottom CTA */}
                <div className="p-6 sm:p-7 pt-0 border-t border-neutral-800/80 mt-4 space-y-3">
                  <div className="flex items-center justify-between text-xs text-neutral-400 pt-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {pkg.turnaroundDays || 2}-day installation
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Full Warranty
                    </span>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-md ${
                      isPopular
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/50'
                        : 'bg-neutral-800 hover:bg-emerald-600 hover:text-white text-neutral-100 border border-neutral-700 hover:border-emerald-500'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Ask About This Package</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Solution Notice */}
        <div className="bg-neutral-900/80 rounded-2xl p-6 sm:p-8 border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg font-bold text-white">Need a Custom Size or Borehole Solar Direct System?</h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              We design custom 10kVA, 15kVA three-phase systems for factories, schools, lodges, and farms across Zimbabwe.
            </p>
          </div>
          <a
            href={buildWhatsAppQuoteUrl(config.whatsappNumber, "Custom Commercial/Farm Solar System", 0)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-300 font-bold text-sm border border-neutral-700 transition-colors flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 fill-current text-emerald-400" />
            <span>Request Custom Engineering</span>
          </a>
        </div>
      </div>
    </section>
  );
};
