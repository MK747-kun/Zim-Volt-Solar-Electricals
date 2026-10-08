import React from 'react';
import { Sun, Phone, Mail, MapPin, MessageCircle, ShieldCheck, Clock, SlidersHorizontal } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppGeneralUrl } from '../config';

interface FooterProps {
  config: AppConfig;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenCustomizer }) => {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-neutral-950 shadow-md">
                <Sun className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-base sm:text-lg text-white">
                {config.businessName}
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Zimbabwe's trusted solar, backup inverter, and borehole electrical specialists. Keeping Harare homes, clinics, and businesses powered through load-shedding.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>ZETDC Compliant & Licensed</span>
            </div>
          </div>

          {/* Quick Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li>
                <a
                  href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
                  className="flex items-center gap-2.5 hover:text-amber-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{config.phoneNumber}</span>
                </a>
              </li>
              <li>
                <a
                  href={buildWhatsAppGeneralUrl(config.whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>WhatsApp: +{config.whatsappNumber}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{config.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{config.physicalAddress}</span>
              </li>
            </ul>
          </div>

          {/* Operating Hours & Dispatch */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Working Hours
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center justify-between">
                <span>Monday – Friday:</span>
                <span className="font-semibold text-white">7:30 AM – 5:30 PM</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Saturday:</span>
                <span className="font-semibold text-white">8:00 AM – 2:00 PM</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sunday & Holidays:</span>
                <span className="text-amber-400 font-medium">On-Call Emergencies</span>
              </li>
              <li className="pt-2 border-t border-neutral-800 text-[11px] text-neutral-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>24/7 Breakdown WhatsApp Support</span>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Areas Serviced
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {config.serviceAreas.join(', ')}, and surrounding peri-urban plots.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenCustomizer}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-amber-400 hover:text-amber-300 hover:border-neutral-700 transition-colors"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Contractor Template Settings</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {config.businessName}. All rights reserved. High-converting template built for Zimbabwean solar installers.
          </div>
          <div className="text-neutral-400">
            {config.pricingNote}
          </div>
        </div>
      </div>
    </footer>
  );
};
