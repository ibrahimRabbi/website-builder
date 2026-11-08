import React, { useEffect, useState } from 'react';
import { PortfolioSection, PortfolioSchema } from '../../types/portfolio';
import { Type, Paintbrush, Layers } from 'lucide-react';
import { Field, ColorInput, StyleEditor } from './FieldEditor';
import { getCatalogItem } from '../../data/sectionCatalog';

interface RightInspectorProps {
  schema: PortfolioSchema;
  selectedSectionId: string | null;
  selectedComponentKey: string | null;
  onUpdateSection: (sectionId: string, updatedSection: PortfolioSection) => void;
  onUpdateGlobal: (key: keyof PortfolioSchema, value: any) => void;
  onSelectComponent: (key: string | null) => void;
}

const PREFERRED = ['badge', 'title', 'subtitle', 'bio'];
const PADDINGS = ['py-0', 'py-8', 'py-12', 'py-16', 'py-20', 'py-24', 'py-28', 'py-32'];

export const RightInspector: React.FC<RightInspectorProps> = ({
  schema,
  selectedSectionId,
  selectedComponentKey,
  onUpdateSection,
  onSelectComponent,
}) => {
  const [tab, setTab] = useState<'content' | 'style'>('content');

  const section = schema.sections.find((s) => s.id === selectedSectionId);

  
  useEffect(() => {
    if (!selectedComponentKey) return;
    setTab('content');
    document
      .getElementById(`field-${selectedComponentKey}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [selectedComponentKey]);

  if (!section) {
    return (
      <aside className="w-full h-full bg-slate-900/90 p-6 flex flex-col items-center justify-center text-center text-slate-500">
        <Layers className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm">Select a section to edit</p>
      </aside>
    );
  }

  const meta = getCatalogItem(section.type);
  const components = section.components || {};

  const patchSection = (patch: Partial<PortfolioSection>) =>
    onUpdateSection(section.id, { ...section, ...patch });

  const setComponent = (key: string, value: any) =>
    patchSection({ components: { ...components, [key]: value } });

  // field order: preferred -> baki shob (data-te jemon ache)
  const keys = Object.keys(components).filter(
    (k) => components[k] !== undefined && typeof components[k] !== 'function'
  );
  const ordered = [
    ...PREFERRED.filter((k) => keys.includes(k)),
    ...keys.filter((k) => !PREFERRED.includes(k)),
  ];

  const styleKey = selectedComponentKey && components[selectedComponentKey]?.styles !== undefined
    ? selectedComponentKey
    : null;

  return (
    <aside className="w-full h-full bg-slate-900 flex flex-col overflow-hidden select-none">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="min-w-0">
            <h3 className="text-xs font-semibold text-white tracking-wide uppercase truncate">
              {meta?.title || section.type}
            </h3>
            <p className="text-[11px] text-slate-400 font-mono truncate">
              {selectedComponentKey ? `element: ${selectedComponentKey}` : section.type}
            </p>
          </div>
          {selectedComponentKey && (
            <button
              onClick={() => onSelectComponent(null)}
              className="text-[10px] text-indigo-400 hover:text-indigo-300 font-mono cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 p-1 bg-slate-950/70 rounded-lg text-xs font-medium">
          {([
            ['content', Type, 'Content'],
            ['style', Paintbrush, 'Section'],
          ] as const).map(([id, Icon, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`py-1.5 rounded-md flex items-center justify-center gap-1.5 cursor-pointer transition-all ${tab === id ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs text-slate-300">
        {tab === 'content' ? (
          ordered.length === 0 ? (
            <p className="text-[11px] text-slate-500 text-center py-8">
              Ei section-e ekhono kono content data nei. Theme data-te <code>components</code> fill koro.
            </p>
          ) : (
            ordered.map((k) => (
              <div
                key={k}
                id={`field-${k}`}
                className={`rounded-lg transition-all ${selectedComponentKey === k ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900' : ''
                  }`}
              >
                <Field k={k} value={components[k]} onChange={(v) => setComponent(k, v)} />
              </div>
            ))
          )
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                Layer name
              </label>
              <input
                value={section.title || ''}
                onChange={(e) => patchSection({ title: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                Section background
              </label>
              <ColorInput
                value={section.backgroundColor}
                onChange={(v) => patchSection({ backgroundColor: v })}
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                Vertical padding
              </label>
              <select
                value={section.paddingY || 'py-16'}
                onChange={(e) => patchSection({ paddingY: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs text-white"
              >
                {PADDINGS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            {styleKey && (
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-slate-400 mb-1">
                  Style: {styleKey}
                </label>
                <StyleEditor
                  styles={components[styleKey].styles}
                  onChange={(s) => setComponent(styleKey, { ...components[styleKey], styles: s })}
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-slate-800/80 bg-slate-950/50 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
        <span>Auto inspector</span>
        <span className="font-mono text-indigo-400">JSON Node Sync</span>
      </div>
    </aside>
  );
};