import React from 'react';
import { PortfolioSchema, PortfolioSection, SectionType, ViewportMode } from '../../types/portfolio';
import { CanvasSectionWrapper } from './CanvasSectionWrapper';
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
import { Plus } from 'lucide-react';

interface CanvasAreaProps {
  schema: PortfolioSchema;
  viewport: ViewportMode;
  selectedSectionId: string | null;
  selectedComponentKey: string | null;
  onSelectSection: (id: string) => void;
  onSelectComponent: (key: string | null) => void;
  onReorderSection: (index: number, direction: 'up' | 'down') => void;
  onDuplicateSection: (index: number) => void;
  onDeleteSection: (index: number) => void;
  onAddSectionBelow: (index: number) => void;
}

export const CanvasArea: React.FC<CanvasAreaProps> = ({
  schema,
  viewport,
  selectedSectionId,
  selectedComponentKey,
  onSelectSection,
  onSelectComponent,
  onReorderSection,
  onDuplicateSection,
  onDeleteSection,
  onAddSectionBelow
}) => {
  // Determine viewport width container styling
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

  const renderSection = (section: PortfolioSection) => {
    const commonProps = {
      section,
      accentColor: schema.accentColor,
      fontFamily: schema.fontFamily,
      onSelectComponent: (key: string) => {
        onSelectSection(section.id);
        onSelectComponent(key);
      },
      selectedComponentKey: selectedSectionId === section.id ? selectedComponentKey : null
    };

    switch (section.type) {
      case 'Hero':
        return <HeroSection {...commonProps} />;
      case 'Showreel':
        return <ShowreelSection {...commonProps} />;
      case 'Films':
        return <FilmsSection {...commonProps} />;
      case 'ColorLab':
        return <ColorLabSection {...commonProps} />;
      case 'Gear':
        return <GearSection {...commonProps} />;
      case 'Rates':
        return <RatesEstimatorSection {...commonProps} />;
      case 'Clients':
        return <ClientsSection {...commonProps} />;
      case 'About':
        return <AboutSection {...commonProps} />;
      case 'Projects':
        return <ProjectsSection {...commonProps} />;
      case 'Skills':
        return <SkillsSection {...commonProps} />;
      case 'Experience':
        return <ExperienceSection {...commonProps} />;
      case 'Contact':
        return <ContactSection {...commonProps} />;
      case 'Footer':
        return (
          <FooterSection 
            section={section} 
            authorName={schema.authorName} 
            fontFamily={schema.fontFamily} 
          />
        );
      default:
        return (
          <div className="p-12 text-center text-slate-500 bg-slate-900">
            Unknown section type: {section.type}
          </div>
        );
    }
  };

  return (
    <div 
      className="flex-1 overflow-y-auto canvas-grid flex justify-center p-4 md:p-8 relative min-h-full"
      onClick={() => {
        // Deselect when clicking outside the canvas wrapper
        onSelectComponent(null);
      }}
    >
      <div 
        className={`bg-slate-950 transition-all duration-300 relative self-start ${getViewportWidthClass()}`}
        onClick={(e) => e.stopPropagation()}
      >
        {schema.sections.length === 0 ? (
          <div className="py-24 text-center px-6">
            <h3 className="text-lg font-semibold text-slate-300 mb-2">No Sections in Portfolio</h3>
            <p className="text-sm text-slate-500 mb-6">Add components from the left sidebar to start building.</p>
            <button
              onClick={() => onAddSectionBelow(0)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Hero Section</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col">
            {schema.sections.map((section, idx) => (
              <CanvasSectionWrapper
                key={section.id}
                section={section}
                index={idx}
                totalSections={schema.sections.length}
                isSelected={selectedSectionId === section.id}
                onSelect={() => {
                  onSelectSection(section.id);
                  onSelectComponent(null);
                }}
                onMoveUp={() => onReorderSection(idx, 'up')}
                onMoveDown={() => onReorderSection(idx, 'down')}
                onDuplicate={() => onDuplicateSection(idx)}
                onDelete={() => onDeleteSection(idx)}
                onAddBelow={() => onAddSectionBelow(idx)}
              >
                {renderSection(section)}
              </CanvasSectionWrapper>
            ))}

            {/* Always provide clean subtle footer */}
            <FooterSection 
              section={{
                id: 'footer_static',
                type: 'Footer',
                components: {}
              }}
              authorName={schema.authorName}
              fontFamily={schema.fontFamily}
            />
          </div>
        )}
      </div>
    </div>
  );
};
