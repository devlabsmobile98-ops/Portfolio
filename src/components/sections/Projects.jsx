import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';

// Year positions on the clock face (clock hours): 12=2023, 3=2024, 6=2025, 9=2026
const YEARS = [
  { year: 2023, hour: 12 },
  { year: 2024, hour: 3 },
  { year: 2025, hour: 6 },
  { year: 2026, hour: 9 },
];

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

// hour -> degrees (0deg = 3 o'clock, -90 = 12 o'clock)
const hourToAngle = (h) => (h % 12) * 30 - 90;
// position on circle of radius R
const pos = (hour, R) => {
  const a = (hourToAngle(hour) * Math.PI) / 180;
  return { x: Math.cos(a) * R, y: Math.sin(a) * R };
};

// sample project data — keyed by year then month
const PROJECTS = {
  2024: {
    3: [
      { name: 'Aurora Dashboard', desc: 'Real-time analytics dashboard with streaming charts and a custom query builder.', pills: ['React', 'TypeScript', 'WebSockets'], grad: 'from-fuchsia-500 to-indigo-500' },
      { name: 'Pulse API', desc: 'High-throughput REST API serving 2M req/day with edge caching.', pills: ['Node', 'Redis', 'AWS'], grad: 'from-amber-400 to-rose-500' },
    ],
    6: [
      { name: 'Mosaic Design System', desc: 'Component library + Figma tokens powering 4 product teams.', pills: ['React', 'Storybook', 'Figma'], grad: 'from-emerald-400 to-cyan-500' },
    ],
    9: [
      { name: 'Trailhead Maps', desc: 'Offline-first hiking map app with vector tiles and route planning.', pills: ['React Native', 'MapLibre', 'SQLite'], grad: 'from-lime-400 to-emerald-600' },
      { name: 'Ledger CLI', desc: 'Personal finance tool with double-entry accounting in the terminal.', pills: ['Go', 'CLI', 'SQLite'], grad: 'from-sky-400 to-blue-600' },
    ],
  },
  2025: {
    6: [
      { name: 'Helix ML Pipeline', desc: 'End-to-end training + inference pipeline for vision models.', pills: ['Python', 'PyTorch', 'K8s'], grad: 'from-violet-500 to-purple-700' },
      { name: 'Coral Chat', desc: 'Streaming AI chat with tool-use and retrieval-grounded answers.', pills: ['Next.js', 'OpenAI', 'pgvector'], grad: 'from-pink-500 to-rose-600' },
      { name: 'Orbit Scheduler', desc: 'Distributed cron with observability and replayable runs.', pills: ['Go', 'Temporal', 'Grafana'], grad: 'from-orange-400 to-red-500' },
    ],
    9: [
      { name: 'Lumen Editor', desc: 'Collaborative code editor with CRDT sync and AI completions.', pills: ['TypeScript', 'Yjs', 'WASM'], grad: 'from-teal-400 to-emerald-600' },
    ],
  },
  2023: {
    12: [
      { name: 'Seed Portfolio v1', desc: 'First-gen personal site with a WebGL particle hero.', pills: ['Three.js', 'GSAP', 'Vite'], grad: 'from-rose-400 to-pink-600' },
    ],
  },
  2026: {
    3: [
      { name: 'Quantum Playground', desc: 'Interactive sim of quantum gates with visual circuit builder.', pills: ['React', 'Three.js', 'Qiskit'], grad: 'from-cyan-400 to-blue-600' },
    ],
  },
};

export default function Projects({ season }) {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const R = 150; // clock radius for labels

  const yearData = YEARS.find((y) => y.year === selectedYear);
  const hourAngle = hourToAngle(yearData.hour);
  const monthAngle = selectedMonth ? hourToAngle(selectedMonth) : hourAngle;

  const monthProjects =
    selectedMonth && PROJECTS[selectedYear]?.[selectedMonth]
      ? PROJECTS[selectedYear][selectedMonth]
      : [];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6"
      aria-label="Projects"
    >
      <SectionTitle side="left" season={season}>
        PROJECTS
      </SectionTitle>

      <div className="flex flex-col items-center justify-center mt-10">
        {/* the clock */}
        <div className="relative scale-[0.78] sm:scale-90 md:scale-100 origin-top" style={{ width: 380, height: 380 }}>
          {/* face */}
          <div
            className="absolute inset-0 rounded-full border-4"
            style={{ borderColor: 'var(--s-text)', background: 'color-mix(in srgb, var(--s-card) 50%, transparent)' }}
          />
          {/* center hub */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full z-30"
            style={{ background: 'var(--s-accent)' }}
          />

          {/* year labels */}
          {YEARS.map((y) => {
            const p = pos(y.hour, R);
            const active = y.year === selectedYear;
            return (
              <button
                key={y.year}
                onClick={() => {
                  setSelectedYear(y.year);
                  setSelectedMonth(null);
                }}
                className="absolute left-1/2 top-1/2 z-20 font-black text-lg md:text-xl px-3 py-2 rounded-full transition-all"
                style={{
                  transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`,
                  background: active ? 'var(--s-accent)' : 'transparent',
                  color: active ? 'var(--s-bg)' : 'var(--s-text)',
                  border: `2px solid var(--s-text)`,
                }}
              >
                {y.year}
              </button>
            );
          })}

          {/* month pips when a year is selected */}
          <AnimatePresence>
            {selectedYear && (
              <>
                {MONTHS.map((m, i) => {
                  const monthNum = i + 1;
                  const p = pos(monthNum, R - 60);
                  const hasProjects = !!PROJECTS[selectedYear]?.[monthNum];
                  const active = selectedMonth === monthNum;
                  return (
                    <motion.button
                      key={m}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => hasProjects && setSelectedMonth(monthNum)}
                      disabled={!hasProjects}
                      className="absolute left-1/2 top-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{
                        transform: `translate(calc(-50% + ${p.x}px), calc(-50% + ${p.y}px))`,
                        background: active
                          ? 'var(--s-accent)'
                          : hasProjects
                          ? 'color-mix(in srgb, var(--s-text) 15%, transparent)'
                          : 'transparent',
                        color: active ? 'var(--s-bg)' : 'var(--s-text)',
                        border: `1.5px solid ${hasProjects ? 'var(--s-text)' : 'color-mix(in srgb, var(--s-text) 30%, transparent)'}`,
                        opacity: hasProjects ? 1 : 0.35,
                        cursor: hasProjects ? 'pointer' : 'default',
                      }}
                      title={m}
                    >
                      {monthNum}
                    </motion.button>
                  );
                })}
              </>
            )}
          </AnimatePresence>

          {/* hour hand -> points to selected year */}
          <motion.div
            className="absolute left-1/2 top-1/2 origin-bottom z-10"
            style={{
              width: 6,
              height: R - 10,
              marginLeft: -3,
              marginTop: -(R - 10),
              background: 'var(--s-text)',
              borderRadius: 4,
            }}
            animate={{ rotate: hourAngle }}
            transition={{ type: 'spring', stiffness: 60, damping: 14, ...season.motion }}
          />
          {/* minute hand -> points to selected month */}
          <motion.div
            className="absolute left-1/2 top-1/2 origin-bottom z-10"
            style={{
              width: 4,
              height: R - 40,
              marginLeft: -2,
              marginTop: -(R - 40),
              background: 'var(--s-accent)',
              borderRadius: 4,
            }}
            animate={{ rotate: monthAngle }}
            transition={{ type: 'spring', stiffness: 60, damping: 14, ...season.motion }}
          />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-widest" style={{ color: 'var(--s-text)' }}>
          {selectedMonth ? `${MONTHS[selectedMonth - 1]} ${selectedYear}` : 'Pick a year, then a month'}
        </p>

        {/* horizontal card stream */}
        <AnimatePresence mode="wait">
          {selectedMonth && (
            <motion.div
              key={`${selectedYear}-${selectedMonth}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-5xl mt-10"
            >
              {monthProjects.length === 0 ? (
                <p className="text-center font-bold text-lg" style={{ color: 'var(--s-text)' }}>
                  No projects this month — try another.
                </p>
              ) : (
                <div className="flex gap-6 overflow-x-auto pb-6 px-2 snap-x snap-mandatory">
                  {monthProjects.map((proj, i) => (
                    <ProjectCard key={proj.name} proj={proj} season={season} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ proj, season, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="snap-start shrink-0 w-72 md:w-80 p-4 shadow-xl"
      style={{
        background: 'var(--s-card)',
        borderRadius: season.radius,
        border: '2px solid var(--s-text)',
        color: 'var(--s-text)',
      }}
    >
      {/* media / video placeholder */}
      <div
        className={`relative w-full aspect-video rounded-lg overflow-hidden bg-gradient-to-br ${proj.grad} flex items-center justify-center`}
      >
        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur flex items-center justify-center">
          <Play className="w-5 h-5 text-white fill-white" />
        </div>
      </div>

      <h3 className="mt-3 text-xl font-black uppercase tracking-tight">{proj.name}</h3>

      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-2 flex items-center gap-1 text-sm font-bold uppercase tracking-wider"
        style={{ color: 'var(--s-accent)' }}
      >
        <ChevronDown
          className="w-4 h-4 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'none' }}
        />
        {open ? 'Hide' : 'Description'}
      </button>

      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 text-sm leading-relaxed overflow-hidden"
          >
            {proj.desc}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-3 flex flex-wrap gap-2">
        {proj.pills.map((p) => (
          <span
            key={p}
            className="px-2.5 py-1 text-xs font-bold uppercase tracking-wide rounded-full"
            style={{
              background: 'color-mix(in srgb, var(--s-accent) 25%, transparent)',
              color: 'var(--s-text)',
              border: '1px solid var(--s-accent)',
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

function SectionTitle({ children, side, season }) {
  const align =
    side === 'left' ? 'justify-start text-left' :
    side === 'right' ? 'justify-end text-right' :
    'justify-center text-center';
  return (
    <div className={`flex ${align}`}>
      <h2
        className="font-black uppercase leading-none"
        style={{
          fontSize: '12vw',
          color: 'var(--s-text)',
          letterSpacing: '-0.04em',
        }}
      >
        {children}
      </h2>
    </div>
  );
}