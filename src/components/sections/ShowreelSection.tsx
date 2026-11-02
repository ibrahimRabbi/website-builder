import React, { useState, useRef } from 'react';
import { PortfolioSection, VideoFilmItem } from '../../types/portfolio';
import { Play, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import { VideoPlayerModal } from '../common/VideoPlayerModal';

interface ShowreelSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const ShowreelSection: React.FC<ShowreelSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle } = components;
  const [activeItem, setActiveItem] = useState<VideoFilmItem | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isSelected = (key: string) => selectedComponentKey === key;

  const filmStripFrames: VideoFilmItem[] = [
    {
      id: 'frame_silent',
      title: 'THE SILENT THRESHOLD',
      client: 'NEON ARC PICTURES · 2026',
      category: 'Cinematography',
      role: 'Director of Photography',
      duration: '03:42',
      aspectRatio: '2.39:1 SCOPE',
      posterUrl: '/assets/kai-ross/film_silent_threshold.jpg',
      specs: 'ARRI Alexa 35 · Super 35 Open Gate · Cooke Speed Panchro T1.4',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 'frame_vesper',
      title: 'VESPER MONOLITH',
      client: 'MAISON NOIR STUDIO · 2026',
      category: 'Fashion & Editorial',
      role: 'Cinematographer & Colorist',
      duration: '01:58',
      aspectRatio: '4:3 SCOPE',
      posterUrl: '/assets/kai-ross/film_vesper_monolith.jpg',
      specs: 'RED V-Raptor 8K VV & Leica M11 Monochrom · 50mm f/2.8',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
      id: 'frame_vestrahorn',
      title: 'VESTRAHORN SOLITUDE',
      client: 'TERRA CINEMA COLLECTIVE · 2025',
      category: 'Documentary',
      role: 'Director of Photography',
      duration: '07:15',
      aspectRatio: '2.39:1 SCOPE',
      posterUrl: '/assets/kai-ross/film_vestrahorn_solitude.jpg',
      specs: 'ARRI Alexa Mini LF · Large Format · 28mm T5.6 · 800 EI',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
      id: 'frame_golden',
      title: 'GOLDEN REVERIE',
      client: 'SUB POP / ISLAND ECHOES · 2025',
      category: 'Music Video',
      role: 'Director of Photography',
      duration: '04:12',
      aspectRatio: '1.85:1 FLAT',
      posterUrl: '/assets/kai-ross/film_golden_reverie.jpg',
      specs: 'Sony FX9 & Aaton XTR Prod 16mm · 35mm T1.3',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    },
    {
      id: 'frame_atelier',
      title: 'ATELIER MONOCHROME',
      client: 'KULTUR MONOGRAPH ARCHIVE · 2026',
      category: 'Monochrome 35mm',
      role: 'Fine Art Photographer',
      duration: 'STILL',
      aspectRatio: '1:1 SQUARE STILL',
      posterUrl: '/assets/kai-ross/film_atelier_monochrome.jpg',
      specs: 'Hasselblad 500C/M & Leica M6 · 80mm f/4.0 · ISO 400',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
      id: 'frame_echoes',
      title: 'ECHOES OF THE SET',
      client: 'STUDIO CINE 24 · 2025',
      category: 'Cinematography',
      role: 'Behind the Scenes DP',
      duration: '02:30',
      aspectRatio: '2.39:1 SCOPE',
      posterUrl: '/assets/kai-ross/film_echoes_set.jpg',
      specs: 'ARRI Alexa 35 & Master Grips · 40mm T2.0 · 800 EI',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -480 : 480;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="showreel"
      className="relative px-6 md:px-12 py-20 transition-colors border-t border-slate-200/80 bg-white text-black"
      style={{
        backgroundColor: section.backgroundColor || '#ffffff',
        fontFamily
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('badge');
              }}
              className="text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-2 cursor-pointer"
            >
              35MM MOTION PICTURE ARCHIVE
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
              {title?.text || 'CURATED FILM STRIPS & SHOWREEL'}
            </h2>

            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              {subtitle?.text || 'Continuous sequence reel shot across 35mm nitrate and large-format sensors. Scroll or drag horizontally to inspect individual frame takes.'}
            </p>
          </div>

          {/* Navigation Scroll Chevrons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-lg border border-slate-300 hover:border-black flex items-center justify-center text-black transition-colors cursor-pointer bg-white"
              title="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-lg border border-slate-300 hover:border-black flex items-center justify-center text-black transition-colors cursor-pointer bg-white"
              title="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 35mm Film Sprocket Border Top */}
        <div className="w-full overflow-hidden py-1 border-y border-slate-200 select-none bg-slate-50">
          <div className="flex items-center gap-6 whitespace-nowrap text-[10px] font-mono text-slate-500 uppercase tracking-widest animate-marquee">
            <span>■ EASTMAN 5219 KODAK VISION3 500T SAFETY FILM 2026 FRAME #100</span>
            <span>■ EASTMAN 5219 KODAK VISION3 500T SAFETY FILM 2026 FRAME #104</span>
            <span>■ EASTMAN 5219 KODAK VISION3 500T SAFETY FILM 2026 FRAME #108</span>
            <span>■ EASTMAN 5219 KODAK VISION3 500T SAFETY FILM 2026 FRAME #112</span>
            <span>■ EASTMAN 5219 KODAK VISION3 500T SAFETY FILM 2026 FRAME #116</span>
          </div>
        </div>

        {/* Horizontal Film Strip Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-4 pt-1 snap-x no-scrollbar cursor-grab active:cursor-grabbing"
        >
          {filmStripFrames.map((frame) => (
            <div
              key={frame.id}
              onClick={() => setActiveItem(frame)}
              className="min-w-[340px] sm:min-w-[420px] max-w-[460px] snap-start rounded-xl overflow-hidden border border-slate-200 hover:border-black bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Frame Card Top Image */}
              <div className="relative aspect-[16/9] w-full bg-black overflow-hidden">
                <img
                  src={frame.posterUrl}
                  alt={frame.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-105"
                  referrerPolicy="no-referrer"
                />

                {/* Viewfinder Corner Overlays */}
                <div className="absolute top-2 left-2 text-white/50 text-xs font-mono pointer-events-none">┌</div>
                <div className="absolute top-2 right-2 text-white/50 text-xs font-mono pointer-events-none">┐</div>
                <div className="absolute bottom-2 left-2 text-white/50 text-xs font-mono pointer-events-none">└</div>
                <div className="absolute bottom-2 right-2 text-white/50 text-xs font-mono pointer-events-none">┘</div>

                {/* Scope & Timecode Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white font-mono text-[10px] tracking-widest uppercase border border-white/20">
                    {frame.aspectRatio}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white font-mono text-[10px] tracking-widest border border-white/20">
                    {frame.duration}
                  </span>
                </div>

                {/* Center Play Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Lower Details */}
              <div className="p-4 flex flex-col gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  {frame.client}
                </span>

                <h3 className="text-base font-bold uppercase tracking-tight text-black font-mono">
                  {frame.title}
                </h3>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="truncate max-w-[200px]">{frame.specs?.split('·')[0]}</span>
                  <span>{frame.specs?.split('·')[1] || 'Cooke'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 35mm Film Sprocket Border Bottom */}
        <div className="w-full overflow-hidden py-1 border-y border-slate-200 select-none bg-slate-50">
          <div className="flex items-center gap-6 whitespace-nowrap text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            <span>■ NITRATE ARCHIVE REEL KAI ROSS DP OPTICAL SOUNDTRACK</span>
            <span>■ NITRATE ARCHIVE REEL KAI ROSS DP OPTICAL SOUNDTRACK</span>
            <span>■ NITRATE ARCHIVE REEL KAI ROSS DP OPTICAL SOUNDTRACK</span>
            <span>■ NITRATE ARCHIVE REEL KAI ROSS DP OPTICAL SOUNDTRACK</span>
          </div>
        </div>
      </div>

      {/* Video Modal Player */}
      {activeItem && (
        <VideoPlayerModal
          isOpen={!!activeItem}
          videoUrl={activeItem.videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
          title={activeItem.title}
          specs={activeItem.specs || 'ARRI Alexa 35 · Super 35 Open Gate'}
          onClose={() => setActiveItem(null)}
        />
      )}
    </div>
  );
};
