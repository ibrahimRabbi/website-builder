import React, { useState } from 'react';
import { PortfolioSchema, SectionType } from '../../types/portfolio';
import {
  PlusCircle,
  Layers,
  Palette,
  ChevronUp,
  ChevronDown,
  Trash2,
  Copy
} from 'lucide-react';
import { SectionCatalogItem } from '../../data/sectionCatalog';

interface LeftSidebarProps {
  schema: PortfolioSchema;
  selectedSectionId: string | null;
  onSelectSection: (id: string) => void;
  onAddSection: (type: SectionType) => void;
  onReorderSection: (index: number, direction: 'up' | 'down') => void;
  onDuplicateSection: (index: number) => void;
  onDeleteSection: (index: number) => void;
  onUpdateGlobal: (key: keyof PortfolioSchema, value: any) => void;
  availableSections: SectionCatalogItem[];
  themeTitle?: string;
}

const ACCENT_PRESETS = [
  { label: 'Amber Gold', hex: '#f59e0b' },
  { label: 'Cinema Red', hex: '#ef4444' },
  { label: 'Emerald', hex: '#10b981' },
  { label: 'Indigo', hex: '#6366f1' },
  { label: 'Rose', hex: '#f43f5e' },
  { label: 'Cyan', hex: '#06b6d4' },
  { label: 'Violet', hex: '#8b5cf6' }
];

const FONT_PRESETS = [
  { label: 'Plus Jakarta Sans (Modern Clean)', value: 'Plus Jakarta Sans' },
  { label: 'Playfair Display (Luxury Serif)', value: 'Playfair Display' },
  { label: 'Space Grotesk (Tech Editorial)', value: 'Space Grotesk' },
  { label: 'JetBrains Mono (Developer)', value: 'JetBrains Mono' },
  { label: 'Cormorant Garamond (Editorial Serif)', value: 'Cormorant Garamond' }
];

export const LeftSidebar: React.FC<LeftSidebarProps> = ({
  schema,
  selectedSectionId,
  onSelectSection,
  onAddSection,
  onReorderSection,
  onDuplicateSection,
  onDeleteSection,
  onUpdateGlobal,
  availableSections,
  themeTitle
}) => {
  const [activeTab, setActiveTab] = useState<'blocks' | 'layers' | 'theme'>('blocks');

  const tabClass = (tab: string) =>
    `py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer ${activeTab === tab ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
    }`;

  return (
    <aside className="w-full h-full bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden select-none">
      {/* Tabs */}
      <div className="grid grid-cols-3 p-1.5 bg-slate-950/60 border-b border-slate-800 text-xs font-medium shrink-0">
        <button onClick={() => setActiveTab('blocks')} className={tabClass('blocks')}>
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
        <button onClick={() => setActiveTab('layers')} className={tabClass('layers')}>
          <Layers className="w-3.5 h-3.5" />
          <span>Layers</span>
        </button>
        <button onClick={() => setActiveTab('theme')} className={tabClass('theme')}>
          <Palette className="w-3.5 h-3.5" />
          <span>Theme</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 text-xs">
        {/* ADD TAB (dynamic) */}
        {activeTab === 'blocks' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Section Components
              </h4>
              <p className="text-slate-500 text-[11px] mb-1">
                {themeTitle ? `Available for ${themeTitle}.` : 'Available for this theme.'}
              </p>
              <p className="text-slate-500 text-[11px]">
                Click any section to insert it into your portfolio canvas:
              </p>
            </div>

            {availableSections.length === 0 ? (
              <p className="text-slate-500 text-[11px] py-6 text-center">
                No sections available for this theme.
              </p>
            ) : (
              <div className="space-y-2">
                {availableSections.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.type}
                      onClick={() => onAddSection(item.type)}
                      className="w-full text-left p-3 rounded-lg bg-slate-950/40 hover:bg-white/[0.05] border border-slate-800 hover:border-indigo-500/50 transition-all flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="p-2 rounded-md bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-200 group-hover:text-white block">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500 leading-tight block mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* LAYERS TAB */}
        {activeTab === 'layers' && (
          <div className="space-y-4">
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Document Structure ({schema.sections.length})
            </h4>

            <div className="space-y-1.5">
              {schema.sections.map((section, idx) => {
                const isSelected = selectedSectionId === section.id;
                return (
                  <div
                    key={section.id}
                    onClick={() => onSelectSection(section.id)}
                    className={`p-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${isSelected
                      ? 'bg-indigo-600/15 border-indigo-500 text-white'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/50'
                      }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="text-[10px] font-mono text-slate-500">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-medium text-xs truncate">
                        {section.title || `${section.type} Section`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        title="Move Up"
                        disabled={idx === 0}
                        onClick={() => onReorderSection(idx, 'up')}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <ChevronUp className="w-3 h-3" />
                      </button>
                      <button
                        title="Move Down"
                        disabled={idx === schema.sections.length - 1}
                        onClick={() => onReorderSection(idx, 'down')}
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <button
                        title="Duplicate"
                        onClick={() => onDuplicateSection(idx)}
                        className="p-1 text-slate-400 hover:text-white cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        title="Delete"
                        disabled={schema.sections.length <= 1}
                        onClick={() => onDeleteSection(idx)}
                        className="p-1 text-slate-400 hover:text-rose-400 disabled:opacity-20 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* THEME TAB */}
        {activeTab === 'theme' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Global Portfolio Info
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Author Name</label>
                  <input
                    type="text"
                    value={schema.authorName}
                    onChange={(e) => onUpdateGlobal('authorName', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Role / Headline</label>
                  <input
                    type="text"
                    value={schema.role}
                    onChange={(e) => onUpdateGlobal('role', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Accent Color
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {ACCENT_PRESETS.map((preset) => (
                  <button
                    key={preset.hex}
                    onClick={() => onUpdateGlobal('accentColor', preset.hex)}
                    className={`flex items-center gap-1.5 p-1.5 rounded-lg border text-[11px] transition-all cursor-pointer ${schema.accentColor === preset.hex
                      ? 'border-white bg-white/10 text-white'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                      }`}
                  >
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: preset.hex }} />
                    <span className="truncate">{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Typography Font Family
              </h4>
              <div className="space-y-1.5">
                {FONT_PRESETS.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => onUpdateGlobal('fontFamily', font.value)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${schema.fontFamily === font.value
                      ? 'border-indigo-500 bg-indigo-500/15 text-white font-medium'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-white'
                      }`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};