import React from 'react';
import { PortfolioSection, ProjectItem } from '../../types/portfolio';
import { ExternalLink, FolderGit2 } from 'lucide-react';

interface ProjectsSectionProps {
  section: PortfolioSection;
  accentColor: string;
  fontFamily: string;
  onSelectComponent?: (componentKey: string) => void;
  selectedComponentKey?: string | null;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  section,
  accentColor,
  fontFamily,
  onSelectComponent,
  selectedComponentKey
}) => {
  const { components } = section;
  const { title, subtitle, projects = [] } = components;

  const isSelected = (key: string) => selectedComponentKey === key;

  return (
    <div 
      className="relative px-6 md:px-12 py-20 transition-colors border-t border-white/5"
      style={{ 
        backgroundColor: section.backgroundColor || '#090d16',
        fontFamily 
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <div>
          {title && (
            <h2
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('title');
              }}
              className={`cursor-pointer tracking-tight transition-all rounded px-1 -mx-1 inline-block ${
                isSelected('title') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-white/5'
              }`}
              style={{
                fontSize: title.styles?.fontSize || '32px',
                color: title.styles?.color || '#f8fafc',
                fontWeight: title.styles?.fontWeight || '700',
                textAlign: title.styles?.textAlign || 'left'
              }}
            >
              {title.text}
            </h2>
          )}

          {subtitle && (
            <p
              onClick={(e) => {
                e.stopPropagation();
                onSelectComponent?.('subtitle');
              }}
              className={`cursor-pointer mt-1 transition-all rounded px-1 -mx-1 ${
                isSelected('subtitle') ? 'ring-2 ring-indigo-500 bg-indigo-500/10' : 'hover:bg-white/5'
              }`}
              style={{
                fontSize: subtitle.styles?.fontSize || '16px',
                color: subtitle.styles?.color || '#94a3b8',
                textAlign: subtitle.styles?.textAlign || 'left'
              }}
            >
              {subtitle.text}
            </p>
          )}
        </div>

        {/* Projects Grid */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            onSelectComponent?.('projects');
          }}
          className={`grid grid-cols-1 md:grid-cols-2 gap-5 cursor-pointer rounded-xl p-1 transition-all ${
            isSelected('projects') ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900' : ''
          }`}
        >
          {projects.map((project: ProjectItem) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all hover:bg-white/[0.05]"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-medium text-slate-300">{project.tag}</span>
                  {project.year && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between gap-2">
                  <span>{project.title}</span>
                  <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />
                </h3>

                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.imageUrl && (
                <div className="mt-4 pt-2">
                  <div className="relative h-32 rounded-lg overflow-hidden bg-slate-900 border border-white/5">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Production Ready</span>
                </span>
                <span 
                  className="text-xs font-medium"
                  style={{ color: accentColor }}
                >
                  View Repository →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
