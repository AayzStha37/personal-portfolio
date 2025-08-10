import React, { useEffect, useRef, useState } from 'react';

interface CrossfadeViewProps {
  activeKey: string;
  children: React.ReactNode;
  durationMs?: number;
  minOpacity?: number; 
}

// Subtle fade-in only
export default function CrossfadeView({ activeKey, children, durationMs = 140, minOpacity = 0.96 }: CrossfadeViewProps) {
  const firstRef = useRef(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    setOpacity(minOpacity);
    const raf = requestAnimationFrame(() => setOpacity(1));
    const timeout = setTimeout(() => setOpacity(1), durationMs + 20);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timeout);
    };
  }, [activeKey, durationMs, minOpacity]);

  return (
    <div
      className="transition-opacity ease-out"
      style={{
        opacity,
        transitionDuration: `${durationMs}ms`,
        willChange: 'opacity',
        backfaceVisibility: 'hidden',
      }}
    >
      {children}
    </div>
  );
}
