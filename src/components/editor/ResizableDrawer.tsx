import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
    side: 'left' | 'right';
    open: boolean;
    width: number;
    onWidthChange: (w: number) => void;
    onToggle: () => void;
    overlay?: boolean; // choto screen-e canvas-er upor float korbe
    min?: number;
    max?: number;
    children: React.ReactNode;
}

export const ResizableDrawer: React.FC<Props> = ({
    side,
    open,
    width,
    onWidthChange,
    onToggle,
    overlay = false,
    min = 240,
    max = 520,
    children,
}) => {
    const startRef = useRef({ x: 0, w: 0 });
    const isLeft = side === 'left';

    const onPointerDown = (e: React.PointerEvent) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        startRef.current = { x: e.clientX, w: width };
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!(e.target as HTMLElement).hasPointerCapture(e.pointerId)) return;
        const dx = e.clientX - startRef.current.x;
        const next = isLeft ? startRef.current.w + dx : startRef.current.w - dx;
        onWidthChange(Math.min(max, Math.max(min, next)));
    };

    const OpenIcon = isLeft ? ChevronLeft : ChevronRight;
    const ClosedIcon = isLeft ? ChevronRight : ChevronLeft;
    const Icon = open ? OpenIcon : ClosedIcon;

    return (
        <>
            {/* overlay mode-e bahire click korle bondho */}
            {overlay && open && (
                <div className="absolute inset-0 z-20 bg-black/40" onClick={onToggle} />
            )}

            <div
                className={[
                    'relative h-full shrink-0 bg-slate-900 border-slate-800',
                    isLeft ? 'border-r' : 'border-l',
                    overlay
                        ? `absolute inset-y-0 z-30 shadow-2xl ${isLeft ? 'left-0' : 'right-0'}`
                        : '',
                ].join(' ')}
                style={{
                    width: open ? width : 0,
                    overflow: 'hidden',
                    transition: 'width 200ms ease',
                }}
            >
                {open && (
                    <div className="h-full" style={{ width }}>
                        {children}
                    </div>
                )}

                {/* drag handle */}
                {open && (
                    <div
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        className={`absolute top-0 z-10 h-full w-1.5 cursor-col-resize hover:bg-indigo-500/60 ${isLeft ? 'right-0' : 'left-0'
                            }`}
                    />
                )}
            </div>

            {/* toggle button: shob shomoy dekha jabe */}
            <button
                onClick={onToggle}
                title={open ? 'Collapse panel' : 'Expand panel'}
                className="absolute top-1/2 z-40 -translate-y-1/2 rounded-md border border-slate-700 bg-slate-900 p-1 text-slate-300 hover:bg-slate-800"
                style={
                    isLeft
                        ? { left: open && !overlay ? width - 12 : 0 }
                        : { right: open && !overlay ? width - 12 : 0 }
                }
            >
                <Icon size={14} />
            </button>
        </>
    );
};