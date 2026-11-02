import React from 'react';
import { PortfolioSection } from '../../types/portfolio';
import { Briefcase } from 'lucide-react';

interface ExperienceSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle, experience = [] } = components;

  const isSelected = (key: string) => selectedComponentKey === key;

  return (
    <div 
      className="relative px-6 md:px-12 py-20 transition-colors border-t border-white/5"
      style={{ 
        backgroundColor: section.backgroundColor || '#090d16',
        fontFamily 
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div>
          {title && (
            <h2
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('title');
              }}
              className={`cursor-pointer tracking-tight transition-all rounded px-1 -mx-1 inline-block ${
                isSelected('title') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-white/5'
              }`}
              style={{
                fontSize: title.styles?.fontSize || '32px',
                color: title.styles?.color || '#f8fafc',
                fontWeight: title.styles?.fontWeight || '700',
                textAlign: title.styles?.textAlign || 'left'
              }}
            >
              {title.text}
            </h2>
          )}

          {subtitle && (
            <p
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('subtitle');
              }}
              className={`cursor-pointer mt-1 transition-all rounded px-1 -mx-1 ${
                isSelected('subtitle') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-white/5'
              }`}
              style={{
                fontSize: subtitle.styles?.fontSize || '16px',
                color: subtitle.styles?.color || '#94a3b8',
                textAlign: subtitle.styles?.textAlign || 'left'
              }}
            >
              {subtitle.text}
            </p>
          )}
        </div>

        {/* Timeline list */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent?.('experience');
          }}
          className={`space-y-4 cursor-pointer rounded-xl p-1 transition-all ${
            isSelected('experience') ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900' : ''
          }`}
        >
          {experience.map((item: any, idx: number) => (
            <div 
              key={item.id || idx}
              className="p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div 
                  className="p-2 rounded-lg bg-white/5 shrink-0"
                  style={{ color: accentColor }}
                >
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">{item.role}</h3>
                  <p className="text-sm text-slate-300 font-medium">{item.company}</p>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-xl">{item.description}</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-mono whitespace-nowrap self-start">
                {item.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
