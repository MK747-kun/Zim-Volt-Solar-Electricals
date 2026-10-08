import React from 'react';
import { CheckCheck, MessageCircle, Star, ShieldCheck, Phone, Video, MoreVertical } from 'lucide-react';
import { AppConfig } from '../types';
import { WHATSAPP_TESTIMONIALS, buildWhatsAppGeneralUrl } from '../config';

interface WhatsAppReviewsProps {
  config: AppConfig;
}

export const WhatsAppReviews: React.FC<WhatsAppReviewsProps> = ({ config }) => {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Verified Customer Chats</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            What Harare Homeowners Say on WhatsApp
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Real feedback from local residents and business owners surviving load-shedding with our systems.
          </p>
        </div>

        {/* WhatsApp Chat Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {WHATSAPP_TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl bg-neutral-900/90 flex flex-col"
            >
              {/* WhatsApp Chat Top Header Bar */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between text-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-800/80 border border-emerald-400/40 flex items-center justify-center font-bold text-xs uppercase tracking-wider text-emerald-100">
                    {review.clientName.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-sm font-bold flex items-center gap-1.5 leading-tight">
                      <span>{review.clientName}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-200 fill-emerald-500" />
                    </div>
                    <div className="text-[11px] text-emerald-100/80 font-normal">
                      {review.suburb} · {review.system}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-emerald-100">
                  <Phone className="w-4 h-4 opacity-75" />
                  <Video className="w-4 h-4 opacity-75" />
                  <MoreVertical className="w-4 h-4 opacity-75" />
                </div>
              </div>

              {/* Chat Body (WhatsApp Chat Background Pattern) */}
              <div className="p-4 sm:p-5 flex-1 bg-[#0b141a] space-y-3 relative">
                {/* Subtle encrypted chat indicator */}
                <div className="text-center">
                  <span className="inline-block bg-[#182229] text-[#ffd279] text-[10px] px-2.5 py-1 rounded-md shadow-xs border border-[#222e35]">
                    🔒 End-to-end encrypted installation feedback
                  </span>
                </div>

                {/* Incoming Message Bubble */}
                <div className="max-w-[92%] sm:max-w-[88%] bg-[#202c33] text-neutral-100 rounded-2xl rounded-tl-sm p-3.5 shadow-md border border-[#2a3942]/40 space-y-2">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] text-neutral-400 ml-1 font-semibold">5.0 Star Rating</span>
                  </div>

                  {/* Message Text */}
                  <p className="text-xs sm:text-sm leading-relaxed text-neutral-200 font-normal">
                    "{review.message}"
                  </p>

                  {/* Message Meta Info */}
                  <div className="flex items-center justify-end gap-1.5 text-[10px] text-neutral-400 pt-1">
                    <span>{review.time}</span>
                    <CheckCheck className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                </div>

                {/* Outgoing Quick Reply Bubble */}
                <div className="ml-auto max-w-[85%] bg-[#005c4b] text-neutral-100 rounded-2xl rounded-tr-sm p-3 shadow-md border border-[#02735e]/40">
                  <p className="text-xs text-emerald-100 leading-snug">
                    Thank you so much! Always happy to keep your home running 24/7. Don't hesitate to message us if you ever need your 6-month checkup. ⚡
                  </p>
                  <div className="flex items-center justify-end gap-1.5 text-[10px] text-emerald-200/80 pt-1">
                    <span>Just now</span>
                    <CheckCheck className="w-3.5 h-3.5 text-sky-300" />
                  </div>
                </div>
              </div>

              {/* Chat Bottom Action Bar */}
              <div className="bg-[#202c33] p-3 border-t border-[#2a3942]/60 flex items-center justify-between">
                <span className="text-xs text-neutral-400">
                  System: <strong className="text-white">{review.system}</strong>
                </span>

                <a
                  href={buildWhatsAppGeneralUrl(
                    config.whatsappNumber,
                    `Hi Zim-Volt, I saw the review from ${review.clientName} in ${review.suburb} for their ${review.system}. I want a quote for my house.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>Get Quote Like This</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
