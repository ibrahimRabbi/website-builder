// components/editor/IframeCanvas.tsx
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ViewportMode } from '@/src/types/portfolio';

export const VIEWPORT_WIDTH: Record<ViewportMode, number> = {
    desktop: 1280,
    tablet: 768,
    mobile: 390,
};

 

interface Props {
    viewport: ViewportMode;
    scrollTarget?: { id: string; t: number } | null;
    onBackgroundClick?: () => void;
    children: React.ReactNode;
}

export const IframeCanvas: React.FC<Props> = ({ viewport, scrollTarget, onBackgroundClick, children }) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
    const [pane, setPane] = useState({ w: 0, h: 0 });

    // Pane size track (drawer open/close/resize korle auto update)
    useEffect(() => {
        if (!wrapRef.current) return;
        const ro = new ResizeObserver(([e]) =>
            setPane({ w: e.contentRect.width, h: e.contentRect.height })
        );
        ro.observe(wrapRef.current);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        if (!scrollTarget || !mountNode) return;
        mountNode
            .querySelector(`[data-section-id="${scrollTarget.id}"]`)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [scrollTarget, mountNode]);

    const syncStyles = () => {
        const doc = iframeRef.current?.contentDocument;
        if (!doc) return;
        const copy = () => {
            doc.head.querySelectorAll('[data-synced]').forEach((n) => n.remove());
            document
                .querySelectorAll('link[rel="stylesheet"], style')
                .forEach((n) => {
                    const c = n.cloneNode(true) as HTMLElement;
                    c.setAttribute('data-synced', '1');
                    doc.head.appendChild(c);
                });
        };
        copy();
        doc.documentElement.className = document.documentElement.className;
        doc.body.style.margin = '0';
        doc.body.style.background = '#ffffff';
        setMountNode(doc.body);

        const mo = new MutationObserver(copy);
        mo.observe(document.head, { childList: true, subtree: true, characterData: true });
    };

   
    const PAD = 48;
    const availH = Math.max(300, pane.h - PAD);
    const width = VIEWPORT_WIDTH[viewport];
    const scale = pane.w ? Math.min(1, pane.w / width) : 1;
    const frameW = width * scale;
    const iframeH = pane.h ? pane.h / scale : 800;
    const isDesktop = viewport === 'desktop';
    const radius = isDesktop ? 0 : viewport === 'tablet' ? 18 : 28;
   

    return (
        <div
            ref={wrapRef}
            className={`flex-1 min-w-0 min-h-0 overflow-hidden ${isDesktop ? '' : 'canvas-grid'}`}
            onClick={onBackgroundClick}
        >
            <div
                className="mx-auto transition-all duration-300"
                style={{ width: frameW, height: pane.h || '100%' }}
            >
                <iframe
                    ref={iframeRef}
                    title="canvas"
                    srcDoc="<!doctype html><html><head><meta name='viewport' content='width=device-width,initial-scale=1'></head><body></body></html>"
                    onLoad={syncStyles}
                    style={{
                        width,
                        height: iframeH,
                        border: 0,
                        display: 'block',
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        borderRadius: radius,
                        boxShadow: isDesktop ? 'none' : '0 20px 60px rgba(0,0,0,.55)',
                    }}
                />
            </div>

            {mountNode &&
                createPortal(
                    <div onClick={onBackgroundClick} style={{ minHeight: '100vh' }}>
                        {children}
                    </div>,
                    mountNode
                )}
        </div>
    );
};