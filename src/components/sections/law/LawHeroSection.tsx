import React from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { LawProps, C, MONO, hl, useSel, OliveBtn } from '@/src/utils/law';
import { goTo } from '@/src/utils/fluid';

export const LawHeroSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const c = section.components;
    const { badge, title, subtitle, ctaButton, secondaryButton, avatar, trust = [] } = c;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const bg = section.backgroundColor || C.bg;

    return (
        <div className="relative px-6 lg:px-12 py-14 lg:py-20 overflow-hidden" style={{ background: bg, fontFamily: "'Poppins', sans-serif", color: C.text }}>
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40"
                style={{ backgroundImage: `linear-gradient(to right, ${C.line} 1px, transparent 1px), linear-gradient(to bottom, ${C.line} 1px, transparent 1px)`, backgroundSize: '4rem 4rem' }} />
            <div className="relative max-w-[1360px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7 space-y-7">
                    {badge && (
                        <span onClick={pick('badge')} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold cursor-pointer ${ring('badge')}`}
                            style={{ background: C.tint, border: `1px solid ${C.tintLine}`, color: badge.styles?.color || C.olive }}>
                            <span className="w-2 h-2 rounded-full" style={{ background: C.olive }} />{badge.text}
                        </span>
                    )}
                    {title && (
                        <h1 onClick={pick('title')} className={`cursor-pointer rounded px-1 -mx-1 ${ring('title')}`}
                            style={{
                                fontSize: `clamp(34px, 5vw, ${title.styles?.fontSize || '56px'})`, fontWeight: title.styles?.fontWeight || 700,
                                lineHeight: 1.12, letterSpacing: '-0.025em', color: title.styles?.color || C.text
                            }}>
                            {hl(title.text)}
                        </h1>
                    )}
                    {subtitle && (
                        <p onClick={pick('subtitle')} className={`cursor-pointer rounded px-1 -mx-1 max-w-2xl text-base lg:text-lg leading-relaxed ${ring('subtitle')}`}
                            style={{ color: subtitle.styles?.color || C.muted }}>{subtitle.text}</p>
                    )}
                    <div className="flex flex-wrap gap-4">
                        {ctaButton && <span onClick={pick('ctaButton')} className={`rounded-lg ${ring('ctaButton')}`}><OliveBtn btn={ctaButton} icon={<ArrowUpRight className="w-4 h-4" />} onClick={(e) => goTo(e, ctaButton.link)} /></span>}
                        {secondaryButton && <span onClick={pick('secondaryButton')} className={`rounded-lg ${ring('secondaryButton')}`}><OliveBtn btn={secondaryButton} outline onClick={(e) => goTo(e, secondaryButton.link)} /></span>}
                    </div>
                    <div onClick={pick('trust')} className={`flex flex-wrap gap-x-6 gap-y-2 text-xs cursor-pointer rounded ${ring('trust')}`} style={{ color: C.muted }}>
                        {trust.map((t: string, i: number) => (
                            <span key={i} className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" style={{ color: C.olive }} />{t}</span>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-5 relative">
                    <div aria-hidden className="absolute -top-4 -right-4 w-full h-full rounded-2xl -z-0" style={{ background: 'rgba(125,141,57,.1)', border: '2px solid rgba(125,141,57,.2)' }} />
                    <div className="relative rounded-2xl p-3 shadow-lg" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
                        <div onClick={pick('avatar')} className={`relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer ${ring('avatar')}`} style={{ background: C.soft }}>
                            {avatar?.src && <img src={avatar.src} alt={avatar.alt} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />}
                            <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                                <span className="px-3 py-1.5 rounded-full text-[11px] font-semibold flex items-center gap-1.5" style={{ background: 'rgba(255,255,255,.95)', border: `1px solid ${C.line}` }}>
                                    <span className="w-2 h-2 rounded-full" style={{ background: C.olive }} />{c.cardBadgeLeft}
                                </span>
                                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white" style={{ background: C.olive, fontFamily: MONO }}>{c.cardBadgeRight}</span>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 p-5 text-white" style={{ background: 'linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.4), transparent)' }}>
                                <p className="text-xl font-bold">{c.cardName}</p>
                                <p className="text-xs opacity-80 mt-0.5">{c.cardRole}</p>
                                <div className="mt-3 pt-3 flex justify-between text-[11px]" style={{ fontFamily: MONO, color: C.tintLine, borderTop: '1px solid rgba(255,255,255,.2)' }}>
                                    <span>{c.cardCities}</span><span className="font-bold text-white">{c.cardCreds}</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 p-3.5 rounded-xl flex items-center justify-between" style={{ background: C.tint, border: `1px solid ${C.tintLine}` }}>
                            <div>
                                <span className="text-[10px] uppercase font-bold block" style={{ color: C.olive }}>{c.stakeLabel}</span>
                                <span className="text-xl font-bold" style={{ fontFamily: MONO }}>{c.stakeValue}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] uppercase font-bold block" style={{ color: C.olive }}>{c.rateLabel}</span>
                                <span className="text-xl font-bold" style={{ fontFamily: MONO, color: C.olive }}>{c.rateValue}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};