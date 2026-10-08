import React from 'react';
import { MessageCircle, ArrowRight, ShieldCheck, Zap, BatteryCharging, CheckCircle2, Clock } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppGeneralUrl } from '../config';

interface HeroProps {
  config: AppConfig;
  onExplorePackages: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onExplorePackages, onOpenCalculator }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-neutral-800 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Load-Shedding Status Banner */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold mb-6">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          <span>Harare Grid Alert: 16+ Hour Outages Active</span>
          <span className="hidden sm:inline text-neutral-400">· Fast 3-Day Turnaround Available</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Load-Shedding?{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                Power Your Home & Business
              </span>{' '}
              in 3 Days.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl">
              Premium solar installations and inverter upgrades across Harare & surrounding areas.
              Zero flickering, zero diesel generator noise. ZETDC-compliant with 5-year battery warranty.
            </p>

            {/* Core Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href={buildWhatsAppGeneralUrl(
                  config.whatsappNumber,
                  "Hi Zim-Volt, I want a fast solar installation quote for my property in Harare. Please let me know available slots."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Get a WhatsApp Quote</span>
              </a>

              <button
                onClick={onExplorePackages}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-neutral-200 bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 transition-all hover:text-white"
              >
                <span>Explore Packages</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* Quick Proof Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prices in USD (ZiG Accepted)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5-Year Battery Warranty</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Free Harare Site Inspection</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Card / Live Status Demo */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Live System Status: Offline Grid Ready
                  </span>
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  ZETDC Down · Solar Active
                </span>
              </div>

              {/* Power Flow Simulation */}
              <div className="py-5 space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800">
                    <Zap className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-xs text-neutral-400">Solar PV</div>
                    <div className="text-sm font-bold text-white">2,850 W</div>
                  </div>
                  <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800">
                    <BatteryCharging className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-xs text-neutral-400">Lithium BMS</div>
                    <div className="text-sm font-bold text-white">100% (Full)</div>
                  </div>
                  <div className="p-3 bg-neutral-950/70 rounded-xl border border-neutral-800">
                    <Clock className="w-5 h-5 text-sky-400 mx-auto mb-1" />
                    <div className="text-xs text-neutral-400">Backup Run</div>
                    <div className="text-sm font-bold text-white">18+ Hours</div>
                  </div>
                </div>

                {/* What's Currently Running in House */}
                <div className="bg-neutral-950/80 rounded-xl p-4 border border-neutral-800/80 space-y-2.5">
                  <div className="text-xs font-semibold text-neutral-300 flex items-center justify-between">
                    <span>Protected Harare Household Loads:</span>
                    <span className="text-emerald-400 font-mono">230V STABLE</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Deep Freezer & Fridge</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Starlink / Wi-Fi Router</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Borehole Water Pump</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Security Fence & Lights</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Link to Calculator */}
                <div className="pt-2">
                  <button
                    onClick={onOpenCalculator}
                    className="w-full flex items-center justify-between px-4 py-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 rounded-xl border border-amber-500/30 text-xs sm:text-sm font-semibold transition-all group"
                  >
                    <span>Unsure of your appliance load?</span>
                    <span className="flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform">
                      Try Solar Calculator <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom Guarantee */}
              <div className="pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  ZETDC Compliance Certificate (COC) Included
                </span>
                <span className="text-neutral-500">Sub-10ms Switching</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
