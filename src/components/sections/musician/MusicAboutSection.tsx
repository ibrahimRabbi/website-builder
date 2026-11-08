import React, { useState } from 'react';
import { Download, Mail, Quote, Radio, Award, Check } from 'lucide-react';
import { MusicProps, M, DISPLAY, MONO, glass, gl, useSel, DarkBtn, Modal, field, fieldStyle } from '@/src/utils/music';

export const MusicAboutSection: React.FC<MusicProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const c = section.components;
    const { badge, title, bio, bio2, avatar, rigLabel, rigText, ctaButton, secondaryButton, pressLabel, press = [], manifesto } = c;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const [booking, setBooking] = useState(false);
    const [sent, setSent] = useState(false);
    const [epk, setEpk] = useState(false);

    return (
        <div id="about" className="px-6 sm:px-8 py-20" style={{ background: section.backgroundColor || M.alt }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-5 space-y-6">
                    <div onClick={pick('avatar')} className={`rounded-3xl p-2.5 cursor-pointer ${ring('avatar')}`} style={glass}>
                        <div className="relative overflow-hidden rounded-2xl">
                            {avatar?.src && <img src={avatar.src} alt={avatar.alt} className="w-full aspect-[4/5] object-cover object-top" referrerPolicy="no-referrer" />}
                            <div className="absolute bottom-3 left-3 right-3 p-4 rounded-xl" style={{ ...glass, background: 'rgba(255,255,255,.88)' }}>
                                <div className="text-[11px] font-bold uppercase flex items-center gap-1.5" style={{ fontFamily: MONO, color: '#244B20' }}><Radio className="w-3.5 h-3.5" style={{ color: M.mid }} />{rigLabel}</div>
                                <p className="text-xs mt-1" style={{ fontFamily: MONO, color: '#2D4A29' }}>{rigText}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        {ctaButton && <span className="w-full sm:w-1/2" onClick={pick('ctaButton')}><DarkBtn btn={ctaButton} className={`w-full uppercase !text-xs ${ring('ctaButton')}`} icon={<Mail className="w-3.5 h-3.5" style={{ color: '#6EE7B7' }} />} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('ctaButton'); setBooking(true); setSent(false); }} /></span>}
                        {secondaryButton && <span className="w-full sm:w-1/2" onClick={pick('secondaryButton')}><DarkBtn ghost btn={secondaryButton} className={`w-full uppercase !text-xs ${ring('secondaryButton')}`} icon={<Download className="w-3.5 h-3.5" style={{ color: M.mid }} />} onClick={(e) => { e.stopPropagation(); onSelectComponent?.('secondaryButton'); setEpk(true); setTimeout(() => setEpk(false), 2500); }} /></span>}
                    </div>
                    {epk && <p className="text-xs" style={{ fontFamily: MONO, color: M.dark }}>Press kit dispatched.</p>}
                </div>

                <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-4">
                        {badge && <span onClick={pick('badge')} className={`block text-xs font-bold uppercase cursor-pointer rounded px-1 -mx-1 ${ring('badge')}`} style={{ fontFamily: MONO, letterSpacing: '0.15em', color: M.mid }}>{badge.text}</span>}
                        {title && <h2 onClick={pick('title')} className={`cursor-pointer rounded px-1 -mx-1 ${ring('title')}`} style={{ fontFamily: DISPLAY, fontSize: `clamp(28px, 4.5vw, ${title.styles?.fontSize || '48px'})`, fontWeight: 800, color: M.ink, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{gl(title.text)}</h2>}
                        {bio && <p onClick={pick('bio')} className={`cursor-pointer rounded px-1 -mx-1 text-base sm:text-lg leading-relaxed ${ring('bio')}`} style={{ color: bio.styles?.color || '#2D4A29' }}>{bio.text}</p>}
                        {bio2 && <p onClick={pick('bio2')} className={`cursor-pointer rounded px-1 -mx-1 text-sm sm:text-base leading-relaxed ${ring('bio2')}`} style={{ color: bio2.styles?.color || '#466143' }}>{bio2.text}</p>}
                    </div>

                    <div className="space-y-4 pt-4" style={{ borderTop: '1px solid rgba(0,0,0,.08)' }}>
                        <div className="text-xs uppercase font-semibold flex items-center gap-2" style={{ fontFamily: MONO, color: '#5B7858', letterSpacing: '0.12em' }}><Award className="w-3.5 h-3.5" style={{ color: M.mid }} />{pressLabel}</div>
                        <div onClick={pick('press')} className={`grid grid-cols-1 md:grid-cols-3 gap-4 rounded cursor-pointer ${ring('press')}`}>
                            {press.map((p: any, i: number) => (
                                <div key={p.id ?? i} className="p-4 rounded-2xl flex flex-col justify-between gap-3" style={glass}>
                                    <p className="text-xs italic leading-relaxed" style={{ color: '#2D4A29' }}>“{p.quote}”</p>
                                    <div className="pt-2" style={{ borderTop: '1px solid rgba(0,0,0,.05)' }}>
                                        <div className="text-xs font-bold" style={{ fontFamily: DISPLAY, color: M.ink }}>{p.publication}</div>
                                        <div className="text-[11px] font-bold" style={{ fontFamily: MONO, color: M.dark }}>{p.rating}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {manifesto && (
                        <div onClick={pick('manifesto')} className={`p-5 rounded-2xl flex items-start gap-3 cursor-pointer ${ring('manifesto')}`} style={{ ...glass, background: 'rgba(255,255,255,.7)' }}>
                            <Quote className="w-5 h-5 shrink-0 mt-0.5" style={{ color: M.mid }} />
                            <p className="text-xs sm:text-sm italic leading-relaxed" style={{ color: '#2D4A29' }}>“{manifesto.text}”</p>
                        </div>
                    )}
                </div>
            </div>

            {booking && (
                <Modal title="Contact & Booking Inquiries" kicker="Artist Representation & Management" onClose={() => setBooking(false)}>
                    {sent ? (
                        <div className="text-center space-y-3 py-4">
                            <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center" style={{ background: '#D1FAE5', color: M.dark }}><Check className="w-6 h-6" /></div>
                            <h3 className="text-xl font-bold" style={{ fontFamily: DISPLAY }}>Inquiry Dispatched</h3>
                            <DarkBtn label="Close Window" onClick={() => setBooking(false)} />
                        </div>
                    ) : (
                        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input required className={field} style={fieldStyle} placeholder="Full name" />
                                <input required type="email" className={field} style={fieldStyle} placeholder="Email" />
                                <input className={field} style={fieldStyle} placeholder="Agency / Festival" />
                                <input className={field} style={fieldStyle} placeholder="City / Venue" />
                            </div>
                            <textarea required rows={3} className={field} style={fieldStyle} placeholder="Details & technical requirements..." />
                            <DarkBtn label="Send Inquiry to Artist Management" className="w-full !py-3 uppercase !text-xs" onClick={() => { }} />
                        </form>
                    )}
                </Modal>
            )}
        </div>
    );
};