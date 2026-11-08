export function fluid(value?: string, min = 0.55) {
    if (!value || !value.endsWith('px')) return value;
    const px = parseFloat(value);
    if (px <= 18) return value;
    return `clamp(${Math.max(18, Math.round(px * min))}px, ${(px / 12.8).toFixed(2)}vw, ${px}px)`;
}

// iframe-er bhitore "#id" link-e scroll
export function goTo(e: React.MouseEvent, link?: string) {
    if (!link || !link.startsWith('#')) return;
    const doc = (e.currentTarget as HTMLElement).ownerDocument;
    doc.getElementById(link.slice(1))?.scrollIntoView({ behavior: 'smooth' });
}