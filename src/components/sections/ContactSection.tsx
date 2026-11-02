import React from 'react';
import { PortfolioSection } from '../../types/portfolio';
import { Mail, MapPin, Send } from 'lucide-react';

interface ContactSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle, ctaButton, contactEmail, contactLocation } = components;

  const isSelected = (key: string) => selectedComponentKey === key;

  return (
    <div 
      className="relative px-6 md:px-12 py-24 transition-colors border-t border-white/5"
      style={{ 
        backgroundColor: section.backgroundColor || '#090d16',
        fontFamily 
      }}
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
        {title && (
          <h2
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent?.('title');
            }}
            className={`cursor-pointer tracking-tight transition-all rounded px-2 -mx-2 ${
              isSelected('title') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-white/5'
            }`}
            style={{
              fontSize: title.styles?.fontSize || '36px',
              color: title.styles?.color || '#f8fafc',
              fontWeight: title.styles?.fontWeight || '700',
              textAlign: 'center'
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
            className={`cursor-pointer max-w-xl transition-all rounded px-2 -mx-2 ${
              isSelected('subtitle') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-white/5'
            }`}
            style={{
              fontSize: subtitle.styles?.fontSize || '16px',
              color: subtitle.styles?.color || '#94a3b8',
              textAlign: 'center'
            }}
          >
            {subtitle.text}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
          {contactEmail && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span>{contactEmail}</span>
            </div>
          )}
          {contactLocation && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{contactLocation}</span>
            </div>
          )}
        </div>

        {ctaButton?.label && (
          <a
            href={ctaButton.link || '#'}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelectComponent?.('ctaButton');
            }}
            className={`mt-4 inline-flex items-center gap-2 cursor-pointer transition-all active:scale-95 ${
              isSelected('ctaButton') ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900' : 'hover:opacity-90'
            }`}
            style={{
              backgroundColor: ctaButton.styles?.backgroundColor || accentColor,
              color: ctaButton.styles?.color || '#090d16',
              borderRadius: ctaButton.styles?.borderRadius || '8px',
              padding: ctaButton.styles?.padding || '14px 28px',
              fontWeight: ctaButton.styles?.fontWeight || '600',
              fontSize: ctaButton.styles?.fontSize || '15px'
            }}
          >
            <Send className="w-4 h-4 shrink-0" />
            <span>{ctaButton.label}</span>
          </a>
        )}
      </div>
    </div>
  );
};
