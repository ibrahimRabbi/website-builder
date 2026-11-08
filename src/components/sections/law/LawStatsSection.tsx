import React from 'react';
import { LawProps, C, MONO, SANS, useSel } from '@/src/utils/law';

export const LawStatsSection: React.FC<LawProps> = ({ section, onSelectComponent, selectedComponentKey }) => {
    const { items = [] } = section.components;
    const { pick, ring } = useSel(onSelectComponent, selectedComponentKey);
    return (
        <div className="px-6 lg:px-12 py-8" style={{ background: section.backgroundColor || C.bg, fontFamily: SANS }}>
            <div onClick={pick('items')} className={`max-w-[1360px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 cursor-pointer rounded ${ring('items')}`}>
                {items.map((m: any, i: number) => (
                    <div key={m.id ?? i} className="p-5 rounded-xl" style={{ background: '#fff', border: `1px solid ${C.line}` }}>
                        <div className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: MONO, color: C.olive }}>{m.value}</div>
                        <p className="text-xs sm:text-sm font-medium mt-1.5" style={{ color: C.muted }}>{m.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};