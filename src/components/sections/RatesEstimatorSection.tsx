import React, { useState } from 'react';
import { PortfolioSection } from '../../types/portfolio';
import { Send, CheckCircle2, Shield, Calendar, Sparkles } from 'lucide-react';

interface RatesEstimatorSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const RatesEstimatorSection: React.FC<RatesEstimatorSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle } = components;

  // Selections
  const [scope, setScope] = useState<'commercial' | 'narrative' | 'fashion' | 'music'>('commercial');
  const [schedule, setSchedule] = useState<'1day' | '2-3days' | '5plus'>('1day');
  const [opticsPackage, setOpticsPackage] = useState<'arri' | 'red' | 'film'>('arri');
  const [addons, setAddons] = useState<Record<string, boolean>>({
    color: true,
    sound: false,
    drone: false,
    archive: false
  });

  // Form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formWindow, setFormWindow] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isSelected = (key: string) => selectedComponentKey === key;

  // Base scope pricing
  const scopeBasePrices = {
    commercial: 5500,
    narrative: 4800,
    fashion: 4200,
    music: 3900
  };

  // Schedule multipliers / day increments
  const scheduleAddons = {
    '1day': 0,
    '2-3days': 3200,
    '5plus': 7500
  };

  // Optics packages
  const opticsCosts = {
    arri: 1800,
    red: 1500,
    film: 2600
  };

  // Addon prices
  const addonCosts = {
    color: 1400,
    sound: 1200,
    drone: 1100,
    archive: 500
  };

  // Calculate total
  const calculatedBase = 
    scopeBasePrices[scope] +
    scheduleAddons[schedule] +
    opticsCosts[opticsPackage] +
    (addons.color ? addonCosts.color : 0) +
    (addons.sound ? addonCosts.sound : 0) +
    (addons.drone ? addonCosts.drone : 0) +
    (addons.archive ? addonCosts.archive : 0);

  const lowEstimate = calculatedBase;
  const highEstimate = Math.round(calculatedBase * 1.2 / 100) * 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormName('');
      setFormEmail('');
      setFormWindow('');
      setFormNotes('');
    }, 4000);
  };

  return (
    <div
      id="rates-section"
      className="relative px-6 md:px-12 py-24 transition-colors border-t border-slate-200/80 bg-white text-black"
      style={{
        backgroundColor: section.backgroundColor || '#ffffff',
        fontFamily
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Section Header */}
        <div>
          <span 
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('badge');
            }}
            className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-2 cursor-pointer"
          >
            PRODUCTION SCHEDULING & BUDGET PLANNER
          </span>

          <h2
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('title');
            }}
            className={`cursor-pointer tracking-tight transition-all rounded px-1 -mx-1 text-3xl sm:text-4xl font-extrabold uppercase ${
              isSelected('title') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : ''
            }`}
          >
            PRODUCTION RATES ESTIMATOR
          </h2>

          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Configure your technical scope, optical requirements, and post-production deliverables to generate an immediate estimated investment range.
          </p>
        </div>

        {/* 2-Column Calculator and Inquiry Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Calculators */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* 01. Production Scope */}
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-3">
                01. PRODUCTION SCOPE
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setScope('commercial')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    scope === 'commercial'
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-black border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono mb-1">
                    COMMERCIAL CAMPAIGN
                  </h4>
                  <p className={`text-[11px] leading-relaxed ${scope === 'commercial' ? 'text-slate-300' : 'text-slate-500'}`}>
                    Brand manifesto, broadcast commercials, and hero campaign motion.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setScope('narrative')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    scope === 'narrative'
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-black border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono mb-1">
                    NARRATIVE MOTION PICTURE
                  </h4>
                  <p className={`text-[11px] leading-relaxed ${scope === 'narrative' ? 'text-slate-300' : 'text-slate-500'}`}>
                    Short film, festival narrative, or indie feature principal cinematography.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setScope('fashion')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    scope === 'fashion'
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-black border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono mb-1">
                    FASHION & EDITORIAL
                  </h4>
                  <p className={`text-[11px] leading-relaxed ${scope === 'fashion' ? 'text-slate-300' : 'text-slate-500'}`}>
                    High-contrast studio lookbook motion, runway visuals, and monograph stills.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setScope('music')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    scope === 'music'
                      ? 'bg-black text-white border-black shadow-md'
                      : 'bg-white text-black border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono mb-1">
                    MUSIC VIDEO / VISUALIZER
                  </h4>
                  <p className={`text-[11px] leading-relaxed ${scope === 'music' ? 'text-slate-300' : 'text-slate-500'}`}>
                    Atmospheric performance narrative, stage haze, and bespoke lighting choreography.
                  </p>
                </button>
              </div>
            </div>

            {/* 02. Shooting Schedule */}
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-3">
                02. SHOOTING SCHEDULE
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: '1day', label: '1 PRODUCTION DAY' },
                  { id: '2-3days', label: '2–3 PRODUCTION DAYS' },
                  { id: '5plus', label: '5+ DAYS (PRINCIPAL)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSchedule(item.id as any)}
                    className={`py-3 px-2 text-center rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      schedule === item.id
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white text-black border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 03. Sensor & Optics Package */}
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-3">
                03. SENSOR & OPTICS PACKAGE
              </span>
              <div className="flex flex-col gap-2.5">
                {[
                  { id: 'arri', name: 'ARRI ALEXA 35 + COOKE PRIMES', cost: '+$1,800' },
                  { id: 'red', name: 'RED V-RAPTOR 8K LARGE FORMAT', cost: '+$1,500' },
                  { id: 'film', name: 'ANALOG 35MM FILM + 4K SCAN', cost: '+$2,600' }
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setOpticsPackage(pkg.id as any)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      opticsPackage === pkg.id
                        ? 'bg-black text-white border-black shadow-md'
                        : 'bg-white text-black border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <span>{pkg.name}</span>
                    <span className={opticsPackage === pkg.id ? 'text-slate-300' : 'text-slate-600'}>
                      {pkg.cost}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 04. Post-Production & Finishing Add-Ons */}
            <div>
              <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-3">
                04. POST-PRODUCTION & FINISHING ADD-ONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'color', label: 'Master DCI-P3 Color Grading', price: '+$1400' },
                  { id: 'sound', label: 'Cinematic Sound Design & Mix', price: '+$1200' },
                  { id: 'drone', label: 'Heavy-Lift 8K Cine Drone', price: '+$1100' },
                  { id: 'archive', label: 'Dual LTO RAW Dailies Archive', price: '+$500' }
                ].map((addon) => {
                  const isChecked = addons[addon.id];
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => setAddons(prev => ({ ...prev, [addon.id]: !prev[addon.id] }))}
                      className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-black text-white border-black shadow-sm'
                          : 'bg-white text-black border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked ? 'bg-white text-black border-white' : 'border-slate-400'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5 fill-current" />}
                        </div>
                        <span className="font-medium text-xs">{addon.label}</span>
                      </div>
                      <span className="font-mono text-xs">{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Investment Readout & Inquiry Booking Form */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-xl flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-1">
                ESTIMATED PRODUCTION INVESTMENT
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-black">
                  ${lowEstimate.toLocaleString()} – ${highEstimate.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">USD</span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                Includes crew rates, DP fee, insured kit packaging, and initial look-dev test reels.
              </p>
            </div>

            <hr className="border-slate-200" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <span className="text-xs font-bold tracking-wider uppercase font-mono text-black">
                REQUEST PRODUCTION BOOKING
              </span>

              {isSubmitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  <h4 className="text-sm font-bold text-emerald-900">Inquiry Transmitted</h4>
                  <p className="text-xs text-emerald-700">
                    Production schedule and look-dev treatment confirmed. Kai Ross Studio will reply within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                      YOUR NAME / STUDIO
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Elena Vance (Maison Noir)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-black focus:outline-none focus:border-black font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                      WORK EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="producer@studio.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-black focus:outline-none focus:border-black font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                      TARGET SHOOT WINDOW
                    </label>
                    <input
                      type="text"
                      value={formWindow}
                      onChange={(e) => setFormWindow(e.target.value)}
                      placeholder="e.g. Q4 2026 / November in Paris"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-black focus:outline-none focus:border-black font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
                      BRIEF NOTES & REFERENCES
                    </label>
                    <textarea
                      rows={3}
                      value={formNotes}
                      onChange={(e) => setFormNotes(e.target.value)}
                      placeholder="Describe mood board, reference stills, or technical requirements..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-black focus:outline-none focus:border-black font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 px-4 bg-black text-white hover:bg-slate-900 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/10 active:scale-[0.98]"
                  >
                    <span>SUBMIT PRODUCTION INQUIRY</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
