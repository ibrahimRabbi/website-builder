import React, { useState } from 'react';
import { ThemeMetadata } from '../../types/portfolio';
import { DUMMY_THEMES } from '../../data/dummyThemes';
import { X, Check, Eye, ShoppingCart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  activeThemeId: string;
  onClose: () => void;
  onSelectTheme: (theme: ThemeMetadata) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  activeThemeId,
  onClose,
  onSelectTheme
}) => {
  const [previewTheme, setPreviewTheme] = useState<ThemeMetadata | null>(null);
  const [simulatedCheckoutTheme, setSimulatedCheckoutTheme] = useState<ThemeMetadata | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'initial' | 'processing' | 'verified'>('initial');

  if (!isOpen) return null;

  const handleCheckoutSimulate = (theme: ThemeMetadata) => {
    setSimulatedCheckoutTheme(theme);
    setCheckoutStep('processing');
    setTimeout(() => {
      setCheckoutStep('verified');
      setTimeout(() => {
        onSelectTheme(theme);
        setSimulatedCheckoutTheme(null);
        setCheckoutStep('initial');
        onClose();
      }, 1200);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-xl font-bold text-white tracking-tight">
                Theme Catalog & Professional Templates
              </h2>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20">
                New: Kai Rosas Videographer Theme
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Select any pre-architected theme to jumpstart your portfolio. Customize every film, project, camera spec, and typography style.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DUMMY_THEMES.map((theme) => {
            const isCurrent = theme.id === activeThemeId;

            return (
              <div
                key={theme.id}
                className={`group relative rounded-xl border flex flex-col justify-between overflow-hidden transition-all duration-200 ${
                  isCurrent 
                    ? 'border-indigo-500 bg-indigo-950/20 shadow-lg shadow-indigo-500/10' 
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                {/* Visual Thumbnail */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={theme.thumbnailUrl}
                    alt={theme.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span 
                      className="px-2.5 py-1 rounded text-[11px] font-semibold text-white shadow-sm"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {theme.badge}
                    </span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded border border-slate-700 text-xs font-mono text-white">
                    {theme.price === 0 ? 'Free / Included' : `$${theme.price}`}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors">
                      {theme.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
                    <button
                      onClick={() => setPreviewTheme(theme)}
                      className="flex-1 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <button
                      onClick={() => {
                        if (theme.price === 0) {
                          onSelectTheme(theme);
                          onClose();
                        } else {
                          handleCheckoutSimulate(theme);
                        }
                      }}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-600 text-white'
                          : theme.id === 'theme_kai_rosas'
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-sm'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm'
                      }`}
                    >
                      {isCurrent ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Active</span>
                        </>
                      ) : theme.price === 0 ? (
                        <>
                          <span>Use Theme</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Unlock ($0)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Theme schemas adhere to JSON Schema Spec §3</span>
          </div>
          <span className="font-mono text-slate-500">Auto-saved to in-memory workspace</span>
        </div>
      </div>

      {/* Simulated Checkout Modal */}
      {simulatedCheckoutTheme && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 text-center space-y-4">
            {checkoutStep === 'processing' ? (
              <>
                <div className="w-12 h-12 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mx-auto" />
                <h3 className="text-lg font-bold text-white">Verifying Simulated Gateway Session</h3>
                <p className="text-xs text-slate-400 font-mono">
                  GET /api/v1/payments/verify-status?transactionId=tx_sim_{Date.now()}
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Theme Access Provisioned!</h3>
                <p className="text-xs text-slate-300">
                  Unlocked {simulatedCheckoutTheme.title}. Loading your interactive visual builder...
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Preview Sandbox Modal */}
      {previewTheme && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">{previewTheme.title} — Sandbox Preview</h3>
                <p className="text-xs text-slate-400">{previewTheme.description}</p>
              </div>
              <button
                onClick={() => setPreviewTheme(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 bg-slate-950">
              <div className="p-6 rounded-xl border border-slate-800 bg-[#090d16] text-center space-y-4">
                <span className="text-xs font-mono text-indigo-400">Previewing Initial Schema</span>
                <h2 className="text-2xl font-bold text-white">
                  {previewTheme.initialSchema.title}
                </h2>
                <p className="text-sm text-slate-400 max-w-lg mx-auto">
                  {previewTheme.initialSchema.sections[0]?.components.subtitle?.text || ''}
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      onSelectTheme(previewTheme);
                      setPreviewTheme(null);
                      onClose();
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg"
                  >
                    Select & Load into Editor
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
