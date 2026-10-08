import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { AppConfig } from '../types';
import { FAQS, buildWhatsAppGeneralUrl } from '../config';

interface FaqAccordionProps {
  config: AppConfig;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ config }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Clear answers about equipment warranties, ZETDC compliance, and accepted currencies.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl border border-neutral-800 bg-neutral-950/80 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-900/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg bg-neutral-900 flex items-center justify-center shrink-0 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400 bg-neutral-800' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/80 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct Ask CTA */}
        <div className="text-center pt-4">
          <p className="text-xs sm:text-sm text-neutral-400 mb-3">
            Have a question about your specific distribution board or inverter?
          </p>
          <a
            href={buildWhatsAppGeneralUrl(
              config.whatsappNumber,
              "Hi Zim-Volt, I have a specific question about my home power setup before getting a quote."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Ask Us Directly on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
