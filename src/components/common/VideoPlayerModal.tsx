import React from 'react';
import { X, Film, Volume2, Maximize2 } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  videoUrl?: string;
  title: string;
  client?: string;
  specs?: string;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  videoUrl,
  title,
  client,
  specs,
  onClose
}) => {
  if (!isOpen) return null;

  // Fallback demo cinematic video if empty
  const activeUrl = videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

  const isYouTube = activeUrl.includes('youtube.com') || activeUrl.includes('youtu.be');
  const isVimeo = activeUrl.includes('vimeo.com');

  const getEmbedUrl = (url: string) => {
    if (isYouTube) {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      const videoId = match ? match[1] : '';
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }
    if (isVimeo) {
      const match = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/);
      const videoId = match ? match[1] : '';
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-400">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">{title}</h3>
                {client && (
                  <>
                    <span className="text-slate-600 text-xs">/</span>
                    <span className="text-xs text-amber-400 font-medium">{client}</span>
                  </>
                )}
              </div>
              {specs && (
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">{specs}</p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen (2.39:1 Cinema Letterbox / 16:9 responsive frame) */}
        <div className="relative bg-black aspect-video flex items-center justify-center overflow-hidden">
          {isYouTube || isVimeo ? (
            <iframe
              src={getEmbedUrl(activeUrl)}
              title={title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              src={activeUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Cinematic Bar / Status */}
        <div className="px-6 py-3 border-t border-slate-900 bg-slate-950 text-xs text-slate-500 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-slate-400">DCI 4K Cinema Presentation</span>
          </div>
          <span>Color Graded in ACES · Mastered in 24.00 fps</span>
        </div>
      </div>
    </div>
  );
};
