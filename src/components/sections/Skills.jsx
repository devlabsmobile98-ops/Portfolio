import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PINK = '#ff4d6d';
const YELLOW = '#ffb703';
const SKY = '#8ecae6';
const CYAN = '#00d6e3';
const NAVY = '#023047';
const CREAM = '#fff8f0';

// cat → {ring, ink}
const RING = {
  lang: { c: PINK, ink: CREAM },
  frame: { c: YELLOW, ink: NAVY },
  tool: { c: CYAN, ink: NAVY },
};

const SKILLS = [
  // Languages
  { name: 'JavaScript', slug: 'javascript', cat: 'lang' },
  { name: 'TypeScript', slug: 'typescript', cat: 'lang' },
  { name: 'Python', slug: 'python', cat: 'lang' },
  { name: 'HTML5', slug: 'html5', cat: 'lang' },
  { name: 'CSS3', slug: 'css3', cat: 'lang' },
  { name: 'GraphQL', slug: 'graphql', cat: 'lang' },
  // Frameworks
  { name: 'React', slug: 'react', cat: 'frame' },
  { name: 'Next.js', slug: 'nextdotjs', cat: 'frame' },
  { name: 'Node.js', slug: 'nodedotjs', cat: 'frame' },
  { name: 'Express', slug: 'express', cat: 'frame' },
  { name: 'Tailwind', slug: 'tailwindcss', cat: 'frame' },
  { name: 'Redux', slug: 'redux', cat: 'frame' },
  { name: 'Three.js', slug: 'threedotjs', cat: 'frame' },
  // Tools & Platforms
  { name: 'Git', slug: 'git', cat: 'tool' },
  { name: 'GitHub', slug: 'github', cat: 'tool' },
  { name: 'Figma', slug: 'figma', cat: 'tool' },
  { name: 'Docker', slug: 'docker', cat: 'tool' },
  { name: 'PostgreSQL', slug: 'postgresql', cat: 'tool' },
  { name: 'Vite', slug: 'vite', cat: 'tool' },
  { name: 'VS Code', slug: 'visualstudiocode', cat: 'tool' },
];

function Tile({ s, i }) {
  const [hover, setHover] = useState(false);
  const ring = RING[s.cat];
  const tilt = (i % 3 - 1) * 4; // -4, 0, 4

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: i * 0.035, type: 'spring', stiffness: 220, damping: 14 }}
      className="flex justify-center"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3 + (i % 3), ease: 'easeInOut', delay: i * 0.12 }}
        whileHover={{ y: -14, scale: 1.18, rotate: tilt }}
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-colors"
        style={{
          background: 'var(--s-card)',
          borderColor: ring.c,
          boxShadow: hover ? `6px 8px 0 ${ring.c}` : '0 0 0 transparent',
        }}
      >
        <img
          src={`https://cdn.simpleicons.org/${s.slug}`}
          alt={s.name}
          className="w-9 h-9 md:w-11 md:h-11 pointer-events-none select-none"
          draggable={false}
        />
        {hover && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap z-20"
            style={{ background: ring.c, color: ring.ink }}
          >
            {s.name}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Skills({ season }) {
  return (
    <section id="skills" tabIndex="0" aria-labelledby="skills-heading" className="relative py-24 px-6" aria-label="Skills" style={{ background: '#fff8f0', color: '#023047', '--s-bg': '#fff8f0', '--s-text': '#023047', '--s-card': '#ffffff', '--s-accent': '#ff4d6d' }}>
      <div className="flex justify-center">
        <h2
          id="skills-heading"
          tabIndex="0"
          className="font-black uppercase leading-none outline-none focus-visible:ring-4 focus-visible:ring-offset-4"
          style={{ fontSize: '12vw', color: 'var(--s-text)', letterSpacing: '-0.04em' }}
        >
          SKILLS
        </h2>
      </div>

      {/* tiny category legend */}
      <div className="flex justify-center gap-4 mt-4 text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--s-text)' }}>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PINK }} />languages</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: YELLOW }} />frameworks</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{ background: CYAN }} />tools</span>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 md:gap-5 mt-10 max-w-3xl mx-auto">
        {SKILLS.map((s, i) => (
          <Tile key={s.name} s={s} i={i} />
        ))}
      </div>

      <p className="text-center text-sm font-semibold opacity-60 mt-10" style={{ color: 'var(--s-text)' }}>
        hover a tile · 20 tools in the kit
      </p>
    </section>
  );
}