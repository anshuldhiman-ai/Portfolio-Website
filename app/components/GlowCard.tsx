'use client';

import { CSSProperties, HTMLAttributes } from 'react';

const hexToRgb = (hex: string) => {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.slice(0, 2), 16) || 124;
  const g = parseInt(clean.slice(2, 4), 16) || 131;
  const b = parseInt(clean.slice(4, 6), 16) || 224;
  return `${r}, ${g}, ${b}`;
};

type GlowCardProps = HTMLAttributes<HTMLDivElement> & {
  glow?: string;
};

export default function GlowCard({ glow = '#7c83e0', className = '', style, onMouseMove, children, ...props }: GlowCardProps) {
  return (
    <div
      {...props}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty('--glow-x', `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty('--glow-y', `${event.clientY - rect.top}px`);
        onMouseMove?.(event);
      }}
      className={`glass-card cursor-glow-card ${className}`}
      style={{
        '--glow-rgb': hexToRgb(glow),
        ...style,
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
