import React from 'react';
import { PortfolioSection } from '../../types/portfolio';

interface Props {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (key: string) => void;
  selectedComponentKey?: string | null;
}

export const StatsSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
  const { items = [], valueColor, labelColor } = section.components;
  return (
    <div
      className="px-6 md:px-12 py-10 border-y border-slate-200"
      style={{ backgroundColor: section.backgroundColor || '#fff', fontFamily }}
    >
      <div
        onClick={(e) => { e.stopPropagation(); onSelectComponent?.('items'); }}
        className={`max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer rounded ${
          selectedComponentKey === 'items' ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
        }`}
      >
        {items.map((s: any, i: number) => (
          <div key={s.id ?? i} className="flex flex-col">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight" style={{ color: valueColor || '#000' }}>
              {s.value}
            </span>
            <span className="mt-1 text-xs font-medium" style={{ color: labelColor || '#475569' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};