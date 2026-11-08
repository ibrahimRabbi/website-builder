import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LawProps, C, MONO, SANS, useSel, LawHead, OliveBtn } from '@/src/utils/law';

export const LawChambersSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, subtitle, ctaButton, gallery = [], offices = [] } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    return (
        <div id="chambers" className="px-6 lg:px-12 py-20" style={{ background: section.backgroundColor || C.bg, fontFamily: SANS, color: C.text }}>
            <div className="max-w-[1360px] mx-auto">
                <LawHead badge={badge} title={title} subtitle={subtitle} pick={pick} ring={ring}
                    right={ctaButton && <span onClick={pick('ctaButton')} className={`rounded-lg self-start ${ring('ctaButton')}`}><OliveBtn btn={ctaButton} className="!text-xs !py-2.5 !px-5" icon={<ArrowUpRight className="w-3.5 h-3.5" />} /></span>} />
                <div onClick={pick('gallery')} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 cursor-pointer rounded ${ring('gallery')}`}>
                    {gallery.map((g: any, i: number) => (
                        <div key={g.id ?? i} className={`space-y-4 ${i === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}`}>
                            <div className={`relative w-full rounded-2xl overflow-hidden shadow-sm ${i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3] lg:aspect-[16/13]'}`} style={{ border: `1px solid ${C.line}`, background: C.tint }}>
                                {g.image && <img src={g.image} alt={g.tag} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                                <div className="absolute inset-x-0 bottom-0 p-5 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.8), transparent)' }}>
                                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold mr-2" style={{ background: C.olive, fontFamily: MONO }}>{g.tag}</span>
                                    <span className="text-xs opacity-90">{g.caption}</span>
                                </div>
                            </div>
                            <p className="text-xs" style={{ color: C.muted }}>{g.note}</p>
                        </div>
                    ))}
                </div>
                <div onClick={pick('offices')} className={`grid grid-cols-1 md:grid-cols-3 gap-6 cursor-pointer rounded ${ring('offices')}`}>
                    {offices.map((o: any, i: number) => (
                        <div key={o.id ?? i} className="p-6 rounded-xl" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
                            <span className="text-xs font-bold block mb-1" style={{ fontFamily: MONO, color: C.olive }}>{o.label}</span>
                            <h4 className="font-bold text-base">{o.street}</h4>
                            <p className="text-xs mt-1" style={{ color: C.muted }}>{o.line}</p>
                            <p className="text-xs mt-2" style={{ fontFamily: MONO, color: C.olive }}>{o.phone}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};