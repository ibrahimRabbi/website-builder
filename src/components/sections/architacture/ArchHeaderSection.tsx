import React from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { ZoomIn, ZoomOut, RotateCcw, Maximize2 } from 'lucide-react';
import { fluid } from '@/src/utils/fluid';  

interface Props {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";

export const ArchHeaderSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, subtitle, zoomLabel, fullscreenLabel } = section.components;
    const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500' : '');
    const pick = (k: string) => (e: React.MouseEvent) => { e.stopPropagation(); onSelectComponent?.(k); };

    return (
        <div className="px-6 md:px-12 py-12 border-b" style={{ backgroundColor: section.backgroundColor || '#0a0908', borderColor: 'rgba(255,255,255,.1)', fontFamily }}>
            <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="max-w-3xl">
                    {badge && (
                        <span onClick={pick('badge')} className={`block mb-3 cursor-pointer rounded px-1 -mx-1 uppercase ${ring('badge')}`}
                            style={{ fontFamily: MONO, fontSize: badge.styles?.fontSize || '11px', color: badge.styles?.color || '#a8a29e', letterSpacing: badge.styles?.letterSpacing || '0.2em' }}>
                            {badge.text}
                        </span>
                    )}
                    {title && (
                        <h1 onClick={pick('title')} className={`cursor-pointer rounded px-1 -mx-1 ${ring('title')}`}
                            style={{ fontSize: fluid(title.styles?.fontSize || '48px'), color: title.styles?.color || '#f5f5f4', fontWeight: title.styles?.fontWeight || '500', lineHeight: title.styles?.lineHeight || '1.15' }}>
                            {title.text}
                        </h1>
                    )}
                    {subtitle && (
                        <p onClick={pick('subtitle')} className={`mt-4 cursor-pointer rounded px-1 -mx-1 ${ring('subtitle')}`}
                            style={{ fontSize: subtitle.styles?.fontSize || '15px', color: subtitle.styles?.color || '#a8a29e', lineHeight: subtitle.styles?.lineHeight || '1.7' }}>
                            {subtitle.text}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-4 px-4 py-3 border text-xs shrink-0" style={{ fontFamily: MONO, color: '#a8a29e', borderColor: 'rgba(255,255,255,.12)', background: 'rgba(255,255,255,.03)' }}>
                    <ZoomOut className="w-4 h-4" />
                    <span className="text-[#e7e5e4]">{zoomLabel || '100%'}</span>
                    <ZoomIn className="w-4 h-4" />
                    <RotateCcw className="w-4 h-4" />
                    <span className="flex items-center gap-2 px-3 py-1.5 uppercase text-[#e7e5e4]" style={{ background: 'rgba(255,255,255,.08)', letterSpacing: '0.1em' }}>
                        <Maximize2 className="w-3.5 h-3.5" /> {fullscreenLabel || 'Fullscreen'}
                    </span>
                </div>
            </div>
        </div>
    );
};