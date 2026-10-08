import React, { useState } from 'react';
import { X, Copy, Check, Download, RotateCcw, Sparkles } from 'lucide-react';
import { AppConfig } from '../types';
import { INITIAL_CONFIG } from '../config';

interface ConfigCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onUpdateConfig: (newConfig: AppConfig) => void;
}

export const ConfigCustomizerModal: React.FC<ConfigCustomizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}) => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<AppConfig>(config);

  if (!isOpen) return null;

  const handleChange = (field: keyof AppConfig, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePackagePriceChange = (pkgId: string, newPrice: number) => {
    setFormData((prev) => ({
      ...prev,
      packages: prev.packages.map((pkg) =>
        pkg.id === pkgId ? { ...pkg, price: newPrice } : pkg
      )
    }));
  };

  const handleApply = () => {
    onUpdateConfig(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData(INITIAL_CONFIG);
    onUpdateConfig(INITIAL_CONFIG);
  };

  const generatedJsCode = `const CONFIG = {
  businessName: "${formData.businessName}",
  whatsappNumber: "${formData.whatsappNumber}", // Country code + phone without '+'
  phoneNumber: "${formData.phoneNumber}",
  email: "${formData.email}",
  physicalAddress: "${formData.physicalAddress}",
  serviceAreas: ${JSON.stringify(formData.serviceAreas)},
  currencySymbol: "${formData.currencySymbol}",
  pricingNote: "${formData.pricingNote}",
  packages: ${JSON.stringify(
    formData.packages.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      idealFor: p.idealFor,
      specs: p.specs
    })),
    null,
    4
  )}
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedJsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadConfig = () => {
    const blob = new Blob([generatedJsCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'config.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <h3 className="text-lg font-bold text-white">Contractor Fast-Onboarding Customizer</h3>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Modify details to rebrand this template for any Zimbabwean solar contractor in seconds.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs sm:text-sm">
          {/* Business Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              1. Business Contact Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Business Name:
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  WhatsApp Number (with country code, no +):
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  placeholder="263771234567"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Phone Display String:
                </label>
                <input
                  type="text"
                  value={formData.phoneNumber}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Email Address:
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                  Physical Workshop / Office Address:
                </label>
                <input
                  type="text"
                  value={formData.physicalAddress}
                  onChange={(e) => handleChange('physicalAddress', e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Package Prices */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              2. Package USD Pricing
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {formData.packages.map((pkg) => (
                <div key={pkg.id} className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800">
                  <div className="font-bold text-xs text-neutral-200 mb-1">{pkg.name}</div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-neutral-400">$</span>
                    <input
                      type="number"
                      value={pkg.price}
                      onChange={(e) => handlePackagePriceChange(pkg.id, Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-1.5 text-white font-bold text-xs sm:text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold text-neutral-300 block mb-1">
                Currency & ZiG Conversion Note:
              </label>
              <input
                type="text"
                value={formData.pricingNote}
                onChange={(e) => handleChange('pricingNote', e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-400 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Generated Code Preview */}
          <div className="space-y-2 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Generated config.js for Deployment:
              </h4>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadConfig}
                  className="flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 bg-neutral-950 px-2.5 py-1 rounded-md border border-neutral-800"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download config.js</span>
                </button>
              </div>
            </div>

            <pre className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/80 text-[11px] font-mono text-neutral-300 overflow-x-auto max-h-36">
              {generatedJsCode}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-neutral-800 bg-neutral-950 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-neutral-200 px-3 py-2 rounded-lg hover:bg-neutral-900"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              Apply Changes to Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
