import React from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { ChevronRight } from 'lucide-react';

interface Props {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";

export const ArchSuiteSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, countLabel, cards = [] } = section.components;
    const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500' : '');
    const pick = (k: string) => (e: React.MouseEvent) => { e.stopPropagation(); onSelectComponent?.(k); };

    return (
        <div className="px-6 md:px-12 py-16" style={{ backgroundColor: section.backgroundColor || '#0a0908', fontFamily }}>
            <div className="max-w-[1280px] mx-auto">
                <div className="flex items-end justify-between mb-8 gap-4">
                    <div>
                        {badge && <span onClick={pick('badge')} className={`block mb-2 cursor-pointer rounded px-1 -mx-1 uppercase ${ring('badge')}`} style={{ fontFamily: MONO, fontSize: '11px', color: badge.styles?.color || '#a8a29e', letterSpacing: '0.2em' }}>{badge.text}</span>}
                        {title && <h2 onClick={pick('title')} className={`cursor-pointer rounded px-1 -mx-1 ${ring('title')}`} style={{ fontSize: title.styles?.fontSize || '28px', color: title.styles?.color || '#f5f5f4', fontWeight: title.styles?.fontWeight || '500' }}>{title.text}</h2>}
                    </div>
                    <span className="text-[11px] uppercase text-stone-500 shrink-0" style={{ fontFamily: MONO, letterSpacing: '0.15em' }}>{countLabel}</span>
                </div>

                <div onClick={pick('cards')} className={`grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer ${ring('cards')}`}>
                    {cards.map((c: any, i: number) => (
                        <div key={c.id ?? i} className="border p-4" style={{ borderColor: i === 1 ? '#f5f5f4' : 'rgba(255,255,255,.12)', background: 'rgba(255,255,255,.02)' }}>
                            <div className="aspect-[16/10] overflow-hidden bg-black border" style={{ borderColor: 'rgba(255,255,255,.1)' }}>
                                {c.image && <img src={c.image} alt={c.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                            </div>
                            <div className="flex items-center justify-between mt-4 text-[10px] uppercase text-stone-400" style={{ fontFamily: MONO, letterSpacing: '0.15em' }}>
                                <span>{c.tag}</span>
                                <span className="flex items-center gap-1">{c.linkLabel} <ChevronRight className="w-3 h-3" /></span>
                            </div>
                            <h3 className="mt-3 text-lg text-stone-100">{c.title}</h3>
                            <p className="mt-2 text-xs text-stone-500">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};