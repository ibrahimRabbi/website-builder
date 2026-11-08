import React from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { goTo } from '@/src/utils/fluid';

interface Props {
  section: PortfolioSection;
  authorName?: string;
  fontFamily?: string;
  accentColor?: string;
  onSelectComponent?: (key: string) => void;
  selectedComponentKey?: string | null;
}

export const FooterSection: React.FC<Props> = ({ section, authorName, fontFamily, onSelectComponent, selectedComponentKey }) => {
  const { testimonials = [], columns = [], socialLabel, socials = [], copyright, specsLine } = section.components;
  const pick = (k: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent?.(k);
  };
  const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500 rounded' : '');
  const empty = !testimonials.length && !columns.length && !socials.length && !copyright;

  return (
    <footer
      className="px-6 md:px-12 pt-16 pb-10 border-t border-slate-200/80"
      style={{ backgroundColor: section.backgroundColor || '#fff', fontFamily }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-14">
        {empty && <p className="text-xs text-slate-500">© {new Date().getFullYear()} {authorName}</p>}

        {testimonials.length > 0 && (
          <div onClick={pick('testimonials')} className={`grid grid-cols-1 md:grid-cols-2 gap-10 cursor-pointer ${ring('testimonials')}`}>
            {testimonials.map((t: any, i: number) => (
              <div key={t.id ?? i} className="flex flex-col gap-3">
                <p className="text-sm sm:text-base italic font-serif text-slate-800 leading-relaxed">“{t.quote}”</p>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  <span className="font-bold text-black">{t.name}</span> · {t.role}
                </div>
              </div>
            ))}
          </div>
        )}

        {(columns.length > 0 || socials.length > 0) && <hr className="border-slate-200" />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          {columns.map((c: any, i: number) => (
            <div key={c.id ?? i} onClick={pick('columns')} className={`cursor-pointer ${ring('columns')}`}>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-2">{c.label}</span>
              <div className="text-slate-800 font-medium">{c.name}</div>
              <div className="text-slate-600 mt-0.5">{c.detail}</div>
              {c.linkLabel && (
                <a
                  href={c.linkHref}
                  onClick={(e) => { if (c.linkHref?.startsWith('#')) { e.preventDefault(); goTo(e, c.linkHref); } }}
                  className="text-black font-mono mt-1 inline-flex items-center gap-1 hover:underline"
                >
                  {c.linkLabel}
                  {c.linkHref?.startsWith('#') && <ArrowUpRight className="w-3.5 h-3.5" />}
                </a>
              )}
            </div>
          ))}
          {socials?.length > 0 && (
            <div onClick={pick('socials')} className={`cursor-pointer ${ring('socials')}`}>
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold mb-2">{socialLabel}</span>
              <div className="flex flex-col gap-1 font-mono text-[11px] text-slate-700">
                {socials?.map((s: any, i: number) => (
                  <a key={s.id ?? i} href={s.url} onClick={(e) => e.preventDefault()} className="hover:text-black">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {(copyright || specsLine) && (
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-500">
            <span onClick={pick('copyright')} className={`cursor-pointer ${ring('copyright')}`}>{copyright}</span>
            <span onClick={pick('specsLine')} className={`tracking-widest uppercase cursor-pointer ${ring('specsLine')}`}>{specsLine}</span>
          </div>
        )}
      </div>
    </footer>
  );
};