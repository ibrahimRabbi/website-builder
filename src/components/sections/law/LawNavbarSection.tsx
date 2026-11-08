import React from 'react';
import { Shield, ArrowUpRight } from 'lucide-react';
import { LawProps, C, SANS, hl, useSel, OliveBtn } from '@/src/utils/law';
import { goTo } from '@/src/utils/fluid';

export const LawNavbarSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { logo, links = [], ctaButton } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    return (
        <div className="px-6 lg:px-12 border-b" style={{ background: section.backgroundColor || C.bg, borderColor: C.line, fontFamily: SANS }}>
            <div className="max-w-[1360px] mx-auto h-20 flex items-center justify-between gap-8">
                <span onClick={pick('logo')} className={`flex items-center gap-2.5 cursor-pointer rounded px-1 text-xl font-bold whitespace-nowrap ${ring('logo')}`} style={{ color: C.text }}>
                    <span className="w-8 h-8 rounded-md flex items-center justify-center text-white" style={{ background: C.olive }}><Shield className="w-4 h-4" /></span>
                    {hl(logo?.text)}
                </span>
                <nav onClick={pick('links')} className={`hidden md:flex items-center gap-8 text-sm font-medium rounded cursor-pointer ${ring('links')}`} style={{ color: C.muted }}>
                    {links.map((l: any, i: number) => (
                        <button key={l.id ?? i} type="button" onClick={(e) => goTo(e, l.target)} className="hover:opacity-70 whitespace-nowrap cursor-pointer">{l.label}</button>
                    ))}
                </nav>
                {ctaButton && (
                    <span onClick={pick('ctaButton')} className={`rounded-md ${ring('ctaButton')}`}>
                        <OliveBtn btn={ctaButton} className="uppercase tracking-wider !text-xs" icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                            onClick={(e) => goTo(e, ctaButton.link)} />
                    </span>
                )}
            </div>
        </div>
    );
};