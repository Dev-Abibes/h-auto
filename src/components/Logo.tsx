import React from 'react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'custom';
  width?: number;
  height?: number;
  className?: string;
  showText?: boolean; // Option to show the brand text next to the icon
  textColor?: string;
}

export default function Logo({
  size = 'md',
  width,
  height,
  className = '',
  showText = false,
  textColor = 'text-slate-900',
}: LogoProps) {
  // Determine dimensions based on predefined sizes
  const getDimensions = () => {
    switch (size) {
      case 'xs':
        return { w: 24, h: 24 };
      case 'sm':
        return { w: 36, h: 36 };
      case 'md':
        return { w: 48, h: 48 };
      case 'lg':
        return { w: 80, h: 80 };
      case 'xl':
        return { w: 140, h: 140 };
      case '2xl':
        return { w: 240, h: 240 };
      case 'custom':
        return { w: width || 48, h: height || 48 };
      default:
        return { w: 48, h: 48 };
    }
  };

  const { w, h } = getDimensions();

  // The inline SVG perfectly recreates the logo: red gradient background, big white "H", bold "AUTO" underneath
  const svgContent = (
    <svg
      width={w}
      height={h}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none shrink-0 transition-transform duration-300 hover:scale-[1.03] ${className}`}
      id={`h-auto-logo-${size}`}
    >
      <defs>
        {/* Rich red-to-crimson gradient matching the premium aesthetic of the physical sign */}
        <linearGradient id="logoRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dc2626" /> {/* red-600 */}
          <stop offset="100%" stopColor="#991b1b" /> {/* red-800 */}
        </linearGradient>
        {/* Soft shadow effect for realism */}
        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Rounded red container matching the image */}
      <rect width="400" height="400" rx="45" fill="url(#logoRedGrad)" />

      {/* Large white "H" */}
      <text
        x="200"
        y="255"
        fontFamily="'Inter', 'Space Grotesk', system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="215"
        fill="#FFFFFF"
        textAnchor="middle"
        style={{ letterSpacing: '-0.05em' }}
      >
        H
      </text>

      {/* Bold "AUTO" text underneath the "H" */}
      <text
        x="200"
        y="345"
        fontFamily="'Inter', 'Space Grotesk', system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="54"
        fill="#FFFFFF"
        textAnchor="middle"
        letterSpacing="5"
      >
        AUTO
      </text>
    </svg>
  );

  if (showText) {
    return (
      <div className="flex items-center space-x-3 group">
        {svgContent}
        <div className="flex flex-col text-left leading-none">
          <span className={`font-sans font-black tracking-tight uppercase transition-colors group-hover:text-sky-500 ${textColor} ${
            size === 'xs' ? 'text-sm' : size === 'sm' ? 'text-base' : size === 'md' ? 'text-lg' : 'text-xl'
          }`}>
            H-AUTO
          </span>
          <span className="text-[9px] text-slate-500 font-mono tracking-wider uppercase">
            Mécanique Générale
          </span>
        </div>
      </div>
    );
  }

  return svgContent;
}
