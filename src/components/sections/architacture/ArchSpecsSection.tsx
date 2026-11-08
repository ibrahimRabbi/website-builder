import React from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { Layers } from 'lucide-react';
import { fluid } from '@/src/utils/fluid'; 

interface Props {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";

export const ArchSpecsSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, bio, panelTitle, points = [] } = section.components;
    const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500' : '');
    const pick = (k: string) => (e: React.MouseEvent) => { e.stopPropagation(); onSelectComponent?.(k); };

    return (
        <div className="px-6 md:px-12 py-14 border-b" style={{ backgroundColor: section.backgroundColor || '#0a0908', borderColor: 'rgba(255,255,255,.1)', fontFamily }}>
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5">
                    {badge && <span onClick={pick('badge')} className={`block mb-3 cursor-pointer rounded px-1 -mx-1 uppercase ${ring('badge')}`} style={{ fontFamily: MONO, fontSize: '11px', color: badge.styles?.color || '#a8a29e', letterSpacing: '0.2em' }}>{badge.text}</span>}
                    {title && <h2 onClick={pick('title')} className={`cursor-pointer rounded px-1 -mx-1 ${ring('title')}`} style={{ fontSize: fluid(title.styles?.fontSize || '32px'), color: title.styles?.color || '#f5f5f4', fontWeight: title.styles?.fontWeight || '500', lineHeight: '1.25' }}>{title.text}</h2>}
                    {bio && <p onClick={pick('bio')} className={`mt-5 cursor-pointer rounded px-1 -mx-1 ${ring('bio')}`} style={{ fontSize: bio.styles?.fontSize || '15px', color: bio.styles?.color || '#a8a29e', lineHeight: bio.styles?.lineHeight || '1.8' }}>{bio.text}</p>}
                </div>

                <div onClick={pick('points')} className={`lg:col-span-7 border p-6 cursor-pointer ${ring('points')}`} style={{ borderColor: 'rgba(255,255,255,.12)', background: 'rgba(255,255,255,.02)' }}>
                    <p className="flex items-center gap-3 pb-4 mb-4 border-b text-xs uppercase text-stone-400" style={{ fontFamily: MONO, letterSpacing: '0.15em', borderColor: 'rgba(255,255,255,.1)' }}>
                        <Layers className="w-4 h-4" /> {panelTitle}
                    </p>
                    <ol className="space-y-5">
                        {points.map((p: any, i: number) => (
                            <li key={p.id ?? i} className="flex gap-4 text-sm" style={{ color: '#e7e5e4' }}>
                                <span className="text-stone-500" style={{ fontFamily: MONO }}>{String(i + 1).padStart(2, '0')}.</span>
                                <span>{p.text}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};