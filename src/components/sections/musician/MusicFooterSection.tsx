import React, { useState } from 'react';
import { Send, Check, Leaf } from 'lucide-react';
import { MusicProps, M, DISPLAY, MONO, glass, useSel, DarkBtn } from '@/src/utils/music';

export const MusicFooterSection: React.FC<MusicProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const c = section.components;
    const { badge, title, text, brand, label, socials = [], copyright, joinLabel = 'Join', placeholder, successText } = c;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const [email, setEmail] = useState('');
    const [ok, setOk] = useState(false);
    return (
        <footer className="px-6 sm:px-8 pt-16 pb-12" style={{ background: section.backgroundColor || '#E8EFE4', borderTop: '1px solid rgba(0,0,0,.08)', color: '#446041', fontSize: 12 }}>
            <div className="max-w-7xl mx-auto">
                <div className="p-8 sm:p-10 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" style={glass}>
                    <div className="lg:col-span-6 space-y-2">
                        {badge && <span onClick={pick('badge')} className={`text-[11px] uppercase font-bold flex items-center gap-1.5 cursor-pointer rounded ${ring('badge')}`} style={{ fontFamily: MONO, color: M.dark, letterSpacing: '0.12em' }}><Leaf className="w-3.5 h-3.5" style={{ color: M.mid }} />{badge.text}</span>}
                        {title && <h3 onClick={pick('title')} className={`text-xl sm:text-2xl font-bold cursor-pointer rounded ${ring('title')}`} style={{ fontFamily: DISPLAY, color: M.ink }}>{title.text}</h3>}
                        {text && <p onClick={pick('text')} className={`max-w-md cursor-pointer rounded ${ring('text')}`} style={{ color: '#3D573A' }}>{text.text}</p>}
                    </div>
                    <div className="lg:col-span-6">
                        {ok ? (
                            <div className="p-3 rounded-md flex items-center gap-2 max-w-md lg:ml-auto font-medium" style={{ background: 'rgba(255,255,255,.9)', color: M.dark }}><Check className="w-4 h-4" style={{ color: M.mid }} />{successText}</div>
                        ) : (
                            <form className="flex gap-2 max-w-md lg:ml-auto" onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setOk(true); }}>
                                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={placeholder} className="flex-1 px-4 py-3 bg-white rounded-md text-xs focus:outline-none" style={{ border: '1px solid rgba(0,0,0,.1)', color: M.ink }} />
                                <DarkBtn label={joinLabel} className="uppercase !text-xs !py-3 !px-5 shrink-0" icon={<Send className="w-3.5 h-3.5" />} onClick={() => { }} />
                            </form>
                        )}
                    </div>
                </div>

                <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <span onClick={pick('brand')} className={`text-base font-extrabold uppercase cursor-pointer rounded ${ring('brand')}`} style={{ fontFamily: DISPLAY, letterSpacing: '0.12em', color: M.ink }}>{brand}</span>
                        <span style={{ color: M.line }}>/</span>
                        <span className="text-[11px] font-medium" style={{ fontFamily: MONO, color: M.muted }}>{label}</span>
                    </div>
                    <div onClick={pick('socials')} className={`flex flex-wrap items-center gap-6 text-[11px] font-medium cursor-pointer rounded ${ring('socials')}`} style={{ fontFamily: MONO }}>
                        {socials.map((s: any, i: number) => <a key={s.id ?? i} href={s.url} onClick={(e) => e.preventDefault()}>{s.label}</a>)}
                    </div>
                    <div onClick={pick('copyright')} className={`text-[11px] cursor-pointer rounded ${ring('copyright')}`} style={{ fontFamily: MONO, color: '#6D8A69' }}>{copyright}</div>
                </div>
            </div>
        </footer>
    );
};