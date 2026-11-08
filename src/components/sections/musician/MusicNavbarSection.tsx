import React from 'react';
import { Ticket } from 'lucide-react';
import { MusicProps, M, DISPLAY, SANS, useSel, DarkBtn } from '@/src/utils/music';
import { goTo } from '@/src/utils/fluid';

export const MusicNavbarSection: React.FC<MusicProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { logo, links = [], ctaButton } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    return (
        <div className="px-6 sm:px-8 py-5" style={{ background: section.backgroundColor || M.bg, fontFamily: SANS }}>
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
                <span onClick={pick('logo')} className={`cursor-pointer rounded px-1 uppercase whitespace-nowrap ${ring('logo')}`}
                    style={{ fontFamily: DISPLAY, fontSize: 24, fontWeight: 800, letterSpacing: '0.12em', color: logo?.styles?.color || '#1B3817' }}>{logo?.text}</span>
                <nav onClick={pick('links')} className={`hidden md:flex items-center gap-8 text-sm font-medium rounded cursor-pointer ${ring('links')}`} style={{ color: '#3F573C' }}>
                    {links.map((l: any, i: number) => (
                        <button key={l.id ?? i} type="button" onClick={(e) => goTo(e, l.target)} className="hover:opacity-70 whitespace-nowrap cursor-pointer">{l.label}</button>
                    ))}
                </nav>
                {ctaButton && (
                    <span onClick={pick('ctaButton')} className={`rounded ${ring('ctaButton')}`}>
                        <DarkBtn btn={ctaButton} className="uppercase !text-xs" icon={<Ticket className="w-3.5 h-3.5" style={{ color: '#6EE7B7' }} />} onClick={(e) => goTo(e, ctaButton.link)} />
                    </span>
                )}
            </div>
        </div>
    );
};