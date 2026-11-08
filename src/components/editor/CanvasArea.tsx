// components/editor/CanvasArea.tsx
import React from 'react';
import { PortfolioSchema, PortfolioSection, ViewportMode } from '../../types/portfolio';
import { CanvasSectionWrapper } from './CanvasSectionWrapper';
import { IframeCanvas } from './IframeCanvas';
import { NavbarSection } from '../sections/videoGraphy/NavbarSection';
import { HeroSection } from '../sections/videoGraphy/HeroSection';
import { StatsSection } from '../sections/videoGraphy/StatsSection';
import { ShowreelSection } from '../sections/videoGraphy/ShowreelSection';
import { FilmsSection } from '../sections/videoGraphy/FilmsSection';
import { ColorLabSection } from '../sections/videoGraphy/ColorLabSection';
import { GearSection } from '../sections/videoGraphy/GearSection';
import { RatesEstimatorSection } from '../sections/videoGraphy/RatesEstimatorSection';
import { FooterSection } from '../sections/videoGraphy/FooterSection';
import { ArchNavbarSection } from '../sections/architacture/ArchNavbarSection';
import { ArchHeaderSection } from '../sections/architacture/ArchHeaderSection';
import { FloorPlanSection } from '../sections/architacture/FloorPlanSection';
import { ArchSpecsSection } from '../sections/architacture/ArchSpecsSection';
import { ArchSuiteSection } from '../sections/architacture/ArchSuiteSection';
import { ArchFooterSection } from '../sections/architacture/ArchFooterSection';
import { LawNavbarSection } from '../sections/law/LawNavbarSection';
import { LawHeroSection } from '../sections/law/LawHeroSection';
import { LawStatsSection } from '../sections/law/LawStatsSection';
import { LawPracticeSection } from '../sections/law/LawPracticeSection';
import { LawEstimatorSection } from '../sections/law/LawEstimatorSection';
import { LawMattersSection } from '../sections/law/LawMattersSection';
import { LawTestimonialsSection } from '../sections/law/LawTestimonialsSection';
import { LawChambersSection } from '../sections/law/LawChambersSection';
import { LawFooterSection } from '../sections/law/LawFooterSection';
import { MusicNavbarSection } from '../sections/musician/MusicNavbarSection';
import { MusicHeroSection } from '../sections/musician/MusicHeroSection';
import { MusicTracksSection } from '../sections/musician/MusicTracksSection';
import { MusicTourSection } from '../sections/musician/MusicTourSection';
import { MusicDiscoSection } from '../sections/musician/MusicDiscoSection';
import { MusicMerchSection } from '../sections/musician/MusicMerchSection';
import { MusicAboutSection } from '../sections/musician/MusicAboutSection';
import { MusicFooterSection } from '../sections/musician/MusicFooterSection';

interface CanvasAreaProps {
  schema: PortfolioSchema;
  viewport: ViewportMode;
  selectedSectionId: string | null;
  selectedComponentKey: string | null;
  scrollTarget?: { id: string; t: number } | null;
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
  scrollTarget,
  onSelectSection,
  onSelectComponent,
  onReorderSection,
  onDuplicateSection,
  onDeleteSection,
  onAddSectionBelow
}) => {
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
      case 'Navbar':
        return <NavbarSection {...commonProps} />;
      case 'Hero':
        return <HeroSection {...commonProps} />;
      case 'Stats':
        return <StatsSection {...commonProps} />;
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
      case 'Footer':
        return <FooterSection {...commonProps} authorName={schema.authorName} />;
      case 'ArchNavbar':
        return <ArchNavbarSection {...commonProps} />;
      case 'ArchHeader':
        return <ArchHeaderSection {...commonProps} />;
      case 'FloorPlan':
        return <FloorPlanSection {...commonProps} />;
      case 'ArchSpecs':
        return <ArchSpecsSection {...commonProps} />;
      case 'ArchSuite':
        return <ArchSuiteSection {...commonProps} />;
      case 'ArchFooter':
        return <ArchFooterSection {...commonProps} />;
      case 'LawNavbar': return <LawNavbarSection {...commonProps} />;
      case 'LawHero': return <LawHeroSection {...commonProps} />;
      case 'LawStats': return <LawStatsSection {...commonProps} />;
      case 'LawPractice': return <LawPracticeSection {...commonProps} />;
      case 'LawEstimator': return <LawEstimatorSection {...commonProps} />;
      case 'LawMatters': return <LawMattersSection {...commonProps} />;
      case 'LawTestimonials': return <LawTestimonialsSection {...commonProps} />;
      case 'LawChambers': return <LawChambersSection {...commonProps} />;
      case 'LawFooter': return <LawFooterSection {...commonProps} />;
      case 'MusicNavbar': return <MusicNavbarSection {...commonProps} />;
      case 'MusicHero': return <MusicHeroSection {...commonProps} />;
      case 'MusicTracks': return <MusicTracksSection {...commonProps} />;
      case 'MusicTour': return <MusicTourSection {...commonProps} />;
      case 'MusicDisco': return <MusicDiscoSection {...commonProps} />;
      case 'MusicMerch': return <MusicMerchSection {...commonProps} />;
      case 'MusicAbout': return <MusicAboutSection {...commonProps} />;
      case 'MusicFooter': return <MusicFooterSection {...commonProps} />;
      default:
        return (
          <div className="p-12 text-center text-slate-500 bg-slate-900">
            Unknown section type: {section.type}
          </div>
        );
    }
  };

  return (
    <IframeCanvas
      viewport={viewport}
      scrollTarget={scrollTarget}
      onBackgroundClick={() => onSelectComponent(null)}
    >
      {schema.sections.length === 0 ? (
        <div className="py-24 text-center px-6 bg-slate-950">
          <h3 className="text-lg font-semibold text-slate-300 mb-2">No Sections in Portfolio</h3>
          <p className="text-sm text-slate-500">Ei theme-e kono section nei. Theme abar select koro.</p>
        </div>
      ) : (
        <div className="flex flex-col" onClick={(e) => e.stopPropagation()}>
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
        </div>
      )}
    </IframeCanvas>
  );
};