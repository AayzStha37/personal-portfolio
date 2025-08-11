import React, { useMemo, useRef } from 'react';

export type TechItem = { src: string; label: string; category: string };

type TechScrollerProps = {
  items: TechItem[];
  categoryOrder?: string[];
  className?: string;
  tile?: 'sm' | 'md';
  scrollStep?: number;
  sortMode?: 'input' | 'category' | 'alpha';
};

export default function TechScroller({
  items: inputItems,
  categoryOrder,
  className = '',
  tile = 'md',
  scrollStep = 330,
  sortMode = 'category',
}: TechScrollerProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const items = useMemo(() => {
    if (sortMode === 'input') {
      return [...inputItems];
    }
    if (sortMode === 'category' && categoryOrder && categoryOrder.length > 0) {
      const index = new Map(categoryOrder.map((c, i) => [c, i]));
      return [...inputItems].sort((a, b) => {
        const ca = index.get(a.category) ?? Number.MAX_SAFE_INTEGER;
        const cb = index.get(b.category) ?? Number.MAX_SAFE_INTEGER;
        if (ca !== cb) return ca - cb;
        return a.label.localeCompare(b.label);
      });
    }
    // default alpha
    return [...inputItems].sort((a, b) => a.label.localeCompare(b.label));
  }, [inputItems, categoryOrder, sortMode]);

  const scrollBy = (dx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: 'smooth' });
  };

  const tileSize = tile === 'sm' ? 'w-20 h-20' : 'w-24 h-24';
  const imgSize = tile === 'sm' ? 'h-8 w-8 mb-1' : 'h-10 w-10 mb-1.5';
  const labelSize = tile === 'sm' ? 'text-[10px]' : 'text-[11px]';

  return (
    <div className={`relative ${className}`}>
      {/* Arrows centered vertically on sides */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollBy(-scrollStep)}
        className="absolute -left-3 sm:-left-4 md:-left-4 top-1/2 -translate-y-1/2 z-10 px-2 py-1 text-primary/80 hover:text-primary animate-pulse"
      >
        ◄
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => scrollBy(scrollStep)}
        className="absolute -right-3 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10 px-2 py-1 text-primary/80 hover:text-primary animate-pulse"
      >
        ►
      </button>

      <div ref={scrollerRef} className="overflow-x-auto overflow-y-hidden no-scrollbar px-3">
        <div className="grid grid-rows-2 grid-flow-col auto-cols-max gap-3 py-1">
          {items.map((tech) => (
            <div
              key={tech.label}
              className={`bg-arcade-screen rounded border border-secondary/30 flex flex-col items-center justify-center text-center ${tileSize}`}
              title={`${tech.label} • ${tech.category}`}
            >
              <img
                src={tech.src}
                alt={`${tech.label} logo`}
                className={`${imgSize} object-contain pointer-events-none select-none`}
                loading="lazy"
              />
              <div className={`font-mono ${labelSize} text-foreground`}>{tech.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
