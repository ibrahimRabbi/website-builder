import React from 'react';
import { PortfolioSection } from '../../types/portfolio';

interface AboutSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle, bio } = components;

  const isSelected = (key: string) => selectedComponentKey === key;

  return (
    <div 
      className="relative px-6 md:px-12 py-20 transition-colors border-t border-white/5"
      style={{ 
        backgroundColor: section.backgroundColor || '#0c111d',
        fontFamily 
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        {subtitle && (
          <span
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('subtitle');
            }}
            className={`cursor-pointer inline-block text-xs uppercase tracking-wider font-semibold rounded px-1 -mx-1 transition-all ${
              isSelected('subtitle') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:opacity-80'
            }`}
            style={{
              color: subtitle.styles?.color || accentColor,
              fontSize: subtitle.styles?.fontSize || '14px',
              fontWeight: subtitle.styles?.fontWeight || '600'
            }}
          >
            {subtitle.text}
          </span>
        )}

        {title && (
          <h2
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('title');
            }}
            className={`cursor-pointer tracking-tight transition-all rounded px-1 -mx-1 ${
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

        {bio && (
          <p
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('bio');
            }}
            className={`cursor-pointer leading-relaxed transition-all rounded px-1 -mx-1 ${
              isSelected('bio') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-white/5'
            }`}
            style={{
              fontSize: bio.styles?.fontSize || '16px',
              color: bio.styles?.color || '#cbd5e1',
              lineHeight: bio.styles?.lineHeight || '1.7',
              textAlign: bio.styles?.textAlign || 'left'
            }}
          >
            {bio.text}
          </p>
        )}
      </div>
    </div>
  );
};
