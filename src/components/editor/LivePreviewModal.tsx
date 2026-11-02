import React, { useState } from 'react';
import { PortfolioSchema, ViewportMode } from '../../types/portfolio';
import { HeroSection } from '../sections/HeroSection';
import { ShowreelSection } from '../sections/ShowreelSection';
import { FilmsSection } from '../sections/FilmsSection';
import { ColorLabSection } from '../sections/ColorLabSection';
import { GearSection } from '../sections/GearSection';
import { RatesEstimatorSection } from '../sections/RatesEstimatorSection';
import { ClientsSection } from '../sections/ClientsSection';
import { AboutSection } from '../sections/AboutSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { ContactSection } from '../sections/ContactSection';
import { FooterSection } from '../sections/FooterSection';
import { Monitor, Tablet, Smartphone, X } from 'lucide-react';

interface LivePreviewModalProps {
  isOpen: boolean;
  schema: PortfolioSchema;
  onClose: () => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  isOpen,
  schema,
  onClose
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');

  if (!isOpen) return null;

  const getViewportWidthClass = () => {
    switch (viewport) {
      case 'mobile':
        return 'w-[390px] my-8 rounded-3xl shadow-2xl border-4 border-slate-700/80 overflow-hidden';
      case 'tablet':
        return 'w-[768px] my-8 rounded-2xl shadow-2xl border-2 border-slate-700/80 overflow-hidden';
      case 'desktop':
      default:
        return 'w-full max-w-[1200px] my-6 rounded-xl shadow-2xl border border-slate-800/80 overflow-hidden';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-200">
      {/* Top Preview Control Bar */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-white tracking-tight">Live Portfolio Preview</span>
          <span className="text-xs text-slate-500 font-mono">({schema.authorName})</span>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewport === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Desktop View"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewport === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Tablet View"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              viewport === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Mobile View"
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer border border-slate-700"
        >
          <X className="w-4 h-4" />
          <span>Close Preview</span>
        </button>
      </div>

      {/* Main Preview Container */}
      <div className="flex-1 overflow-y-auto canvas-grid flex justify-center p-4">
        <div className={`bg-slate-950 transition-all duration-300 relative self-start ${getViewportWidthClass()}`}>
          {schema.sections.map((section) => {
            const commonProps = {
              section,
              accentColor: schema.accentColor,
              fontFamily: schema.fontFamily
            };

            switch (section.type) {
              case 'Hero':
                return <HeroSection key={section.id} {...commonProps} />;
              case 'Showreel':
                return <ShowreelSection key={section.id} {...commonProps} />;
              case 'Films':
                return <FilmsSection key={section.id} {...commonProps} />;
              case 'ColorLab':
                return <ColorLabSection key={section.id} {...commonProps} />;
              case 'Gear':
                return <GearSection key={section.id} {...commonProps} />;
              case 'Rates':
                return <RatesEstimatorSection key={section.id} {...commonProps} />;
              case 'Clients':
                return <ClientsSection key={section.id} {...commonProps} />;
              case 'About':
                return <AboutSection key={section.id} {...commonProps} />;
              case 'Projects':
                return <ProjectsSection key={section.id} {...commonProps} />;
              case 'Skills':
                return <SkillsSection key={section.id} {...commonProps} />;
              case 'Experience':
                return <ExperienceSection key={section.id} {...commonProps} />;
              case 'Contact':
                return <ContactSection key={section.id} {...commonProps} />;
              default:
                return null;
            }
          })}

          <FooterSection
            section={{ id: 'footer_preview', type: 'Footer', components: {} }}
            authorName={schema.authorName}
            fontFamily={schema.fontFamily}
          />
        </div>
      </div>
    </div>
  );
};
