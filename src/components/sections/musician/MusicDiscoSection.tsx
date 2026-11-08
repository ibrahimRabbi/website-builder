import React from 'react';
import { Disc, Music, ShoppingBag } from 'lucide-react';
import { MusicProps, M, DISPLAY, MONO, glass, useSel, MHead } from '@/src/utils/music';
import { goTo } from '@/src/utils/fluid';

export const MusicDiscoSection: React.FC<MusicProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, subtitle, albums = [], storeLabel = 'Vinyl Store', storeTarget = '#merch' } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    return (
        <div id="discography" className="px-6 sm:px-8 py-20" style={{ background: section.backgroundColor || M.alt }}>
            <div className="max-w-7xl mx-auto">
                <MHead badge={badge} title={title} pick={pick} ring={ring}
                    right={subtitle && <p onClick={pick('subtitle')} className={`text-xs sm:text-sm max-w-md cursor-pointer rounded ${ring('subtitle')}`} style={{ fontFamily: MONO, color: '#446041' }}>{subtitle.text}</p>} />
                <div onClick={pick('albums')} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 rounded ${ring('albums')}`}>
                    {albums.map((a: any, i: number) => (
                        <div key={a.id ?? i} className="p-6 sm:p-8 rounded-3xl flex flex-col justify-between" style={glass}>
                            <div>
                                <div className="relative mb-6 rounded-2xl overflow-hidden aspect-square max-w-md mx-auto" style={{ border: '1px solid #fff', background: 'rgba(255,255,255,.4)' }}>
                                    {a.cover && <img src={a.cover} alt={a.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                                    <span className="absolute bottom-4 right-4 p-3.5 rounded-full text-white" style={{ background: M.dark }}><Music className="w-5 h-5 fill-white" /></span>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-xs uppercase font-bold" style={{ fontFamily: MONO, color: M.mid, letterSpacing: '0.12em' }}>{a.subtitle}</span>
                                        <span className="text-xs" style={{ fontFamily: MONO, color: M.muted }}>{a.tracks} Tracks · {a.duration}</span>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold" style={{ fontFamily: DISPLAY, color: M.ink }}>{a.title}</h3>
                                    <p className="text-sm leading-relaxed" style={{ color: M.text }}>{a.desc}</p>
                                    <div className="pt-2">
                                        <div className="text-[11px] uppercase font-semibold mb-1.5" style={{ fontFamily: MONO, color: M.muted }}>Available Formats:</div>
                                        <div className="flex flex-wrap gap-2 text-xs" style={{ fontFamily: MONO, color: M.dark }}>
                                            {(a.formats || []).map((f: string, k: number) => <span key={k} className="px-2.5 py-1 rounded-md" style={{ background: 'rgba(255,255,255,.7)', border: '1px solid #fff' }}>{f}</span>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 mt-6 flex items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(0,0,0,.08)' }}>
                                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase" style={{ color: M.dark }}><Disc className="w-4 h-4" style={{ color: M.mid }} />Stream Album Audio</span>
                                <button type="button" onClick={(e) => goTo(e, storeTarget)} className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase rounded cursor-pointer" style={{ background: 'rgba(255,255,255,.8)', border: '1px solid #fff', color: M.ink }}>
                                    <ShoppingBag className="w-3.5 h-3.5" style={{ color: M.mid }} />{storeLabel}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};