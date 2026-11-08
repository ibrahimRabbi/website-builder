import React, { useState } from 'react';
import { PortfolioSection } from '@/src/types/portfolio';
import { Send, CheckCircle2 } from 'lucide-react';
import { fluid } from '@/src/utils/fluid';

interface Props {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (key: string) => void;
  selectedComponentKey?: string | null;
}

const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

export const RatesEstimatorSection: React.FC<Props> = ({ section, fontFamily, onSelectComponent, selectedComponentKey }) => {
  const {
    badge, title, subtitle,
    scopes = [], schedules = [], optics = [], addons = [],
    highMultiplier = 1.2, investmentLabel, investmentNote,
    formTitle, successTitle, successText, submitLabel,
  } = section.components;

  const [scope, setScope] = useState(0);
  const [sched, setSched] = useState(0);
  const [opt, setOpt] = useState(0);
  const [on, setOn] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const ring = (k: string) => (selectedComponentKey === k ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : '');
  const pick = (k: string) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectComponent?.(k);
  };
  const isOn = (a: any) => (a.id in on ? on[a.id] : !!a.defaultOn);

  const low =
    (scopes[scope]?.price || 0) + (schedules[sched]?.price || 0) + (optics[opt]?.price || 0) +
    addons.reduce((s: number, a: any) => s + (isOn(a) ? a.price || 0 : 0), 0);
  const high = Math.round((low * highMultiplier) / 100) * 100;

  const btn = (active: boolean) =>
    `rounded-xl border transition-all cursor-pointer ${active ? 'bg-black text-white border-black shadow-md' : 'bg-white text-black border-slate-200 hover:border-slate-400'}`;
  const group = (k: string) =>
    `rounded ${selectedComponentKey === k ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`;
  const lbl = 'text-[11px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-3';

  return (
    <div
      id="rates-section"
      className="px-6 md:px-12 py-20 border-t border-slate-200/80"
      style={{ backgroundColor: section.backgroundColor || '#fff', fontFamily }}
    >
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div>
          {badge && (
            <span onClick={pick('badge')} className={`text-[11px] font-mono tracking-widest uppercase font-semibold block mb-2 cursor-pointer rounded px-1 -mx-1 ${ring('badge')}`} style={{ color: badge.styles?.color || '#64748b' }}>
              {badge.text}
            </span>
          )}
          {title && (
            <h2 onClick={pick('title')} className={`cursor-pointer uppercase rounded px-1 -mx-1 ${ring('title')}`} style={{ fontSize: fluid(title.styles?.fontSize || '36px'), color: title.styles?.color || '#000', fontWeight: title.styles?.fontWeight || '800' }}>
              {title.text}
            </h2>
          )}
          {subtitle && (
            <p onClick={pick('subtitle')} className={`mt-2 max-w-2xl cursor-pointer rounded px-1 -mx-1 ${ring('subtitle')}`} style={{ fontSize: subtitle.styles?.fontSize || '14px', color: subtitle.styles?.color || '#475569' }}>
              {subtitle.text}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div onClick={pick('scopes')} className={group('scopes')}>
              <span className={lbl}>01. PRODUCTION SCOPE</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scopes.map((s: any, i: number) => (
                  <button key={s.id ?? i} type="button" onClick={(e) => { e.stopPropagation(); setScope(i); }} className={`p-4 text-left ${btn(scope === i)}`}>
                    <h4 className="text-xs font-bold uppercase tracking-wider font-mono mb-1">{s.name}</h4>
                    <p className={`text-[11px] leading-relaxed ${scope === i ? 'text-slate-300' : 'text-slate-500'}`}>{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div onClick={pick('schedules')} className={group('schedules')}>
              <span className={lbl}>02. SHOOTING SCHEDULE</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {schedules.map((s: any, i: number) => (
                  <button key={s.id ?? i} type="button" onClick={(e) => { e.stopPropagation(); setSched(i); }} className={`py-3 px-2 text-center text-xs font-mono font-bold tracking-wider uppercase ${btn(sched === i)}`}>
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div onClick={pick('optics')} className={group('optics')}>
              <span className={lbl}>03. SENSOR & OPTICS PACKAGE</span>
              <div className="flex flex-col gap-2.5">
                {optics.map((o: any, i: number) => (
                  <button key={o.id ?? i} type="button" onClick={(e) => { e.stopPropagation(); setOpt(i); }} className={`p-3.5 flex items-center justify-between text-xs font-mono font-bold tracking-wider uppercase ${btn(opt === i)}`}>
                    <span>{o.name}</span>
                    <span className={opt === i ? 'text-slate-300' : 'text-slate-600'}>+{money(o.price || 0)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div onClick={pick('addons')} className={group('addons')}>
              <span className={lbl}>04. POST-PRODUCTION & FINISHING ADD-ONS</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addons.map((a: any, i: number) => {
                  const c = isOn(a);
                  return (
                    <button key={a.id ?? i} type="button" onClick={(e) => { e.stopPropagation(); setOn((p) => ({ ...p, [a.id]: !isOn(a) })); }} className={`p-3.5 flex items-center justify-between text-xs ${btn(c)}`}>
                      <span className="flex items-center gap-2.5">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center ${c ? 'bg-white text-black border-white' : 'border-slate-400'}`}>
                          {c && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </span>
                        <span className="font-medium">{a.label}</span>
                      </span>
                      <span className="font-mono">+{money(a.price || 0)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-xl flex flex-col gap-6">
            <div onClick={pick('investmentLabel')} className={`cursor-pointer rounded ${selectedComponentKey === 'investmentLabel' || selectedComponentKey === 'investmentNote' ? 'ring-2 ring-indigo-500' : ''}`}>
              <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-slate-500 block mb-1">{investmentLabel}</span>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-black">{money(low)} – {money(high)}</span>
                <span className="text-xs font-mono text-slate-500 font-semibold">USD</span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{investmentNote}</p>
            </div>
            <hr className="border-slate-200" />
            <form
              onSubmit={(e) => { e.preventDefault(); setDone(true); setTimeout(() => setDone(false), 4000); }}
              className="flex flex-col gap-4"
            >
              <span className="text-xs font-bold tracking-wider uppercase font-mono text-black">{formTitle}</span>
              {done ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center gap-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  <h4 className="text-sm font-bold text-emerald-900">{successTitle}</h4>
                  <p className="text-xs text-emerald-700">{successText}</p>
                </div>
              ) : (
                <>
                  {[
                    ['YOUR NAME / STUDIO', 'text', 'e.g. Elena Vance (Maison Noir)', true],
                    ['WORK EMAIL', 'email', 'producer@studio.com', true],
                    ['TARGET SHOOT WINDOW', 'text', 'e.g. Q4 2026 / November in Paris', false],
                  ].map(([l, t, p, r]: any) => (
                    <div key={l}>
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">{l}</label>
                      <input type={t} required={r} placeholder={p} className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-black focus:outline-none focus:border-black" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">BRIEF NOTES & REFERENCES</label>
                    <textarea rows={3} placeholder="Describe mood board, reference stills, or technical requirements..." className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-xs text-black focus:outline-none focus:border-black resize-none" />
                  </div>
                  <button type="submit" className="w-full mt-2 py-3.5 px-4 bg-black text-white rounded-lg text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]">
                    <span>{submitLabel}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};