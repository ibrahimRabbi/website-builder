import React, { useState } from 'react';
import { PortfolioSection } from '../../../types/portfolio';
import { goTo } from '../../../utils/fluid';

interface Props {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

export const NavbarSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
    const { logo, links = [], ctaButton, showAudioToggle } = section.components;
    const [audio, setAudio] = useState(false);
    const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : '');
    const pick = (k: string) => (e: React.MouseEvent) => {
        e.stopPropagation();
        onSelectComponent?.(k);
    };

    return (
        <div
            className="px-6 md:px-12 py-5 border-b border-slate-200/80"
            style={{ backgroundColor: section.backgroundColor || '#fff', fontFamily }}
        >
            <header className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                <span
                    onClick={pick('logo')}
                    className={`font-mono text-xs font-extrabold tracking-widest uppercase flex items-center gap-2 cursor-pointer rounded px-1 ${ring('logo')}`}
                    style={{ color: logo?.styles?.color || '#000' }}
                >
                    <span className="w-2 h-2 inline-block" style={{ background: logo?.styles?.color || '#000' }} />
                    {logo?.text}
                </span>

                <nav
                    onClick={pick('links')}
                    className={`flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-widest text-slate-600 font-semibold rounded cursor-pointer ${ring('links')}`}
                >
                    {links.map((l: any, i: number) => (
                        <button
                            key={l.id ?? i}
                            type="button"
                            onClick={(e) => { goTo(e, l.target); }}
                            className="hover:text-black transition-colors cursor-pointer"
                        >
                            {l.label}
                        </button>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    {showAudioToggle && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); setAudio(!audio); }}
                            className="px-2.5 py-1.5 rounded border border-slate-200 text-[10px] font-mono tracking-wider uppercase font-semibold text-slate-700 cursor-pointer"
                        >
                            {audio ? '[🔊 AUDIO: ON]' : '[🔇 AUDIO: OFF]'}
                        </button>
                    )}
                    {ctaButton && (
                        <button
                            type="button"
                            onClick={(e) => { pick('ctaButton')(e); goTo(e, ctaButton.link); }}
                            className={`px-4 py-1.5 text-[11px] font-mono font-bold tracking-widest uppercase cursor-pointer ${ring('ctaButton')}`}
                            style={{
                                backgroundColor: ctaButton.styles?.backgroundColor || '#000',
                                color: ctaButton.styles?.color || '#fff',
                                borderRadius: ctaButton.styles?.borderRadius || '4px',
                            }}
                        >
                            {ctaButton.label}
                        </button>
                    )}
                </div>
            </header>
        </div>
    );
};