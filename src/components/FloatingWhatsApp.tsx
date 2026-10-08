import React from 'react';
import { MessageCircle } from 'lucide-react';
import { AppConfig } from '../types';
import { buildWhatsAppGeneralUrl } from '../config';

interface FloatingWhatsAppProps {
  config: AppConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ config }) => {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 group">
      {/* Tooltip badge */}
      <span className="hidden sm:inline-block bg-neutral-900/95 text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-neutral-800 shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with a Solar Tech
      </span>

      {/* Pulsing Bubble */}
      <a
        href={buildWhatsAppGeneralUrl(
          config.whatsappNumber,
          "Hi Zim-Volt, I need assistance with solar power installation in Harare."
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Contact"
        className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/80 transition-transform hover:scale-110 active:scale-95"
      >
        {/* Radar ping animation */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-40 animate-ping pointer-events-none" />

        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10" />

        {/* Online Indicator */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-neutral-950 rounded-full" />
      </a>
    </div>
  );
};
