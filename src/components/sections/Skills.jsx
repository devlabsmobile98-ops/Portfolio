import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import awsLogo from '@/assets/aws.png';
import phiLogo from '@/assets/phi-3.png';
import gptLogo from '@/assets/gpt.png';

const PINK = '#ff4d6d';
const YELLOW = '#ffb703';
const CYAN = '#00d6e3';
const PURPLE = '#b57bff';
const NAVY = '#023047';
const CREAM = '#fff8f0';

const RING = {
  lang: { c: PINK, ink: CREAM, label: 'languages' },
  cloud: { c: CYAN, ink: NAVY, label: 'cloud' },
  data: { c: YELLOW, ink: NAVY, label: 'databases' },
  ai: { c: PURPLE, ink: CREAM, label: 'ai & ml' },
};

const SKILLS = [
  { name: 'Python', slug: 'python', cat: 'lang', label: 'python', code: 'print("Hello World! My name is Nuha")' },
  { name: 'TypeScript', slug: 'typescript', cat: 'lang', label: 'typescript', code: 'console.log("Hello World! My name is Nuha");' },
  { name: 'JavaScript', slug: 'javascript', cat: 'lang', label: 'javascript', code: 'console.log("Hello World! My name is Nuha");' },
  { name: 'React', slug: 'react', cat: 'cloud' },
  { name: 'Express.js', slug: 'express', cat: 'cloud' },
  { name: 'Node.js', slug: 'nodedotjs', cat: 'cloud' },
  { name: 'REST APIs', slug: 'postman', cat: 'cloud' },
  { name: 'HTML/CSS', slug: 'html5', cat: 'lang', label: 'html + css', code: '<p>Hello World! My name is Nuha</p>\n\n/* CSS */\np { color: #ff4d6d; }' },
  { name: 'AWS', slug: 'amazonwebservices', icon: awsLogo, cat: 'cloud' },
  { name: 'Jenkins', slug: 'jenkins', cat: 'cloud' },
  { name: 'Docker', slug: 'docker', cat: 'cloud' },
  { name: 'Kubernetes', slug: 'kubernetes', cat: 'cloud' },
  { name: 'Apache Kafka', slug: 'apachekafka', cat: 'cloud' },
  { name: 'Redis', slug: 'redis', cat: 'cloud' },
  { name: 'Microservices', slug: 'kubernetes', cat: 'cloud' },
  { name: 'PostgreSQL', slug: 'postgresql', cat: 'data' },
  { name: 'MySQL', slug: 'mysql', cat: 'data' },
  { name: 'NoSQL', slug: 'mongodb', cat: 'data' },
  { name: 'LLaMA 3', slug: 'meta', cat: 'ai' },
  { name: 'Phi-3', slug: 'microsoft', icon: phiLogo, cat: 'ai' },
  { name: 'GPT-4', slug: 'openai', icon: gptLogo, cat: 'ai' },
  { name: 'Google Vision ML', slug: 'googlecloud', cat: 'ai' },
  { name: 'GenAI', slug: 'googlegemini', cat: 'ai' },
  { name: 'Conversational AI', slug: 'googlemessages', cat: 'ai' },
  { name: 'LLM Evaluation', slug: 'openai', cat: 'ai' },
];

function burst(event, color) {
  const box = event.currentTarget.getBoundingClientRect();
  confetti({
    particleCount: 34,
    spread: 65,
    startVelocity: 22,
    scalar: 0.72,
    colors: [color, PINK, YELLOW, CYAN],
    origin: { x: (box.left + box.width / 2) / window.innerWidth, y: (box.top + box.height / 2) / window.innerHeight },
  });
}

function Tile({ skill, index, onSelect }) {
  const [hover, setHover] = useState(false);
  const [broken, setBroken] = useState(false);
  const ring = RING[skill.cat];
  const tilt = (index % 3 - 1) * 4;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: index * 0.03, type: 'spring', stiffness: 220, damping: 14 }} className="flex justify-center shrink-0" style={{ margin: '0 0.6rem 1.1rem' }}>
      <motion.button type="button" whileHover={{ y: -14, scale: 1.18, rotate: tilt }} whileTap={{ scale: 0.9 }} onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)} onFocus={() => setHover(true)} onBlur={() => setHover(false)} onClick={(event) => onSelect(skill, event, ring.c)} className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center cursor-pointer transition-colors focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4" style={{ background: '#ffffff', borderColor: ring.c, boxShadow: hover ? `6px 8px 0 ${ring.c}` : '0 0 0 transparent' }} aria-label={skill.code ? `Open ${skill.label} hello world example` : `Celebrate ${skill.name}`}>
        {broken ? <span className="text-xs font-black px-1 leading-tight">{skill.name}</span> : <img src={skill.icon || `https://cdn.simpleicons.org/${skill.slug}`} alt="" className="w-9 h-9 md:w-11 md:h-11 object-contain pointer-events-none select-none" draggable={false} onError={() => setBroken(true)} />}
        {hover && <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap z-20" style={{ background: ring.c, color: ring.ink }}>{skill.code ? `${skill.name} · click me` : skill.name}</motion.span>}
      </motion.button>
    </motion.div>
  );
}

export default function Skills() {
  const [selected, setSelected] = useState(null);
  const select = (skill, event, color) => skill.code ? setSelected(skill) : burst(event, color);

  return (
    <section id="skills" tabIndex="0" aria-labelledby="skills-heading" className="relative py-24 px-6" aria-label="Skills" style={{ background: CREAM, color: NAVY }}>
      <div className="flex justify-center"><h2 id="skills-heading" tabIndex="0" className="font-black uppercase leading-none outline-none focus-visible:ring-4 focus-visible:ring-offset-4" style={{ fontSize: '12vw', letterSpacing: '-0.04em' }}>SKILLS</h2></div>
      <div className="flex flex-col items-center gap-3 mt-8">
        <div className="flex flex-wrap justify-center gap-4 md:gap-5 text-sm md:text-base font-black uppercase tracking-wide">
          {Object.entries(RING).map(([key, value], index) => (
            <span key={key} className="flex items-center gap-4 px-4 py-2 rounded-full border-2" style={{ background: '#ffffff', borderColor: value.c, boxShadow: `3px 3px 0 ${value.c}`, transform: `rotate(${index % 2 ? 1.5 : -1.5}deg)` }}>
              <span className="w-4 h-4 rounded-full" style={{ background: value.c }} />{value.label}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-7">
        <p className="inline-flex items-center justify-center px-4 py-2 rounded-full border-2 text-[10px] md:text-xs font-black uppercase tracking-[0.08em] text-center -rotate-1" style={{ width: 'fit-content', background: YELLOW, borderColor: NAVY, boxShadow: `4px 4px 0 ${PINK}` }}>✦ Hover a tile &amp; click it for a surprise! ✦</p>
      </div>
      <div className="flex flex-wrap justify-center mt-14 max-w-6xl mx-auto" style={{ columnGap: '0.75rem', rowGap: '0.75rem' }}>
        {SKILLS.map((skill, index) => <Tile key={skill.name} skill={skill} index={index} onSelect={select} />)}
      </div>
      <AnimatePresence>{selected && <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-labelledby="code-title" onMouseDown={() => setSelected(null)}>
        <div className="absolute inset-0 bg-[#023047]/70 backdrop-blur-sm" />
        <motion.div initial={{ y: 40, scale: 0.92, rotate: -2 }} animate={{ y: 0, scale: 1, rotate: 0 }} exit={{ y: 25, scale: 0.95 }} transition={{ type: 'spring', stiffness: 240, damping: 20 }} onMouseDown={(event) => event.stopPropagation()} className="relative w-full max-w-2xl overflow-hidden rounded-[1.8rem] border-[3px]" style={{ background: NAVY, color: CREAM, borderColor: YELLOW, boxShadow: `10px 10px 0 ${PINK}` }}>
          <div className="flex items-center justify-between gap-4 px-5 py-4 border-b-2" style={{ borderColor: YELLOW }}><div><p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: CYAN }}>Nuha’s tiny terminal</p><h3 id="code-title" className="font-black text-lg">Hello from {selected.name}</h3></div><button type="button" onClick={() => setSelected(null)} className="shrink-0 p-2 rounded-full border-2 hover:rotate-90 transition-transform focus-visible:outline focus-visible:outline-4" style={{ borderColor: CREAM }} aria-label="Close code example"><X className="w-6 h-6" /></button></div>
          <div className="p-5 md:p-7"><div className="flex gap-2 mb-4" aria-hidden="true"><span className="w-3 h-3 rounded-full" style={{ background: PINK }} /><span className="w-3 h-3 rounded-full" style={{ background: YELLOW }} /><span className="w-3 h-3 rounded-full" style={{ background: CYAN }} /></div><pre className="overflow-x-auto p-4 md:p-6 rounded-xl text-sm sm:text-base leading-relaxed font-mono whitespace-pre-wrap" style={{ background: '#001f2d', color: CYAN }}><code>{selected.code}</code></pre></div>
        </motion.div>
      </motion.div>}</AnimatePresence>
    </section>
  );
}
