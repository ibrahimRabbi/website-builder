import React, { useState } from 'react';
import { PortfolioSection } from '../../types/portfolio';
import { Camera, Check, Aperture, Wind, SunMedium } from 'lucide-react';

interface GearSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const GearSection: React.FC<GearSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle } = components;
  const [activeTab, setActiveTab] = useState<string>('ALL EQUIPMENT');

  const isSelected = (key: string) => selectedComponentKey === key;

  const tabs = [
    'ALL EQUIPMENT',
    'CAMERAS',
    'OPTICS',
    'STABILIZATION & DRONE',
    'LIGHTING'
  ];

  const gearItems = [
    {
      brand: 'ARRI',
      title: 'ALEXA 35',
      category: 'CAMERAS',
      status: 'CALIBRATED',
      icon: Camera,
      specs: '4.6K Super 35 Sensor · 17 Stops Dynamic Range · REKORD ProRes 4444 XQ & ARRIRAW',
      note: 'Primary narrative and commercial cinema camera'
    },
    {
      brand: 'LEICA',
      title: 'M11 MONOCHROM',
      category: 'CAMERAS',
      status: 'CALIBRATED',
      icon: Camera,
      specs: '60MP Dedicated B&W Sensor · No Color Filter Array · BSI CMOS · Native ISO 64',
      note: 'Pure silver halide analog look digital capture'
    },
    {
      brand: 'COOKE',
      title: 'SPEED PANCHRO S2/S3 (VINTAGE 1960S)',
      category: 'OPTICS',
      status: 'CALIBRATED',
      icon: Aperture,
      specs: '18mm, 25mm, 32mm, 40mm, 50mm, 75mm · PL Mount · Warm flare & gentle roll-off',
      note: 'Organic skin textures and velvety bokeh'
    },
    {
      brand: 'ATLAS',
      title: 'ORION 2X ANAMORPHIC PRIMES',
      category: 'OPTICS',
      status: 'CALIBRATED',
      icon: Aperture,
      specs: '32mm, 50mm, 80mm T2.0 · 2x Squeeze · Oval Bokeh & Streaking Flares',
      note: 'Cinematic 2.39:1 widescreen scope'
    },
    {
      brand: 'FREEFLY & DJI',
      title: 'MŌVI PRO RIG + INSPIRE 3 8K DRONE',
      category: 'STABILIZATION & DRONE',
      status: 'CALIBRATED',
      icon: Wind,
      specs: '3-Axis Carbon Gimbal · Full Cine Lens Weight · 8K Full-Frame CinemaDNG Aerial',
      note: 'Dynamic fluid tracking shots and high-altitude motion'
    },
    {
      brand: 'ASTERA & APUTURE',
      title: 'TITAN TUBES FP1 + ELECTRO STORM XT26',
      category: 'LIGHTING',
      status: 'CALIBRATED',
      icon: SunMedium,
      specs: '2600W Bi-Color Point Source + 8-Tube Wireless DMX Battery Tubes · 98+ CRI',
      note: 'Precise shapeable chiaroscuro and atmospheric fill'
    }
  ];

  const filteredItems = activeTab === 'ALL EQUIPMENT'
    ? gearItems
    : gearItems.filter(g => g.category === activeTab);

  return (
    <div
      id="equipment-section"
      className="relative px-6 md:px-12 py-24 transition-colors border-t border-slate-200/80 bg-white text-black"
      style={{
        backgroundColor: section.backgroundColor || '#ffffff',
        fontFamily
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Header & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('badge');
              }}
              className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-2 cursor-pointer"
            >
              OPTICAL PACKAGES & PRODUCTION RIGGING
            </span>

            <h2
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('title');
              }}
              className={`cursor-pointer tracking-tight transition-all rounded px-1 -mx-1 text-3xl sm:text-4xl font-extrabold uppercase text-black ${
                isSelected('title') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : ''
              }`}
            >
              {title?.text || 'EQUIPMENT VAULT'}
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {subtitle?.text || 'Owned cinema packages and bespoke vintage glass calibrated for immediate worldwide deployment.'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 bg-slate-50">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-slate-600 hover:text-black hover:bg-slate-200/60'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6 Calibrated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-slate-200 bg-white hover:border-black transition-all flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Icon className="w-3.5 h-3.5" />
                      <span>{item.brand}</span>
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold uppercase font-mono tracking-tight text-black mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-mono">
                    {item.specs}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-600">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.note}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
