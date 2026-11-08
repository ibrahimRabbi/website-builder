import React, { useState } from 'react';
import { PortfolioSection, VideoFilmItem } from '@/src/types/portfolio';
import { Play, Clock } from 'lucide-react';
import { VideoPlayerModal } from '../../common/VideoPlayerModal';
import { fluid } from '@/src/utils/fluid';

interface Props {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (key: string) => void;
  selectedComponentKey?: string | null;
}

export const FilmsSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
  const { badge, title, subtitle, categories = ['ALL'], films = [] } = section.components;
  const [cat, setCat] = useState('ALL');
  const [active, setActive] = useState<any>(null);

  const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : '');
  const pick = (k: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent?.(k);
  };

  const shown = cat === 'ALL' ? films : films.filter((f: any) => String(f.category).toUpperCase() === cat);
  const left = shown.filter((f: any) => f.col !== 'right');
  const right = shown.filter((f: any) => f.col === 'right');

  const card = (f: VideoFilmItem & { isTall?: boolean; lensSpecs?: string; summary?: string }) => (
    <div
      key={f.id}
      onClick={(e) => { e.stopPropagation(); onSelectComponent?.('films'); setActive(f); }}
      className="group rounded-xl overflow-hidden border border-slate-200 hover:border-black bg-white shadow-md hover:shadow-xl transition-all flex flex-col cursor-pointer"
    >
      <div className={`relative w-full bg-black overflow-hidden ${f.isTall ? 'aspect-[3/4]' : 'aspect-[16/9]'}`}>
        <img src={f.posterUrl} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
        <span className="absolute top-4 left-4 px-2.5 py-1 bg-black/75 text-white font-mono text-[10px] uppercase tracking-widest rounded border border-white/20">
          {String(f.category).toLowerCase()}
        </span>
        <span className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-black/75 text-white font-mono text-[10px] rounded border border-white/20">
          <Clock className="w-3 h-3" /> {f.duration}
        </span>
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-300">{f.client}</span>
          <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white font-mono">{f.title}</h3>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <p className="text-xs text-slate-600 leading-relaxed">{f.summary}</p>
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] font-mono text-slate-500">
          <span className="font-semibold text-slate-800 truncate">{f.specs}</span>
          <span className="shrink-0">{f.lensSpecs}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      id="selected-works-section"
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
          <div
            onClick={pick('categories')}
            className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 bg-slate-50 ${selectedComponentKey === 'categories' ? 'ring-2 ring-indigo-500' : ''}`}
          >
            {categories.map((c: string) => (
              <button
                key={c}
                type="button"
                onClick={(e) => { e.stopPropagation(); setCat(c); }}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider font-semibold cursor-pointer ${cat === c ? 'bg-black text-white' : 'text-slate-600 hover:bg-slate-200/60'
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">{left.map(card)}</div>
          <div className="flex flex-col gap-8 md:pt-12">{right.map(card)}</div>
        </div>
      </div>

      {active && (
        <VideoPlayerModal
          isOpen
          videoUrl={active.videoUrl || ''}
          title={active.title}
          specs={`${active.specs || ''}${active.lensSpecs ? ` · ${active.lensSpecs}` : ''}`}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
};