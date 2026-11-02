import React from 'react';
import { PortfolioSection } from '../../types/portfolio';

interface ClientsSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle, clients = [] } = components;

  const isSelected = (key: string) => selectedComponentKey === key;

  return (
    <div 
      className="relative px-6 md:px-12 py-14 transition-colors border-t border-white/5 bg-slate-950"
      style={{ fontFamily }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6">
        <span 
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent?.('title');
          }}
          className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 cursor-pointer"
        >
          {title?.text || 'COMMERCIAL CLIENTS & COLLABORATORS'}
        </span>

        {/* Clients Marquee / Grid */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent?.('clients');
          }}
          className={`flex flex-wrap items-center justify-center gap-8 md:gap-14 cursor-pointer p-2 rounded-xl transition-all ${
            isSelected('clients') ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-950' : ''
          }`}
        >
          {clients.map((client: string, idx: number) => (
            <span
              key={idx}
              className="text-sm md:text-base font-extrabold tracking-widest text-slate-400 hover:text-white transition-colors uppercase font-mono"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
