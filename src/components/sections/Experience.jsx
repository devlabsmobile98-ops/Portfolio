import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PINK = '#ff4d6d';
const YELLOW = '#ffb703';
const SKY = '#8ecae6';
const CYAN = '#00d6e3';
const NAVY = '#023047';
const CREAM = '#fff8f0';

// One big impact stat per role — a recruiter reads company + impact in a glance.
const ROLES = [
  {
    idx: '01',
    company: 'GOVON',
    role: 'Administrative Assistant',
    dates: 'May 2025 – Aug 2025',
    color: PINK,
    ink: CREAM,
    stat: '18%',
    statLabel: 'operational access improvement',
    line: 'Built Sharepoint + Power Automate workflow for 50+ staff. Constructed Power BI dashboards for 10000+ loan applicants.',
  },
{
  idx: '02',
  company: 'WOUESSI',
  role: 'Software Developer Intern',
  dates: 'March 2024 – May 2025',
  color: YELLOW,
  ink: NAVY,
  stat: "75+",
  statLabel: 'highest ticket completion rate',
  line: (
    <>
      Engineered AI-bidding platform using PERN stack.<br />
      Coordinated 10+ developers as Scrum Master.<br />
      Managed daily backlog and bi-weekly Agile sprints for 2 months.
    </>
  ),
},

  {
    idx: '03',
    company: 'Code Ninjas',
    role: 'Summer Camp Code Instructor',
    dates: 'April 2023 – June 2023',
    color: CYAN,
    ink: NAVY,
    stat: '10+',
    statLabel: 'STEM students taught',
      line: (
    <>
      Taught 10+ students ages 7-12 code in Scratch and Java.<br />
      Initiated training curriculum for NEW Pickering branch.
    </>
  ),
  },
  {
    idx: '04',
    company: 'OTU GDSC',
    role: 'Outreach Executive',
    dates: 'September 2023 – April 2024',
    color: SKY,
    ink: NAVY,
    stat: '25+',
    statLabel: 'developers in founding year',
    line: (
    <>
    Secured 10+ engineering professionals for conferences and panels.<br />
    Designed sponsorship packages for club funding.<br />
    Organized panelist logistics for 7+ events.
    </>),
  },
];

export default function Experience({ season }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" tabIndex="0" aria-labelledby="experience-heading" className="relative py-24 px-6" aria-label="Experience" style={{ background: '#023047', color: '#fff8f0', '--s-bg': '#023047', '--s-text': '#fff8f0', '--s-card': '#0a3a52', '--s-accent': '#ffb703' }}>
      <div className="flex justify-center">
        <h2
          id="experience-heading"
          tabIndex="0"
          className="font-black uppercase leading-none outline-none focus-visible:ring-4 focus-visible:ring-offset-4"
          style={{ fontSize: '12vw', color: 'var(--s-text)', letterSpacing: '-0.04em' }}
        >
          EXPERIENCE
        </h2>
      </div>

      <p className="text-center text-base md:text-lg font-bold mt-2" style={{ color: 'var(--s-text)' }}>
        4 ROLES · 3 YEARS <br />
        (real impact you can't ignore)
      </p>

      <div ref={ref} className="max-w-4xl mx-auto mt-12 space-y-6 md:space-y-8">
        {ROLES.map((r, i) => (
          <motion.article
            key={r.company}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5, ease: 'easeOut' }}
            className="relative"
          >
            {/* pop-out echo */}
            <div
              className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl"
              style={{ background: r.color }}
            />
            {/* card */}
            <div
              className="relative rounded-3xl border-[3px] p-6 md:p-8 grid md:grid-cols-[1fr_auto] gap-5 md:gap-8 items-center"
              style={{ background: 'var(--s-card)', borderColor: 'var(--s-text)' }}
            >
              {/* left: index + company + role */}
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className="text-2xl md:text-3xl font-black opacity-40"
                    style={{ color: r.color }}
                  >
                    {r.idx}
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                    style={{ background: r.color, color: r.ink }}
                  >
                    {r.dates}
                  </span>
                </div>
                <h3
                  className="mt-2 font-black uppercase leading-[0.88] tracking-tight"
                  style={{ fontSize: 'clamp(2rem, 7vw, 4rem)', color: 'var(--s-text)' }}
                >
                  {r.company}
                </h3>
                <p className="mt-1 text-lg md:text-xl font-bold" style={{ color: r.color }}>
                  {r.role}
                </p>
                <p
                  className="mt-2 text-sm md:text-base font-semibold"
                  style={{ color: 'var(--s-text)' }}
                >
                  {r.line}
                </p>
              </div>

              {/* right: big impact stat */}
              <div
                className="md:text-right md:border-l-[3px] md:pl-8 md:self-stretch md:flex md:flex-col md:justify-center"
                style={{ borderColor: 'var(--s-text)' }}
              >
                <div
                  className="font-black leading-none tracking-tight"
                  style={{ fontSize: 'clamp(3rem, 13vw, 6rem)', color: r.color }}
                >
                  {r.stat}
                </div>
                <div
                  className="text-xs md:text-sm font-bold uppercase tracking-wide mt-2"
                  style={{ color: 'var(--s-text)' }}
                >
                  {r.statLabel}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}