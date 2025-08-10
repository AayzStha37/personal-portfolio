import React, { forwardRef } from 'react';

type ArcadeFrameProps = {
  className?: string;
  style?: React.CSSProperties;
};

const ArcadeFrame = forwardRef<SVGRectElement, ArcadeFrameProps>(function ArcadeFrame(
  { className, style }: ArcadeFrameProps,
  ref
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 500"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ pointerEvents: 'none', ...style }}
    >
      {/* Outer arcade console body */}
      <rect x="5" y="5" width="890" height="490" rx="25" ry="25" fill="#0a1a2f" stroke="#00ffff" strokeWidth="4" />

      {/* Inner beveled border */}
      <rect x="20" y="20" width="860" height="460" rx="20" ry="20" fill="#081526" stroke="#00cccc" strokeWidth="2" />

      {/* Left D-Pad */}
      <g transform="translate(120, 250)">
        <rect x="-20" y="-60" width="40" height="120" fill="#142b47" stroke="#00ffff" strokeWidth="2" />
        <rect x="-60" y="-20" width="120" height="40" fill="#142b47" stroke="#00ffff" strokeWidth="2" />
        {/* Center dot */}
        <circle cx="0" cy="0" r="8" fill="#00ffff" />
      </g>

      {/* Right arcade buttons */}
      <g transform="translate(780, 250)">
        <circle cx="0" cy="-40" r="20" fill="#1a3a5f" stroke="#00ffff" strokeWidth="2" />
        <circle cx="40" cy="0" r="20" fill="#1a3a5f" stroke="#00ffff" strokeWidth="2" />
        <circle cx="0" cy="40" r="20" fill="#1a3a5f" stroke="#00ffff" strokeWidth="2" />
        <circle cx="-40" cy="0" r="20" fill="#1a3a5f" stroke="#00ffff" strokeWidth="2" />
        {/* Button highlights */}
        <circle cx="0" cy="-45" r="5" fill="#00ffff" />
        <circle cx="45" cy="0" r="5" fill="#00ffff" />
        <circle cx="0" cy="45" r="5" fill="#00ffff" />
        <circle cx="-45" cy="0" r="5" fill="#00ffff" />
      </g>

      {/* Speaker grills on left */}
      <g transform="translate(70, 120)">
        <rect x="0" y="0" width="60" height="4" fill="#00ffff" />
        <rect x="0" y="10" width="60" height="4" fill="#00ffff" />
        <rect x="0" y="20" width="60" height="4" fill="#00ffff" />
      </g>

      {/* Speaker grills on right */}
      <g transform="translate(770, 120)">
        <rect x="0" y="0" width="60" height="4" fill="#00ffff" />
        <rect x="0" y="10" width="60" height="4" fill="#00ffff" />
        <rect x="0" y="20" width="60" height="4" fill="#00ffff" />
      </g>

      {/* Decorative screws */}
      <circle cx="30" cy="30" r="6" fill="#00cccc" />
      <circle cx="870" cy="30" r="6" fill="#00cccc" />
      <circle cx="30" cy="470" r="6" fill="#00cccc" />
      <circle cx="870" cy="470" r="6" fill="#00cccc" />

      {/* Hidden measurement rect for the screen area used by game layout */}
      <rect ref={ref} x="280" y="60" width="340" height="380" fill="transparent" stroke="none" opacity="0" />
    </svg>
  );
});

export default ArcadeFrame;
