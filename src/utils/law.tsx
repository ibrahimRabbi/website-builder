import React from 'react';
import { PortfolioSection } from '../types/portfolio';

export const C = {
    bg: '#F7F7F4', card: '#FFFFFF', line: '#E5E5DC', soft: '#EFEFEA',
    olive: '#7D8D39', oliveHover: '#6B792F', tint: '#F0F3E4', tintLine: '#D4DEC0',
    text: '#1A1E16', muted: '#5A6054',
};
export const SANS = "'Poppins', ui-sans-serif, system-ui, sans-serif";
export const MONO = "'JetBrains Mono', ui-monospace, monospace";

export interface LawProps {
    section: PortfolioSection;
    accentColor: string;
    fontFamily: string;
    onSelectComponent?: (key: string) => void;
    selectedComponentKey?: string | null;
}

// "for *transformative* disputes" -> olive highlight
export function hl(text = '', color = C.olive): React.ReactNode {
    return text.split(/\*(.+?)\*/g).map((part, i) =>
        i % 2 === 1 ? <span key={i} style={{ color }}>{part}</span> : <React.Fragment key={i}>{part}</React.Fragment>
    );
}

export function useSel(onSelect?: (k: string) => void, selected?: string | null) {
    const pick = (k: string) => (e: React.MouseEvent) => { e.stopPropagation(); onSelect?.(k); };
    const ring = (k: string) => (selected === k ? 'ring-2 ring-indigo-500 ring-offset-2' : '');
    return { pick, ring };
}

export const sectionStyle = (s: PortfolioSection, bg = C.bg): React.CSSProperties => ({
    backgroundColor: s.backgroundColor || bg,
    fontFamily: SANS,
    color: C.text,
});

export const LawHead: React.FC<{
    badge?: any; title?: any; subtitle?: any; right?: React.ReactNode;
    pick: (k: string) => (e: React.MouseEvent) => void; ring: (k: string) => string;
}> = ({ badge, title, subtitle, right, pick, ring }) => (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
            {badge && (
                <span onClick={pick('badge')} className={`block cursor-pointer rounded px-1 -mx-1 uppercase ${ring('badge')}`}
                    style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.15em', fontWeight: 700, color: badge.styles?.color || C.olive }}>
                    {badge.text}
                </span>
            )}
            {title && (
                <h2 onClick={pick('title')} className={`cursor-pointer rounded px-1 -mx-1 ${ring('title')}`}
                    style={{
                        fontSize: `clamp(28px, 4vw, ${title.styles?.fontSize || '48px'})`, fontWeight: title.styles?.fontWeight || 700,
                        color: title.styles?.color || C.text, lineHeight: 1.12, letterSpacing: '-0.025em'
                    }}>
                    {hl(title.text)}
                </h2>
            )}
            {subtitle && (
                <p onClick={pick('subtitle')} className={`cursor-pointer rounded px-1 -mx-1 text-sm ${ring('subtitle')}`}
                    style={{ color: subtitle.styles?.color || C.muted }}>{subtitle.text}</p>
            )}
        </div>
        {right}
    </div>
);

export const OliveBtn: React.FC<{ btn: any; onClick?: (e: React.MouseEvent) => void; className?: string; outline?: boolean; icon?: React.ReactNode }> =
    ({ btn, onClick, className = '', outline, icon }) => (
        <button type="button" onClick={onClick}
            className={`cursor-pointer inline-flex items-center justify-center gap-2 font-semibold transition-all ${className}`}
            style={{
                background: outline ? '#fff' : btn?.styles?.backgroundColor || C.olive,
                color: outline ? C.olive : btn?.styles?.color || '#fff',
                border: outline ? `2px solid ${C.olive}` : 'none',
                borderRadius: btn?.styles?.borderRadius || '8px',
                padding: btn?.styles?.padding || '12px 24px', fontSize: 13,
            }}>
            <span>{btn?.label}</span>{icon}
        </button>
    );