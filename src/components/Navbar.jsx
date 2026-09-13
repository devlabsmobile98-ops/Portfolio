import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import AccessibilityReader from './AccessibilityReader';

const NAV = [
  { id: 'headline', label: 'Headline' },
  { id: 'bio', label: 'Bio' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact', soon: true },
];

export default function Navbar({ season }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-3">
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-1.5 rounded-full px-3 py-2.5 backdrop-blur-md border shadow-lg max-w-[calc(100vw-1.5rem)] overflow-x-auto no-scrollbar"
        style={{
          background: 'color-mix(in srgb, var(--s-bg) 82%, transparent)',
          borderColor: 'color-mix(in srgb, var(--s-text) 18%, transparent)',
        }}
      >
        <button
          onClick={() => go('headline')}
          className="px-4 py-2 rounded-full font-extrabold text-base tracking-tight whitespace-nowrap"
          style={{ background: 'var(--s-accent)', color: 'var(--s-bg)' }}
        >
          {scrolled ? 'N' : 'Home'}
        </button>

        {NAV.map((n) => (
          <button
            key={n.id}
            disabled={n.soon}
            onClick={() => !n.soon && go(n.id)}
            className="px-4 py-2 rounded-full text-base font-semibold transition-colors hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
            style={{ color: 'var(--s-text)' }}
          >
            {n.label}
            {n.soon && <span className="ml-1 text-[10px] opacity-60">soon</span>}
          </button>
        ))}

        <span
          className="ml-1 px-4 py-2 text-sm font-bold uppercase tracking-widest whitespace-nowrap"
          style={{ color: 'var(--s-accent)' }}
        >
          {season.name}
        </span>

        <AccessibilityReader />
      </motion.nav>
    </div>
  );
}