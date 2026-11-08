import React, { useState } from 'react';
import { Calculator, ShieldCheck, ArrowRight } from 'lucide-react';
import { LawProps, C, MONO, SANS, useSel, LawHead, OliveBtn } from '@/src/utils/law';

export const LawEstimatorSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const c = section.components;
    const { badge, title, subtitle, matterTypes = [], urgencies = [], forums = [], labels = {}, baseRate = 1150, ctaButton } = c;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const [t, setT] = useState(0), [u, setU] = useState(1), [f, setF] = useState(0);

    const mt = matterTypes[t] || { hours: 80, retainer: 125000 };
    const ug = urgencies[u] || { rateAdd: 0, mult: 1, team: '' };
    const fm = forums[f] || { add: 0 };
    const hours = mt.hours;
    const retainer = Math.round((mt.retainer * (ug.mult || 1) + (fm.add || 0)) / 1000);
    const rate = baseRate + (ug.rateAdd || 0);

    const opt = (on: boolean) => ({ border: `1px solid ${on ? C.olive : C.line}`, background: on ? C.tint : '#fff', color: on ? C.text : C.muted });
    const lbl = 'text-xs font-bold uppercase tracking-wider block mb-3';

    return (
        <div id="calculator" className="px-6 lg:px-12 py-20" style={{ background: section.backgroundColor || 'rgba(240,243,228,.5)', fontFamily: SANS, color: C.text }}>
            <div className="max-w-[1360px] mx-auto">
                <LawHead badge={badge} title={title} subtitle={subtitle} pick={pick} ring={ring} />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div onClick={pick('matterTypes')} className={`lg:col-span-7 p-8 rounded-2xl space-y-8 ${ring('matterTypes')}`} style={{ background: '#fff', border: `1px solid ${C.line}` }}>
                        <div>
                            <span className={lbl}>{labels.matter}</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {matterTypes.map((m: any, i: number) => (
                                    <button key={m.id ?? i} type="button" onClick={(e) => { e.stopPropagation(); setT(i); }} className="p-3.5 text-left text-xs rounded-xl cursor-pointer transition-all" style={{ ...opt(t === i), fontWeight: t === i ? 700 : 400 }}>{m.label}</button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className={lbl}>{labels.urgency}</span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {urgencies.map((m: any, i: number) => (
                                    <button key={m.id ?? i} type="button" onClick={(e) => { e.stopPropagation(); setU(i); }} className="p-3 text-left rounded-xl cursor-pointer transition-all" style={opt(u === i)}>
                                        <span className="text-xs font-bold block">{m.label}</span>
                                        <span className="text-[11px] block mt-0.5" style={{ color: C.olive }}>{m.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className={lbl}>{labels.forum}</span>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                {forums.map((m: any, i: number) => (
                                    <button key={m.id ?? i} type="button" onClick={(e) => { e.stopPropagation(); setF(i); }} className="p-3 text-center text-xs rounded-xl cursor-pointer transition-all" style={{ ...opt(f === i), fontWeight: f === i ? 700 : 400 }}>{m.label}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div onClick={pick('resultTitle')} className={`lg:col-span-5 p-8 rounded-2xl flex flex-col justify-between shadow-md ${ring('resultTitle')}`} style={{ background: '#fff', border: `2px solid ${C.olive}` }}>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between pb-4" style={{ borderBottom: `1px solid ${C.soft}` }}>
                                <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"><Calculator className="w-5 h-5" style={{ color: C.olive }} />{c.resultTitle}</span>
                                <span className="px-2.5 py-1 rounded-md text-[11px] font-bold" style={{ background: C.tint, color: C.olive, fontFamily: MONO }}>{c.tierLabel}</span>
                            </div>
                            <div>
                                <span className="text-xs block" style={{ color: C.muted }}>{c.retainerLabel}</span>
                                <div className="text-5xl font-bold mt-1" style={{ fontFamily: MONO, color: C.olive }}>${retainer}k</div>
                                <span className="text-xs block mt-1" style={{ color: C.muted }}>{c.escrowNote}</span>
                            </div>
                            <div className="space-y-3 pt-4 text-xs" style={{ borderTop: `1px solid ${C.soft}` }}>
                                {[[c.rateLabel, `$${rate}/hr`], [c.windowLabel, `${hours}–${Math.round(hours * 1.4)} hrs`], [c.teamLabel, ug.team]].map(([k, v]: any) => (
                                    <div key={k} className="flex items-center justify-between py-1 gap-3"><span style={{ color: C.muted }}>{k}</span><span className="font-bold text-right" style={{ fontFamily: MONO }}>{v}</span></div>
                                ))}
                            </div>
                            <div className="p-3.5 rounded-xl text-xs flex gap-2" style={{ background: C.tint, border: `1px solid ${C.tintLine}`, color: '#4A5044' }}>
                                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" style={{ color: C.olive }} /><p>{c.note}</p>
                            </div>
                        </div>
                        {ctaButton && <div className="mt-8"><OliveBtn btn={ctaButton} className="w-full !py-4 !text-sm" icon={<ArrowRight className="w-4 h-4" />} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('ctaButton'); }} /></div>}
                    </div>
                </div>
            </div>
        </div>
    );
};