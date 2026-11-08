import React from 'react';
import { X } from 'lucide-react';
import { PortfolioSection } from '../types/portfolio';

export const M = {
    bg: '#F3F6F1', alt: '#EFF5EB', alt2: '#F4F7F2', dark: '#244B20', darkHover: '#1A3817',
    mid: '#3D7532', light: '#559149', ink: '#163013', text: '#354F32', muted: '#5B7858', line: '#A4BDA0',
};
export const DISPLAY = "'Outfit', 'Inter', sans-serif";
export const SANS = "'Inter', ui-sans-serif, system-ui, sans-serif";
export const MONO = "'JetBrains Mono', ui-monospace, monospace";

export const glass: React.CSSProperties = {
    background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255,255,255,.9)', boxShadow: '0 8px 30px rgba(35,60,25,.08)',
};

export interface MusicProps {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

export function useSel(onSelect?: (k: string) => void, selected?: string | null) {
    const pick = (k: string) => (e: React.MouseEvent) => { e.stopPropagation(); onSelect?.(k); };
    const ring = (k: string) => (selected === k ? 'ring-2 ring-indigo-500 ring-offset-2' : '');
    return { pick, ring };
}

// "SOLARIS *NOCTURNE*" -> gradient highlight
export function gl(text = ''): React.ReactNode {
    return text.split(/\*(.+?)\*/g).map((p, i) =>
        i % 2 === 1 ? (
            <span key={i} style={{ background: `linear-gradient(90deg, ${M.dark}, ${M.mid}, ${M.light})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{p}</span>
        ) : <React.Fragment key={i}>{p}</React.Fragment>
    );
}

export const secStyle = (s: PortfolioSection, bg = M.alt): React.CSSProperties => ({
    background: s.backgroundColor || bg, fontFamily: SANS, color: M.ink,
});

export const MHead: React.FC<{
    badge?: any; title?: any; subtitle?: any; right?: React.ReactNode;
    pick: (k: string) => (e: React.MouseEvent) => void; ring: (k: string) => string; big?: boolean;
}> = ({ badge, title, subtitle, right, pick, ring, big = true }) => (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
            {badge && (
                <span onClick={pick('badge')} className={`block mb-2 cursor-pointer rounded px-1 -mx-1 uppercase ${ring('badge')}`}
                    style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '0.15em', fontWeight: 700, color: badge.styles?.color || M.mid }}>{badge.text}</span>
            )}
            {title && (
                <h2 onClick={pick('title')} className={`cursor-pointer rounded px-1 -mx-1 ${ring('title')}`}
                    style={{ fontFamily: DISPLAY, fontSize: `clamp(28px, 4.5vw, ${title.styles?.fontSize || (big ? '48px' : '36px')})`, fontWeight: title.styles?.fontWeight || 800, color: title.styles?.color || M.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                    {gl(title.text)}
                </h2>
            )}
            {subtitle && (
                <p onClick={pick('subtitle')} className={`mt-2 cursor-pointer rounded px-1 -mx-1 text-sm sm:text-base ${ring('subtitle')}`} style={{ color: subtitle.styles?.color || M.text }}>{subtitle.text}</p>
            )}
        </div>
        {right}
    </div>
);

export const DarkBtn: React.FC<{ btn?: any; label?: string; onClick?: (e: React.MouseEvent) => void; icon?: React.ReactNode; ghost?: boolean; className?: string }> =
    ({ btn, label, onClick, icon, ghost, className = '' }) => (
        <button type="button" onClick={onClick} className={`cursor-pointer inline-flex items-center justify-center gap-2 font-semibold transition-all active:scale-95 ${className}`}
            style={{
                background: ghost ? 'rgba(255,255,255,.8)' : btn?.styles?.backgroundColor || M.dark,
                color: ghost ? M.ink : btn?.styles?.color || '#fff',
                border: ghost ? '1px solid rgba(255,255,255,.9)' : 'none',
                borderRadius: btn?.styles?.borderRadius || '2px',
                padding: btn?.styles?.padding || '12px 24px', fontSize: 13, letterSpacing: '0.03em',
                boxShadow: ghost ? 'none' : '0 8px 20px rgba(36,75,32,.22)',
            }}>
            {icon}<span>{label ?? btn?.label}</span>
        </button>
    );

export const Modal: React.FC<{ title: string; kicker?: string; onClose: () => void; children: React.ReactNode; wide?: boolean }> = ({ title, kicker, onClose, children, wide }) => (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" style={{ background: 'rgba(22,48,19,.4)', backdropFilter: 'blur(6px)' }} onClick={(e) => { e.stopPropagation(); onClose(); }}>
        <div className={`w-full ${wide ? 'max-w-3xl' : 'max-w-xl'} my-8 rounded-3xl overflow-hidden`} style={{ ...glass, background: 'rgba(255,255,255,.95)' }} onClick={(e) => e.stopPropagation()}>
            <div className="p-5 flex items-center justify-between" style={{ background: '#F0F5ED', borderBottom: '1px solid rgba(0,0,0,.05)' }}>
                <div>
                    {kicker && <div className="text-[11px] uppercase font-bold" style={{ fontFamily: MONO, color: M.mid, letterSpacing: '0.12em' }}>{kicker}</div>}
                    <h3 className="text-lg font-bold" style={{ fontFamily: DISPLAY, color: M.ink }}>{title}</h3>
                </div>
                <button type="button" onClick={onClose} className="p-2 cursor-pointer" style={{ color: M.muted }}><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6">{children}</div>
        </div>
    </div>
);

export const field = 'w-full px-3 py-2 rounded-lg text-sm bg-white border focus:outline-none';
export const fieldStyle: React.CSSProperties = { borderColor: 'rgba(0,0,0,.1)', color: M.ink };