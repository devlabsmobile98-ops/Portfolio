import React from 'react';
import { getSeason, SEASONS } from '@/lib/seasons';
import Navbar from '@/components/Navbar';
import Headline from '@/components/sections/Headline';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Skills from '@/components/sections/Skills';
import Awards from '@/components/sections/Awards';
import Bio from '@/components/sections/Bio';

export default function Home() {
  const season = SEASONS[getSeason()];

  const vars = {
    '--s-bg': season.bg,
    '--s-text': season.text,
    '--s-accent': season.accent,
    '--s-accent2': season.accent2,
    '--s-card': season.card,
    '--s-radius': season.radius,
  };

  return (
    <div
      style={vars}
      className="min-h-screen bg-[var(--s-bg)] text-[var(--s-text)] transition-colors duration-700"
    >
      <a href="#main-content" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>
      <Navbar season={season} />
      <main>
        <Headline season={season} />
        <Bio season={season} />
        <Experience season={season} />
        <Skills season={season} />
        <Projects season={season} />
        <Awards season={season} />
      </main>
    </div>
  );
}