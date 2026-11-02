import React, { useState, useRef } from 'react';
import { PortfolioSection } from '../../types/portfolio';
import { Sliders, Check, Sparkles, Layers } from 'lucide-react';

interface ColorLabSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const ColorLabSection: React.FC<ColorLabSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle } = components;

  // Selected Look Tab (0 = Monolith B&W, 1 = Kodak 2383, 2 = Bleach Bypass, 3 = Midnight Cyan)
  const [selectedLookIdx, setSelectedLookIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isSelected = (key: string) => selectedComponentKey === key;

  const looks = [
    {
      id: '01',
      name: '01. MONOLITH B&W SILVER HALIDE',
      badge: 'MONOCHROM NATIVE',
      desc: 'Deep velvety blacks, luminous skin highlights, and high-contrast Rembrandt roll-off directly from Leica M11 sensor.',
      image: '/assets/kai-ross/color_lab_master.jpg',
      label: '[MASTER] Monolith B&W Silver Halide',
      matrix: 'Leica Monochrom Native · Linear to Gamma 2.4',
      highlight: '+1.2 EV Zone VIII Roll-off',
      shadow: 'Zone 0 Deep Crush'
    },
    {
      id: '02',
      name: '02. KODAK 2383 PRINT MASTER',
      badge: '35MM POSITIVE PRINT',
      desc: 'Classic 35mm motion picture positive film print emulation. Rich shadow separation, subtle amber halation, and organic grain.',
      image: '/assets/kai-ross/color_lab_kodak2383.jpg',
      label: '[PRINT EMULATION] Kodak Vision 2383 Gold Stock',
      matrix: 'ACEScc · Kodak 2383 DCI-P3 Print Curve',
      highlight: '+0.8 EV Warm Shoulder Roll-off',
      shadow: 'Zone I Soft Lifted Halation'
    },
    {
      id: '03',
      name: '03. SILVER BLEACH BYPASS (ENR)',
      badge: 'ENR CHEM PROCESS',
      desc: 'Retains silver in the emulsion layer during film processing, producing stark graphic contrast and metallic highlights.',
      image: '/assets/kai-ross/color_lab_bleach_bypass.jpg',
      label: '[PROCESS EMULATION] Silver Bleach Bypass (ENR)',
      matrix: 'LogC4 to High-Contrast Silver Bleach LTO',
      highlight: '+2.0 EV Hard Cut Specular',
      shadow: 'Dense Carbon Matte Black'
    },
    {
      id: '04',
      name: '04. MIDNIGHT CYAN NEO-NOIR',
      badge: 'NIGHT EXTERIOR',
      desc: 'Cold night exterior grade engineered for rainy asphalt reflections and moody sodium-vapor streetlights in urban noir narratives.',
      image: '/assets/kai-ross/color_lab_midnight_cyan.jpg',
      label: '[COLOR GRADE] Midnight Cyan Neo-Noir',
      matrix: 'Cool Cyan Matrix · 3200K Tungsten Shift',
      highlight: 'Desaturated Blue-White Neon',
      shadow: 'Deep Inky Petrol Green-Blue'
    }
  ];

  const currentLook = looks[selectedLookIdx];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging && e.buttons !== 1) return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPos(percent);
  };

  return (
    <div
      id="color-lab-section"
      className="relative px-6 md:px-12 py-20 transition-colors border-t border-slate-200/80 bg-white text-black"
      style={{
        backgroundColor: section.backgroundColor || '#ffffff',
        fontFamily
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Look Tabs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {looks.map((look, idx) => {
            const isActive = selectedLookIdx === idx;
            return (
              <button
                key={look.id}
                type="button"
                onClick={() => setSelectedLookIdx(idx)}
                className={`p-5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-black text-white border-black shadow-lg shadow-black/10'
                    : 'bg-white text-black border-slate-200 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold tracking-wider uppercase mb-2 font-mono">
                    {look.name}
                  </h4>
                  <p className={`text-[12px] leading-relaxed line-clamp-3 ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                    {look.desc}
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t text-[10px] font-mono uppercase tracking-widest flex items-center justify-between ${
                  isActive ? 'border-white/20 text-slate-400' : 'border-slate-100 text-slate-400'
                }`}>
                  <span>{look.badge}</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Before/After Split Viewer */}
        <div
          ref={containerRef}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          onPointerMove={handlePointerMove}
          className="relative aspect-[21/9] sm:aspect-[2.39/1] w-full rounded-2xl overflow-hidden border border-slate-300 bg-black select-none cursor-ew-resize shadow-2xl group"
        >
          {/* Base Layer: Native Master (Monolith B&W) */}
          <img
            src="/assets/kai-ross/color_lab_master.jpg"
            alt="Master B&W Native"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            referrerPolicy="no-referrer"
          />

          {/* Top Layer: Selected Emulsion Look (Clipped to Slider) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPos}%` }}
          >
            <img
              src={currentLook.image}
              alt={currentLook.name}
              className="absolute inset-y-0 left-0 max-w-none h-full object-cover"
              style={{
                width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'
              }}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Viewfinder Crop Marks */}
          <div className="absolute top-4 left-4 text-white/50 text-base font-mono pointer-events-none">┌</div>
          <div className="absolute top-4 right-4 text-white/50 text-base font-mono pointer-events-none">┐</div>
          <div className="absolute bottom-4 left-4 text-white/50 text-base font-mono pointer-events-none">└</div>
          <div className="absolute bottom-4 right-4 text-white/50 text-base font-mono pointer-events-none">┘</div>

          {/* Top Right Look Badge */}
          <div className="absolute top-5 right-6 z-10 pointer-events-none">
            <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-white font-mono text-[11px] font-semibold tracking-wider uppercase border border-white/20 rounded">
              {currentLook.label}
            </span>
          </div>

          {/* Interactive Split Slider Line */}
          <div
            className="absolute inset-y-0 w-0.5 bg-white z-20 shadow-[0_0_10px_rgba(255,255,255,0.7)] pointer-events-none"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-2xl border-2 border-black/80 font-bold text-xs">
              <Sliders className="w-4 h-4 text-black" />
            </div>
          </div>

          {/* Bottom Hint Pill */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none z-10">
            <span className="px-4 py-1 rounded-full bg-black/75 backdrop-blur-md text-white/80 font-mono text-[10px] tracking-widest uppercase border border-white/20">
              DRAG HORIZONTALLY TO COMPARE EXPOSURE ROLL-OFF
            </span>
          </div>
        </div>

        {/* Color Calibration Matrix Specs Box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-xl border border-slate-200 bg-slate-50 text-black">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
              COLOR TRANSFORMATION MATRIX
            </span>
            <span className="text-xs font-mono font-semibold text-black">
              {currentLook.matrix}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
              HIGHLIGHT COMPRESSION
            </span>
            <span className="text-xs font-mono font-semibold text-black">
              {currentLook.highlight}
            </span>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
              SHADOW FLOOR DENSITY
            </span>
            <span className="text-xs font-mono font-semibold text-black">
              {currentLook.shadow}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
