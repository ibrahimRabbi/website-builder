import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Heart, FileText, ExternalLink, Search, Music2, Radio } from 'lucide-react';
import { MusicProps, M, DISPLAY, MONO, glass, useSel, MHead, Modal } from '@/src/utils/music';

export const MusicTracksSection: React.FC<MusicProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { badge, title, categories = [{ id: 'all', label: 'All Tracks' }], tracks = [], gearLabel, gearText, gearRight } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    const [cat, setCat] = useState('all');
    const [q, setQ] = useState('');
    const [curId, setCurId] = useState<string | null>(null);
    const [playing, setPlaying] = useState(false);
    const [liked, setLiked] = useState<Record<string, boolean>>({});
    const [lyrics, setLyrics] = useState<any>(null);
    const [sec, setSec] = useState(0);
    const audio = useRef<HTMLAudioElement | null>(null);

    const cur = tracks.find((t: any) => t.id === curId) || tracks[0];
    const shown = tracks.filter((t: any) => {
        const okCat = cat === 'all' || t.category === cat;
        const s = q.toLowerCase();
        return okCat && (!s || [t.title, t.album, t.genre, t.key].some((v: string) => String(v || '').toLowerCase().includes(s)));
    });

    const toSec = (d: string) => { const [m, s] = String(d || '0:0').split(':'); return (+m || 0) * 60 + (+s || 0); };
    const total = toSec(cur?.duration);

    useEffect(() => { // fake progress timer
        if (!playing) return;
        const id = setInterval(() => setSec((p) => (p + 1 >= total ? 0 : p + 1)), 1000);
        return () => clearInterval(id);
    }, [playing, total]);

    useEffect(() => { setSec(0); }, [curId]);

    useEffect(() => { // real audio jodi audioUrl thake
        if (!audio.current) audio.current = new Audio();
        const a = audio.current;
        if (cur?.audioUrl) {
            if (a.src !== cur.audioUrl) a.src = cur.audioUrl;
            playing ? a.play().catch(() => { }) : a.pause();
        } else a.pause();
        return () => { a.pause(); };
    }, [playing, cur?.id, cur?.audioUrl]);

    const play = (t: any) => {
        if (curId === t.id) setPlaying(!playing);
        else { setCurId(t.id); setPlaying(true); }
    };
    const step = (d: number) => {
        const i = Math.max(0, tracks.findIndex((t: any) => t.id === cur?.id));
        setCurId(tracks[(i + d + tracks.length) % tracks.length]?.id);
    };
    const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

    const filters = (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: M.muted }} />
                <input value={q} onChange={(e) => setQ(e.target.value)} onClick={(e) => e.stopPropagation()} placeholder="Search tracks, keys, BPM..."
                    className="w-full sm:w-56 pl-9 pr-3 py-2 text-xs rounded-md focus:outline-none" style={{ background: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.9)', color: M.ink }} />
            </div>
            <div onClick={pick('categories')} className={`flex items-center gap-1 p-1 rounded-lg overflow-x-auto ${ring('categories')}`} style={{ ...glass, boxShadow: 'none' }}>
                {categories.map((c: any) => (
                    <button key={c.id} type="button" onClick={(e) => { e.stopPropagation(); setCat(c.id); }} className="px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap cursor-pointer"
                        style={{ background: cat === c.id ? M.dark : 'transparent', color: cat === c.id ? '#fff' : '#415A3E' }}>{c.label}</button>
                ))}
            </div>
        </div>
    );

    return (
        <div id="music" className="px-6 sm:px-8 py-20" style={{ background: section.backgroundColor || M.alt }}>
            <div className="max-w-7xl mx-auto">
                <MHead badge={badge} title={title} right={filters} pick={pick} ring={ring} big={false} />

                <div onClick={pick('tracks')} className={`rounded-2xl overflow-hidden ${ring('tracks')}`} style={glass}>
                    {shown.length === 0 && (
                        <div className="p-12 text-center space-y-2" style={{ color: M.muted }}><Music2 className="w-8 h-8 mx-auto" /><p className="text-sm">No tracks found.</p></div>
                    )}
                    {shown.map((t: any, i: number) => {
                        const isCur = cur?.id === t.id && curId !== null;
                        const active = isCur && playing;
                        return (
                            <div key={t.id ?? i} className="flex items-center justify-between gap-4 p-4 sm:p-5" style={{ background: isCur ? 'rgba(36,75,32,.06)' : 'transparent', borderTop: i ? '1px solid rgba(0,0,0,.05)' : 'none' }}>
                                <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
                                    <div className="w-6 text-center text-xs shrink-0" style={{ fontFamily: MONO, color: '#668262' }}>
                                        {active ? <span className="flex items-end justify-center gap-0.5 h-4">{[10, 16, 7].map((h, k) => <span key={k} className="w-1 rounded-sm" style={{ height: h, background: M.dark }} />)}</span> : String(i + 1).padStart(2, '0')}
                                    </div>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); play(t); }} className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden shrink-0 cursor-pointer" style={{ background: '#fff' }}>
                                        {t.cover && <img src={t.cover} alt={t.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                                        <span className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(22,48,19,.55)', opacity: active ? 1 : 0.0 }}>
                                            {active ? <Pause className="w-5 h-5 text-white fill-white" /> : <Play className="w-5 h-5 text-white fill-white" />}
                                        </span>
                                    </button>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm sm:text-base font-bold truncate" style={{ color: isCur ? M.dark : M.ink }}>{t.title}</h3>
                                            {t.isNew && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ fontFamily: MONO, color: M.mid, background: 'rgba(209,250,229,.6)' }}>NEW</span>}
                                        </div>
                                        <div className="text-xs mt-0.5 truncate" style={{ fontFamily: MONO, color: '#526F4F' }}>{t.album} · {t.genre} · {t.key} · {t.bpm} BPM</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                                    <span className="hidden md:inline text-xs" style={{ fontFamily: MONO, color: '#668262' }}>{t.plays}</span>
                                    <span className="text-xs sm:text-sm w-12 text-right" style={{ fontFamily: MONO, color: M.text }}>{t.duration}</span>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); setLiked((s) => ({ ...s, [t.id]: !s[t.id] })); }} className="p-2 cursor-pointer" style={{ color: liked[t.id] ? '#F43F5E' : '#7A9376' }}>
                                        <Heart className="w-4 h-4" fill={liked[t.id] ? '#F43F5E' : 'none'} />
                                    </button>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); setLyrics(t); }} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md font-medium cursor-pointer" style={{ background: 'rgba(255,255,255,.8)', border: '1px solid rgba(255,255,255,.9)', color: M.dark }}>
                                        <FileText className="w-3.5 h-3.5" style={{ color: M.mid }} />Credits
                                    </button>
                                    <span className="p-2" style={{ color: '#7A9376' }}><ExternalLink className="w-4 h-4" /></span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* docked player */}
                {cur && (
                    <div className="mt-6 rounded-2xl overflow-hidden" style={glass}>
                        <div className="h-1" style={{ background: 'rgba(36,75,32,.1)' }}><div className="h-full" style={{ width: `${total ? (sec / total) * 100 : 0}%`, background: `linear-gradient(90deg, ${M.dark}, ${M.light})` }} /></div>
                        <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                                {cur.cover && <img src={cur.cover} alt="" className="w-11 h-11 rounded-lg object-cover" referrerPolicy="no-referrer" />}
                                <div className="min-w-0"><div className="text-sm font-bold truncate" style={{ color: M.ink }}>{cur.title}</div><div className="text-xs truncate" style={{ fontFamily: MONO, color: '#526F4F' }}>{cur.album}</div></div>
                            </div>
                            <div className="flex items-center gap-4 shrink-0">
                                <button type="button" onClick={() => step(-1)} className="p-1.5 cursor-pointer" style={{ color: M.muted }}><SkipBack className="w-4 h-4" /></button>
                                <button type="button" onClick={() => setPlaying(!playing)} className="w-10 h-10 rounded-full text-white flex items-center justify-center cursor-pointer" style={{ background: M.dark }}>
                                    {playing ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                                </button>
                                <button type="button" onClick={() => step(1)} className="p-1.5 cursor-pointer" style={{ color: M.muted }}><SkipForward className="w-4 h-4" /></button>
                                <span className="hidden sm:inline text-[11px]" style={{ fontFamily: MONO, color: '#446041' }}>{fmt(sec)} / {cur.duration}</span>
                            </div>
                        </div>
                    </div>
                )}

                <div onClick={pick('gearLabel')} className={`mt-6 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs cursor-pointer ${ring('gearLabel')}`} style={{ ...glass, fontFamily: MONO, color: '#526F4F' }}>
                    <span className="flex items-center gap-2"><Radio className="w-3.5 h-3.5" style={{ color: M.mid }} /><b style={{ color: M.ink }}>{gearLabel}</b>{gearText}</span>
                    <span className="font-semibold" style={{ color: M.dark }}>{gearRight}</span>
                </div>
            </div>

            {lyrics && (
                <Modal title={lyrics.title} kicker={`${lyrics.album} · ${lyrics.releaseDate}`} onClose={() => setLyrics(null)} wide>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-7 space-y-2 text-sm" style={{ color: '#223820' }}>
                            <div className="text-xs font-bold uppercase" style={{ fontFamily: MONO, color: M.mid }}>Official Lyrics</div>
                            {(lyrics.lyrics || []).map((l: string, k: number) => l === '' ? <div key={k} className="h-3" /> : l.startsWith('[') ? <div key={k} className="text-xs font-bold pt-2" style={{ fontFamily: MONO, color: M.mid }}>{l}</div> : <p key={k}>{l}</p>)}
                        </div>
                        <div className="md:col-span-5 space-y-4 text-xs">
                            <p style={{ color: '#354F32' }}>{lyrics.synopsis}</p>
                            <div className="p-3 rounded-xl space-y-1" style={{ background: '#fff', fontFamily: MONO }}>
                                {[['Key', lyrics.key], ['Tempo', `${lyrics.bpm} BPM`], ['Duration', lyrics.duration], ['Genre', lyrics.genre]].map(([k, v]) => (
                                    <div key={k} className="flex justify-between"><span style={{ color: M.muted }}>{k}</span><b>{v}</b></div>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-1.5">{(lyrics.credits?.instruments || []).map((x: string, k: number) => <span key={k} className="px-2 py-1 rounded-md" style={{ background: '#fff', fontFamily: MONO, color: M.dark }}>{x}</span>)}</div>
                            <div style={{ fontFamily: MONO }} className="space-y-1">
                                <div><span style={{ color: M.muted }}>Producer: </span><b>{lyrics.credits?.production}</b></div>
                                <div><span style={{ color: M.muted }}>Mix: </span><b>{lyrics.credits?.mix}</b></div>
                                <div><span style={{ color: M.muted }}>Mastering: </span><b>{lyrics.credits?.mastering}</b></div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};