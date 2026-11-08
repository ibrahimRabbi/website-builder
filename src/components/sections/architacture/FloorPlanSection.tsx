import React, { useMemo, useState } from 'react';
import { PortfolioSection } from '@/src/types/portfolio'; 
import { Building2, Layers, FolderOpen, User, Search } from 'lucide-react';

interface Props {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

const MONO = "'JetBrains Mono', ui-monospace, monospace";
const LINE = 'rgba(255,255,255,.12)';

export const FloorPlanSection: React.FC<Props> = ({ section, accentColor, fontFamily, onSelectComponent, selectedComponentKey }) => {
    const { title, subtitle, floorPlan: fp } = section.components;
    const levels: any[] = fp?.levels || [];
    const rooms: any[] = fp?.rooms || [];
    const pins: any[] = fp?.cameraPins || [];
    const layerDefs: any[] = fp?.layers || [];

    const [levelId, setLevelId] = useState<string | undefined>(levels[0]?.id);
    const [roomId, setRoomId] = useState<string | undefined>(rooms[0]?.id);
    const [layers, setLayers] = useState<Record<string, boolean>>({});
    const [failed, setFailed] = useState<Record<string, boolean>>({});

    const level = levels.find((l) => l.id === levelId) || levels[0];
    const room = useMemo(() => rooms.find((r) => r.id === roomId) || rooms[0], [rooms, roomId]);
    const on = (l: any) => (l.id in layers ? layers[l.id] : l.enabled !== false);
    const layerOn = (id: string) => { const d = layerDefs.find((l) => l.id === id); return d ? on(d) : true; };

    const pick = (k: string) => (e: React.MouseEvent) => { e.stopPropagation(); onSelectComponent?.(k); };
    const ring = (k: string) => (selectedComponentKey === k ? { outline: '2px solid #6366f1', outlineOffset: 3 } : {});

    if (!fp) return <div className="p-12 text-center text-slate-500" style={{ background: section.backgroundColor || '#0a0908' }}>FloorPlan data nei</div>;

    const showImg = level?.planImage && !failed[level.id];
    const cols = Math.max(1, Math.min(3, rooms.length));
    const cellW = 84 / cols;

    const Blueprint = (
        <svg viewBox="0 0 100 70" className="absolute inset-0 w-full h-full">
            <defs>
                <pattern id="fpgrid" width="5" height="5" patternUnits="userSpaceOnUse">
                    <path d="M5 0H0V5" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth=".15" />
                </pattern>
            </defs>
            <rect width="100" height="70" fill="url(#fpgrid)" />
            {rooms.map((r, i) => {
                const x = 8 + (i % cols) * cellW;
                const y = 12 + Math.floor(i / cols) * 23;
                const active = r.id === room?.id;
                return (
                    <g key={r.id} style={{ cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); setRoomId(r.id); }}>
                        <rect x={x} y={y} width={cellW} height={23} fill={active ? accentColor : 'transparent'} fillOpacity={active ? 0.4 : 0}
                            stroke={layerOn('structure') ? '#e7e5e4' : 'none'} strokeWidth=".4" />
                        <text x={x + cellW / 2} y={y + 12} fontSize="2.2" fill="#e7e5e4" textAnchor="middle" fontFamily="sans-serif">{r.name}</text>
                        {layerOn('furniture') && <rect x={x + cellW * 0.3} y={y + 15} width={cellW * 0.4} height={4} fill="none" stroke="#78716c" strokeWidth=".3" />}
                        {layerOn('lighting') && <circle cx={x + cellW / 2} cy={y + 4} r="1" fill="#fbbf24" />}
                    </g>
                );
            })}
            {layerOn('sunpath') && <path d="M8 8 Q50 -2 92 8" fill="none" stroke="#fbbf24" strokeWidth=".3" strokeDasharray="1 1" />}
        </svg>
    );

    return (
        <div className="px-6 md:px-12 py-10" style={{ backgroundColor: section.backgroundColor || '#0a0908', fontFamily, color: '#e7e5e4' }}>
            <div className="max-w-[1280px] mx-auto border" style={{ borderColor: LINE, background: '#12100f' }}>
                {/* top bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b text-sm" style={{ borderColor: LINE }}>
                    <span className="flex items-center gap-3"><Building2 className="w-5 h-5" /> <b className="font-medium">FLOORPLAN+</b><span className="text-xs text-stone-500">v2.4</span></span>
                    <span onClick={pick('floorPlan')} className="cursor-pointer text-stone-300 truncate px-2">Project: {fp.projectName}</span>
                    <span className="hidden md:flex items-center gap-5 text-stone-400 text-xs"><span className="flex items-center gap-1"><User className="w-4 h-4" />Account</span><span className="flex items-center gap-1 px-3 py-1.5 border" style={{ borderColor: LINE }}><Search className="w-3.5 h-3.5" />Search</span></span>
                </div>

                <div className="flex flex-col lg:flex-row">
                    {/* left */}
                    <aside className="lg:w-56 shrink-0 p-4 border-b lg:border-b-0 lg:border-r flex flex-row lg:flex-col gap-6 overflow-x-auto" style={{ borderColor: LINE }}>
                        <div className="min-w-[160px]">
                            <p className="text-sm font-semibold mb-2">Project</p>
                            <p className="flex items-center gap-2 text-xs text-stone-400 py-1"><Building2 className="w-3.5 h-3.5" />{fp.projectName}</p>
                            <p className="flex items-center gap-2 text-xs text-stone-400 py-1"><FolderOpen className="w-3.5 h-3.5" />Project</p>
                        </div>
                        <div className="min-w-[160px]">
                            <p className="text-sm font-semibold mb-2">Floor Selector</p>
                            {levels.map((l) => (
                                <button key={l.id} type="button" onClick={(e) => { e.stopPropagation(); setLevelId(l.id); }}
                                    className="block w-full text-left px-3 py-2 text-xs mb-1 cursor-pointer"
                                    style={{ background: l.id === level?.id ? 'rgba(255,255,255,.1)' : 'transparent', color: l.id === level?.id ? '#fff' : '#a8a29e' }}>
                                    {l.label}{l.id === level?.id ? ' - Active' : ''}
                                </button>
                            ))}
                        </div>
                        <div className="min-w-[160px]">
                            <p className="text-sm font-semibold mb-2 flex items-center gap-1.5"><Layers className="w-3.5 h-3.5" />Layer Toggles</p>
                            {layerDefs.map((l) => (
                                <button key={l.id} type="button" onClick={(e) => { e.stopPropagation(); setLayers((s) => ({ ...s, [l.id]: !on(l) })); }}
                                    className="flex w-full items-center justify-between py-1.5 text-xs cursor-pointer" style={{ color: on(l) ? '#e7e5e4' : '#57534e' }}>
                                    {l.label}
                                    <span className="relative inline-block h-4 w-8 rounded-full" style={{ background: on(l) ? '#3b82f6' : '#44403c' }}>
                                        <span className="absolute top-0.5 h-3 w-3 rounded-full bg-white transition-all" style={{ left: on(l) ? 18 : 2 }} />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* plan */}
                    <div className="flex-1 min-w-0 p-4" onClick={pick('floorPlan')} style={ring('floorPlan')}>
                        {title && <p onClick={pick('title')} className="text-sm mb-1 cursor-pointer" style={{ color: title.styles?.color || '#e7e5e4' }}>{title.text}</p>}
                        <div className="relative w-full" style={{ aspectRatio: '10 / 7', background: '#0d0b0a' }}>
                            {showImg
                                ? <img src={level.planImage} alt={level.label} onError={() => setFailed((s) => ({ ...s, [level.id]: true }))} className="absolute inset-0 w-full h-full object-contain" />
                                : Blueprint}
                            {pins.map((p) => {
                                const active = p.roomId === room?.id;
                                return (
                                    <button key={p.id} type="button" title={p.label} onClick={(e) => { e.stopPropagation(); setRoomId(p.roomId); }}
                                        className="absolute cursor-pointer" style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%,-50%)' }}>
                                        <svg width="90" height="90" viewBox="-45 -45 90 90" style={{ position: 'absolute', left: -45, top: -45, pointerEvents: 'none', transform: `rotate(${p.angle}deg)` }}>
                                            <path d="M0 0 L40 -16 A43 43 0 0 1 40 16 Z" fill={accentColor} fillOpacity={active ? 0.35 : 0.15} stroke={accentColor} strokeOpacity=".6" strokeWidth=".8" />
                                        </svg>
                                        <span className="relative flex h-5 w-5 items-center justify-center text-[10px] font-semibold"
                                            style={{ background: active ? accentColor : '#1c1917', color: active ? '#0a0908' : '#e7e5e4', border: `1px solid ${accentColor}`, fontFamily: MONO }}>{p.id}</span>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="flex items-end justify-between mt-3 text-xs" style={{ fontFamily: MONO }}>
                            <span>{fp.projectName?.toUpperCase()} - {level?.label}</span>
                            <span className="text-stone-500">Scale {fp.scale}</span>
                        </div>
                        {subtitle && <p onClick={pick('subtitle')} className="text-[11px] text-stone-500 cursor-pointer">{subtitle.text}</p>}
                    </div>

                    {/* room panel */}
                    {room && (
                        <aside className="lg:w-64 shrink-0 p-4 border-t lg:border-t-0 lg:border-l" style={{ borderColor: LINE }}>
                            <p className="text-xs text-stone-500">Active Room:</p>
                            <h3 className="text-lg mb-3 text-white">{room.name}</h3>
                            {room.photo && <img src={room.photo} alt={room.name} className="w-full aspect-[3/2] object-cover mb-3 border" style={{ borderColor: LINE }} referrerPolicy="no-referrer" />}
                            <p className="text-sm">{room.area}</p>
                            <p className="text-sm text-stone-400 mb-3">Ceiling Height: {room.ceilingHeight}</p>
                            <p className="text-xs text-stone-400 mb-1">Materials:</p>
                            <ul className="list-disc pl-4 text-xs mb-3 text-stone-300">{(room.materials || []).map((m: string, i: number) => <li key={i}>{m}</li>)}</ul>
                            <p className="text-xs text-stone-400 mb-1">Furnishings:</p>
                            <ul className="list-disc pl-4 text-xs text-stone-300">{(room.furnishings || []).map((m: string, i: number) => <li key={i}>{m}</li>)}</ul>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
};