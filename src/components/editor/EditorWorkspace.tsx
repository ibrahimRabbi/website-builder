import React, { useState, useEffect, useRef } from 'react';
import { 
  PortfolioSchema, 
  PortfolioSection, 
  SectionType, 
  ThemeMetadata, 
  ViewportMode, 
  ViewMode 
} from '../../types/portfolio';
import { DUMMY_THEMES } from '../../data/dummyThemes';
import { EditorTopBar } from './EditorTopBar';
import { LeftSidebar } from './LeftSidebar';
import { CanvasArea } from './CanvasArea';
import { RightInspector } from './RightInspector';
import { CodeEditorPanel } from './CodeEditorPanel';
import { ThemeModal } from '../themes/ThemeModal';
import { PublishModal } from './PublishModal';
import { LivePreviewModal } from './LivePreviewModal';

interface EditorWorkspaceProps {
  initialTheme?: ThemeMetadata;
  onBackToLanding: () => void;
}

export const EditorWorkspace: React.FC<EditorWorkspaceProps> = ({
  initialTheme = DUMMY_THEMES[0],
  onBackToLanding
}) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMetadata>(initialTheme);
  const [schema, setSchema] = useState<PortfolioSchema>(initialTheme.initialSchema);
  
  // Undo / Redo history
  const [history, setHistory] = useState<PortfolioSchema[]>([initialTheme.initialSchema]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Selection state
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(
    initialTheme.initialSchema.sections[0]?.id || null
  );
  const [selectedComponentKey, setSelectedComponentKey] = useState<string | null>(null);

  // View state
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [viewMode, setViewMode] = useState<ViewMode>('visual');

  // Modals state
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Debounced auto-save status (2000ms delay as documented in §6)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving'>('saved');
  const autoSaveTimerRef = useRef<any>(null);

  // Helper to commit schema change to history & trigger auto-save
  const updateSchemaWithHistory = (newSchema: PortfolioSchema) => {
    // Slice forward history if we were in the middle of undo stack
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newSchema);

    // Limit history stack size to 30 states
    if (updatedHistory.length > 30) {
      updatedHistory.shift();
    }

    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setSchema(newSchema);

    // Trigger debounced auto-save indicator (2000ms delay)
    setAutoSaveStatus('saving');
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }
    autoSaveTimerRef.current = setTimeout(() => {
      setAutoSaveStatus('saved');
      // Persist to localStorage for user continuity
      try {
        localStorage.setItem(`foliocraft_schema_${newSchema.themeId}`, JSON.stringify(newSchema));
      } catch (e) {
        // ignore quota limits
      }
    }, 2000);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setSchema(history[prevIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setSchema(history[nextIndex]);
    }
  };

  // Switch to another theme
  const handleSelectTheme = (theme: ThemeMetadata) => {
    setCurrentTheme(theme);
    setSchema(theme.initialSchema);
    setHistory([theme.initialSchema]);
    setHistoryIndex(0);
    setSelectedSectionId(theme.initialSchema.sections[0]?.id || null);
    setSelectedComponentKey(null);
  };

  // Section CRUD operations
  const handleUpdateSection = (sectionId: string, updatedSection: PortfolioSection) => {
    const updatedSections = schema.sections.map(s => s.id === sectionId ? updatedSection : s);
    updateSchemaWithHistory({
      ...schema,
      sections: updatedSections
    });
  };

  const handleUpdateGlobal = (key: keyof PortfolioSchema, value: any) => {
    updateSchemaWithHistory({
      ...schema,
      [key]: value
    });
  };

  const handleAddSection = (type: SectionType, insertAtIndex?: number) => {
    const newId = `${type.toLowerCase()}_${Date.now()}`;
    let newSection: PortfolioSection;

    switch (type) {
      case 'Hero':
        newSection = {
          id: newId,
          type: 'Hero',
          title: 'Hero Section',
          backgroundColor: '#090d16',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Crafting Next-Generation Digital Experiences',
              styles: { fontSize: '44px', color: '#f8fafc', fontWeight: '700', textAlign: 'left' }
            },
            subtitle: {
              text: 'Frontend engineer with passion for interactive UI, micro-animations, and fluid physics.',
              styles: { fontSize: '18px', color: '#94a3b8', textAlign: 'left' }
            },
            ctaButton: {
              label: 'View Case Studies',
              link: '#projects',
              styles: { backgroundColor: schema.accentColor, color: '#090d16', borderRadius: '8px', padding: '12px 24px' }
            }
          }
        };
        break;
      case 'Showreel':
        newSection = {
          id: newId,
          type: 'Showreel',
          title: '2026 Cinematography Reel',
          backgroundColor: '#05070c',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Director & Cinematography Showreel',
              styles: { fontSize: '36px', color: '#ffffff', fontWeight: '700', textAlign: 'left' }
            },
            subtitle: {
              text: 'A curated compilation of narrative films, global commercial campaigns, and music videos.',
              styles: { fontSize: '15px', color: '#94a3b8' }
            },
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
            videoPoster: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1600&q=80',
            cameraSpecs: 'ARRI Alexa Mini LF · Anamorphic 2.39:1 · ProRes 4444 XQ'
          }
        };
        break;
      case 'Films':
        newSection = {
          id: newId,
          type: 'Films',
          title: 'Selected Filmography',
          backgroundColor: '#080a10',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Selected Commercials & Films',
              styles: { fontSize: '36px', color: '#ffffff', fontWeight: '700', textAlign: 'left' }
            },
            subtitle: {
              text: 'Recent directing and cinematography commissions across commercial, narrative, and fashion.',
              styles: { fontSize: '15px', color: '#94a3b8' }
            },
            films: [
              {
                id: `film_${Date.now()}_1`,
                title: 'ECHOES OF TOKYO',
                client: 'SONY PICTURES',
                category: 'NARRATIVE SHORT',
                role: 'Director & Cinematographer',
                year: '2026',
                duration: '04:12',
                posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
                specs: 'ARRI ALEXA Mini LF · Atlas Orion Anamorphic',
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
              },
              {
                id: `film_${Date.now()}_2`,
                title: 'LIMITLESS SPEED',
                client: 'RED BULL MOTORSPORTS',
                category: 'COMMERCIAL',
                role: 'Director of Photography',
                year: '2025',
                duration: '02:30',
                posterUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
                specs: 'RED V-Raptor 8K · Cooke Anamorphic/i',
                videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
              }
            ]
          }
        };
        break;
      case 'ColorLab':
        newSection = {
          id: newId,
          type: 'ColorLab',
          title: 'Color Lab',
          backgroundColor: '#ffffff',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Color Lab & Emulsion Archive',
              styles: { fontSize: '32px', color: '#000000', fontWeight: '800', textAlign: 'left' }
            },
            subtitle: {
              text: 'Interactive Before/After look comparison across monochrome silver halide, Kodak 2383, and ENR bleach bypass.',
              styles: { fontSize: '14px', color: '#64748b' }
            }
          }
        };
        break;
      case 'Gear':
        newSection = {
          id: newId,
          type: 'Gear',
          title: 'Camera Package & Gear',
          backgroundColor: '#05070c',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Production Gear & Cinema Kit',
              styles: { fontSize: '32px', color: '#ffffff', fontWeight: '700', textAlign: 'left' }
            },
            subtitle: {
              text: 'Owned cinema packages ready for worldwide location productions.',
              styles: { fontSize: '14px', color: '#94a3b8' }
            },
            gear: [
              {
                category: 'Camera Bodies',
                items: ['ARRI Alexa Mini LF (Large Format DCI 4K)', 'Sony FX6 Full-Frame Cinema Line', 'RED V-Raptor 8K VV Multi-Format']
              },
              {
                category: 'Glass & Anamorphics',
                items: ['Cooke Anamorphic /i Full Frame Plus (32/50/85mm)', 'Atlas Orion 2x Anamorphic A-Set', 'Leica R Cine-Mod Vintage Primes']
              },
              {
                category: 'Movement & Aerial',
                items: ['DJI Ronin 2 3-Axis Gimbal System', 'DJI Inspire 3 8K ProRes RAW Drone', 'Easyrig Vario 5 with Flowcine Serene']
              }
            ]
          }
        };
        break;
      case 'Rates':
        newSection = {
          id: newId,
          type: 'Rates',
          title: 'Production Rates Estimator',
          backgroundColor: '#ffffff',
          paddingY: 'py-24',
          components: {
            title: {
              text: 'PRODUCTION RATES ESTIMATOR',
              styles: { fontSize: '36px', color: '#000000', fontWeight: '800', textAlign: 'left' }
            },
            subtitle: {
              text: 'Configure your technical scope, optical requirements, and post-production deliverables to generate an immediate estimated investment range.',
              styles: { fontSize: '14px', color: '#64748b' }
            }
          }
        };
        break;
      case 'Clients':
        newSection = {
          id: newId,
          type: 'Clients',
          title: 'Commercial Clients',
          backgroundColor: '#05070c',
          paddingY: 'py-12',
          components: {
            title: {
              text: 'COMMERCIAL CLIENTS & COLLABORATORS',
              styles: { fontSize: '13px', color: '#94a3b8', textAlign: 'center' }
            },
            clients: ['NIKE', 'RED BULL', 'SONY MUSIC', 'VOGUE', 'AUDI', 'APPLE', 'PATAGONIA', 'WARNER BROS']
          }
        };
        break;
      case 'About':
        newSection = {
          id: newId,
          type: 'About',
          title: 'About Section',
          backgroundColor: '#0c111d',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Core Mission & Engineering Standard',
              styles: { fontSize: '32px', color: '#f8fafc', fontWeight: '700', textAlign: 'left' }
            },
            subtitle: {
              text: 'Precision engineering, zero-fluff delivery.',
              styles: { fontSize: '15px', color: schema.accentColor, fontWeight: '600' }
            },
            bio: {
              text: 'Dedicated to building performant web products with strict attention to typography, accessible interaction states, and resilient database backends.',
              styles: { fontSize: '16px', color: '#cbd5e1', lineHeight: '1.7' }
            }
          }
        };
        break;
      case 'Projects':
        newSection = {
          id: newId,
          type: 'Projects',
          title: 'Featured Works',
          backgroundColor: '#090d16',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Selected Systems & Open Source',
              styles: { fontSize: '32px', color: '#f8fafc', fontWeight: '700', textAlign: 'left' }
            },
            subtitle: {
              text: 'Highlights of commercial and experimental applications.',
              styles: { fontSize: '16px', color: '#94a3b8' }
            },
            projects: [
              {
                id: `p_${Date.now()}`,
                title: 'VectorSearch Knowledge Graph',
                description: 'Sub-millisecond hybrid BM25 and dense embedding search engine.',
                tag: 'Search & AI',
                link: 'https://github.com',
                year: '2026'
              }
            ]
          }
        };
        break;
      case 'Skills':
        newSection = {
          id: newId,
          type: 'Skills',
          title: 'Skills Matrix',
          backgroundColor: '#0c111d',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Core Stack & Frameworks',
              styles: { fontSize: '32px', color: '#f8fafc', fontWeight: '700', textAlign: 'left' }
            },
            subtitle: {
              text: 'Technologies I leverage to deliver production software.',
              styles: { fontSize: '16px', color: '#94a3b8' }
            },
            skills: [
              { name: 'TypeScript', category: 'Language', level: 95 },
              { name: 'React 19', category: 'Frontend', level: 90 },
              { name: 'Tailwind CSS', category: 'Styling', level: 95 },
              { name: 'Node.js', category: 'Backend', level: 88 }
            ]
          }
        };
        break;
      case 'Experience':
        newSection = {
          id: newId,
          type: 'Experience',
          title: 'Career Milestones',
          backgroundColor: '#090d16',
          paddingY: 'py-20',
          components: {
            title: {
              text: 'Professional Trajectory',
              styles: { fontSize: '32px', color: '#f8fafc', fontWeight: '700', textAlign: 'left' }
            },
            subtitle: {
              text: 'Roles, teams, and high-impact contributions.',
              styles: { fontSize: '16px', color: '#94a3b8' }
            },
            experience: [
              {
                id: `exp_${Date.now()}`,
                role: 'Senior Frontend Architect',
                company: 'HyperScale Labs',
                period: '2024 — Present',
                description: 'Leading visual canvas development, component design system, and multi-tenant architectures.'
              }
            ]
          }
        };
        break;
      case 'Contact':
      default:
        newSection = {
          id: newId,
          type: 'Contact',
          title: 'Contact',
          backgroundColor: '#090d16',
          paddingY: 'py-24',
          components: {
            title: {
              text: 'Start a Conversation',
              styles: { fontSize: '36px', color: '#f8fafc', fontWeight: '700', textAlign: 'center' }
            },
            subtitle: {
              text: 'Available for technical leadership, contracts, and consultation.',
              styles: { fontSize: '16px', color: '#94a3b8', textAlign: 'center' }
            },
            ctaButton: {
              label: 'Send Email',
              link: 'mailto:contact@example.com',
              styles: { backgroundColor: schema.accentColor, color: '#090d16', borderRadius: '8px' }
            },
            contactEmail: 'contact@example.com',
            contactLocation: 'Worldwide Remote'
          }
        };
        break;
    }

    const updatedSections = [...schema.sections];
    if (typeof insertAtIndex === 'number') {
      updatedSections.splice(insertAtIndex + 1, 0, newSection);
    } else {
      updatedSections.push(newSection);
    }

    updateSchemaWithHistory({
      ...schema,
      sections: updatedSections
    });
    setSelectedSectionId(newId);
  };

  const handleReorderSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= schema.sections.length) return;

    const updatedSections = [...schema.sections];
    const temp = updatedSections[index];
    updatedSections[index] = updatedSections[targetIndex];
    updatedSections[targetIndex] = temp;

    updateSchemaWithHistory({
      ...schema,
      sections: updatedSections
    });
  };

  const handleDuplicateSection = (index: number) => {
    const toDuplicate = schema.sections[index];
    if (!toDuplicate) return;

    const duplicated: PortfolioSection = {
      ...JSON.parse(JSON.stringify(toDuplicate)),
      id: `${toDuplicate.type.toLowerCase()}_${Date.now()}`,
      title: `${toDuplicate.title || toDuplicate.type} (Copy)`
    };

    const updatedSections = [...schema.sections];
    updatedSections.splice(index + 1, 0, duplicated);

    updateSchemaWithHistory({
      ...schema,
      sections: updatedSections
    });
    setSelectedSectionId(duplicated.id);
  };

  const handleDeleteSection = (index: number) => {
    if (schema.sections.length <= 1) return;
    const toDeleteId = schema.sections[index]?.id;
    const updatedSections = schema.sections.filter((_, i) => i !== index);

    updateSchemaWithHistory({
      ...schema,
      sections: updatedSections
    });

    if (selectedSectionId === toDeleteId) {
      setSelectedSectionId(updatedSections[0]?.id || null);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Top Workspace Control Bar */}
      <EditorTopBar
        portfolioTitle={schema.title}
        themeTitle={currentTheme.title}
        viewport={viewport}
        viewMode={viewMode}
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        autoSaveStatus={autoSaveStatus}
        onSetViewport={setViewport}
        onSetViewMode={setViewMode}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
        onOpenPublishModal={() => setIsPublishModalOpen(true)}
        onBackToLanding={onBackToLanding}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Component Toolbox & Layers */}
        {viewMode !== 'preview' && (
          <LeftSidebar
            schema={schema}
            selectedSectionId={selectedSectionId}
            onSelectSection={(id) => {
              setSelectedSectionId(id);
              setSelectedComponentKey(null);
            }}
            onAddSection={(type) => handleAddSection(type)}
            onReorderSection={handleReorderSection}
            onDuplicateSection={handleDuplicateSection}
            onDeleteSection={handleDeleteSection}
            onUpdateGlobal={handleUpdateGlobal}
          />
        )}

        {/* Center Area: Visual Canvas, Split Code, or Pure Code Editor */}
        <div className="flex-1 flex overflow-hidden relative">
          {viewMode === 'visual' && (
            <CanvasArea
              schema={schema}
              viewport={viewport}
              selectedSectionId={selectedSectionId}
              selectedComponentKey={selectedComponentKey}
              onSelectSection={setSelectedSectionId}
              onSelectComponent={setSelectedComponentKey}
              onReorderSection={handleReorderSection}
              onDuplicateSection={handleDuplicateSection}
              onDeleteSection={handleDeleteSection}
              onAddSectionBelow={(idx) => handleAddSection('Hero', idx)}
            />
          )}

          {viewMode === 'split' && (
            <div className="flex-1 flex overflow-hidden">
              <div className="w-1/2 flex flex-col border-r border-slate-800 overflow-hidden">
                <CanvasArea
                  schema={schema}
                  viewport="desktop"
                  selectedSectionId={selectedSectionId}
                  selectedComponentKey={selectedComponentKey}
                  onSelectSection={setSelectedSectionId}
                  onSelectComponent={setSelectedComponentKey}
                  onReorderSection={handleReorderSection}
                  onDuplicateSection={handleDuplicateSection}
                  onDeleteSection={handleDeleteSection}
                  onAddSectionBelow={(idx) => handleAddSection('Hero', idx)}
                />
              </div>
              <div className="w-1/2 flex flex-col overflow-hidden">
                <CodeEditorPanel
                  schema={schema}
                  onApplySchema={updateSchemaWithHistory}
                  onResetSchema={() => handleSelectTheme(currentTheme)}
                />
              </div>
            </div>
          )}

          {viewMode === 'code' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <CodeEditorPanel
                schema={schema}
                onApplySchema={updateSchemaWithHistory}
                onResetSchema={() => handleSelectTheme(currentTheme)}
              />
            </div>
          )}
        </div>

        {/* Right Property Inspector (Style & Content) */}
        {viewMode === 'visual' && (
          <RightInspector
            schema={schema}
            selectedSectionId={selectedSectionId}
            selectedComponentKey={selectedComponentKey}
            onUpdateSection={handleUpdateSection}
            onUpdateGlobal={handleUpdateGlobal}
            onSelectComponent={setSelectedComponentKey}
          />
        )}
      </div>

      {/* Theme Catalog Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        activeThemeId={currentTheme.id}
        onClose={() => setIsThemeModalOpen(false)}
        onSelectTheme={handleSelectTheme}
      />

      {/* Publish Live Deployment Modal */}
      <PublishModal
        isOpen={isPublishModalOpen}
        schema={schema}
        onClose={() => setIsPublishModalOpen(false)}
        onOpenLivePreview={() => setViewMode('preview')}
      />

      {/* Live Sandbox Preview Modal */}
      <LivePreviewModal
        isOpen={viewMode === 'preview'}
        schema={schema}
        onClose={() => setViewMode('visual')}
      />
    </div>
  );
};
