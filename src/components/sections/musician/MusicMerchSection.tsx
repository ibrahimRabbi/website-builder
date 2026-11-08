import React, { useState } from 'react';
import { ShoppingBag, Check, ShieldCheck, Truck } from 'lucide-react';
import { MusicProps, M, DISPLAY, MONO, glass, useSel, MHead } from '@/src/utils/music';

export const MusicMerchSection: React.FC<MusicProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, perks = [], items = [] } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const [size, setSize] = useState<Record<string, string>>({});
    const [ordered, setOrdered] = useState<Record<string, boolean>>({});
    const icons = [Truck, ShieldCheck];
    return (
        <div id="merch" className="px-6 sm:px-8 py-20" style={{ background: section.backgroundColor || '#F4F7F2' }}>
            <div className="max-w-7xl mx-auto">
                <MHead badge={badge} title={title} pick={pick} ring={ring}
                    right={<div onClick={pick('perks')} className={`flex items-center gap-4 text-xs cursor-pointer rounded ${ring('perks')}`} style={{ fontFamily: MONO, color: '#4E6B4B' }}>
                        {perks.map((p: string, i: number) => { const I = icons[i % 2]; return <span key={i} className="flex items-center gap-1.5 font-medium"><I className="w-4 h-4" style={{ color: M.mid }} />{p}</span>; })}
                    </div>} />
                <div onClick={pick('items')} className={`grid grid-cols-1 md:grid-cols-3 gap-8 rounded ${ring('items')}`}>
                    {items.map((it: any, i: number) => {
                        const sizes: string[] = Array.isArray(it.sizes) ? it.sizes.filter(Boolean) : [];
                        const cur = size[it.id] || sizes[2] || sizes[0];
                        const done = ordered[it.id];
                        return (
                            <div key={it.id ?? i} className="rounded-3xl overflow-hidden flex flex-col justify-between" style={glass}>
                                <div>
                                    <div className="relative aspect-square overflow-hidden" style={{ background: 'rgba(255,255,255,.4)' }}>
                                        {it.image && <img src={it.image} alt={it.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                                        <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-bold rounded-md" style={{ fontFamily: MONO, background: 'rgba(255,255,255,.85)', color: M.dark }}>{it.type}</span>
                                    </div>
                                    <div className="p-6 space-y-2">
                                        <div className="text-xs" style={{ fontFamily: MONO, color: M.muted }}>{it.edition}</div>
                                        <h3 className="text-base font-bold leading-snug" style={{ fontFamily: DISPLAY, color: M.ink }}>{it.title}</h3>
                                        {sizes.length > 0 && (
                                            <div className="pt-3">
                                                <span className="text-[11px] font-semibold block mb-1.5" style={{ fontFamily: MONO, color: '#4E6B4B' }}>Select Size:</span>
                                                <div className="flex gap-2">{sizes.map((s) => (
                                                    <button key={s} type="button" onClick={(e) => { e.stopPropagation(); setSize((p) => ({ ...p, [it.id]: s })); }} className="w-9 h-8 rounded-md text-xs font-bold cursor-pointer"
                                                        style={{ fontFamily: MONO, background: cur === s ? M.dark : 'rgba(255,255,255,.8)', color: cur === s ? '#fff' : M.text }}>{s}</button>
                                                ))}</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid rgba(0,0,0,.05)' }}>
                                    <div><span className="text-xs block" style={{ fontFamily: MONO, color: M.muted }}>Price</span><span className="text-xl font-bold" style={{ fontFamily: MONO, color: M.ink }}>${it.price}</span></div>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); setOrdered((p) => ({ ...p, [it.id]: true })); }} className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase text-white cursor-pointer" style={{ background: done ? M.mid : M.dark, borderRadius: 2 }}>
                                        {done ? <><Check className="w-3.5 h-3.5" />Pre-Ordered</> : <><ShoppingBag className="w-3.5 h-3.5" style={{ color: '#6EE7B7' }} />Order Now</>}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};