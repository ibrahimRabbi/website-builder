import React, { useState } from 'react';
import { PortfolioSection, VideoFilmItem } from '../../types/portfolio';
import { Play, Clock, Sparkles } from 'lucide-react';
import { VideoPlayerModal } from '../common/VideoPlayerModal';

interface FilmsSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const FilmsSection: React.FC<FilmsSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle } = components;
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeFilm, setActiveFilm] = useState<VideoFilmItem | null>(null);

  const isSelected = (key: string) => selectedComponentKey === key;

  const categories = [
    'ALL',
    'CINEMATOGRAPHY',
    'FASHION & EDITORIAL',
    'DOCUMENTARY',
    'MUSIC VIDEO',
    'MONOCHROME 35MM'
  ];

  // Default films replicating the screenshot exactly
  const allFilms: (VideoFilmItem & { col: 'left' | 'right'; isTall?: boolean; summary: string; lensSpecs: string })[] = [
    {
      id: 'film_silent',
      title: 'THE SILENT THRESHOLD',
      client: 'NEON ARC PICTURES · 2026',
      category: 'CINEMATOGRAPHY',
      role: 'Director of Photography',
      duration: '03:42',
      col: 'left',
      posterUrl: '/assets/kai-ross/film_silent_threshold.jpg',
      summary: 'A 35mm neo-noir exploration of isolation and memory across rain-drenched urban brutalist bridges. Shot exclusively under available streetlights with high-speed primes.',
      specs: 'ARRI Alexa 35 · Super 35 Open Gate',
      lensSpecs: '40mm · T1.4 · 1600 EI',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 'film_vestrahorn',
      title: 'VESTRAHORN SOLITUDE',
      client: 'TERRA CINEMA COLLECTIVE · 2025',
      category: 'DOCUMENTARY',
      role: 'Director of Photography',
      duration: '07:15',
      col: 'left',
      posterUrl: '/assets/kai-ross/film_vestrahorn_solitude.jpg',
      summary: '65mm panoramic documentary capturing the shifting volcanic black sands and storm fronts along southeastern Iceland. Minimalist color palette and heavy atmospheric fog.',
      specs: 'ARRI Alexa Mini LF · Large Format',
      lensSpecs: '28mm · T5.6 · 800 EI',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 'film_atelier',
      title: 'ATELIER MONOCHROME',
      client: 'KULTUR MONOGRAPH ARCHIVE · 2026',
      category: 'MONOCHROME 35MM',
      role: 'Fine Art Photographer',
      duration: 'STILL',
      col: 'left',
      isTall: true,
      posterUrl: '/assets/kai-ross/film_atelier_monochrome.jpg',
      summary: 'Silver gelatin portrait monograph of sculptor Elena Lind in her northern studio. Single window natural diffuse light, real Kodak Tri-X 400 pushed 1 stop.',
      specs: 'Hasselblad 500C/M & Leica M6',
      lensSpecs: '80mm · f/4.0 · ISO 400',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 'film_vesper',
      title: 'VESPER MONOLITH',
      client: 'MAISON NOIR STUDIO · 2026',
      category: 'FASHION & EDITORIAL',
      role: 'Director of Photography',
      duration: '01:58',
      col: 'right',
      posterUrl: '/assets/kai-ross/film_vesper_monolith.jpg',
      summary: 'Sculptural obsidian couture set against raw Mediterranean concrete geometries. Natural raking Mediterranean sunlight creating stark chiaroscuro tension.',
      specs: 'RED V-Raptor 8K VV & Leica M11 Monochrom',
      lensSpecs: '50mm · f/2.8 · ISO 64',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 'film_golden',
      title: 'GOLDEN REVERIE',
      client: 'SUB POP / ISLAND ECHOES · 2025',
      category: 'MUSIC VIDEO',
      role: 'Director of Photography',
      duration: '04:12',
      col: 'right',
      posterUrl: '/assets/kai-ross/film_golden_reverie.jpg',
      summary: 'Live performance captured in an abandoned industrial warehouse with heavy haze and 10kW tungsten fresnel backlights creating an ethereal halo around the vocalist.',
      specs: 'Sony FX9 & Aaton XTR Prod (16mm)',
      lensSpecs: '35mm · T1.3 · 1250 EI',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    },
    {
      id: 'film_echoes',
      title: 'ECHOES OF THE SET',
      client: 'STUDIO CINE 24 · 2025',
      category: 'CINEMATOGRAPHY',
      role: 'Director of Photography',
      duration: '02:30',
      col: 'right',
      posterUrl: '/assets/kai-ross/film_echoes_set.jpg',
      summary: 'Behind-the-lens sequence documenting long fluid Steadicam single-take choreography in a multi-room period drama set.',
      specs: 'ARRI Alexa 35 & Master Grips',
      lensSpecs: '40mm · T2.0 · 800 EI',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    }
  ];

  const filteredFilms = activeCategory === 'ALL'
    ? allFilms
    : allFilms.filter(f => f.category.toUpperCase() === activeCategory);

  const leftColFilms = filteredFilms.filter(f => f.col === 'left');
  const rightColFilms = filteredFilms.filter(f => f.col === 'right');

  const renderFilmCard = (film: typeof allFilms[0]) => (
    <div
      key={film.id}
      onClick={() => setActiveFilm(film)}
      className="group rounded-xl overflow-hidden border border-slate-200 hover:border-black bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Poster Image Container with Viewfinder Overlay */}
      <div className={`relative w-full bg-black overflow-hidden ${film.isTall ? 'aspect-[4/5] sm:aspect-[3/4]' : 'aspect-[16/9]'}`}>
        <img
          src={film.posterUrl}
          alt={film.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
          referrerPolicy="no-referrer"
        />

        {/* Viewfinder Crop Marks */}
        <div className="absolute top-3 left-3 text-white/50 text-base font-mono pointer-events-none">┌</div>
        <div className="absolute top-3 right-3 text-white/50 text-base font-mono pointer-events-none">┐</div>
        <div className="absolute bottom-3 left-3 text-white/50 text-base font-mono pointer-events-none">└</div>
        <div className="absolute bottom-3 right-3 text-white/50 text-base font-mono pointer-events-none">┘</div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white font-mono text-[10px] uppercase tracking-widest rounded border border-white/20">
            {film.category.toLowerCase()}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 pointer-events-none">
          <span className="flex items-center gap-1 px-2.5 py-1 bg-black/75 backdrop-blur-md text-white font-mono text-[10px] tracking-wider rounded border border-white/20">
            <Clock className="w-3 h-3" />
            <span>{film.duration}</span>
          </span>
        </div>

        {/* Bottom Headline Overlay on Image */}
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none drop-shadow-md">
          <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-300">
            {film.client}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white font-mono">
            {film.title}
          </h3>
        </div>

        {/* Hover Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
          <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Description & Specs Bottom Row */}
      <div className="p-5 flex flex-col gap-3.5">
        <p className="text-xs text-slate-600 leading-relaxed">
          {film.summary}
        </p>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="font-semibold text-slate-800 truncate max-w-[240px]">{film.specs}</span>
          <span>{film.lensSpecs}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      id="selected-works-section"
      className="relative px-6 md:px-12 py-24 transition-colors border-t border-slate-200/80 bg-white text-black"
      style={{
        backgroundColor: section.backgroundColor || '#ffffff',
        fontFamily
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Section Header & Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('badge');
              }}
              className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-2 cursor-pointer"
            >
              PORTFOLIO & SELECTED CATALOG
            </span>

            <h2
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('title');
              }}
              className={`cursor-pointer tracking-tight transition-all rounded px-1 -mx-1 text-3xl sm:text-4xl font-extrabold uppercase text-black ${
                isSelected('title') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : ''
              }`}
            >
              {title?.text || 'SELECTED WORKS'}
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {subtitle?.text || 'Cinematic projects and fine art still monographs engineered with deliberate lighting, bespoke optical packages, and fine silver halation.'}
            </p>
          </div>

          {/* Filter Tabs matching Screenshot */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-slate-200 bg-slate-50">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-slate-600 hover:text-black hover:bg-slate-200/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Asymmetric Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            {leftColFilms.map(renderFilmCard)}
          </div>

          {/* Right Column (Starts with slight offset for architectural asymmetric cadence) */}
          <div className="flex flex-col gap-8 md:pt-12">
            {rightColFilms.map(renderFilmCard)}
          </div>
        </div>
      </div>

      {/* Video / Still Modal Player */}
      {activeFilm && (
        <VideoPlayerModal
          isOpen={!!activeFilm}
          videoUrl={activeFilm.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
          title={activeFilm.title}
          specs={`${activeFilm.specs || ''}${activeFilm.lensSpecs ? ` · ${activeFilm.lensSpecs}` : ''}`}
          onClose={() => setActiveFilm(null)}
        />
      )}
    </div>
  );
};
