import React, { useState } from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { Play } from 'lucide-react';
import { VideoPlayerModal } from '../../common/VideoPlayerModal';  
import { fluid, goTo } from '@/src/utils/fluid';

interface Props {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (key: string) => void;
  selectedComponentKey?: string | null;
}

export const HeroSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
  const c = section.components;
  const { badge, title, subtitle, ctaButton, secondaryButton, avatar, videoUrl, reelTitle, reelSpecs, cameraSpecs, toolsTag, portraitTag } = c;
  const [playing, setPlaying] = useState(false);

  const ring = (k: string) =>
    selectedComponentKey === k ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-slate-100/60';
  const pick = (k: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent?.(k);
  };

  return (
    <div
      className="px-6 md:px-12 py-12 md:py-16"
      style={{ backgroundColor: section.backgroundColor || '#fff', fontFamily }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
          {badge && (
            <span
              onClick={pick('badge')}
              className={`text-[11px] font-mono tracking-widest uppercase cursor-pointer rounded px-1 -mx-1 transition-all ${ring('badge')}`}
              style={{ color: badge.styles?.color || '#64748b', fontWeight: badge.styles?.fontWeight || '600' }}
            >
              {badge.text}
            </span>
          )}

          {title && (
            <h1
              onClick={pick('title')}
              className={`cursor-pointer uppercase rounded px-1 -mx-1 transition-all ${ring('title')}`}
              style={{
                fontSize: fluid(title.styles?.fontSize || '56px'),
                color: title.styles?.color || '#000',
                fontWeight: title.styles?.fontWeight || '800',
                lineHeight: title.styles?.lineHeight || '1.08',
                letterSpacing: title.styles?.letterSpacing,
                textAlign: title.styles?.textAlign,
                overflowWrap: 'anywhere',
              }}
            >
              {title.text}
            </h1>
          )}

          {subtitle && (
            <p
              onClick={pick('subtitle')}
              className={`cursor-pointer max-w-xl leading-relaxed rounded px-1 -mx-1 transition-all ${ring('subtitle')}`}
              style={{
                fontSize: subtitle.styles?.fontSize || '15px',
                color: subtitle.styles?.color || '#475569',
                lineHeight: subtitle.styles?.lineHeight || '1.6',
              }}
            >
              {subtitle.text}
            </p>
          )}

          {toolsTag && (
            <div
              onClick={pick('toolsTag')}
              className={`text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-md cursor-pointer ${selectedComponentKey === 'toolsTag' ? 'ring-2 ring-indigo-500' : ''
                }`}
            >
              {toolsTag}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {ctaButton && (
              <button
                type="button"
                onClick={(e) => { pick('ctaButton')(e); if (videoUrl) setPlaying(true); }}
                className={`inline-flex items-center gap-2.5 text-xs font-mono font-bold tracking-wider uppercase cursor-pointer active:scale-95 transition-all ${selectedComponentKey === 'ctaButton' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                  }`}
                style={{
                  backgroundColor: ctaButton.styles?.backgroundColor || '#000',
                  color: ctaButton.styles?.color || '#fff',
                  borderRadius: ctaButton.styles?.borderRadius || '8px',
                  padding: ctaButton.styles?.padding || '14px 28px',
                }}
              >
                <Play className="w-4 h-4 fill-current" />
                {ctaButton.label}
              </button>
            )}
            {secondaryButton && (
              <button
                type="button"
                onClick={(e) => { pick('secondaryButton')(e); goTo(e, secondaryButton.link); }}
                className={`text-xs font-mono font-bold tracking-wider uppercase cursor-pointer active:scale-95 transition-all ${selectedComponentKey === 'secondaryButton' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                  }`}
                style={{
                  backgroundColor: secondaryButton.styles?.backgroundColor || '#fff',
                  color: secondaryButton.styles?.color || '#000',
                  borderRadius: secondaryButton.styles?.borderRadius || '8px',
                  padding: secondaryButton.styles?.padding || '14px 28px',
                  border: `${secondaryButton.styles?.borderWidth || '1px'} solid ${secondaryButton.styles?.borderColor || '#cbd5e1'}`,
                }}
              >
                {secondaryButton.label}
              </button>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col items-center">
          {avatar?.src && (
            <div
              onClick={pick('avatar')}
              className={`relative w-full max-w-[420px] aspect-[4/5] rounded-xl overflow-hidden border border-slate-300 bg-black cursor-pointer shadow-2xl group ${selectedComponentKey === 'avatar' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                }`}
            >
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {['top-3 left-3 ┌', 'top-3 right-3 ┐', 'bottom-3 left-3 └', 'bottom-3 right-3 ┘'].map((m) => {
                const [a, b, ch] = m.split(' ');
                return (
                  <div key={m} className={`absolute ${a} ${b} text-white/70 text-base font-mono pointer-events-none`}>
                    {ch}
                  </div>
                );
              })}
              {portraitTag && (
                <span className="absolute top-4 left-6 text-[10px] font-mono tracking-widest uppercase bg-black/60 text-white/90 px-2 py-0.5 rounded border border-white/20 pointer-events-none">
                  {portraitTag}
                </span>
              )}
            </div>
          )}
          {cameraSpecs && (
            <span
              onClick={pick('cameraSpecs')}
              className={`mt-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 text-center max-w-[420px] cursor-pointer ${selectedComponentKey === 'cameraSpecs' ? 'ring-2 ring-indigo-500 rounded' : ''
                }`}
            >
              {cameraSpecs}
            </span>
          )}
        </div>
      </div>

      <VideoPlayerModal
        isOpen={playing}
        videoUrl={videoUrl || ''}
        title={reelTitle || ''}
        specs={reelSpecs || ''}
        onClose={() => setPlaying(false)}
      />
    </div>
  );
};