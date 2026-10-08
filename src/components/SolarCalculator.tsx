import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Plus,
  Minus,
  MessageCircle,
  Zap,
  Battery,
  Sun,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Wifi,
  Tv,
  Refrigerator,
  Droplets,
  ShieldAlert,
  Flame,
  Gauge
} from 'lucide-react';
import { AppConfig, ApplianceItem } from '../types';
import { APPLIANCE_CATALOG, buildWhatsAppCalculatorUrl } from '../config';

interface SolarCalculatorProps {
  config: AppConfig;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="w-5 h-5 text-amber-400" />,
  Wifi: <Wifi className="w-5 h-5 text-sky-400" />,
  Tv: <Tv className="w-5 h-5 text-purple-400" />,
  Refrigerator: <Refrigerator className="w-5 h-5 text-blue-400" />,
  Droplets: <Droplets className="w-5 h-5 text-cyan-400" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-emerald-400" />,
  Zap: <Zap className="w-5 h-5 text-yellow-400" />,
  Gauge: <Gauge className="w-5 h-5 text-orange-400" />
};

export const SolarCalculator: React.FC<SolarCalculatorProps> = ({ config }) => {
  // Store quantities for each appliance
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    APPLIANCE_CATALOG.forEach((item) => {
      initial[item.id] = item.defaultQty ?? 0;
    });
    return initial;
  });

  const [selectedHoursOfLoadShedding, setSelectedHoursOfLoadShedding] = useState<number>(14);
  const [selectedSuburb, setSelectedSuburb] = useState<string>('Borrowdale');

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const toggleAppliance = (id: string) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      return { ...prev, [id]: current > 0 ? 0 : 1 };
    });
  };

  // Calculations
  const calculation = useMemo(() => {
    let continuousWatts = 0;
    let peakSurgeWatts = 0;
    let dailyWattHours = 0;
    const selectedNames: string[] = [];

    APPLIANCE_CATALOG.forEach((appliance) => {
      const qty = quantities[appliance.id] || 0;
      if (qty > 0) {
        const itemContinuous = appliance.runningWatts * qty;
        const itemSurge = itemContinuous * appliance.surgeMultiplier;

        continuousWatts += itemContinuous;
        peakSurgeWatts = Math.max(peakSurgeWatts, continuousWatts + (itemSurge - itemContinuous));
        dailyWattHours += itemContinuous * appliance.typicalHoursPerDay;

        selectedNames.push(qty > 1 ? `${qty}x ${appliance.name.split('(')[0].trim()}` : appliance.name.split('(')[0].trim());
      }
    });

    // Inverter sizing: continuous load with 25% safety margin + surge headroom
    let recommendedInverter = '1.2kW Pure Sine Wave';
    let inverterKw = 1.2;
    if (continuousWatts > 3500 || peakSurgeWatts > 6000) {
      recommendedInverter = '8kW Sunsynk/Growatt Hybrid';
      inverterKw = 8.0;
    } else if (continuousWatts > 2200 || peakSurgeWatts > 4000) {
      recommendedInverter = '5kW Sunsynk / Deye Hybrid';
      inverterKw = 5.0;
    } else if (continuousWatts > 900 || peakSurgeWatts > 2000) {
      recommendedInverter = '3.2kW Hybrid Inverter';
      inverterKw = 3.2;
    }

    // Battery sizing: based on selected load-shedding backup hours
    // (Watt-hours needed = continuousWatts * selectedHours * 0.70 diversity factor)
    const backupHoursNeeded = selectedHoursOfLoadShedding;
    const requiredKwh = (continuousWatts * backupHoursNeeded * 0.65) / 1000;

    let recommendedBattery = '100Ah / 1.2kWh Lithium Battery';
    let batteryKwh = 1.2;
    if (requiredKwh > 6.0) {
      recommendedBattery = '10kWh Lithium Bank (2x 5.12kWh)';
      batteryKwh = 10.2;
    } else if (requiredKwh > 3.0 || continuousWatts > 1200) {
      recommendedBattery = '5.12kWh High-Capacity LiFePO4';
      batteryKwh = 5.12;
    } else if (requiredKwh > 1.2 || continuousWatts > 400) {
      recommendedBattery = '2.5kWh Lithium (LiFePO4)';
      batteryKwh = 2.5;
    }

    // Panels recommendation (Zimbabwe receives ~5.5 peak sun hours)
    let recommendedPanels = '2x 450W Mono Solar Panels (900W PV)';
    if (inverterKw >= 5.0 || requiredKwh > 4.0) {
      recommendedPanels = '8x 550W Tier-1 Panels (4.4kW PV)';
    } else if (inverterKw >= 3.0 || requiredKwh > 2.0) {
      recommendedPanels = '4x 550W Mono Half-Cell Panels (2.2kW PV)';
    }

    // Estimated backup hours runtime on battery
    const realisticHours = continuousWatts > 0
      ? Math.min(30, Math.round((batteryKwh * 1000 * 0.85) / continuousWatts))
      : 24;

    return {
      continuousWatts,
      peakSurgeWatts: Math.round(peakSurgeWatts),
      recommendedInverter,
      recommendedBattery,
      recommendedPanels,
      selectedNames,
      realisticHours,
      hasBorehole: (quantities['borehole_pump'] || 0) > 0,
      hasFridge: (quantities['fridge_freezer'] || 0) > 0
    };
  }, [quantities, selectedHoursOfLoadShedding]);

  const waUrl = useMemo(() => {
    const summary = calculation.selectedNames.length > 0
      ? calculation.selectedNames.join(', ')
      : 'Standard Household Appliances';
    const rec = `${calculation.recommendedInverter} with ${calculation.recommendedBattery} and ${calculation.recommendedPanels}`;
    return buildWhatsAppCalculatorUrl(config.whatsappNumber, summary, rec, selectedSuburb);
  }, [calculation, config.whatsappNumber, selectedSuburb]);

  return (
    <section id="calculator" className="py-16 md:py-24 bg-neutral-900/80 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Zimbabwe Load Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Calculate Your Home & Borehole Power Needs
          </h2>
          <p className="text-sm sm:text-base text-neutral-400">
            Select the appliances you must run during ZESA outages. Our algorithm factors in Zimbabwe-specific inductive motor surge to recommend the ideal inverter and battery.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Appliance Checkers & Quantities */}
          <div className="lg:col-span-7 bg-neutral-950 p-6 sm:p-7 rounded-2xl border border-neutral-800 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Select Your Household Appliances:</span>
              </h3>
              <span className="text-xs text-neutral-400">
                Tap + / - to adjust quantity
              </span>
            </div>

            {/* Appliance List Grid */}
            <div className="space-y-3">
              {APPLIANCE_CATALOG.map((item) => {
                const qty = quantities[item.id] || 0;
                const isSelected = qty > 0;

                return (
                  <div
                    key={item.id}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-neutral-900/90 border-amber-500/40 shadow-sm'
                        : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                    }`}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                      onClick={() => toggleAppliance(item.id)}
                    >
                      <div className="w-9 h-9 rounded-lg bg-neutral-800/80 flex items-center justify-center shrink-0">
                        {ICON_MAP[item.icon] || <Zap className="w-5 h-5 text-amber-400" />}
                      </div>
                      <div className="truncate">
                        <div className="text-xs sm:text-sm font-semibold text-white truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                          <span>~{item.runningWatts}W running</span>
                          {item.surgeMultiplier > 2 && (
                            <span className="text-amber-400 font-medium">· Inductive motor</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={qty === 0}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors ${
                          qty === 0
                            ? 'border-neutral-800 text-neutral-600 cursor-not-allowed'
                            : 'border-neutral-700 text-neutral-200 hover:bg-neutral-800'
                        }`}
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-6 text-center font-bold text-xs sm:text-sm text-white">
                        {qty}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 flex items-center justify-center transition-colors"
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Outage Duration Preferences */}
            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <label className="text-xs font-semibold text-neutral-300 block">
                Target Daily Load-Shedding Hours to Cover:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[8, 14, 20].map((hours) => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => setSelectedHoursOfLoadShedding(hours)}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                      selectedHoursOfLoadShedding === hours
                        ? 'bg-amber-400 text-neutral-950 border-amber-400 shadow-sm'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:bg-neutral-800'
                    }`}
                  >
                    {hours} Hours Backup
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic System Recommendation Output */}
          <div className="lg:col-span-5 bg-neutral-950 p-6 sm:p-7 rounded-2xl border border-neutral-800 space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Recommended System Specification
              </span>
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Real-Time Sizing
              </span>
            </div>

            {/* Metric Counters */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                <div className="text-[11px] text-neutral-400 font-medium">Continuous Load</div>
                <div className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {calculation.continuousWatts} <span className="text-xs font-normal text-neutral-400">Watts</span>
                </div>
              </div>

              <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                <div className="text-[11px] text-neutral-400 font-medium">Estimated Peak Surge</div>
                <div className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">
                  {calculation.peakSurgeWatts} <span className="text-xs font-normal text-neutral-400">Watts</span>
                </div>
              </div>
            </div>

            {/* Smart Hardware Suggestions */}
            <div className="space-y-3.5">
              <div className="p-4 bg-neutral-900/90 rounded-xl border border-neutral-800/90 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase font-semibold">
                    Recommended Inverter
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {calculation.recommendedInverter}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Pure sine wave with fast transfer switch (&lt;10ms)
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neutral-900/90 rounded-xl border border-neutral-800/90 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                  <Battery className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase font-semibold">
                    Recommended Lithium Battery
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {calculation.recommendedBattery}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    LiFePO4 with 6,000 deep discharge cycles
                  </div>
                </div>
              </div>

              <div className="p-4 bg-neutral-900/90 rounded-xl border border-neutral-800/90 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400 uppercase font-semibold">
                    Recommended Solar Panel Array
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white">
                    {calculation.recommendedPanels}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    Tier 1 Monocrystalline with 25-yr linear output
                  </div>
                </div>
              </div>
            </div>

            {/* Special Notice for Boreholes or Fridges */}
            {calculation.hasBorehole && (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  <strong>Borehole Pump Detected:</strong> Our engineers recommend a 3.2kW or 5kW hybrid inverter with soft-start or solar direct VFD to protect your pump motor windings against voltage sag.
                </span>
              </div>
            )}

            {/* Suburb Selector for Site Visit */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-300 block">
                Your Suburb in Harare & Surrounds:
              </label>
              <select
                value={selectedSuburb}
                onChange={(e) => setSelectedSuburb(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-neutral-200 focus:outline-none focus:border-amber-400"
              >
                {config.serviceAreas.map((area) => (
                  <option key={area} value={area}>
                    {area} (Free Site Visit Available)
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp Direct Action CTA */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/40 transition-all active:scale-95 text-sm sm:text-base"
            >
              <MessageCircle className="w-5 h-5 fill-current shrink-0" />
              <span>Send My Calculation to WhatsApp</span>
            </a>

            <div className="text-center text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pre-fills your exact appliance list for our technicians</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
