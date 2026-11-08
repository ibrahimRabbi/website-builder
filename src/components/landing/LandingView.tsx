import React from 'react';
import { ThemeMetadata } from '../../types/portfolio';
import { DUMMY_THEMES } from '../../data/dummyThemes';
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Sliders, 
  Layout, 
  Share2, 
  CheckCircle2, 
  Eye, 
  Laptop, 
  Cpu,
  Layers,
  Braces
} from 'lucide-react';

interface LandingViewProps {
  onEnterEditor: (theme?: ThemeMetadata) => void;
  onOpenThemeModal: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onEnterEditor,
  onOpenThemeModal
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <header className="flex items-center justify-between gap-8 px-6 lg:px-12 py-4 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        {/* Zone 1: Brand Wordmark */}
        <a href="/" className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-black">
            F
          </div>
          <span>FolioCraft</span>
        </a>

        {/* Zone 2: 4-5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <a href="#themes" className="hover:text-white transition-colors whitespace-nowrap shrink-0">Themes</a>
          <a href="#features" className="hover:text-white transition-colors whitespace-nowrap shrink-0">Architecture</a>
          <a href="#editor-specs" className="hover:text-white transition-colors whitespace-nowrap shrink-0">Inspector</a>
          <a href="#json-schema" className="hover:text-white transition-colors whitespace-nowrap shrink-0">JSON Schema</a>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onEnterEditor()}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-all active:scale-95 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Create Portfolio
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-20 pb-24 overflow-hidden border-b border-slate-800">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featuring Kai Rosas: Built for Videographers, Directors & Cinematographers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Build your professional portfolio with visual precision and pure code control.
          </h1>

          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            FolioCraft provides visual drag-and-drop editing with an interactive JSON schema engine, Webflow-style properties inspector, and authentic themes for videographers, engineers, and creators.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onEnterEditor()}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/25 transition-all active:scale-95 cursor-pointer"
            >
              <span>Build Videographer Portfolio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenThemeModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-semibold text-sm border border-slate-700 transition-colors cursor-pointer"
            >
              <Layout className="w-4 h-4 text-amber-400" />
              <span>Explore All 4 Themes</span>
            </button>
          </div>

          {/* Proof Strip */}
          <div className="pt-10 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>2.39:1 Cinema Widescreen Player</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Filmography & Camera Package Suite</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Two-Way Code AST Synchronization</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Debounced 2000ms Auto-Save</span>
            </span>
          </div>
        </div>

        {/* Hero Interactive Workspace Mockup Teaser */}
        <div className="max-w-5xl mx-auto mt-14 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden">
          <div className="h-10 bg-slate-950 border-b border-slate-800 px-4 flex items-center justify-between text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-slate-400">FolioCraft Studio — Kai Rosas Videographer Theme</span>
            </div>
            <span className="text-amber-400">/editor?theme=theme_kai_rosas</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
            {/* Left Mock Nav */}
            <div className="lg:col-span-3 bg-slate-950/60 p-4 border-r border-slate-800/80 hidden lg:block text-xs">
              <div className="font-semibold text-slate-400 uppercase tracking-wider mb-3 text-[11px]">
                Cinematography Blocks
              </div>
              <div className="space-y-1.5">
                {['Cinematic Hero', '2026 Showreel', 'Commercial Films', 'Camera Package & Gear', 'Commercial Clients', 'Production Inquiries'].map((item, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Canvas Preview (Kai Rosas Style) */}
            <div className="lg:col-span-6 p-6 canvas-grid flex flex-col justify-center items-center">
              <div className="w-full bg-[#05070c] p-6 rounded-xl border border-amber-500/40 shadow-xl space-y-4 text-left">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  DIRECTOR & CINEMATOGRAPHER
                </span>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  KAI ROSAS
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Sculpting cinematic narratives with large-format optics, anamorphic glass, and raw emotional resonance.
                </p>
                <div className="flex gap-2 pt-1">
                  <span className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded text-xs flex items-center gap-1">
                    <span>▶</span>
                    <span>Watch 2026 Showreel</span>
                  </span>
                  <span className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded text-xs border border-slate-800">
                    Book Production
                  </span>
                </div>
              </div>
            </div>

            {/* Right Inspector Preview */}
            <div className="lg:col-span-3 bg-slate-950/60 p-4 border-l border-slate-800/80 hidden lg:block text-xs">
              <div className="font-semibold text-slate-400 uppercase tracking-wider mb-3 text-[11px]">
                Webflow Inspector
              </div>
              <div className="space-y-3">
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500 mb-1">CINEMA CAMERA SPECS</div>
                  <div className="text-xs font-mono text-amber-300">ARRI Alexa Mini LF</div>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800 space-y-1">
                  <div className="text-[10px] text-slate-500">ASPECT RATIO: 2.39:1</div>
                  <div className="w-full bg-slate-800 rounded h-1 overflow-hidden">
                    <div className="bg-amber-500 h-full w-4/5" />
                  </div>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-500 mb-1">ACCENT COLOR</div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#f59e0b]" />
                    <span className="font-mono text-slate-300 text-[11px]">#F59E0B (Amber Gold)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Grid Section (Step 2 in doc) */}
      <section id="themes" className="px-6 lg:px-12 py-20 border-b border-slate-800">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Curated Theme Architecture
                </h2>
                <span className="px-2.5 py-0.5 rounded text-xs font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Featured: Kai Rosas
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Choose any theme to customize with your own films, projects, bio, and camera package.
              </p>
            </div>
            <button
              onClick={() => onEnterEditor()}
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
            >
              <span>Launch Theme Builder</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {DUMMY_THEMES.map((theme) => (
              <div
                key={theme.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img
                    src={theme.thumbnailUrl}
                    alt={theme.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span 
                      className="px-2.5 py-1 rounded text-[11px] font-semibold text-white shadow"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {theme.badge}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                      {theme.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-3 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center gap-2">
                    <button
                      onClick={() => onEnterEditor(theme)}
                      className="w-full py-2 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      style={{
                        backgroundColor: theme.id === 'theme_kai_rosas' ? '#f59e0b' : undefined,
                        color: theme.id === 'theme_kai_rosas' ? '#000000' : undefined
                      }}
                    >
                      <span>Load in Editor</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section (Section 7 in doc) */}
      <section id="features" className="px-6 lg:px-12 py-20 border-b border-slate-800 bg-slate-900/20">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Built on Modern Frontend Architecture
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Engineered exactly as specified in the system architecture document: React, Tailwind CSS, Craft.js visual engine, and Webflow-style properties inspector.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="p-2.5 w-fit rounded-lg bg-indigo-500/10 text-indigo-400">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Webflow-Style Inspector</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dynamic sidebar property panel supporting typography sliders, font weights, color pickers, and interactive box model padding/margin adjustments.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="p-2.5 w-fit rounded-lg bg-emerald-500/10 text-emerald-400">
                <Braces className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Two-Way Code Editor</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Inspect and tweak the exact JSON AST schema in real-time with line numbers, syntax validation, and instant bidirectional canvas synchronization.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="p-2.5 w-fit rounded-lg bg-amber-500/10 text-amber-400">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Multi-Device Viewport</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamlessly preview and edit across Desktop (1200px), Tablet (768px), and Mobile (390px) frames with real-time responsive constraints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JSON Schema Definition Showcase (Section 3 in doc) */}
      {/* <section id="json-schema" className="px-6 lg:px-12 py-20 border-b border-slate-800">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-xs font-mono text-indigo-400 block mb-1">Standardized JSON Data Format</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Schema-Driven Component Tree
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Every section, headline, button, and layout node follows the exact document structure for effortless serialization and export.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#0d1117] p-5 font-mono text-xs overflow-x-auto text-slate-300">
            <pre>
{`{
  "themeId": "theme_developer_dark",
  "sections": [
    {
      "id": "hero_section_1",
      "type": "Hero",
      "components": {
        "title": {
          "text": "Hello, I am Ibrahim Rabbi",
          "styles": {
            "fontSize": "48px",
            "color": "#f8fafc",
            "fontWeight": "bold",
            "textAlign": "left"
          }
        },
        "subtitle": {
          "text": "Full-Stack Software Engineer & Distributed Systems Architect",
          "styles": {
            "fontSize": "18px",
            "color": "#94a3b8"
          }
        },
        "ctaButton": {
          "label": "Explore Projects",
          "link": "#projects",
          "styles": {
            "backgroundColor": "#10b981",
            "borderRadius": "8px"
          }
        }
      }
    }
  ]
}`}
            </pre>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 text-xs text-slate-500 border-t border-slate-800/80 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">FolioCraft Studio</span>
            <span aria-hidden="true">·</span>
            <span>Visual Portfolio Builder & Code Editor</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onEnterEditor()}
              className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
            >
              Open Editor
            </button>
            <span aria-hidden="true">·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
