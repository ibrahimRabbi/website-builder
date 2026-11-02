import React, { useState } from 'react';
import { PortfolioSection } from '../../types/portfolio';
import { ArrowDown, Play, Sparkles } from 'lucide-react';
import { VideoPlayerModal } from '../common/VideoPlayerModal';

interface HeroSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { 
    badge, 
    title, 
    subtitle, 
    ctaButton, 
    secondaryButton, 
    avatar, 
    videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', 
    cameraSpecs = 'LEICA M11 MONOCHROM · 50mm Noctilux · f/0.95 ASPH · ISO 64 · 1/500s NATURAL CHIAROSCURO' 
  } = components;

  const [isPlayingReel, setIsPlayingReel] = useState(false);
  const isSelected = (key: string) => selectedComponentKey === key;

  // Stats data
  const stats = [
    { value: '14', label: 'Festival Awards & Official Selections' },
    { value: '48M+', label: 'Organic Global Showreel Impressions' },
    { value: '85+', label: 'Commercial & Narrative Productions' },
    { value: '100%', label: 'Shot on Cinema Glass & Calibrated Sensors' }
  ];

  const heroImageSrc = avatar?.src || '/assets/kai-ross/hero_portrait.jpg';

  const scrollToWorks = () => {
    const el = document.getElementById('selected-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [audioEnabled, setAudioEnabled] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      className="relative px-6 md:px-12 pt-6 pb-16 transition-colors bg-white text-black"
      style={{ 
        backgroundColor: section.backgroundColor || '#ffffff',
        fontFamily 
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Top Header Navigation Bar matching Screenshot */}
        <header className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-extrabold tracking-widest uppercase text-black flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" />
              <span>KAI ROSS CINEMA & STILLS</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-slate-600 font-semibold">
            <button
              type="button"
              onClick={() => scrollToSection('showreel')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              SHOWREEL
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('selected-works-section')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              SELECTED WORKS
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('color-lab-section')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              COLOR LAB
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('equipment-section')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              EQUIPMENT
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('rates-section')}
              className="hover:text-black transition-colors cursor-pointer"
            >
              PRODUCTION RATES
            </button>
          </nav>

          {/* Right: Audio toggle + Booking CTA */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAudioEnabled(!audioEnabled)}
              className="px-2.5 py-1.5 rounded border border-slate-200 hover:border-black text-[10px] font-mono tracking-wider uppercase font-semibold text-slate-700 transition-colors cursor-pointer"
              title="Toggle Projector Audio"
            >
              {audioEnabled ? '[🔊 AUDIO: ON]' : '[🔇 AUDIO: OFF]'}
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('rates-section')}
              className="px-4 py-1.5 bg-black text-white hover:bg-slate-900 rounded text-[11px] font-mono font-bold tracking-widest uppercase transition-all cursor-pointer shadow-sm active:scale-95"
            >
              BOOK PRODUCTION
            </button>
          </div>
        </header>

        {/* Main Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            {/* Kicker / Subtitle */}
            <span
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('badge');
              }}
              className={`text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 cursor-pointer transition-all ${
                isSelected('badge') ? 'ring-2 ring-indigo-500 bg-indigo-500/10 px-1 rounded' : ''
              }`}
            >
              {badge?.text || 'DIRECTOR OF PHOTOGRAPHY | CINEMATOGRAPHY & FINE STILLS | NEW YORK & PARIS'}
            </span>

            {/* Main Bold Display Title */}
            {title && (
              <h1
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectComponent?.('title');
                }}
                className={`cursor-pointer tracking-tight transition-all rounded px-1 -mx-1 text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase leading-[1.08] text-black ${
                  isSelected('title') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-slate-100'
                }`}
                style={{
                  fontSize: title.styles?.fontSize,
                  color: title.styles?.color || '#000000',
                  fontWeight: title.styles?.fontWeight || '800'
                }}
              >
                {title.text || 'SCULPTING LIGHT, SHADOW & STILLNESS.'}
              </h1>
            )}

            {/* Description Subtitle */}
            {subtitle && (
              <p
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectComponent?.('subtitle');
                }}
                className={`cursor-pointer max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 transition-all rounded px-1 -mx-1 ${
                  isSelected('subtitle') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-slate-100'
                }`}
                style={{
                  color: subtitle.styles?.color || '#4b5563'
                }}
              >
                {subtitle.text || 'Specializing in high-contrast narrative cinematography, luxury fashion films, and fine art monochrome portraiture. Working across 35mm motion picture nitrate and calibrated large-format digital sensors.'}
              </p>
            )}

            {/* Camera Tag Pill */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('cameraSpecs');
              }}
              className="text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-md cursor-pointer hover:border-slate-400 transition-colors"
            >
              ARRI ALEXA 35 / LEICA M11 / COOKE SPEED PANCHRO T1.4 / 35MM MONOCHROME NITRATE
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingReel(true);
                  onSelectComponent?.('ctaButton');
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-black text-white hover:bg-slate-900 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
                <span>{ctaButton?.label || 'PLAY 2026 SHOWREEL [02:45]'}</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToWorks();
                  onSelectComponent?.('secondaryButton');
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-black border border-slate-300 hover:border-black rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
              >
                <span>{secondaryButton?.label || 'SELECTED WORKS ↓'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Viewfinder Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div 
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('avatar');
              }}
              className={`relative w-full max-w-[420px] aspect-[4/5] rounded-xl overflow-hidden border border-slate-300 bg-black cursor-pointer shadow-2xl transition-all group ${
                isSelected('avatar') ? 'ring-2 ring-indigo-500 ring-offset-2' : 'hover:border-black'
              }`}
            >
              <img 
                src={heroImageSrc} 
                alt="Kai Ross Director of Photography"
                className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Viewfinder Crop Marks */}
              <div className="absolute top-3 left-3 text-white/70 text-base font-mono pointer-events-none">┌</div>
              <div className="absolute top-3 right-3 text-white/70 text-base font-mono pointer-events-none">┐</div>
              <div className="absolute bottom-3 left-3 text-white/70 text-base font-mono pointer-events-none">└</div>
              <div className="absolute bottom-3 right-3 text-white/70 text-base font-mono pointer-events-none">┘</div>

              {/* Telemetry Tag */}
              <div className="absolute top-4 left-6 pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-sm text-white/90 px-2 py-0.5 rounded border border-white/20">
                  MONOCHROM STILL #01
                </span>
              </div>
            </div>

            {/* Camera Metadata caption under portrait */}
            <span className="mt-3 text-[10px] font-mono uppercase tracking-wider text-slate-500 text-center max-w-[420px]">
              {cameraSpecs}
            </span>
          </div>
        </div>

        {/* 4-Item Stats Bar */}
        <div className="pt-10 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-black">
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-slate-600 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        isOpen={isPlayingReel}
        videoUrl={videoUrl}
        title="KAI ROSS · 2026 DIRECTORS SHOWREEL"
        specs="ARRI Alexa 35 · Super 35 Open Gate · Cooke Speed Panchro T1.4 · 2.39:1 Cinema Scope"
        onClose={() => setIsPlayingReel(false)}
      />
    </div>
  );
};
