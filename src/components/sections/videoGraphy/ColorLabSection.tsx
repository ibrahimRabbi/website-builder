import React, { useState, useRef } from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { Sliders, Check } from 'lucide-react';
import { fluid } from '@/src/utils/fluid';

interface Props {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (key: string) => void;
  selectedComponentKey?: string | null;
}

export const ColorLabSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
  const { badge, title, subtitle, masterImage, looks = [], hint } = section.components;
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState(50);
  const [drag, setDrag] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const look = looks[Math.min(idx, looks.length - 1)];
  const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : '');
  const pick = (k: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent?.(k);
  };

  const move = (e: React.PointerEvent) => {
    if (!drag && e.buttons !== 1) return;
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.round((Math.max(0, Math.min(e.clientX - r.left, r.width)) / r.width) * 100));
  };

  return (
    <div
      id="color-lab-section"
      className="px-6 md:px-12 py-16 border-t border-slate-200/80"
      style={{ backgroundColor: section.backgroundColor || '#fff', fontFamily }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
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
            <p onClick={pick('subtitle')} className={`mt-2 max-w-2xl cursor-pointer rounded px-1 -mx-1 ${ring('subtitle')}`} style={{ fontSize: subtitle.styles?.fontSize || '14px', color: subtitle.styles?.color || '#475569' }}>
              {subtitle.text}
            </p>
          )}
        </div>

        <div
          onClick={() => onSelectComponent?.('looks')}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded ${selectedComponentKey === 'looks' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
        >
          {looks.map((l: any, i: number) => {
            const on = i === idx;
            return (
              <button
                key={l.id ?? i}
                type="button"
                onClick={(e) => { e.stopPropagation(); setIdx(i); onSelectComponent?.('looks'); }}
                className={`p-5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${on ? 'bg-black text-white border-black shadow-lg' : 'bg-white text-black border-slate-200 hover:border-slate-400'
                  }`}
              >
                <div>
                  <h4 className="text-xs font-bold tracking-wider uppercase mb-2 font-mono">{l.name}</h4>
                  <p className={`text-[12px] leading-relaxed line-clamp-3 ${on ? 'text-slate-300' : 'text-slate-600'}`}>{l.desc}</p>
                </div>
                <div className={`mt-4 pt-3 border-t text-[10px] font-mono uppercase tracking-widest flex items-center justify-between ${on ? 'border-white/20 text-slate-400' : 'border-slate-100 text-slate-400'}`}>
                  <span>{l.badge}</span>
                  {on && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {look && (
          <>
            <div
              ref={box}
              onPointerDown={() => setDrag(true)}
              onPointerUp={() => setDrag(false)}
              onPointerLeave={() => setDrag(false)}
              onPointerMove={move}
              onClick={pick('masterImage')}
              className={`relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-slate-300 bg-black select-none cursor-ew-resize shadow-2xl ${selectedComponentKey === 'masterImage' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                }`}
            >
              <img src={masterImage} alt="master" className="absolute inset-0 w-full h-full object-cover pointer-events-none" referrerPolicy="no-referrer" />
              <div className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none" style={{ width: `${pos}%` }}>
                <img
                  src={look.image}
                  alt={look.name}
                  className="absolute inset-y-0 left-0 max-w-none h-full object-cover"
                  style={{ width: box.current ? box.current.clientWidth : '100%' }}
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute top-5 right-6 z-10 px-3 py-1 bg-black/80 text-white font-mono text-[11px] font-semibold tracking-wider uppercase border border-white/20 rounded pointer-events-none">
                {look.label}
              </span>
              <div className="absolute inset-y-0 w-0.5 bg-white z-20 pointer-events-none" style={{ left: `${pos}%` }}>
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white flex items-center justify-center border-2 border-black/80">
                  <Sliders className="w-4 h-4 text-black" />
                </div>
              </div>
              {hint && (
                <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-10">
                  <span className="px-4 py-1 rounded-full bg-black/75 text-white/80 font-mono text-[10px] tracking-widest uppercase border border-white/20">
                    {hint}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-xl border border-slate-200 bg-slate-50">
              {[
                ['COLOR TRANSFORMATION MATRIX', look.matrix],
                ['HIGHLIGHT COMPRESSION', look.highlight],
                ['SHADOW FLOOR DENSITY', look.shadow],
              ].map(([k, v]) => (
                <div key={k}>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">{k}</span>
                  <span className="text-xs font-mono font-semibold text-black">{v}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};