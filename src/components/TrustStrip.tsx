import React from 'react';
import { Award, Shield, CheckCircle, MapPin } from 'lucide-react';
import { AppConfig } from '../types';
import { TRUST_EQUIPMENT_BRANDS } from '../config';

interface TrustStripProps {
  config: AppConfig;
}

export const TrustStrip: React.FC<TrustStripProps> = ({ config }) => {
  return (
    <section className="bg-neutral-900/60 border-b border-neutral-800 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Four Key Proof Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-neutral-950/80 p-4 sm:p-5 rounded-xl border border-neutral-800/80 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {config.completedInstalls}+
              </div>
              <div className="text-xs text-neutral-400 font-medium">Installs Across Harare</div>
            </div>
          </div>

          <div className="bg-neutral-950/80 p-4 sm:p-5 rounded-xl border border-neutral-800/80 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {config.warrantyYears}-Year
              </div>
              <div className="text-xs text-neutral-400 font-medium">Battery Replacement Warranty</div>
            </div>
          </div>

          <div className="bg-neutral-950/80 p-4 sm:p-5 rounded-xl border border-neutral-800/80 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                ZETDC
              </div>
              <div className="text-xs text-neutral-400 font-medium">Certified Installers & COC</div>
            </div>
          </div>

          <div className="bg-neutral-950/80 p-4 sm:p-5 rounded-xl border border-neutral-800/80 flex items-center gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                100% Free
              </div>
              <div className="text-xs text-neutral-400 font-medium">Pre-Quote Site Visit</div>
            </div>
          </div>
        </div>

        {/* Equipment Brand Trust Badges Strip */}
        <div className="pt-4 border-t border-neutral-800/80">
          <div className="text-center mb-4">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              Industry-Standard Tier 1 Solar & Inverter Hardware
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
            {TRUST_EQUIPMENT_BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex items-center gap-2.5 px-4 py-2 bg-neutral-950 rounded-lg border border-neutral-800/90 hover:border-neutral-700 transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-neutral-200">
                    {brand.name}
                  </span>
                  <span className="hidden sm:inline text-[11px] text-neutral-500 ml-1.5">
                    ({brand.tier})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
