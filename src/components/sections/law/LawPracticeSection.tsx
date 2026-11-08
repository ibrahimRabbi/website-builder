import React from 'react';
import { ArrowUpRight, Cpu, Leaf, Building2, Gavel, Scale } from 'lucide-react';
import { LawProps, C, MONO, SANS, useSel, LawHead } from '@/src/utils/law';

const ICONS: Record<string, any> = { cpu: Cpu, leaf: Leaf, building: Building2, gavel: Gavel };

export const LawPracticeSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, subtitle, items = [] } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    return (
        <div id="capabilities" className="px-6 lg:px-12 py-20" style={{ background: section.backgroundColor || C.bg, fontFamily: SANS }}>
            <div className="max-w-[1360px] mx-auto">
                <LawHead badge={badge} title={title} subtitle={subtitle} pick={pick} ring={ring} />
                <div onClick={pick('items')} className={`grid grid-cols-1 lg:grid-cols-12 gap-8 cursor-pointer rounded ${ring('items')}`}>
                    {items.map((p: any, i: number) => {
                        const Icon = ICONS[p.icon] || Scale;
                        const bullets = Array.isArray(p.focus) ? p.focus : null;
                        return (
                            <div key={p.id ?? i} className="p-8 sm:p-10 rounded-2xl flex flex-col justify-between transition-all hover:shadow-md"
                                style={{ gridColumn: undefined, background: '#fff', border: `1px solid ${C.line}` }}
                                data-span={p.span}>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: C.tint }}><Icon className="w-5 h-5" style={{ color: C.olive }} /></div>
                                            <span className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: MONO, color: C.olive }}>{p.pillar}</span>
                                        </div>
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: C.tint, color: C.olive }}>{p.tag}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">{p.title}</h3>
                                        <p className="text-sm mt-3 leading-relaxed" style={{ color: C.muted }}>{p.desc}</p>
                                    </div>
                                    <div className="pt-4 space-y-2" style={{ borderTop: `1px solid ${C.soft}` }}>
                                        <span className="text-xs font-bold uppercase block" style={{ fontFamily: MONO }}>{p.focusLabel}</span>
                                        {bullets ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs" style={{ color: '#4A5044' }}>
                                                {bullets.map((b: string, k: number) => (
                                                    <div key={k} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.olive }} />{b}</div>
                                                ))}
                                            </div>
                                        ) : <p className="text-xs" style={{ fontFamily: MONO, color: C.olive }}>{p.focus}</p>}
                                    </div>
                                </div>
                                <div className="mt-8 pt-6 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: `1px solid ${C.soft}` }}>
                                    <div className="text-xs font-bold" style={{ fontFamily: MONO, color: C.olive }}>{p.stat}</div>
                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white" style={{ background: C.olive }}>
                                        {p.button}<ArrowUpRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* span-er jonno grid column: 7/5/6/6 */}
            <style>{`@media (min-width:1024px){[data-span="7"]{grid-column:span 7}[data-span="5"]{grid-column:span 5}[data-span="6"]{grid-column:span 6}[data-span="12"]{grid-column:span 12}}`}</style>
        </div>
    );
};