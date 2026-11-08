import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';
import { LawProps, C, MONO, SANS, hl, useSel, OliveBtn } from '@/src/utils/law';

export const LawFooterSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const c = section.components;
    const { logo, ctaButton, practiceLinks = [] } = c;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    return (
        <footer className="px-6 lg:px-12 py-16 border-t" style={{ background: section.backgroundColor || C.soft, borderColor: '#E0E0D6', color: '#4A5044', fontFamily: SANS }}>
            <div className="max-w-[1360px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12" style={{ borderBottom: '1px solid #D5D5CA' }}>
                    <div className="md:col-span-5 space-y-4">
                        <span onClick={pick('logo')} className={`inline-flex items-center gap-2.5 text-xl font-bold cursor-pointer rounded ${ring('logo')}`} style={{ color: C.text }}>
                            <span className="w-8 h-8 rounded-md flex items-center justify-center text-white" style={{ background: C.olive }}><Shield className="w-4 h-4" /></span>{hl(logo?.text)}
                        </span>
                        <p onClick={pick('about')} className={`text-sm leading-relaxed max-w-sm cursor-pointer rounded ${ring('about')}`} style={{ color: C.muted }}>{c.about}</p>
                        <p className="text-xs font-semibold" style={{ fontFamily: MONO, color: C.olive }}>{c.creds}</p>
                    </div>
                    <div className="md:col-span-3 space-y-3">
                        <h4 className="text-xs uppercase tracking-widest font-bold" style={{ color: C.text }}>{c.practiceLabel}</h4>
                        <div onClick={pick('practiceLinks')} className={`space-y-2 text-xs cursor-pointer rounded ${ring('practiceLinks')}`} style={{ color: C.muted }}>
                            {practiceLinks.map((l: string, i: number) => <p key={i}>{l}</p>)}
                        </div>
                    </div>
                    <div className="md:col-span-4 space-y-3">
                        <h4 className="text-xs uppercase tracking-widest font-bold" style={{ color: C.text }}>{c.registryLabel}</h4>
                        <p className="text-xs font-bold" style={{ fontFamily: MONO, color: C.olive }}>{c.email}</p>
                        <p className="text-xs" style={{ color: C.muted }}>{c.registryNote}</p>
                        {ctaButton && <span onClick={pick('ctaButton')} className={`inline-block rounded-lg ${ring('ctaButton')}`}><OliveBtn btn={ctaButton} className="!text-xs !py-2 !px-4" /></span>}
                    </div>
                </div>
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: '#6A7064' }}>
                    <p onClick={pick('copyright')} className={`cursor-pointer rounded ${ring('copyright')}`}>{c.copyright}</p>
                    <div className="flex items-center gap-4"><span className="text-[11px]">{c.disclaimer}</span>
                        <span className="p-2 rounded-lg" style={{ background: '#fff', border: '1px solid #D5D5CA', color: C.olive }}><ArrowUp className="w-3.5 h-3.5" /></span></div>
                </div>
            </div>
        </footer>
    );
};