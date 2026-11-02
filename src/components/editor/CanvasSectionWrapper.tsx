import React, { useState } from 'react';
import { PortfolioSection } from '../../types/portfolio';
import { ChevronUp, ChevronDown, Copy, Trash2, Plus, Move } from 'lucide-react';

interface CanvasSectionWrapperProps {
  section: PortfolioSection;
  index: number;
  totalSections: number;
  isSelected: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onAddBelow: () => void;
  children: React.ReactNode;
}

export const CanvasSectionWrapper: React.FC<CanvasSectionWrapperProps> = ({
  section,
  index,
  totalSections,
  isSelected,
  onSelect,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onAddBelow,
  children
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      className={`relative group transition-all duration-150 ${
        isSelected
          ? 'outline-2 outline-indigo-500 shadow-xl shadow-indigo-500/10 z-10'
          : isHovered
          ? 'outline-1 outline-dashed outline-indigo-400/50'
          : 'outline-transparent'
      }`}
    >
      {/* Floating Toolbar on Hover / Selection */}
      {(isSelected || isHovered) && (
        <div 
          className="absolute -top-3.5 left-4 z-30 flex items-center gap-1 bg-slate-900 border border-slate-700/80 rounded-md px-2 py-0.5 shadow-lg text-xs font-mono text-slate-300"
          onClick={(e) => e.stopPropagation()}
        >
          <span className="flex items-center gap-1.5 font-sans font-medium text-indigo-400 pr-1 border-r border-slate-700">
            <Move className="w-3 h-3 text-slate-500" />
            {section.title || section.type}
          </span>

          <button
            title="Move Up"
            disabled={index === 0}
            onClick={onMoveUp}
            className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronUp className="w-3 h-3" />
          </button>

          <button
            title="Move Down"
            disabled={index === totalSections - 1}
            onClick={onMoveDown}
            className="p-1 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronDown className="w-3 h-3" />
          </button>

          <button
            title="Duplicate Section"
            onClick={onDuplicate}
            className="p-1 hover:text-white transition-colors"
          >
            <Copy className="w-3 h-3" />
          </button>

          <button
            title="Delete Section"
            onClick={onDelete}
            className="p-1 hover:text-rose-400 text-rose-500/70 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Render the inner section */}
      {children}

      {/* Add Below Quick Trigger */}
      {(isSelected || isHovered) && (
        <div 
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onAddBelow}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-600/30 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add Section</span>
          </button>
        </div>
      )}
    </div>
  );
};
