import React, { useState } from 'react';
import { PortfolioSection, PortfolioSchema } from '../../types/portfolio';
import { 
  Type, 
  Paintbrush, 
  Sliders, 
  Trash2, 
  Plus, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Layers,
  Sparkles,
  ExternalLink,
  Code2,
  Film,
  Camera,
  Video,
  Play
} from 'lucide-react';

interface RightInspectorProps {
  schema: PortfolioSchema;
  selectedSectionId: string | null;
  selectedComponentKey: string | null;
  onUpdateSection: (sectionId: string, updatedSection: PortfolioSection) => void;
  onUpdateGlobal: (key: keyof PortfolioSchema, value: any) => void;
  onSelectComponent: (key: string | null) => void;
}

export const RightInspector: React.FC<RightInspectorProps> = ({
  schema,
  selectedSectionId,
  selectedComponentKey,
  onUpdateSection,
  onUpdateGlobal,
  onSelectComponent
}) => {
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');

  const selectedSection = schema.sections.find(s => s.id === selectedSectionId) || schema.sections[0];

  if (!selectedSection) {
    return (
      <aside className="w-80 bg-slate-900/90 border-l border-slate-800 p-6 flex flex-col items-center justify-center text-center text-slate-500">
        <Layers className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm">Select an element on canvas to inspect its properties</p>
      </aside>
    );
  }

  const { components } = selectedSection;

  // Helper to update specific component
  const updateComponent = (key: string, data: any) => {
    const updatedComponents = {
      ...components,
      [key]: data
    };
    onUpdateSection(selectedSection.id, {
      ...selectedSection,
      components: updatedComponents
    });
  };

  // Helper to update component style
  const updateComponentStyle = (key: string, styleKey: string, value: string) => {
    const current = components[key] || { styles: {} };
    const updated = {
      ...current,
      styles: {
        ...(current.styles || {}),
        [styleKey]: value
      }
    };
    updateComponent(key, updated);
  };

  // Active target for styling: either specific component or title by default
  const styleTargetKey = selectedComponentKey || 'title';
  const currentTargetComponent = components[styleTargetKey];

  return (
    <aside className="w-80 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-hidden select-none">
      {/* Header with Element Identifier & Tabs */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-md bg-indigo-500/10 text-indigo-400">
              <Sliders className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-xs font-semibold text-white tracking-wide uppercase">
                {selectedSection.type} Section
              </h3>
              <p className="text-[11px] text-slate-400 font-mono truncate max-w-[170px]">
                {selectedComponentKey ? `element: ${selectedComponentKey}` : 'section container'}
              </p>
            </div>
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

        {/* Segmented Tab Bar */}
        <div className="grid grid-cols-2 p-1 bg-slate-950/70 rounded-lg text-xs font-medium">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-1.5 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'content'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>Content</span>
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`py-1.5 rounded-md transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'style'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Paintbrush className="w-3.5 h-3.5" />
            <span>Style</span>
          </button>
        </div>
      </div>

      {/* Scrollable Properties Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs text-slate-300">
        {activeTab === 'content' ? (
          /* CONTENT TAB */
          <div className="space-y-5">
            {/* Section Background Color */}
            <div>
              <label className="block text-[11px] font-semibold uppercase text-slate-400 tracking-wider mb-2">
                Section Background
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selectedSection.backgroundColor || '#090d16'}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, {
                      ...selectedSection,
                      backgroundColor: e.target.value
                    });
                  }}
                  className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedSection.backgroundColor || '#090d16'}
                  onChange={(e) => {
                    onUpdateSection(selectedSection.id, {
                      ...selectedSection,
                      backgroundColor: e.target.value
                    });
                  }}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs font-mono text-slate-200"
                />
              </div>
            </div>

            {/* Title Content */}
            {components.title && (
              <div 
                className={`p-3 rounded-lg border transition-all ${
                  selectedComponentKey === 'title' ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-800 bg-slate-950/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-200">Headline / Title</span>
                  <button
                    onClick={() => onSelectComponent('title')}
                    className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                  >
                    Style this
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={components.title.text || ''}
                  onChange={(e) => {
                    updateComponent('title', {
                      ...components.title,
                      text: e.target.value
                    });
                  }}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Subtitle Content */}
            {components.subtitle && (
              <div 
                className={`p-3 rounded-lg border transition-all ${
                  selectedComponentKey === 'subtitle' ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-800 bg-slate-950/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-200">Subtitle / Tagline</span>
                  <button
                    onClick={() => onSelectComponent('subtitle')}
                    className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                  >
                    Style this
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={components.subtitle.text || ''}
                  onChange={(e) => {
                    updateComponent('subtitle', {
                      ...components.subtitle,
                      text: e.target.value
                    });
                  }}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* Bio for About Section */}
            {components.bio && (
              <div 
                className={`p-3 rounded-lg border transition-all ${
                  selectedComponentKey === 'bio' ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-800 bg-slate-950/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-semibold text-slate-200">Detailed Biography</span>
                  <button
                    onClick={() => onSelectComponent('bio')}
                    className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                  >
                    Style this
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={components.bio.text || ''}
                  onChange={(e) => {
                    updateComponent('bio', {
                      ...components.bio,
                      text: e.target.value
                    });
                  }}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            )}

            {/* CTA Button Content */}
            {components.ctaButton && (
              <div 
                className={`p-3 rounded-lg border transition-all ${
                  selectedComponentKey === 'ctaButton' ? 'border-indigo-500 bg-indigo-500/5' : 'border-slate-800 bg-slate-950/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-200">Primary Button</span>
                  <button
                    onClick={() => onSelectComponent('ctaButton')}
                    className="text-[10px] text-indigo-400 hover:underline cursor-pointer"
                  >
                    Style this
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Button Label</label>
                    <input
                      type="text"
                      value={components.ctaButton.label || ''}
                      onChange={(e) => {
                        updateComponent('ctaButton', {
                          ...components.ctaButton,
                          label: e.target.value
                        });
                      }}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Link URL</label>
                    <input
                      type="text"
                      value={components.ctaButton.link || ''}
                      onChange={(e) => {
                        updateComponent('ctaButton', {
                          ...components.ctaButton,
                          link: e.target.value
                        });
                      }}
                      className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs font-mono text-slate-300"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Avatar Image Source */}
            {components.avatar && (
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-2">
                <span className="font-semibold text-slate-200 block">Avatar Image URL</span>
                <input
                  type="text"
                  value={components.avatar.src || ''}
                  onChange={(e) => {
                    updateComponent('avatar', {
                      ...components.avatar,
                      src: e.target.value
                    });
                  }}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs text-slate-300 font-mono"
                />
              </div>
            )}

            {/* Videographer Video Reel / Showreel controls */}
            {(components.videoUrl !== undefined || selectedSection.type === 'Showreel' || selectedSection.type === 'Hero') && (
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-3">
                <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  <span>Cinematic Video / Reel Settings</span>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Video Stream URL (MP4 / YouTube / Vimeo)</label>
                  <input
                    type="text"
                    value={components.videoUrl || ''}
                    placeholder="https://...mp4 or https://youtube.com/..."
                    onChange={(e) => updateComponent('videoUrl', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs text-amber-300 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Poster Image URL (2.39:1 / 16:9)</label>
                  <input
                    type="text"
                    value={components.videoPoster || ''}
                    placeholder="https://images.unsplash.com/..."
                    onChange={(e) => updateComponent('videoPoster', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs text-slate-300 font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Camera Package & Specs Tag</label>
                  <input
                    type="text"
                    value={components.cameraSpecs || ''}
                    placeholder="ARRI Alexa Mini LF · Anamorphic 2.39:1"
                    onChange={(e) => updateComponent('cameraSpecs', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700/80 rounded px-2 py-1.5 text-xs text-slate-200 font-mono"
                  />
                </div>
              </div>
            )}

            {/* Videographer Films List Manager */}
            {Array.isArray(components.films) && (() => {
              const filmsList = components.films;
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Filmography ({filmsList.length})</span>
                    <button
                      onClick={() => {
                        const newFilm = {
                          id: `film_${Date.now()}`,
                          title: 'NEW CINEMATIC FILM',
                          client: 'COMMERCIAL CLIENT',
                          category: 'COMMERCIAL',
                          role: 'Director & Cinematographer',
                          year: '2026',
                          duration: '03:15',
                          specs: 'ARRI ALEXA Mini LF · Anamorphic',
                          posterUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=800&q=80',
                          videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
                        };
                        updateComponent('films', [...filmsList, newFilm]);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Film</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {filmsList.map((film: any, idx: number) => (
                      <div key={film.id || idx} className="p-2.5 rounded bg-slate-950/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-amber-400">Film #{idx + 1}</span>
                          <button
                            onClick={() => {
                              const updated = filmsList.filter((_: any, i: number) => i !== idx);
                              updateComponent('films', updated);
                            }}
                            className="text-slate-500 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Film Title</label>
                          <input
                            type="text"
                            placeholder="Title"
                            value={film.title}
                            onChange={(e) => {
                              const updated = [...filmsList];
                              updated[idx] = { ...film, title: e.target.value };
                              updateComponent('films', updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white uppercase font-bold"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-1.5">
                          <div>
                            <label className="text-[10px] text-slate-500 block mb-0.5">Client Brand</label>
                            <input
                              type="text"
                              placeholder="Client (e.g. Nike)"
                              value={film.client || ''}
                              onChange={(e) => {
                                const updated = [...filmsList];
                                updated[idx] = { ...film, client: e.target.value };
                                updateComponent('films', updated);
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-amber-300"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 block mb-0.5">Category</label>
                            <input
                              type="text"
                              placeholder="e.g. Commercial"
                              value={film.category || ''}
                              onChange={(e) => {
                                const updated = [...filmsList];
                                updated[idx] = { ...film, category: e.target.value };
                                updateComponent('films', updated);
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5">
                          <div>
                            <label className="text-[10px] text-slate-500 block mb-0.5">Role</label>
                            <input
                              type="text"
                              placeholder="Director & DP"
                              value={film.role || ''}
                              onChange={(e) => {
                                const updated = [...filmsList];
                                updated[idx] = { ...film, role: e.target.value };
                                updateComponent('films', updated);
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 block mb-0.5">Duration</label>
                            <input
                              type="text"
                              placeholder="03:45"
                              value={film.duration || ''}
                              onChange={(e) => {
                                const updated = [...filmsList];
                                updated[idx] = { ...film, duration: e.target.value };
                                updateComponent('films', updated);
                              }}
                              className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Camera Specs</label>
                          <input
                            type="text"
                            placeholder="ARRI Alexa Mini LF · Atlas Orion"
                            value={film.specs || ''}
                            onChange={(e) => {
                              const updated = [...filmsList];
                              updated[idx] = { ...film, specs: e.target.value };
                              updateComponent('films', updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Poster Image URL</label>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/..."
                            value={film.posterUrl || ''}
                            onChange={(e) => {
                              const updated = [...filmsList];
                              updated[idx] = { ...film, posterUrl: e.target.value };
                              updateComponent('films', updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-400 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Video URL (MP4/YouTube/Vimeo)</label>
                          <input
                            type="text"
                            placeholder="https://..."
                            value={film.videoUrl || ''}
                            onChange={(e) => {
                              const updated = [...filmsList];
                              updated[idx] = { ...film, videoUrl: e.target.value };
                              updateComponent('films', updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-amber-300 font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Gear & Camera Equipment Manager */}
            {Array.isArray(components.gear) && (() => {
              const gearList = components.gear;
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Camera Packages ({gearList.length})</span>
                    <button
                      onClick={() => {
                        const newCat = {
                          category: 'Lighting & Grip',
                          items: ['Aputure 600d Pro Point-Source LED', 'Nanlite Pavotube II 30X RGBWW', 'Matthews C-Stands & Grip Arm Kit']
                        };
                        updateComponent('gear', [...gearList, newCat]);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Package</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {gearList.map((g: any, idx: number) => (
                      <div key={idx} className="p-2.5 rounded bg-slate-950/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={g.category}
                            onChange={(e) => {
                              const updated = [...gearList];
                              updated[idx] = { ...g, category: e.target.value };
                              updateComponent('gear', updated);
                            }}
                            className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-amber-400 font-bold uppercase font-mono"
                          />
                          <button
                            onClick={() => {
                              const updated = gearList.filter((_: any, i: number) => i !== idx);
                              updateComponent('gear', updated);
                            }}
                            className="text-slate-500 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-500 block mb-0.5">Gear Items (1 per line)</label>
                          <textarea
                            rows={3}
                            value={Array.isArray(g.items) ? g.items.join('\n') : ''}
                            onChange={(e) => {
                              const lines = e.target.value.split('\n');
                              const updated = [...gearList];
                              updated[idx] = { ...g, items: lines };
                              updateComponent('gear', updated);
                            }}
                            className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-300 font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Commercial Clients Manager */}
            {Array.isArray(components.clients) && (() => {
              const clientList = components.clients;
              return (
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-2">
                  <span className="font-semibold text-slate-200 block">Commercial Client Brands</span>
                  <p className="text-[10px] text-slate-400">Comma-separated client list (e.g. NIKE, RED BULL, VOGUE)</p>
                  <input
                    type="text"
                    value={clientList.join(', ')}
                    onChange={(e) => {
                      const split = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                      updateComponent('clients', split);
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-amber-300 font-mono uppercase"
                  />
                </div>
              );
            })()}

            {/* Projects List Manager */}
            {Array.isArray(components.projects) && (() => {
              const projectsList = components.projects;
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Projects ({projectsList.length})</span>
                    <button
                      onClick={() => {
                        const newProj = {
                          id: `proj_${Date.now()}`,
                          title: 'New Featured Project',
                          description: 'Architectural overview of this system, features, and performance metrics.',
                          tag: 'Full-Stack',
                          link: 'https://github.com',
                          year: '2026'
                        };
                        updateComponent('projects', [...projectsList, newProj]);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Item</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {projectsList.map((proj: any, idx: number) => (
                      <div key={proj.id || idx} className="p-2.5 rounded bg-slate-950/60 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-slate-400">#{idx + 1}</span>
                          <button
                            onClick={() => {
                              const updated = projectsList.filter((_: any, i: number) => i !== idx);
                              updateComponent('projects', updated);
                            }}
                            className="text-slate-500 hover:text-rose-400 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx] = { ...proj, title: e.target.value };
                            updateComponent('projects', updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Tag / Category"
                          value={proj.tag}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx] = { ...proj, tag: e.target.value };
                            updateComponent('projects', updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-slate-300"
                        />
                        <textarea
                          rows={2}
                          placeholder="Project Description"
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...projectsList];
                            updated[idx] = { ...proj, description: e.target.value };
                            updateComponent('projects', updated);
                          }}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 text-xs text-slate-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Skills Manager */}
            {Array.isArray(components.skills) && (() => {
              const skillsList = components.skills;
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">Skills ({skillsList.length})</span>
                    <button
                      onClick={() => {
                        const newSkill = { name: 'GraphQL / Apollo', category: 'Backend', level: 85 };
                        updateComponent('skills', [...skillsList, newSkill]);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Skill</span>
                    </button>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {skillsList.map((skill: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 p-1.5 bg-slate-950/60 rounded border border-slate-800">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const updated = [...skillsList];
                            updated[idx] = { ...skill, name: e.target.value };
                            updateComponent('skills', updated);
                          }}
                          className="flex-1 bg-slate-900 border border-slate-800 rounded px-2 py-1 text-xs text-white"
                        />
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={skill.level || 80}
                          onChange={(e) => {
                            const updated = [...skillsList];
                            updated[idx] = { ...skill, level: parseInt(e.target.value) || 50 };
                            updateComponent('skills', updated);
                          }}
                          className="w-14 bg-slate-900 border border-slate-800 rounded px-1.5 py-1 text-xs text-center text-slate-300 font-mono"
                        />
                        <button
                          onClick={() => {
                            const updated = skillsList.filter((_: any, i: number) => i !== idx);
                            updateComponent('skills', updated);
                          }}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Contact Email & Location */}
            {selectedSection.type === 'Contact' && (
              <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 space-y-3">
                <span className="font-semibold text-slate-200 block">Contact Info</span>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={components.contactEmail || ''}
                    onChange={(e) => updateComponent('contactEmail', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Location / Timezone</label>
                  <input
                    type="text"
                    value={components.contactLocation || ''}
                    onChange={(e) => updateComponent('contactLocation', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-xs text-white"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* STYLE TAB (Dynamic Property Panel: Webflow Inspired) */
          <div className="space-y-6">
            <div className="p-2.5 rounded-lg bg-indigo-950/30 border border-indigo-500/20 text-[11px] text-indigo-300 flex items-center justify-between">
              <span>Styling: <strong className="text-white">{styleTargetKey}</strong></span>
              <span className="text-[10px] text-slate-400">Real-time sync</span>
            </div>

            {/* Typography Controls */}
            <div className="space-y-3">
              <label className="block text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                Typography
              </label>

              {/* Font Size */}
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span>Font Size</span>
                  <span className="font-mono text-slate-200">
                    {currentTargetComponent?.styles?.fontSize || '24px'}
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={parseInt(currentTargetComponent?.styles?.fontSize || '24')}
                  onChange={(e) => {
                    updateComponentStyle(styleTargetKey, 'fontSize', `${e.target.value}px`);
                  }}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              {/* Font Weight */}
              <div>
                <label className="text-slate-400 block mb-1">Font Weight</label>
                <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded border border-slate-800">
                  {['400', '500', '600', '700'].map((weight) => (
                    <button
                      key={weight}
                      onClick={() => updateComponentStyle(styleTargetKey, 'fontWeight', weight)}
                      className={`py-1 text-center rounded transition-all cursor-pointer ${
                        currentTargetComponent?.styles?.fontWeight === weight
                          ? 'bg-indigo-600 text-white font-bold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {weight}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Align */}
              <div>
                <label className="text-slate-400 block mb-1">Alignment</label>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-950 rounded border border-slate-800">
                  {[
                    { val: 'left', icon: AlignLeft },
                    { val: 'center', icon: AlignCenter },
                    { val: 'right', icon: AlignRight }
                  ].map(({ val, icon: Icon }) => (
                    <button
                      key={val}
                      onClick={() => updateComponentStyle(styleTargetKey, 'textAlign', val)}
                      className={`py-1 flex items-center justify-center rounded transition-all cursor-pointer ${
                        (currentTargetComponent?.styles?.textAlign || 'left') === val
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Color */}
              <div>
                <label className="text-slate-400 block mb-1">Text Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTargetComponent?.styles?.color || '#f8fafc'}
                    onChange={(e) => updateComponentStyle(styleTargetKey, 'color', e.target.value)}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={currentTargetComponent?.styles?.color || '#f8fafc'}
                    onChange={(e) => updateComponentStyle(styleTargetKey, 'color', e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>

            {/* Interactive Box Model (Padding & Margin Visual Tool) */}
            <div className="space-y-3 pt-3 border-t border-slate-800">
              <label className="block text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                Interactive Box Model
              </label>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
                <span className="text-[10px] font-mono text-amber-500 mb-1">MARGIN</span>
                <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 flex flex-col items-center">
                  <span className="text-[10px] font-mono text-indigo-400 mb-1">PADDING</span>
                  <div className="w-full bg-indigo-500/10 border border-indigo-500/30 rounded p-2 flex items-center justify-between text-[11px] font-mono text-slate-300">
                    <span>Y: {selectedSection.paddingY || 'py-20'}</span>
                    <button
                      onClick={() => {
                        const paddings = ['py-12', 'py-16', 'py-20', 'py-28'];
                        const curIdx = paddings.indexOf(selectedSection.paddingY || 'py-20');
                        const next = paddings[(curIdx + 1) % paddings.length];
                        onUpdateSection(selectedSection.id, {
                          ...selectedSection,
                          paddingY: next
                        });
                      }}
                      className="px-2 py-0.5 rounded bg-indigo-600/40 text-indigo-200 hover:bg-indigo-600 transition-colors cursor-pointer"
                    >
                      Cycle
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Component Background & Radius (e.g. for Button or Badge) */}
            {(styleTargetKey === 'ctaButton' || styleTargetKey === 'secondaryButton' || styleTargetKey === 'badge') && (
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <label className="block text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                  Fill & Border Radius
                </label>

                <div>
                  <label className="text-slate-400 block mb-1">Background Fill</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={currentTargetComponent?.styles?.backgroundColor || '#10b981'}
                      onChange={(e) => updateComponentStyle(styleTargetKey, 'backgroundColor', e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={currentTargetComponent?.styles?.backgroundColor || '#10b981'}
                      onChange={(e) => updateComponentStyle(styleTargetKey, 'backgroundColor', e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 font-mono text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Border Radius</label>
                  <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950 rounded border border-slate-800 text-[11px]">
                    {['0px', '6px', '12px', '9999px'].map((rad) => (
                      <button
                        key={rad}
                        onClick={() => updateComponentStyle(styleTargetKey, 'borderRadius', rad)}
                        className={`py-1 rounded text-center cursor-pointer transition-colors ${
                          currentTargetComponent?.styles?.borderRadius === rad
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {rad === '9999px' ? 'Pill' : rad}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/50 flex items-center justify-between text-[11px] text-slate-500">
        <span>Webflow-style Inspector</span>
        <span className="font-mono text-indigo-400">JSON Node Sync</span>
      </div>
    </aside>
  );
};
