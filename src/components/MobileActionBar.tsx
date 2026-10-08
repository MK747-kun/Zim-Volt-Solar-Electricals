import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppGeneralUrl } from '../config';

interface MobileActionBarProps {
  config: AppConfig;
}

export const MobileActionBar: React.FC<MobileActionBarProps> = ({ config }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-neutral-950/95 backdrop-blur-lg border-t border-neutral-800 p-2.5 px-4 shadow-2xl flex items-center gap-2.5">
      {/* Call Button */}
      <a
        href={`tel:${config.phoneNumber.replace(/\s+/g, '')}`}
        className="flex-1 py-3 px-3 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-95 transition-all"
      >
        <Phone className="w-4 h-4 text-amber-400" />
        <span>Call Now</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={buildWhatsAppGeneralUrl(
          config.whatsappNumber,
          "Hi Zim-Volt, I would like to get a quote for a solar backup system in Harare."
        )}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[2] py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 hover:bg-emerald-500 active:scale-95 transition-all"
      >
        <MessageCircle className="w-4 h-4 fill-current" />
        <span>WhatsApp Quote</span>
      </a>
    </div>
  );
};
