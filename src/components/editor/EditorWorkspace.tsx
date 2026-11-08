import React, { useState, useEffect, useRef } from 'react';
import {
  PortfolioSchema,
  PortfolioSection,
  ThemeMetadata,
  ViewportMode,
  ViewMode
} from '../../types/portfolio';
import { DUMMY_THEMES } from '../../data/dummyThemes';
import { EditorTopBar } from './EditorTopBar';
import { CanvasArea } from './CanvasArea';
import { RightInspector } from './RightInspector';
import { CodeEditorPanel } from './CodeEditorPanel';
import { ResizableDrawer } from './ResizableDrawer';
import { ThemeModal } from '../themes/ThemeModal';
import { PublishModal } from './PublishModal';
import { LivePreviewModal } from './LivePreviewModal';

interface EditorWorkspaceProps {
  initialTheme?: ThemeMetadata;
  onBackToLanding: () => void;
}

// Screen size track korar hook
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [query]);
  return matches;
};

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

  // Right drawer state (resizable + collapsible)
  const isSmall = useMediaQuery('(max-width: 1279px)');
  const [rightOpen, setRightOpen] = useState(true);
  const [rightWidth, setRightWidth] = useState(340);

  useEffect(() => {
    setRightOpen(!isSmall);
  }, [isSmall]);

  // Debounced auto-save status
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving'>('saved');
  const autoSaveTimerRef = useRef<any>(null);

  // Commit schema change to history & trigger auto-save
  const updateSchemaWithHistory = (newSchema: PortfolioSchema) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newSchema);
    if (updatedHistory.length > 30) updatedHistory.shift();

    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
    setSchema(newSchema);

    setAutoSaveStatus('saving');
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(() => {
      setAutoSaveStatus('saved');
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

  // Section operations
  const handleUpdateSection = (sectionId: string, updatedSection: PortfolioSection) => {
    updateSchemaWithHistory({
      ...schema,
      sections: schema.sections.map((s) => (s.id === sectionId ? updatedSection : s))
    });
  };

  const handleUpdateGlobal = (key: keyof PortfolioSchema, value: any) => {
    updateSchemaWithHistory({ ...schema, [key]: value });
  };

  const handleReorderSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= schema.sections.length) return;

    const updatedSections = [...schema.sections];
    [updatedSections[index], updatedSections[targetIndex]] = [
      updatedSections[targetIndex],
      updatedSections[index]
    ];
    updateSchemaWithHistory({ ...schema, sections: updatedSections });
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
    updateSchemaWithHistory({ ...schema, sections: updatedSections });
    setSelectedSectionId(duplicated.id);
  };

  const handleDeleteSection = (index: number) => {
    if (schema.sections.length <= 1) return;
    const toDeleteId = schema.sections[index]?.id;
    const updatedSections = schema.sections.filter((_, i) => i !== index);
    updateSchemaWithHistory({ ...schema, sections: updatedSections });

    if (selectedSectionId === toDeleteId) {
      setSelectedSectionId(updatedSections[0]?.id || null);
      setSelectedComponentKey(null);
    }
  };

  // Canvas-er "Add Section" button: oi section-er copy toiri kore
  const handleAddSectionBelow = (idx: number) => handleDuplicateSection(idx);

  // Canvas theke section select
  const handleSelectSection = (id: string) => {
    setSelectedSectionId(id);
  };

  const canvasProps = {
    schema,
    viewport,
    selectedSectionId,
    selectedComponentKey,
    onSelectSection: handleSelectSection,
    onSelectComponent: setSelectedComponentKey,
    onReorderSection: handleReorderSection,
    onDuplicateSection: handleDuplicateSection,
    onDeleteSection: handleDeleteSection,
    onAddSectionBelow: handleAddSectionBelow
  };

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-slate-950 text-slate-100 font-sans">
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
      <div className="flex-1 min-h-0 flex overflow-hidden relative">
        {/* Center: Visual Canvas / Split / Code */}
        <div className="flex-1 min-w-0 min-h-0 flex overflow-hidden relative">
          {viewMode === 'visual' && <CanvasArea {...canvasProps} />}

          {viewMode === 'split' && (
            <div className="flex-1 min-w-0 flex overflow-hidden">
              <div className="w-1/2 min-w-0 flex flex-col border-r border-slate-800 overflow-hidden">
                <CanvasArea {...canvasProps} />
              </div>
              <div className="w-1/2 min-w-0 flex flex-col overflow-hidden">
                <CodeEditorPanel
                  schema={schema}
                  onApplySchema={updateSchemaWithHistory}
                  onResetSchema={() => handleSelectTheme(currentTheme)}
                />
              </div>
            </div>
          )}

          {viewMode === 'code' && (
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
              <CodeEditorPanel
                schema={schema}
                onApplySchema={updateSchemaWithHistory}
                onResetSchema={() => handleSelectTheme(currentTheme)}
              />
            </div>
          )}
        </div>

        {/* Right Inspector: selected section-er content edit */}
        {viewMode === 'visual' && (
          <ResizableDrawer
            side="right"
            open={rightOpen}
            width={rightWidth}
            onWidthChange={setRightWidth}
            onToggle={() => setRightOpen((o) => !o)}
            overlay={isSmall}
          >
            <RightInspector
              key={selectedSectionId ?? 'none'}
              schema={schema}
              selectedSectionId={selectedSectionId}
              selectedComponentKey={selectedComponentKey}
              onUpdateSection={handleUpdateSection}
              onUpdateGlobal={handleUpdateGlobal}
              onSelectComponent={setSelectedComponentKey}
            />
          </ResizableDrawer>
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