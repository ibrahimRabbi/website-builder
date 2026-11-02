import React, { useState } from 'react';
import { PortfolioSchema } from '../../types/portfolio';
import { X, Check, Copy, ExternalLink, Download, Globe, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PublishModalProps {
  isOpen: boolean;
  schema: PortfolioSchema;
  onClose: () => void;
  onOpenLivePreview: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  schema,
  onClose,
  onOpenLivePreview
}) => {
  const [slug, setSlug] = useState('ibrahim-rabbi');
  const [isPublished, setIsPublished] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const publicUrl = `https://foliocraft.dev/p/${slug}`;

  const handlePublish = () => {
    setIsPublished(true);
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore if canvas-confetti environment issue
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(schema, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${slug}-portfolio-schema.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                {isPublished ? 'Portfolio Published!' : 'Publish Portfolio'}
              </h2>
              <p className="text-xs text-slate-400">
                {isPublished ? 'Your portfolio is live and shareable worldwide.' : 'Deploy your portfolio to a custom URL or download schema.'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Custom Slug Config */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Portfolio Domain & Slug
            </label>
            <div className="flex items-center rounded-lg border border-slate-700 bg-slate-950 overflow-hidden text-xs">
              <span className="px-3 py-2 text-slate-500 bg-slate-900/80 border-r border-slate-800 font-mono select-none">
                foliocraft.dev/p/
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
                  setIsPublished(false);
                }}
                className="flex-1 px-3 py-2 bg-transparent text-white font-mono focus:outline-none"
                placeholder="your-name"
              />
            </div>
          </div>

          {/* Action state */}
          {!isPublished ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Sections to publish:</span>
                  <span className="font-mono text-white">{schema.sections.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Theme:</span>
                  <span className="font-mono text-indigo-400">{schema.themeId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Author:</span>
                  <span className="text-white">{schema.authorName}</span>
                </div>
              </div>

              <button
                onClick={handlePublish}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold text-xs tracking-wide shadow-lg shadow-emerald-600/20 transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm & Publish Live</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-in zoom-in-95 duration-200">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <Check className="w-4 h-4" />
                  <span>Successfully Deployed & Verified</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-300">
                  <span className="truncate pr-2">{publicUrl}</span>
                  <button
                    onClick={handleCopyLink}
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenLivePreview();
                  }}
                  className="py-2.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Live Sandbox</span>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Schema</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
