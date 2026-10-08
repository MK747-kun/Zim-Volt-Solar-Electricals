import React, { useState } from 'react';
import { Camera, MapPin, CheckCircle, X, ExternalLink, MessageCircle, ArrowRight } from 'lucide-react';
import { AppConfig, PortfolioProject } from '../types';
import { PORTFOLIO_PROJECTS, buildWhatsAppQuoteUrl } from '../config';

interface PortfolioProps {
  config: AppConfig;
}

type CategoryFilter = 'all' | 'residential' | 'commercial' | 'borehole' | 'repairs';

export const Portfolio: React.FC<PortfolioProps> = ({ config }) => {
  const [filter, setFilter] = useState<CategoryFilter>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  const filteredProjects = PORTFOLIO_PROJECTS.filter((p) => {
    if (filter === 'all') return true;
    return p.category === filter;
  });

  const categories: { key: CategoryFilter; label: string }[] = [
    { key: 'all', label: 'All Projects' },
    { key: 'residential', label: 'Residential' },
    { key: 'commercial', label: 'Commercial' },
    { key: 'borehole', label: 'Borehole Pumps' },
    { key: 'repairs', label: 'Electrical Repairs' },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>Real Zimbabwe Installations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Our Work in Harare & Surrounds
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Every installation adheres to strict ZETDC wiring standards with laser-level trunking, dedicated surge protection, and neat battery cabinets.
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-neutral-900 rounded-xl max-w-2xl mx-auto border border-neutral-800">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                filter === cat.key
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-neutral-900/70 rounded-2xl border border-neutral-800 hover:border-neutral-700 overflow-hidden flex flex-col justify-between group transition-all"
            >
              {/* Image Thumbnail with Overlay */}
              <div
                className="relative h-56 sm:h-60 overflow-hidden bg-neutral-950 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                {/* Suburb Pill on Image */}
                <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md border border-neutral-800 px-2.5 py-1 rounded-md text-[11px] font-semibold text-neutral-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{project.location}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-amber-300 font-bold">
                  <span>{project.systemSize}</span>
                  <span className="text-neutral-400 text-[11px] underline">Click to inspect</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3
                    className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Specs check items */}
                <div className="pt-2 border-t border-neutral-800/80 space-y-1.5">
                  <div className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                    Components Installed:
                  </div>
                  <div className="space-y-1 text-xs text-neutral-300">
                    {project.specs.slice(0, 3).map((spec, i) => (
                      <div key={i} className="flex items-center gap-2 truncate">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={buildWhatsAppQuoteUrl(
                      config.whatsappNumber,
                      `System similar to ${project.title}`,
                      0
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>Get Similar Setup</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Image Header */}
              <div className="relative h-64 sm:h-80 bg-neutral-950">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-neutral-950/80 text-white hover:bg-neutral-900 rounded-full border border-neutral-700"
                  aria-label="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4 bg-neutral-950/90 border border-neutral-800 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{selectedProject.location}</span>
                </div>
              </div>

              {/* Modal Details */}
              <div className="p-6 sm:p-7 space-y-5">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-semibold text-amber-400 mt-1">
                    System Specification: {selectedProject.systemSize}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Before / After Section if available */}
                {selectedProject.beforeAfter && (
                  <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs space-y-1.5">
                    <div className="font-bold text-neutral-200">Problem & Solution:</div>
                    <div className="text-rose-400">
                      <strong>Before:</strong> {selectedProject.beforeAfter.beforeDesc}
                    </div>
                    <div className="text-emerald-400">
                      <strong>After:</strong> {selectedProject.beforeAfter.afterDesc}
                    </div>
                  </div>
                )}

                {/* All Specs */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Installed Components & Standards:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                    {selectedProject.specs.map((spec, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Action */}
                <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row gap-3">
                  <a
                    href={buildWhatsAppQuoteUrl(
                      config.whatsappNumber,
                      `System like: ${selectedProject.title}`,
                      0
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Inquire for Similar Setup in My Area</span>
                  </a>

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="py-3 px-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-sm font-semibold rounded-xl border border-neutral-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
