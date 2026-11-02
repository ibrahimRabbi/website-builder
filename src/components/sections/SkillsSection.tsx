import React from 'react';
import { PortfolioSection, SkillItem } from '../../types/portfolio';
import { Cpu } from 'lucide-react';

interface SkillsSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle, skills = [] } = components;

  const isSelected = (key: string) => selectedComponentKey === key;

  return (
    <div 
      className="relative px-6 md:px-12 py-20 transition-colors border-t border-white/5"
      style={{ 
        backgroundColor: section.backgroundColor || '#0c111d',
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

        {/* Skills Grid */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent?.('skills');
          }}
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 cursor-pointer rounded-xl p-1 transition-all ${
            isSelected('skills') ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900' : ''
          }`}
        >
          {skills.map((skill: SkillItem, idx: number) => (
            <div 
              key={idx}
              className="p-4 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-400">{skill.category}</span>
              </div>
              <span className="text-sm font-semibold text-slate-100">{skill.name}</span>
              {typeof skill.level === 'number' && (
                <div className="mt-3 w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${skill.level}%`,
                      backgroundColor: accentColor 
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
