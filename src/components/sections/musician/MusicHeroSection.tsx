import React, { useState } from 'react';
import { Play, Pause, Calendar, Disc, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { MusicProps, M, DISPLAY, MONO, glass, gl, useSel, DarkBtn } from '@/src/utils/music';
import { goTo } from '@/src/utils/fluid';

export const MusicHeroSection: React.FC<MusicProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const c = section.components;
    const { badge, title, subtitle, meta = [], ctaButton, secondaryButton, linkButton, avatar, kpis = [] } = c;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const [playing, setPlaying] = useState(false);

    return (
        <div className="relative overflow-hidden px-6 sm:px-8 pt-10 pb-16" style={{ background: section.backgroundColor || M.bg }}>
            <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] rounded-full pointer-events-none" style={{ background: 'rgba(167,243,208,.4)', filter: 'blur(140px)' }} />
            <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full pointer-events-none" style={{ background: 'rgba(220,235,212,.6)', filter: 'blur(150px)' }} />
            <div className="relative max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        {badge && (
                            <div onClick={pick('badge')} className={`inline-flex items-center gap-2 text-xs uppercase font-bold cursor-pointer rounded px-1 -mx-1 ${ring('badge')}`} style={{ fontFamily: MONO, letterSpacing: '0.15em', color: badge.styles?.color || M.mid }}>
                                <Sparkles className="w-3.5 h-3.5" />{badge.text}
                            </div>
                        )}
                        {title && (
                            <h1 onClick={pick('title')} className={`cursor-pointer rounded px-1 -mx-1 ${ring('title')}`}
                                style={{ fontFamily: DISPLAY, fontSize: `clamp(38px, 7vw, ${title.styles?.fontSize || '72px'})`, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: title.styles?.color || M.ink, whiteSpace: 'pre-line' }}>
                                {gl(title.text)}
                            </h1>
                        )}
                        {subtitle && (
                            <p onClick={pick('subtitle')} className={`cursor-pointer rounded px-1 -mx-1 max-w-xl text-base sm:text-lg leading-relaxed ${ring('subtitle')}`} style={{ color: subtitle.styles?.color || M.text }}>{subtitle.text}</p>
                        )}
                        <div onClick={pick('meta')} className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm cursor-pointer rounded ${ring('meta')}`} style={{ fontFamily: MONO, color: '#5F7A5B' }}>
                            {meta.map((m: string, i: number) => (<React.Fragment key={i}>{i > 0 && <span>·</span>}<span>{m}</span></React.Fragment>))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            {ctaButton && (
                                <span onClick={pick('ctaButton')} className={`rounded ${ring('ctaButton')}`}>
                                    <DarkBtn btn={ctaButton} label={playing ? 'Pause Preview' : ctaButton.label} icon={playing ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />} onClick={(e) => { e.stopPropagation(); setPlaying(!playing); onSelectComponent?.('ctaButton'); }} />
                                </span>
                            )}
                            {secondaryButton && (
                                <span onClick={pick('secondaryButton')} className={`rounded ${ring('secondaryButton')}`}>
                                    <DarkBtn ghost btn={secondaryButton} icon={<Calendar className="w-4 h-4" style={{ color: M.mid }} />} onClick={(e) => goTo(e, secondaryButton.link)} />
                                    <ArrowRight className="hidden" />
                                </span>
                            )}
                            {linkButton && (
                                <span onClick={pick('linkButton')} className={`rounded ${ring('linkButton')}`}>
                                    <button type="button" onClick={(e) => goTo(e, linkButton.link)} className="inline-flex items-center gap-2 text-sm font-medium cursor-pointer" style={{ color: '#3F573C' }}>
                                        <Disc className="w-4 h-4" style={{ color: M.mid }} />{linkButton.label}
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div onClick={pick('avatar')} className={`rounded-2xl p-2 cursor-pointer ${ring('avatar')}`} style={glass}>
                            <div className="relative overflow-hidden rounded-xl">
                                {avatar?.src && <img src={avatar.src} alt={avatar.alt} className="w-full aspect-[4/3] object-cover" referrerPolicy="no-referrer" />}
                                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(27,56,23,.4), transparent)' }} />
                                <div className="absolute bottom-3 left-3 right-3 p-4 rounded-xl flex items-center justify-between gap-4" style={{ ...glass, background: 'rgba(255,255,255,.88)' }}>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 text-[11px] uppercase font-bold" style={{ fontFamily: MONO, color: M.dark }}><Volume2 className="w-3.5 h-3.5" style={{ color: M.mid }} />{c.cardLabel}</div>
                                        <p className="text-sm font-bold truncate mt-0.5" style={{ color: M.ink }}>{c.cardTitle}</p>
                                    </div>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); setPlaying(!playing); }} className="p-3 rounded-full text-white shrink-0 cursor-pointer" style={{ background: M.dark }}>
                                        {playing ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div onClick={pick('kpis')} className={`mt-14 p-6 sm:p-8 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer ${ring('kpis')}`} style={glass}>
                    {kpis.map((k: any, i: number) => (
                        <div key={k.id ?? i}>
                            <div className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: MONO, color: k.accent ? M.dark : M.ink }}>{k.value}</div>
                            <div className="text-xs mt-1 uppercase font-medium" style={{ color: '#526F4F', letterSpacing: '0.06em' }}>{k.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};