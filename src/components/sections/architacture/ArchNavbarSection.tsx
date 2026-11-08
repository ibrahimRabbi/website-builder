import React from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { Eye } from 'lucide-react';

interface Props {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";

export const ArchNavbarSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
    const { logo, tag, tabs = [], ctaButton } = section.components;
    const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500' : '');
    const pick = (k: string) => (e: React.MouseEvent) => { e.stopPropagation(); onSelectComponent?.(k); };

    return (
        <div className="px-6 md:px-12 py-5 border-b" style={{ backgroundColor: section.backgroundColor || '#0a0908', borderColor: 'rgba(255,255,255,.1)', fontFamily }}>
            <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                    <span onClick={pick('logo')} className={`cursor-pointer rounded px-1 uppercase ${ring('logo')}`}
                        style={{ color: logo?.styles?.color || '#f5f5f4', fontSize: logo?.styles?.fontSize || '20px', letterSpacing: '0.3em', fontWeight: 500 }}>
                        {logo?.text}
                    </span>
                    {tag && (
                        <span onClick={pick('tag')} className={`cursor-pointer px-2 py-1 border text-[10px] uppercase ${ring('tag')}`}
                            style={{ fontFamily: MONO, letterSpacing: '0.15em', color: '#a8a29e', borderColor: 'rgba(255,255,255,.15)' }}>
                            {tag}
                        </span>
                    )}
                </div>

                <nav onClick={pick('tabs')} className={`flex flex-wrap items-center border cursor-pointer ${ring('tabs')}`} style={{ borderColor: 'rgba(255,255,255,.12)', background: 'rgba(255,255,255,.03)' }}>
                    {tabs.map((t: any, i: number) => (
                        <span key={t.id ?? i} className="px-4 py-2.5 text-xs font-semibold"
                            style={{ background: t.active ? '#f5f5f4' : 'transparent', color: t.active ? '#0a0908' : '#a8a29e' }}>
                            {t.label}
                        </span>
                    ))}
                </nav>

                {ctaButton && (
                    <button type="button" onClick={pick('ctaButton')}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 border text-[11px] uppercase cursor-pointer ${ring('ctaButton')}`}
                        style={{ fontFamily: MONO, letterSpacing: '0.15em', color: ctaButton.styles?.color || '#f5f5f4', borderColor: ctaButton.styles?.borderColor || 'rgba(255,255,255,.25)', background: ctaButton.styles?.backgroundColor || 'transparent' }}>
                        <Eye className="w-3.5 h-3.5" /> {ctaButton.label}
                    </button>
                )}
            </div>
        </div>
    );
};