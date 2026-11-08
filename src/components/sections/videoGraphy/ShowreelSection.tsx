import React, { useState, useRef } from 'react';
import { PortfolioSection, VideoFilmItem } from '@/src/types/portfolio';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { VideoPlayerModal } from '../../common/VideoPlayerModal';
import { fluid } from '@/src/utils/fluid';

interface Props {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (key: string) => void;
  selectedComponentKey?: string | null;
}

export const ShowreelSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
  const { badge, title, subtitle, frames = [], topStrip, bottomStrip } = section.components;
  const [active, setActive] = useState<VideoFilmItem | null>(null);
  const scroller = useRef<HTMLDivElement>(null);

  const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : '');
  const pick = (k: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent?.(k);
  };
  const scroll = (d: number) => scroller.current?.scrollBy({ left: d * 480, behavior: 'smooth' });
  const strip = (text?: string) =>
    text ? (
      <div className="w-full overflow-hidden py-1 border-y border-slate-200 bg-slate-50 select-none">
        <div className="flex items-center gap-6 whitespace-nowrap text-[10px] font-mono text-slate-500 uppercase tracking-widest">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i}>■ {text}</span>
          ))}
        </div>
      </div>
    ) : null;

  return (
    <div
      id="showreel"
      className="px-6 md:px-12 py-16 border-t border-slate-200/80"
      style={{ backgroundColor: section.backgroundColor || '#fff', fontFamily }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            {badge && (
              <span
                onClick={pick('badge')}
                className={`text-[11px] font-mono tracking-widest uppercase font-semibold block mb-2 cursor-pointer rounded px-1 -mx-1 ${ring('badge')}`}
                style={{ color: badge.styles?.color || '#64748b' }}
              >
                {badge.text}
              </span>
            )}
            {title && (
              <h2
                onClick={pick('title')}
                className={`cursor-pointer uppercase rounded px-1 -mx-1 ${ring('title')}`}
                style={{
                  fontSize: fluid(title.styles?.fontSize || '36px'),
                  color: title.styles?.color || '#000',
                  fontWeight: title.styles?.fontWeight || '800',
                }}
              >
                {title.text}
              </h2>
            )}
            {subtitle && (
              <p
                onClick={pick('subtitle')}
                className={`mt-2 max-w-xl cursor-pointer rounded px-1 -mx-1 ${ring('subtitle')}`}
                style={{ fontSize: subtitle.styles?.fontSize || '14px', color: subtitle.styles?.color || '#475569' }}
              >
                {subtitle.text}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={(e) => { e.stopPropagation(); scroll(d); }}
                className="w-10 h-10 rounded-lg border border-slate-300 hover:border-black flex items-center justify-center bg-white text-black cursor-pointer"
              >
                {d < 0 ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </button>
            ))}
          </div>
        </div>

        {strip(topStrip)}

        <div
          ref={scroller}
          onClick={pick('frames')}
          className={`flex items-stretch gap-6 overflow-x-auto pb-4 pt-1 snap-x rounded ${selectedComponentKey === 'frames' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
            }`}
        >
          {frames.map((f: VideoFilmItem) => (
            <div
              key={f.id}
              onClick={(e) => { e.stopPropagation(); onSelectComponent?.('frames'); setActive(f); }}
              className="min-w-[300px] sm:min-w-[420px] max-w-[460px] snap-start rounded-xl overflow-hidden border border-slate-200 hover:border-black bg-white shadow-md hover:shadow-xl transition-all flex flex-col group cursor-pointer"
            >
              <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
                <img src={f.posterUrl} alt={f.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] tracking-widest uppercase border border-white/20">
                  {f.aspectRatio}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px] tracking-widest border border-white/20">
                  {f.duration}
                </span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{f.client}</span>
                <h3 className="text-base font-bold uppercase tracking-tight text-black font-mono">{f.title}</h3>
                <div className="pt-2 border-t border-slate-100 text-[10px] font-mono text-slate-500 truncate">{f.specs}</div>
              </div>
            </div>
          ))}
        </div>

        {strip(bottomStrip)}
      </div>

      {active && (
        <VideoPlayerModal
          isOpen
          videoUrl={active.videoUrl || ''}
          title={active.title}
          specs={active.specs || ''}
          onClose={() => setActive(null)}
        />
      )}
    </div>
  );
};