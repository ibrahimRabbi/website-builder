import React from 'react';
import { ViewportMode, ViewMode } from '../../types/portfolio';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Undo2, 
  Redo2, 
  Code2, 
  Eye, 
  Share2, 
  Sparkles,
  LayoutGrid,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

interface EditorTopBarProps {
  portfolioTitle: string;
  themeTitle: string;
  viewport: ViewportMode;
  viewMode: ViewMode;
  canUndo: boolean;
  canRedo: boolean;
  autoSaveStatus: 'saved' | 'saving';
  onSetViewport: (v: ViewportMode) => void;
  onSetViewMode: (m: ViewMode) => void;
  onUndo: () => void;
  onRedo: () => void;
  onOpenThemeModal: () => void;
  onOpenPublishModal: () => void;
  onBackToLanding: () => void;
}

export const EditorTopBar: React.FC<EditorTopBarProps> = ({
  portfolioTitle,
  themeTitle,
  viewport,
  viewMode,
  canUndo,
  canRedo,
  autoSaveStatus,
  onSetViewport,
  onSetViewMode,
  onUndo,
  onRedo,
  onOpenThemeModal,
  onOpenPublishModal,
  onBackToLanding
}) => {
  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-4 select-none shrink-0 z-20">
      {/* Zone 1: Brand & Project Context */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onBackToLanding}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
          title="Return to Landing"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <span className="font-bold text-sm tracking-tight text-white whitespace-nowrap">
            FolioCraft
          </span>
          <span className="text-slate-600">/</span>
          <button
            onClick={onOpenThemeModal}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 px-2 py-1 rounded transition-colors cursor-pointer border border-slate-700/70"
            title="Switch Theme"
          >
            <span className="truncate max-w-[140px]">{themeTitle}</span>
            <span className="text-[10px] text-indigo-400 font-mono">Theme</span>
          </button>
        </div>
      </div>

      {/* Zone 2: Workspace Viewport & View Mode Controls */}
      <div className="hidden md:flex items-center gap-2">
        {/* Device Viewport Toggles */}
        <div className="flex items-center p-1 bg-slate-950/80 rounded-lg border border-slate-800">
          <button
            onClick={() => onSetViewport('desktop')}
            title="Desktop Viewport (1200px)"
            className={`p-1.5 rounded transition-all cursor-pointer ${
              viewport === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSetViewport('tablet')}
            title="Tablet Viewport (768px)"
            className={`p-1.5 rounded transition-all cursor-pointer ${
              viewport === 'tablet' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onSetViewport('mobile')}
            title="Mobile Viewport (390px)"
            className={`p-1.5 rounded transition-all cursor-pointer ${
              viewport === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center p-1 bg-slate-950/80 rounded-lg border border-slate-800">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
            className="p-1.5 text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* View Mode: Visual vs Split vs Code */}
        <div className="flex items-center p-1 bg-slate-950/80 rounded-lg border border-slate-800 text-xs">
          <button
            onClick={() => onSetViewMode('visual')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'visual' ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Canvas</span>
          </button>
          <button
            onClick={() => onSetViewMode('split')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'split' ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Split Code</span>
          </button>
          <button
            onClick={() => onSetViewMode('code')}
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 cursor-pointer ${
              viewMode === 'code' ? 'bg-indigo-600 text-white font-medium shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="font-mono text-xs">{'{}'}</span>
            <span>Schema</span>
          </button>
        </div>
      </div>

      {/* Zone 3: Status & Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Debounced Auto-save indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
          {autoSaveStatus === 'saving' ? (
            <span className="flex items-center gap-1 text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              <span>Auto-saving...</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Saved</span>
            </span>
          )}
        </div>

        {/* Live Preview Button */}
        <button
          onClick={() => onSetViewMode('preview')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-lg transition-colors border border-slate-700/80 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Preview</span>
        </button>

        {/* Publish Button */}
        <button
          onClick={onOpenPublishModal}
          className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Publish</span>
        </button>
      </div>
    </header>
  );
};
