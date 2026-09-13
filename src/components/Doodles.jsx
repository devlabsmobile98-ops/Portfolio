import React from 'react';

// A kit of cute, hand-drawn-style SVG doodles for the playful sections.

let _starId = 0;
const useStarId = () => `cute-star-${++_starId}`;

export function CuteStar({ size = 80, colors = ['#F9E08A', '#E3A330'] }) {
  const id = useStarId();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={id} cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </radialGradient>
      </defs>
      <path
        d="M50 6 L62 37 L95 39 L69 61 L79 94 L50 75 L21 94 L31 61 L5 39 L38 37 Z"
        fill={`url(#${id})`}
        stroke={colors[1]}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="39" cy="49" r="3.2" fill="#5D4037" />
      <circle cx="61" cy="49" r="3.2" fill="#5D4037" />
      <path d="M43 60 Q50 66 57 60" stroke="#5D4037" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <ellipse cx="33" cy="57" rx="4.5" ry="2.8" fill="#FF8FAB" opacity="0.65" />
      <ellipse cx="67" cy="57" rx="4.5" ry="2.8" fill="#FF8FAB" opacity="0.65" />
    </svg>
  );
}

export function Heart({ size = 48, color = '#FF6B9D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 42S6 30 6 18C6 12 11 7 17 7C20 7 23 9 24 12C25 9 28 7 31 7C37 7 42 12 42 18C42 30 24 42 24 42Z"
        fill={color}
        stroke="#000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ size = 40, color = '#FFD93D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 2 C22 14 26 18 38 20 C26 22 22 26 20 38 C18 26 14 22 2 20 C14 18 18 14 20 2 Z"
        fill={color}
        stroke="#000"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({ size = 80, color = '#4D96FF' }) {
  return (
    <svg width={size} height={size * 0.42} viewBox="0 0 120 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 25 C14 5 24 5 34 25 C44 45 54 45 64 25 C74 5 84 5 94 25 C104 45 114 45 116 25"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Blob({ size = 100, color = '#6BCB77' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 8 C70 6 88 22 90 42 C92 62 78 82 58 88 C38 94 16 82 12 60 C8 38 30 10 50 8 Z"
        fill={color}
        opacity="0.85"
      />
    </svg>
  );
}

export function Smiley({ size = 64, color = '#FFD93D' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="28" fill={color} stroke="#000" strokeWidth="2.5" />
      <circle cx="24" cy="26" r="3" fill="#5D4037" />
      <circle cx="40" cy="26" r="3" fill="#5D4037" />
      <path d="M22 38 Q32 46 42 38" stroke="#5D4037" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <ellipse cx="18" cy="34" rx="3" ry="2" fill="#FF8FAB" opacity="0.6" />
      <ellipse cx="46" cy="34" rx="3" ry="2" fill="#FF8FAB" opacity="0.6" />
    </svg>
  );
}

export function CircleDoodle({ size = 120, color = 'var(--s-text)' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M60 8 C88 10 110 30 108 60 C106 88 84 112 58 110 C30 108 10 86 12 58 C14 32 34 6 60 8 Z"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="6 5"
      />
    </svg>
  );
}