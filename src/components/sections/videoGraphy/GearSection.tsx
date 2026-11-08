import React, { useState } from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { Camera, Check, Aperture, Wind, SunMedium } from 'lucide-react';
import { fluid } from '@/src/utils/fluid';

interface Props {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (key: string) => void;
  selectedComponentKey?: string | null;
}

const ICONS: Record<string, any> = { camera: Camera, optics: Aperture, drone: Wind, light: SunMedium };

export const GearSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
  const { badge, title, subtitle, tabs = ['ALL EQUIPMENT'], items = [] } = section.components;
  const [tab, setTab] = useState(tabs[0] || 'ALL EQUIPMENT');

  const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : '');
  const pick = (k: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent?.(k);
  };

  const shown = tab === tabs[0] ? items : items.filter((g: any) => g.category === tab);

  return (
    <div
      id="equipment-section"
      className="px-6 md:px-12 py-20 border-t border-slate-200/80"
      style={{ backgroundColor: section.backgroundColor || '#fff', fontFamily }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            {badge && (
              <span onClick={pick('badge')} className={`text-[11px] font-mono tracking-widest uppercase font-semibold block mb-2 cursor-pointer rounded px-1 -mx-1 ${ring('badge')}`} style={{ color: badge.styles?.color || '#64748b' }}>
                {badge.text}
              </span>
            )}
            {title && (
              <h2 onClick={pick('title')} className={`cursor-pointer uppercase rounded px-1 -mx-1 ${ring('title')}`} style={{ fontSize: fluid(title.styles?.fontSize || '36px'), color: title.styles?.color || '#000', fontWeight: title.styles?.fontWeight || '800' }}>
                {title.text}
              </h2>
            )}
            {subtitle && (
              <p onClick={pick('subtitle')} className={`mt-2 max-w-xl cursor-pointer rounded px-1 -mx-1 ${ring('subtitle')}`} style={{ fontSize: subtitle.styles?.fontSize || '14px', color: subtitle.styles?.color || '#475569' }}>
                {subtitle.text}
              </p>
            )}
          </div>
          <div onClick={pick('tabs')} className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 bg-slate-50 ${selectedComponentKey === 'tabs' ? 'ring-2 ring-indigo-500' : ''}`}>
            {tabs.map((t: string) => (
              <button
                key={t}
                type="button"
                onClick={(e) => { e.stopPropagation(); setTab(t); }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider font-semibold cursor-pointer ${tab === t ? 'bg-black text-white' : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div
          onClick={pick('items')}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rounded ${selectedComponentKey === 'items' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
        >
          {shown.map((g: any, i: number) => {
            const Icon = ICONS[g.icon] || Camera;
            return (
              <div key={g.id ?? i} className="p-6 rounded-xl border border-slate-200 bg-white hover:border-black transition-all flex flex-col justify-between shadow-sm hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1.5 font-bold text-slate-800">
                      <Icon className="w-3.5 h-3.5" /> {g.brand}
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">{g.status}</span>
                  </div>
                  <h3 className="text-base font-extrabold uppercase font-mono tracking-tight text-black mb-2">{g.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-mono">{g.specs}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-600">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{g.note}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};