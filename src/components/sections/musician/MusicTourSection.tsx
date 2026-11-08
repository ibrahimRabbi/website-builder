import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Ticket, Sparkles, ChevronRight, Bell, Check } from 'lucide-react';
import { MusicProps, M, DISPLAY, MONO, glass, useSel, MHead, Modal, DarkBtn, field, fieldStyle } from '@/src/utils/music';

export const MusicTourSection: React.FC<MusicProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const c = section.components;
    const { badge, title, subtitle, regions = [{ id: 'all', label: 'All Regions' }], dates = [], tiers = [], vip } = c;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const [region, setRegion] = useState('all');
    const [remind, setRemind] = useState<Record<string, boolean>>({});
    const [sel, setSel] = useState<any>(null);
    const [tierId, setTierId] = useState<string>('');
    const [qty, setQty] = useState(2);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [done, setDone] = useState<string | null>(null);

    const shown = dates.filter((d: any) => region === 'all' || d.region === region);
    const tier = tiers.find((t: any) => t.id === tierId) || tiers[0];
    const unit = (sel?.price || 0) + (tier?.delta || 0);
    const total = unit * qty + 4.5 * qty;
    const open = (d: any) => { setSel(d); setDone(null); setTierId(tiers[0]?.id || ''); };

    const filters = (
        <div onClick={pick('regions')} className={`flex items-center gap-1.5 p-1 rounded-lg overflow-x-auto ${ring('regions')}`} style={glass}>
            {regions.map((r: any) => (
                <button key={r.id} type="button" onClick={(e) => { e.stopPropagation(); setRegion(r.id); }} className="px-3.5 py-2 text-xs font-semibold rounded-md whitespace-nowrap cursor-pointer"
                    style={{ background: region === r.id ? M.dark : 'transparent', color: region === r.id ? '#fff' : '#445F41' }}>{r.label}</button>
            ))}
        </div>
    );

    const statusTxt = (s: string) => s === 'selling-fast' ? ['· Selling Fast', '#B45309'] : s === 'low-inventory' ? ['· Low Tickets Left', '#E11D48'] : ['· Tickets On Sale', M.dark];

    return (
        <div id="tour" className="px-6 sm:px-8 py-20" style={{ background: section.backgroundColor || M.alt2 }}>
            <div className="max-w-7xl mx-auto">
                <MHead badge={badge} title={title} subtitle={subtitle} right={filters} pick={pick} ring={ring} />

                {c.bannerImage && (
                    <div onClick={pick('bannerImage')} className={`relative rounded-2xl overflow-hidden mb-12 cursor-pointer ${ring('bannerImage')}`} style={{ boxShadow: '0 20px 45px rgba(35,60,25,.1)' }}>
                        <img src={c.bannerImage} alt="" className="w-full h-56 sm:h-80 object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(22,48,19,.8), transparent)' }} />
                        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-xs uppercase font-bold" style={{ fontFamily: MONO, color: '#6EE7B7' }}><Sparkles className="w-3.5 h-3.5" />{c.bannerTag}</div>
                                <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1" style={{ fontFamily: DISPLAY }}>{c.bannerTitle}</h3>
                            </div>
                            <span className="text-xs text-white px-3 py-1 rounded-md" style={{ fontFamily: MONO, background: 'rgba(0,0,0,.3)', border: '1px solid rgba(255,255,255,.2)' }}>{c.bannerNote}</span>
                        </div>
                    </div>
                )}

                <div onClick={pick('dates')} className={`space-y-3.5 rounded ${ring('dates')}`}>
                    {shown.map((d: any, i: number) => {
                        const [stx, scol] = statusTxt(d.status);
                        return (
                            <div key={d.id ?? i} className="p-5 sm:p-6 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6" style={glass}>
                                <div className="flex items-start sm:items-center gap-6">
                                    <div className="flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl shrink-0" style={{ background: 'rgba(255,255,255,.85)', border: '1px solid #fff' }}>
                                        <span className="text-[11px] font-bold uppercase" style={{ fontFamily: MONO, color: M.dark }}>{d.month}</span>
                                        <span className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: DISPLAY, color: M.ink }}>{d.day}</span>
                                        <span className="text-[10px]" style={{ fontFamily: MONO, color: '#668262' }}>{d.year}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-lg sm:text-xl font-bold" style={{ fontFamily: DISPLAY, color: M.ink }}>{d.city}, {d.country}</h3>
                                            <span className="text-[11px] font-semibold uppercase" style={{ fontFamily: MONO, color: scol }}>{stx}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm" style={{ color: '#466143' }}>
                                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" style={{ color: M.mid }} />{d.venue}</span>
                                            <span className="flex items-center gap-1" style={{ fontFamily: MONO, color: M.muted }}><Clock className="w-3.5 h-3.5" />Doors: {d.doors}</span>
                                        </div>
                                        <p className="text-xs" style={{ fontFamily: MONO, color: M.muted }}>Special Guest: <b style={{ color: M.ink }}>{d.support}</b></p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between lg:justify-end gap-4">
                                    <div className="text-left lg:text-right"><div className="text-xs" style={{ fontFamily: MONO, color: M.muted }}>From</div><div className="text-lg font-bold" style={{ fontFamily: MONO, color: M.ink }}>${d.price}</div></div>
                                    <div className="flex items-center gap-2.5">
                                        <button type="button" onClick={(e) => { e.stopPropagation(); setRemind((s) => ({ ...s, [d.id]: !s[d.id] })); }} className="p-2.5 rounded-lg cursor-pointer"
                                            style={{ background: remind[d.id] ? 'rgba(36,75,32,.15)' : 'rgba(255,255,255,.8)', color: remind[d.id] ? M.dark : M.muted, border: '1px solid rgba(255,255,255,.9)' }}><Bell className="w-4 h-4" /></button>
                                        <span className="hidden sm:inline-flex p-2.5 rounded-lg" style={{ background: 'rgba(255,255,255,.8)', color: M.muted }}><Calendar className="w-4 h-4" /></span>
                                        <DarkBtn label="GET TICKETS" className="uppercase !text-xs" icon={<Ticket className="w-3.5 h-3.5" style={{ color: '#6EE7B7' }} />} onClick={(e) => { e.stopPropagation(); open(d); }} />
                                        <ChevronRight className="hidden" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {vip && (
                    <div onClick={pick('vip')} className={`mt-12 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer ${ring('vip')}`} style={glass}>
                        <div><h4 className="text-base font-bold" style={{ fontFamily: DISPLAY, color: M.ink }}>{vip.title}</h4><p className="text-xs sm:text-sm mt-1" style={{ color: '#3D573A' }}>{vip.text}</p></div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); if (dates[0]) open(dates[0]); }} className="px-5 py-2.5 text-xs font-bold uppercase whitespace-nowrap cursor-pointer" style={{ color: M.dark, background: '#fff', border: `1px solid ${M.dark}55`, borderRadius: 2 }}>{vip.button}</button>
                    </div>
                )}
            </div>

            {sel && (
                <Modal title={`${sel.city} — ${sel.venue}`} kicker="Official Tour Box Office" onClose={() => setSel(null)}>
                    {done ? (
                        <div className="text-center space-y-3 py-4">
                            <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center" style={{ background: '#D1FAE5', color: M.dark }}><Check className="w-8 h-8" /></div>
                            <h3 className="text-2xl font-bold" style={{ fontFamily: DISPLAY }}>Reservation Confirmed</h3>
                            <p className="text-xs" style={{ color: '#3D573A' }}>Order <b style={{ fontFamily: MONO }}>{done}</b> sent to {email}</p>
                            <DarkBtn label="Done" onClick={() => setSel(null)} />
                        </div>
                    ) : (
                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setDone(`KV-${String(sel.city).slice(0, 3).toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`); }}>
                            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl text-xs bg-white" style={{ fontFamily: MONO }}>
                                <div><span style={{ color: M.muted }} className="block">Date</span><b>{sel.month} {sel.day}, {sel.year}</b></div>
                                <div><span style={{ color: M.muted }} className="block">Doors</span><b>{sel.doors}</b></div>
                                <div><span style={{ color: M.muted }} className="block">Support</span><b>{sel.support}</b></div>
                            </div>
                            <div className="space-y-2">
                                {tiers.map((t: any) => (
                                    <div key={t.id} onClick={() => setTierId(t.id)} className="p-3 rounded-xl cursor-pointer flex justify-between gap-3" style={{ border: `1px solid ${tier?.id === t.id ? M.dark : 'rgba(0,0,0,.08)'}`, background: tier?.id === t.id ? 'rgba(36,75,32,.08)' : '#fff' }}>
                                        <div><b className="text-sm">{t.name}</b><p className="text-xs" style={{ color: '#3D573A' }}>{t.desc}</p></div>
                                        <b style={{ fontFamily: MONO }}>${(sel.price || 0) + (t.delta || 0)}</b>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white">
                                <b className="text-sm">Quantity</b>
                                <div className="flex items-center gap-3">
                                    <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-lg border cursor-pointer">-</button>
                                    <b style={{ fontFamily: MONO }}>{qty}</b>
                                    <button type="button" onClick={() => setQty(Math.min(6, qty + 1))} className="w-8 h-8 rounded-lg border cursor-pointer">+</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input required className={field} style={fieldStyle} placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
                                <input required type="email" className={field} style={fieldStyle} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="flex justify-between text-sm font-bold pt-2" style={{ fontFamily: MONO }}><span>Total</span><span style={{ color: M.dark }}>${total.toFixed(2)}</span></div>
                            <DarkBtn label={`Confirm & Reserve ${qty} Tickets`} className="w-full !py-3.5 uppercase !text-xs" onClick={() => { }} />
                        </form>
                    )}
                </Modal>
            )}
        </div>
    );
};