import React, { useState } from 'react';
import { PortfolioSchema, PortfolioSection, ViewportMode } from '../../types/portfolio';
import { NavbarSection } from '../sections/videoGraphy/NavbarSection';
import { HeroSection } from '../sections/videoGraphy/HeroSection';
import { StatsSection } from '../sections/videoGraphy/StatsSection';
import { ShowreelSection } from '../sections/videoGraphy/ShowreelSection';
import { FilmsSection } from '../sections/videoGraphy/FilmsSection';
import { ColorLabSection } from '../sections/videoGraphy/ColorLabSection';
import { GearSection } from '../sections/videoGraphy/GearSection';
import { RatesEstimatorSection } from '../sections/videoGraphy/RatesEstimatorSection';
import { FooterSection } from '../sections/videoGraphy/FooterSection';
import { Monitor, Tablet, Smartphone, X } from 'lucide-react';
import { ArchNavbarSection } from '../sections/architacture/ArchNavbarSection';
import { ArchHeaderSection } from '../sections/architacture/ArchHeaderSection';
import { ArchSuiteSection } from '../sections/architacture/ArchSuiteSection';
import { ArchSpecsSection } from '../sections/architacture/ArchSpecsSection';
import { FloorPlanSection } from '../sections/architacture/FloorPlanSection';
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

interface LivePreviewModalProps {
  isOpen: boolean;
  schema: PortfolioSchema;
  onClose: () => void;
}

const VIEWPORT_WIDTH: Record<ViewportMode, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 390
};

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({ isOpen, schema, onClose }) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');

  if (!isOpen) return null;

  const frameClass =
    viewport === 'mobile'
      ? 'rounded-3xl border-4 border-slate-700/80 my-8'
      : viewport === 'tablet'
        ? 'rounded-2xl border-2 border-slate-700/80 my-8'
        : 'rounded-xl border border-slate-800/80 my-6';

  const renderSection = (section: PortfolioSection) => {
    const props = {
      key: section.id,
      section,
      accentColor: schema.accentColor,
      fontFamily: schema.fontFamily
    };
    switch (section.type) {
      case 'Navbar': return <NavbarSection {...props} />;
      case 'Hero': return <HeroSection {...props} />;
      case 'Stats': return <StatsSection {...props} />;
      case 'Showreel': return <ShowreelSection {...props} />;
      case 'Films': return <FilmsSection {...props} />;
      case 'ColorLab': return <ColorLabSection {...props} />;
      case 'Gear': return <GearSection {...props} />;
      case 'Rates': return <RatesEstimatorSection {...props} />;
      case 'Footer': return <FooterSection {...props} authorName={schema.authorName} />;
      case 'ArchNavbar': return <ArchNavbarSection {...props} />;
      case 'ArchHeader': return <ArchHeaderSection {...props} />;
      case 'FloorPlan': return <FloorPlanSection {...props} />;
      case 'ArchSpecs': return <ArchSpecsSection {...props} />;
      case 'ArchSuite': return <ArchSuiteSection {...props} />;
      case 'ArchFooter': return <ArchFooterSection {...props} />;
      case 'LawNavbar': return <LawNavbarSection {...props} />;
      case 'LawHero': return <LawHeroSection {...props} />;
      case 'LawStats': return <LawStatsSection {...props} />;
      case 'LawPractice': return <LawPracticeSection {...props} />;
      case 'LawEstimator': return <LawEstimatorSection {...props} />;
      case 'LawMatters': return <LawMattersSection {...props} />;
      case 'LawTestimonials': return <LawTestimonialsSection {...props} />;
      case 'LawChambers': return <LawChambersSection {...props} />;
      case 'LawFooter': return <LawFooterSection {...props} />;
      case 'MusicNavbar': return <MusicNavbarSection {...props} />;
      case 'MusicHero': return <MusicHeroSection {...props} />;
      case 'MusicTracks': return <MusicTracksSection {...props} />;
      case 'MusicTour': return <MusicTourSection {...props} />;
      case 'MusicDisco': return <MusicDiscoSection {...props} />;
      case 'MusicMerch': return <MusicMerchSection {...props} />;
      case 'MusicAbout': return <MusicAboutSection {...props} />;
      case 'MusicFooter': return <MusicFooterSection {...props} />;
      default: return null;
    }
  };

  const toggle = (vp: ViewportMode, Icon: React.ElementType, title: string) => (
    <button
      onClick={() => setViewport(vp)}
      className={`p-1.5 rounded transition-colors cursor-pointer ${viewport === vp ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
        }`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-200">
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-white tracking-tight">Live Portfolio Preview</span>
          <span className="text-xs text-slate-500 font-mono">({schema.authorName})</span>
        </div>

        <div className="flex items-center p-1 bg-slate-950 rounded-lg border border-slate-800">
          {toggle('desktop', Monitor, 'Desktop View')}
          {toggle('tablet', Tablet, 'Tablet View')}
          {toggle('mobile', Smartphone, 'Mobile View')}
        </div>

        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer border border-slate-700">
          <X className="w-4 h-4" />
          <span>Close Preview</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto canvas-grid flex justify-center p-4">
        <div
          className={`bg-white overflow-hidden self-start shadow-2xl transition-all duration-300 ${frameClass}`}
          style={{ width: '100%', maxWidth: VIEWPORT_WIDTH[viewport] }}>
          {schema.sections.map(renderSection)}
        </div>
      </div>
    </div>
  );
};