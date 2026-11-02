import React from 'react';
import { PortfolioSection } from '../../types/portfolio';
import { ArrowUpRight } from 'lucide-react';

interface FooterSectionProps {
  section: PortfolioSection;
  authorName?: string;
  fontFamily?: string;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  section,
  authorName = 'Kai Ross',
  fontFamily
}) => {
  const scrollToRates = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('rates-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      className="relative px-6 md:px-12 pt-20 pb-12 transition-colors border-t border-slate-200/80 bg-white text-black"
      style={{
        backgroundColor: section.backgroundColor || '#ffffff',
        fontFamily
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        {/* Dual Testimonials from Screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm sm:text-base italic font-serif text-slate-800 leading-relaxed">
              "Kai brings an architectural eye to every frame. His mastery of dark monochrome contrast and controlled light transformed our campaign into a timeless piece of cinema."
            </p>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              <span className="font-bold text-black">Elena Vance</span> · Creative Director, Maison Noir Studios, Paris
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm sm:text-base italic font-serif text-slate-800 leading-relaxed">
              "The depth and texture Kai captured on 35mm exceeded our highest expectations. He understands restraint, pacing, and how to command the viewer's eye."
            </p>
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              <span className="font-bold text-black">Marcus Sterling</span> · Head of Production, Vanguard Film Works, London
            </div>
          </div>
        </div>

        {/* Hairline Divider */}
        <hr className="border-slate-200" />

        {/* 4 Representation & Info Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-2">
              NORTH AMERICA REPRESENTATION
            </span>
            <div className="text-slate-800 font-medium">Art & Motion Agency</div>
            <div className="text-slate-600 mt-0.5">450 West 33rd St, New York, NY</div>
            <a href="mailto:ny@kairosscinema.com" className="text-black font-mono mt-1 inline-block hover:underline">
              ny@kairosscinema.com
            </a>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-2">
              EUROPE & UK REPRESENTATION
            </span>
            <div className="text-slate-800 font-medium">Cinematography Co-Op</div>
            <div className="text-slate-600 mt-0.5">12 Rue du Faubourg Saint-Honoré, Paris</div>
            <a href="mailto:paris@kairosscinema.com" className="text-black font-mono mt-1 inline-block hover:underline">
              paris@kairosscinema.com
            </a>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-2">
              DIRECT INQUIRIES
            </span>
            <div className="text-slate-800 font-medium">Kai Ross Studio</div>
            <div className="text-slate-600 mt-0.5">Available for worldwide travel & location scouting</div>
            <a
              href="#rates-section"
              onClick={scrollToRates}
              className="text-black font-mono font-semibold mt-1 inline-flex items-center gap-1 hover:underline cursor-pointer"
            >
              <span>Production Inquiry Form</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div>
            <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-2">
              SOCIAL ARCHIVES
            </span>
            <div className="flex flex-col gap-1 font-mono text-[11px] text-slate-700">
              <a href="https://vimeo.com" target="_blank" rel="noreferrer" className="hover:text-black">
                Vimeo Pro / kaiross
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-black">
                Instagram / @kaiross.film
              </a>
              <a href="https://imdb.com" target="_blank" rel="noreferrer" className="hover:text-black">
                IMDb / nm8492041
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Color Science Specs */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
          <span>© 2026 KAI ROSS CINEMATOGRAPHY & FINE STILLS. ALL RIGHTS RESERVED.</span>
          <span className="tracking-widest uppercase">
            P3-DCI / ACES 1.3 · 35MM ANALOG & DIGITAL LARGE FORMAT
          </span>
        </div>
      </div>
    </footer>
  );
};
