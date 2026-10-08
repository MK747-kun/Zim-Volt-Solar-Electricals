import React, { useState } from 'react';
import { MapPin, ShieldCheck, CheckCircle2, Clock, Wrench, AlertCircle, PhoneCall, MessageCircle } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppGeneralUrl } from '../config';

interface CoverageTrustProps {
  config: AppConfig;
}

export const CoverageTrust: React.FC<CoverageTrustProps> = ({ config }) => {
  const [searchSuburb, setSearchSuburb] = useState('');
  const [activeSuburb, setActiveSuburb] = useState<string | null>(null);

  const matchedAreas = config.serviceAreas.filter((area) =>
    area.toLowerCase().includes(searchSuburb.toLowerCase())
  );

  return (
    <section id="coverage" className="py-16 md:py-24 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Harare Metropolitan Coverage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Rapid Site Visits Across Greater Harare
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Our certified solar technicians are dispatched daily with test meters and roof assessment tools.
          </p>
        </div>

        {/* Coverage Checker Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Suburb Explorer Card */}
          <div className="lg:col-span-6 bg-neutral-950 p-6 sm:p-7 rounded-2xl border border-neutral-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Service Areas & Free Site Visits</span>
              </h3>
              <span className="text-xs text-neutral-400">Click any suburb</span>
            </div>

            {/* Quick Filter Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Type your Harare suburb (e.g. Borrowdale, Ruwa)..."
                value={searchSuburb}
                onChange={(e) => setSearchSuburb(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3.5 text-xs sm:text-sm text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Suburb Tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {(searchSuburb ? matchedAreas : config.serviceAreas).map((area) => {
                const isSelected = activeSuburb === area;
                return (
                  <button
                    key={area}
                    onClick={() => setActiveSuburb(area)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-neutral-950 border-amber-400 font-bold shadow-md'
                        : 'bg-neutral-900/90 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white'
                    }`}
                  >
                    📍 {area}
                  </button>
                );
              })}
            </div>

            {/* Selected Suburb Dispatch Status Box */}
            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Coverage Confirmed</span>
                </span>
                <span className="text-[11px] text-neutral-400 font-medium">Free Travel & Inspection</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300">
                {activeSuburb
                  ? `Technicians are regularly in ${activeSuburb}. Book today for a free DB load survey and roof sizing.`
                  : "We cover all Harare northern and southern suburbs, Ruwa, Chitungwiza, Norton, and peri-urban plots."}
              </p>
              <a
                href={buildWhatsAppGeneralUrl(
                  config.whatsappNumber,
                  `Hi Zim-Volt, I am in ${activeSuburb || 'Harare'}. I would like to book a free site inspection for solar backup.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Book Free Inspection in {activeSuburb || 'My Suburb'}</span>
              </a>
            </div>
          </div>

          {/* 4 Trust Guarantee Boxes */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Free Site Inspection</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                No guessing or phone estimates. We inspect your main distribution board, earthing spike, and test borehole startup amps.
              </p>
            </div>

            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">ZETDC Compliance (COC)</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Full Certificate of Compliance issued. Legal and insurance-approved installations with proper changeover isolation.
              </p>
            </div>

            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">After-Sales Maintenance</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Complimentary 6-month checkup, battery firmware updates, and dust cleaning advisory to maximize solar yields.
              </p>
            </div>

            <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">24/7 Blackout Emergency</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Direct technician WhatsApp hotlines for priority response if an unforeseen inverter fault or grid surge happens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
