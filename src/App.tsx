import React, { useState } from 'react';
import { LandingView } from './components/landing/LandingView';
import { EditorWorkspace } from './components/editor/EditorWorkspace';
import { ThemeModal } from './components/themes/ThemeModal';
import { DUMMY_THEMES } from './data/dummyThemes';
import { ThemeMetadata } from './types/portfolio';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<'landing' | 'editor'>('landing');
  const [selectedTheme, setSelectedTheme] = useState<ThemeMetadata>(DUMMY_THEMES[0]);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const handleEnterEditor = (theme?: ThemeMetadata) => {
    if (theme) {
      setSelectedTheme(theme);
    }
    setCurrentRoute('editor');
  };

  const handleSelectThemeFromModal = (theme: ThemeMetadata) => {
    setSelectedTheme(theme);
    setCurrentRoute('editor');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {currentRoute === 'landing' ? (
        <>
          <LandingView
            onEnterEditor={handleEnterEditor}
            onOpenThemeModal={() => setIsThemeModalOpen(true)}
          />
          <ThemeModal
            isOpen={isThemeModalOpen}
            activeThemeId={selectedTheme.id}
            onClose={() => setIsThemeModalOpen(false)}
            onSelectTheme={handleSelectThemeFromModal}
          />
        </>
      ) : (
        <EditorWorkspace
          initialTheme={selectedTheme}
          onBackToLanding={() => setCurrentRoute('landing')}
        />
      )}
    </div>
  );
}
