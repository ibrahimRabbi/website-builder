import React from 'react';
import { PortfolioSection } from '@/src/types/portfolio';

interface Props {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";

export const ArchFooterSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
    const { brand, tagline, locations, rightLine } = section.components;
    const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500' : '');
    const pick = (k: string) => (e: React.MouseEvent) => { e.stopPropagation(); onSelectComponent?.(k); };
    const mono = { fontFamily: MONO, letterSpacing: '0.12em' } as const;

    return (
        <div className="px-6 md:px-12 py-8 border-t" style={{ backgroundColor: section.backgroundColor || '#0a0908', borderColor: 'rgba(255,255,255,.1)', fontFamily }}>
            <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-[11px] uppercase text-stone-400">
                <div className="flex flex-wrap items-center gap-3">
                    <span onClick={pick('brand')} className={`cursor-pointer rounded px-1 text-sm text-stone-200 ${ring('brand')}`} style={{ letterSpacing: '0.25em' }}>{brand}</span>
                    <span onClick={pick('tagline')} className={`cursor-pointer rounded px-1 ${ring('tagline')}`} style={mono}>· {tagline}</span>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                    <span onClick={pick('locations')} className={`cursor-pointer rounded px-1 ${ring('locations')}`} style={mono}>{locations}</span>
                    <span onClick={pick('rightLine')} className={`cursor-pointer rounded px-1 ${ring('rightLine')}`} style={mono}>{rightLine}</span>
                </div>
            </div>
        </div>
    );
};