import React from 'react';
import { Quote } from 'lucide-react';
import { LawProps, C, MONO, SANS, useSel, LawHead } from '@/src/utils/law';

export const LawTestimonialsSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, subtitle, items = [] } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    return (
        <div id="endorsements" className="px-6 lg:px-12 py-20" style={{ background: section.backgroundColor || C.bg, fontFamily: SANS, color: C.text }}>
            <div className="max-w-[1360px] mx-auto">
                <LawHead badge={badge} title={title} subtitle={subtitle} pick={pick} ring={ring} />
                <div onClick={pick('items')} className={`grid grid-cols-1 md:grid-cols-3 gap-8 cursor-pointer rounded ${ring('items')}`}>
                    {items.map((t: any, i: number) => (
                        <div key={t.id ?? i} className="p-8 rounded-2xl flex flex-col justify-between" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between gap-2">
                                    <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: C.tint, color: C.olive }}><Quote className="w-4 h-4" /></span>
                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-center" style={{ fontFamily: MONO, color: C.olive, background: C.tint }}>{t.type}</span>
                                </div>
                                <p className="italic leading-relaxed text-[15px]" style={{ color: '#3A4034' }}>“{t.quote}”</p>
                            </div>
                            <div className="mt-6 pt-5 flex items-center gap-3" style={{ borderTop: `1px solid ${C.soft}` }}>
                                <span className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: C.olive }}>
                                    {String(t.name || '').split(' ').map((n: string) => n[0]).join('').slice(0, 3)}
                                </span>
                                <div><h4 className="font-bold text-sm">{t.name}</h4><p className="text-xs" style={{ color: C.muted }}>{t.role} · {t.org}</p></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};