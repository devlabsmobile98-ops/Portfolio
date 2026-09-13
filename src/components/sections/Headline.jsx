import React from 'react';
import { motion } from 'framer-motion';
import {
  CuteStar,
  Heart,
  Sparkle,
  Squiggle,
  Blob,
  Smiley,
  CircleDoodle,
} from '@/components/Doodles';

// Brand palette
const PINK = '#ff4d6d';
const YELLOW = '#ffb703';
const SKY = '#8ecae6';
const CYAN = '#00e5f0';
const ORANGE = '#f8971f';
const LIME = '#c6ff3d';
const MAGENTA = '#ff2d95';

const CAT_URL =
  'https://media.base44.com/images/public/6aa41d34e5c58e28a143f23e/bda4d4cc8_catgif.gif';

const LINE1 = [
  { w: 'naturally', c: PINK },
  { w: 'curious.', c: YELLOW },
];

const LINE2 = [
  { w: 'so', c: CYAN },
  { w: 'give', c: ORANGE },
  { w: 'me', c: PINK },
  { w: 'a', c: YELLOW },
  { w: 'challenge.', c: CYAN },
];

const POP_EASE = [0.34, 1.56, 0.64, 1];

/* =========================================================
   INLINE DOODLES
========================================================= */

function OutlineStar({ size = 40, color = PINK, strokeWidth = 3 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 3 L23.5 15 L36 15 L26 22.5 L29.5 34.5 L20 27 L10.5 34.5 L14 22.5 L4 15 L16.5 15 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function OutlineHeart({ size = 40, color = PINK, strokeWidth = 3 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 34 C8 25 2 17 2 10.5 C2 4.5 7 1 11.5 1 C15 1 18 3 20 7 C22 3 25 1 28.5 1 C33 1 38 4.5 38 10.5 C38 17 32 25 20 34 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function DashedCircle({ size = 100, color = SKY, strokeWidth = 2.5 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray="7 9"
        fill="none"
      />
    </svg>
  );
}

function DashedRing({ size = 60, color = ORANGE, strokeWidth = 2.5 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="30"
        cy="30"
        r="25"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray="4 7"
        fill="none"
      />
    </svg>
  );
}

function OutlineTriangle({ size = 36, color = LIME, strokeWidth = 3 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 2 L38 33 L2 33 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function OutlineDiamond({ size = 30, color = MAGENTA, strokeWidth = 3 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 30 30"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 1 L29 15 L15 29 L1 15 Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* =========================================================
   ANIMATION HELPERS
========================================================= */

function BouncyWord({ word, color, baseDelay = 0 }) {
  return (
    <span className="inline-flex whitespace-nowrap">
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ color }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.8,
            delay: baseDelay + i * 0.05,
            ease: 'easeInOut',
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function Float({
  children,
  style,
  delay = 0,
  duration = 2.2,
  rotate = 0,
  floatDistance = 16,
  className = '',
}) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={style}
      animate={{
        y: [0, -floatDistance, 0],
        rotate: [rotate, rotate + 8, rotate],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: POP_EASE,
      }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}

function SpinningDoodle({
  children,
  style,
  delay = 0,
  duration = 2.4,
  spinDuration = 9,
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{
        y: [0, -12, 0],
      }}
      transition={{
        repeat: Infinity,
        duration,
        delay,
        ease: POP_EASE,
      }}
      aria-hidden="true"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: spinDuration,
          ease: 'linear',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* =========================================================
   BACKGROUND BLOBS
========================================================= */

const BACKGROUND_BLOBS = [
  {
    className: 'top-[8%] left-[3%] w-96 h-96',
    color: PINK,
    opacity: 0.3,
    duration: 8,
    animate: {
      x: [0, 50, -20, 0],
      y: [0, 30, -20, 0],
      scale: [1, 1.15, 0.95, 1],
    },
  },
  {
    className: 'bottom-[5%] right-[5%] w-[26rem] h-[26rem]',
    color: SKY,
    opacity: 0.3,
    duration: 9,
    animate: {
      x: [0, -50, 20, 0],
      y: [0, -30, 20, 0],
      scale: [1, 0.9, 1.12, 1],
    },
  },
  {
    className: 'top-[32%] right-[22%] w-80 h-80',
    color: YELLOW,
    opacity: 0.25,
    duration: 6.5,
    animate: {
      x: [0, -40, 30, 0],
      y: [0, 40, -30, 0],
      scale: [1, 1.2, 0.9, 1],
    },
  },
  {
    className: 'top-[52%] left-[22%] w-72 h-72',
    color: ORANGE,
    opacity: 0.2,
    duration: 7,
    animate: {
      x: [0, 30, -40, 0],
      y: [0, -30, 20, 0],
      scale: [1, 1.1, 0.95, 1],
    },
  },
  {
    className:
      'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[340px]',
    color: CYAN,
    opacity: 0.14,
    duration: 4,
    animate: {
      scale: [1, 1.15, 1],
      opacity: [0.1, 0.2, 0.1],
    },
  },
  {
    className: 'bottom-[12%] left-[12%] w-64 h-64',
    color: MAGENTA,
    opacity: 0.16,
    duration: 8.5,
    animate: {
      x: [0, 20, -25, 0],
      y: [0, -15, 15, 0],
      scale: [1, 1.15, 0.9, 1],
    },
  },
  {
    className: 'top-[10%] left-[42%] w-60 h-60',
    color: LIME,
    opacity: 0.14,
    duration: 6,
    animate: {
      x: [0, -20, 20, 0],
      y: [0, 15, -15, 0],
      scale: [1, 1.1, 0.95, 1],
    },
  },
];

/* =========================================================
   ACCENT DOTS
========================================================= */

const DOTS = [
  { left: '27%', top: '14%', size: 9, color: PINK, delay: 0.1 },
  { left: '42%', top: '15%', size: 11, color: YELLOW, delay: 0.2 },
  { left: '57%', top: '14%', size: 9, color: PINK, delay: 0.3 },
  { left: '75%', top: '17%', size: 10, color: SKY, delay: 0.45 },
  { left: '13%', top: '38%', size: 14, color: PINK, delay: 0 },
  { right: '6%', top: '86%', size: 13, color: MAGENTA, delay: 0.35 },
  { right: '13%', top: '90%', size: 14, color: ORANGE, delay: 0.15 },
  { left: '30%', top: '78%', size: 9, color: CYAN, delay: 0.15 },
  { left: '33%', top: '90%', size: 12, color: YELLOW, delay: 0.55 },
  { right: '30%', top: '80%', size: 8, color: LIME, delay: 0.3 },
  { right: '22%', top: '90%', size: 10, color: PINK, delay: 0.65 },
  { left: '17%', top: '95%', size: 8, color: CYAN, delay: 0.8 },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Headline({ season }) {
  return (
    <section
      id="headline"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
      aria-label="Headline"
    >
      {/* =====================================================
          COLORFUL ANIMATED BACKGROUND
      ===================================================== */}

      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {BACKGROUND_BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-3xl ${blob.className}`}
            style={{
              background: blob.color,
              opacity: blob.opacity,
            }}
            animate={blob.animate}
            transition={{
              repeat: Infinity,
              duration: blob.duration,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* =====================================================
          ACCENT DOTS
      ===================================================== */}

      <div aria-hidden="true">
        {DOTS.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: dot.left,
              right: dot.right,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              background: dot.color,
              opacity: 0.8,
            }}
            animate={{
              y: [0, -12, 0],
              x: [0, 5, 0],
              scale: [1, 1.18, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.6 + (i % 3) * 0.2,
              delay: dot.delay,
              ease: POP_EASE,
            }}
          />
        ))}
      </div>

      {/* =====================================================
          DOODLES
      ===================================================== */}

      <Float
        style={{ left: '6%', top: '20%' }}
        duration={2.6}
        rotate={-8}
      >
        <CuteStar size={96} />
      </Float>

      <Float
        style={{ right: '10%', top: '10%' }}
        duration={2.3}
        delay={0.2}
        rotate={10}
      >
        <Heart size={64} color={PINK} />
      </Float>

      <Float
        style={{ left: '16%', top: '10%' }}
        duration={2.8}
        delay={0.6}
        rotate={-10}
        floatDistance={11}
      >
        <OutlineHeart size={28} color={MAGENTA} />
      </Float>

      <Float
        style={{ left: '9%', top: '56%' }}
        duration={2.5}
        delay={0.1}
        rotate={6}
      >
        <Sparkle size={42} color={CYAN} />
      </Float>

      <Float
        style={{ right: '8%', top: '48%' }}
        duration={2.7}
        delay={0.3}
        rotate={-6}
      >
        <Squiggle size={104} color={SKY} />
      </Float>

      <Float
        style={{ left: '13%', bottom: '12%' }}
        duration={3}
        delay={0.15}
        rotate={12}
      >
        <Blob size={96} color={PINK} />
      </Float>

      <Float
        style={{ right: '15%', bottom: '24%' }}
        duration={2.4}
        delay={0.25}
        rotate={-10}
      >
        <Smiley size={66} color={YELLOW} />
      </Float>

      <Float
        style={{ left: '3%', top: '42%' }}
        duration={2.6}
        delay={0.45}
        rotate={-14}
      >
        <Squiggle size={64} color={LIME} />
      </Float>

      <Float
        style={{ right: '3%', top: '72%' }}
        duration={2.8}
        delay={0.2}
        rotate={16}
      >
        <Squiggle size={58} color={MAGENTA} />
      </Float>

      <Float
        style={{ left: '60%', bottom: '19%' }}
        duration={2.2}
        delay={0.55}
        rotate={-10}
      >
        <Squiggle size={46} color={ORANGE} />
      </Float>

      <Float
        style={{ left: '27%', top: '22%' }}
        duration={2.3}
        delay={0.1}
        rotate={10}
        floatDistance={10}
      >
        <OutlineStar size={34} color={CYAN} />
      </Float>

      <Float
        style={{ right: '16%', top: '24%' }}
        duration={2.1}
        delay={0.35}
        rotate={-12}
        floatDistance={9}
      >
        <OutlineHeart size={38} color={ORANGE} />
      </Float>

      <Float
        style={{ left: '7%', top: '82%' }}
        duration={2.5}
        delay={0.25}
        rotate={8}
      >
        <OutlineHeart size={30} color={LIME} />
      </Float>

      <Float
        style={{ right: '28%', bottom: '5%' }}
        duration={2.9}
        delay={0.75}
        rotate={9}
        floatDistance={10}
      >
        <OutlineHeart size={26} color={PINK} />
      </Float>

      <Float
        style={{ right: '10%', bottom: '34%' }}
        duration={2.7}
        delay={0.5}
        rotate={-8}
      >
        <OutlineStar size={28} color={MAGENTA} />
      </Float>

      <SpinningDoodle
        style={{ left: '2%', top: '8%' }}
        duration={2.8}
        delay={0.1}
        spinDuration={9}
      >
        <DashedCircle size={82} color={SKY} />
      </SpinningDoodle>

      <SpinningDoodle
        style={{ right: '2%', top: '36%' }}
        duration={2.5}
        delay={0.25}
        spinDuration={11}
      >
        <DashedRing size={62} color={PINK} />
      </SpinningDoodle>

      <SpinningDoodle
        style={{ left: '40%', bottom: '5%' }}
        duration={3}
        delay={0.4}
        spinDuration={10}
      >
        <DashedRing size={48} color={YELLOW} />
      </SpinningDoodle>

      <SpinningDoodle
        style={{ right: '31%', top: '20%' }}
        duration={2.2}
        delay={0.2}
        spinDuration={12}
      >
        <DashedCircle size={46} color={CYAN} />
      </SpinningDoodle>

      <SpinningDoodle
        style={{ left: '20%', bottom: '25%' }}
        duration={3.1}
        delay={0.6}
        spinDuration={13}
      >
        <DashedRing size={38} color={ORANGE} />
      </SpinningDoodle>

      <Float
        style={{ right: '6%', top: '24%' }}
        duration={2.4}
        delay={0.25}
        rotate={-16}
        floatDistance={10}
      >
        <OutlineTriangle size={34} color={LIME} />
      </Float>

      <Float
        style={{ left: '3%', top: '68%' }}
        duration={2.1}
        delay={0.45}
        rotate={18}
        floatDistance={9}
      >
        <OutlineDiamond size={28} color={MAGENTA} />
      </Float>

      {/* =====================================================
          MAIN HEADLINE
      ===================================================== */}

      <motion.div
        className="relative z-20 flex flex-col items-center text-center max-w-5xl"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h1 className="font-black uppercase leading-[0.92] tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
            {LINE1.map((w, i) => (
              <BouncyWord
                key={i}
                word={w.w}
                color={w.c}
                baseDelay={i * 0.1}
              />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-1">
            {LINE2.map((w, i) => (
              <BouncyWord
                key={i}
                word={w.w}
                color={w.c}
                baseDelay={0.5 + i * 0.08}
              />
            ))}
          </div>
        </h1>
      </motion.div>

      {/* =====================================================
          HAND-DRAWN CIRCLE DOODLES
      ===================================================== */}

      <div
        className="absolute -bottom-5 -left-5 opacity-40 z-0"
        aria-hidden="true"
      >
        <CircleDoodle size={140} color={SKY} />
      </div>

      <div
        className="absolute -bottom-12 -right-10 opacity-50 z-0"
        aria-hidden="true"
      >
        <CircleDoodle size={130} color={LIME} />
      </div>

      {/* =====================================================
          CAT + SCROLL CUE
      ===================================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-2 z-20"
      >
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: 'easeInOut',
          }}
        >
          <img
            src={CAT_URL}
            alt="A bopping cat"
            className="w-40 h-40 md:w-48 md:h-48 drop-shadow-[2px_3px_0_rgba(2,48,71,0.2)]"
            draggable={false}
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
          }}
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: 'var(--s-accent)' }}
        >
          SCROLL ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
