import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, X, Landmark } from 'lucide-react';
import { LawProps, C, MONO, SANS, useSel, LawHead } from '@/src/utils/law';

export const LawMattersSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, subtitle, categories = ['All'], matters = [] } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const [cat, setCat] = useState('All');
    const [open, setOpen] = useState<any>(null);
    const shown = cat === 'All' ? matters : matters.filter((m: any) => m.category === cat);

    const filters = (
        <div onClick={pick('categories')} className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl ${ring('categories')}`} style={{ background: C.soft, border: '1px solid #E0E0D6' }}>
            {categories.map((k: string) => (
                <button key={k} type="button" onClick={(e) => { e.stopPropagation(); setCat(k); }} className="px-3.5 py-1.5 text-xs rounded-lg font-semibold cursor-pointer transition-all"
                    style={{ background: cat === k ? C.olive : 'transparent', color: cat === k ? '#fff' : C.muted }}>{k}</button>
            ))}
        </div>
    );

    return (
        <div id="matters" className="px-6 lg:px-12 py-20" style={{ background: section.backgroundColor || C.bg, fontFamily: SANS, color: C.text }}>
            <div className="max-w-[1360px] mx-auto">
                <LawHead badge={badge} title={title} subtitle={subtitle} right={filters} pick={pick} ring={ring} />
                <div onClick={pick('matters')} className={`grid grid-cols-1 md:grid-cols-2 gap-8 rounded ${ring('matters')}`}>
                    {shown.map((m: any, i: number) => (
                        <div key={m.id ?? i} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('matters'); setOpen(m); }}
                            className="group p-8 rounded-2xl flex flex-col justify-between cursor-pointer transition-all hover:shadow-md" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-xs gap-2" style={{ fontFamily: MONO }}>
                                    <span><span className="px-2.5 py-1 rounded-md font-bold" style={{ background: C.tint, color: C.olive }}>{m.docket}</span><span className="ml-2" style={{ color: C.muted }}>{m.year}</span></span>
                                    <span className="font-bold text-sm" style={{ color: C.olive }}>{m.stake}</span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold leading-snug">{m.title}</h3>
                                <p className="text-xs font-medium" style={{ color: C.olive }}>{m.jurisdiction} · {m.client}</p>
                                <p className="text-sm leading-relaxed" style={{ color: C.muted }}>{m.synopsis}</p>
                                <div className="p-3.5 rounded-xl text-xs" style={{ background: C.bg, border: `1px solid ${C.line}`, color: '#4A5044' }}>
                                    <b className="block mb-1" style={{ color: C.text }}>{m.strategyLabel || 'Defense Strategy Pivot:'}</b>{m.strategy}
                                </div>
                            </div>
                            <div className="mt-6 pt-5 flex items-center justify-between gap-4" style={{ borderTop: `1px solid ${C.soft}` }}>
                                <span className="flex items-center gap-1.5 text-xs font-semibold"><CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: C.olive }} />{m.outcome}</span>
                                <span className="shrink-0 inline-flex items-center gap-1 text-xs font-bold" style={{ color: C.olive }}>Case Dossier<ArrowUpRight className="w-3.5 h-3.5" /></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,.6)' }} onClick={(e) => { e.stopPropagation(); setOpen(null); }}>
                    <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-8 space-y-6" onClick={(e) => e.stopPropagation()} style={{ border: `1px solid ${C.line}` }}>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className="text-xs font-bold uppercase" style={{ fontFamily: MONO, color: C.olive }}>Case Dossier · {open.docket}</span>
                                <h2 className="text-2xl font-bold mt-1">{open.title}</h2>
                                <p className="text-xs font-semibold mt-2 flex items-center gap-2" style={{ color: C.olive }}><Landmark className="w-4 h-4" />{open.jurisdiction}</p>
                            </div>
                            <button type="button" onClick={() => setOpen(null)} className="p-2 rounded-lg cursor-pointer" style={{ background: C.bg }}><X className="w-5 h-5" /></button>
                        </div>
                        <div><h4 className="text-xs font-bold uppercase mb-1" style={{ fontFamily: MONO, color: C.olive }}>The Controversy</h4><p className="text-sm leading-relaxed" style={{ color: '#3A4034' }}>{open.synopsis}</p></div>
                        <div><h4 className="text-xs font-bold uppercase mb-1" style={{ fontFamily: MONO, color: C.olive }}>Strategy</h4><p className="text-sm leading-relaxed" style={{ color: '#3A4034' }}>{open.strategy}</p></div>
                        {open.quote && <div className="p-5 rounded-xl italic" style={{ background: C.tint, border: `1px solid ${C.tintLine}` }}>{open.quote}</div>}
                        <div className="p-4 rounded-xl flex gap-3" style={{ background: C.tint, border: `2px solid ${C.olive}` }}>
                            <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: C.olive }} /><b className="text-sm">{open.outcome}</b>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};