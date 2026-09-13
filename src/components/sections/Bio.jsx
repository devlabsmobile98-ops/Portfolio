import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Award,
  ArrowDownRight,
  Sparkles,
  Star,
  Heart,
  Zap,
  Circle,
} from 'lucide-react';
import { Image } from '@/components/ui/image';

const TEAL = '#20b2aa';
const NAVY = '#023047';
const ORANGE = '#ff6347';
const CREAM = '#fff8dc';
const PINK = '#ff4d6d';
const YELLOW = '#ffb703';
const CYAN = '#00d6e3';
const RED = '#ff2d3f';

const PHOTO_URL =
  'https://media.base44.com/images/public/6aa41d34e5c58e28a143f23e/59cd2eeed_image.png';

const GRAD_URL =
  'https://media.base44.com/images/public/6aa41d34e5c58e28a143f23e/7b55bab5c_cute-girl-in-hijab-graduation-free-png.png';

const BODY =
  'Cheerful and hard-working; no two words could describe me better. Hand me a problem, and I\'ll unearth solutions in the most creative way possible. This site will showcase a professional summary of my work, skills, projects and more! 😊❤️';

const PILLS = ['Initiative', 'Communication', 'Perseverance'];

const EDUCATION_PILLS = [
  "Capstone '26 Second Place Winner",
  '3.5 GPA',
  '40+ Projects',
];

const LETTER_COLORS = [
  PINK,
  ORANGE,
  YELLOW,
  CYAN,
  NAVY,
  PINK,
  ORANGE,
  YELLOW,
  CYAN,
  NAVY,
];

// Fast, snappy transition reused for every hover interaction so nothing
// inherits the slower spring/delay timings used for entrance animations.
const HOVER_TRANSITION = { duration: 0.15, ease: 'easeOut' };

/* -------------------------------------------------------
   BIG KINETIC HELLO
------------------------------------------------------- */

function BigGreeting() {
  const phrase = "'Sup, I'm Nuha";
  const chars = phrase.split('');

  return (
    <div
      className="relative z-30"
      style={{ perspective: 1200 }}
    >
      <motion.div
        initial={{ opacity: 0, rotate: -2, y: 20 }}
        whileInView={{ opacity: 1, rotate: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.7,
          ease: 'easeOut',
        }}
        className="absolute -top-8 left-2 md:left-8"
      >
        <span
          className="inline-block rounded-full border-2 px-4 py-1.5 text-xs md:text-sm font-black uppercase tracking-[0.18em]"
          style={{
            color: NAVY,
            borderColor: NAVY,
            background: YELLOW,
            transform: 'rotate(-5deg)',
            boxShadow: `3px 3px 0 ${NAVY}`,
          }}
        >
          Check out the bio ↓
        </span>
      </motion.div>

      <h2
        id="bio-heading"
        tabIndex="0"
        aria-label="Bio. Hello, I'm Nuha."
        className="flex flex-wrap items-center outline-none focus-visible:ring-4 focus-visible:ring-offset-4"
        style={{
          rowGap: '0.05em',
          columnGap: '0.015em',
        }}
      >
        {chars.map((ch, i) => {
          const isSpace = ch === ' ';

          return (
            <motion.span
              key={i}
              initial={{
                opacity: 0,
                y: 120,
                rotate: i % 2 === 0 ? -15 : 15,
                scale: 1.5,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: 0,
                scale: 1,
              }}
              viewport={{
                once: true,
                margin: '-100px',
              }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 13,
                delay: i * 0.045,
              }}
              className="inline-block font-black italic leading-[0.82] tracking-[-0.075em]"
              style={{
                fontSize: 'clamp(3.5rem, 11vw, 9rem)',
                color: isSpace
                  ? 'transparent'
                  : LETTER_COLORS[i % LETTER_COLORS.length],
                textShadow: `4px 5px 0 ${NAVY}`,
                transformStyle: 'preserve-3d',
              }}
            >
              <span className="inline-block">
                {isSpace ? '\u00A0' : ch}
              </span>
            </motion.span>
          );
        })}
      </h2>
    </div>
  );
}

/* -------------------------------------------------------
   PORTRAIT
------------------------------------------------------- */

function PortraitFrame() {
  const [flash, setFlash] = useState(false);

  const takePicture = () => {
    if (flash) return;

    setFlash(true);

    setTimeout(() => {
      setFlash(false);
    }, 450);
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        rotate: -5,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: -2,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 14,
      }}
      whileHover={{
        rotate: 1,
        scale: 1.025,
        transition: HOVER_TRANSITION,
      }}
      className="relative"
    >
      {/* orange offset shadow */}
      <motion.div
        animate={{
          x: [20, 24, 20],
          y: [20, 23, 20],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 rounded-[3rem]"
        style={{
          background: ORANGE,
        }}
      />

      {/* cyan offset sticker */}
      <motion.div
        animate={{
          rotate: [-12, -7, -12],
          y: [0, -5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
        }}
        className="absolute -left-4 bottom-8 w-8 h-20 rounded-full"
        style={{
          background: CYAN,
        }}
      />

      <motion.div
        onClick={takePicture}
        whileTap={{ scale: 0.97 }}
        className="relative rounded-[3rem] border-[4px] p-3 cursor-pointer select-none"
        style={{
          background: CREAM,
          borderColor: NAVY,
        }}
      >
        <div className="relative aspect-[4/5] rounded-[2.3rem] overflow-hidden">
          <Image
            src={PHOTO_URL}
            alt="Image of a young south-asian woman with a black hijab, smiling at the camera"
            fittingType="fill"
            focalPointX={0.5}
            focalPointY={0.4}
            className="w-full h-full"
          />

          {/* CAMERA FLASH */}
          <motion.div
            initial={false}
            animate={
              flash
                ? { opacity: [0, 1, 0] }
                : { opacity: 0 }
            }
            transition={{
              duration: 0.45,
              times: [0, 0.15, 1],
              ease: 'easeOut',
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: '#ffffff',
            }}
          />

          {/* subtle shutter-frame flicker */}
          <motion.div
            initial={false}
            animate={
              flash
                ? { opacity: [0, 1, 0] }
                : { opacity: 0 }
            }
            transition={{
              duration: 0.45,
              times: [0, 0.2, 1],
              ease: 'easeOut',
            }}
            className="absolute inset-0 pointer-events-none rounded-[2.3rem] border-4"
            style={{
              borderColor: CREAM,
            }}
          />
        </div>
      </motion.div>

      {/* star — enlarged and nudged out so it still sits cleanly on the corner */}
      <motion.div
        className="absolute -top-11 -right-10 z-20"
        animate={{
          rotate: [0, 12, -8, 0],
          scale: [1, 1.12, 0.95, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        }}
      >
        <Star
          size={80}
          fill={YELLOW}
          stroke={NAVY}
          strokeWidth={2}
        />
      </motion.div>

      {/* handwritten label */}
      <motion.div
        initial={{
          opacity: 0,
          x: -20,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          delay: 0.6,
        }}
        whileHover={{
          scale: 1.08,
          rotate: 2,
          transition: HOVER_TRANSITION,
        }}
        className="absolute -bottom-7 -right-8 rounded-full px-5 py-2 border-2 cursor-default"
        style={{
          background: PINK,
          color: CREAM,
          borderColor: NAVY,
          transform: 'rotate(7deg)',
          boxShadow: `4px 4px 0 ${NAVY}`,
        }}
      >
        <span className="font-black italic text-lg">
          yep, that's me!
        </span>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   DIPLOMA
   Entrance is intentionally synchronized with the Bio card.
   The dot, strings, and certificate are all inside the same
   scroll-triggered motion container.
------------------------------------------------------- */

function Diploma() {
  const ref = useRef(null);

  const [pos, setPos] = useState({
    x: -300,
    y: -300,
  });

  const [hover, setHover] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const onMove = (e) => {
    if (!ref.current) return;

    const r = ref.current.getBoundingClientRect();

    setPos({
      x: e.clientX - r.left,
      y: e.clientY - r.top,
    });
  };

  const mask = `circle(115px at ${pos.x}px ${pos.y}px)`;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 35,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
        delay: 0.25,
        ease: 'easeOut',
      }}
      className="relative flex flex-col items-center"
    >
      {/* pin / hanging dot
          No separate animation — it enters with the diploma. */}
      <div
        className="relative z-20 w-5 h-5 rounded-full mt-3 translate-y-2"
        style={{
          background: NAVY,
          border: `3px solid ${CREAM}`,
          boxShadow: `0 2px 0 rgba(0,0,0,0.25)`,
        }}
      />

      {/* hanging certificate */}
      <motion.div
        style={{
          transformOrigin: 'top center',
        }}
        whileHover={{
          rotate: -1,
          scale: 1.01,
          transition: HOVER_TRANSITION,
        }}
        className="w-full max-w-sm"
      >
        {/* strings */}
        <svg
          width="100%"
          height="42"
          viewBox="0 0 100 40"
          preserveAspectRatio="none"
          style={{
            display: 'block',
          }}
        >
          <line
            x1="50"
            y1="0"
            x2="8"
            y2="40"
            stroke={NAVY}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />

          <line
            x1="50"
            y1="0"
            x2="92"
            y2="40"
            stroke={NAVY}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setRevealed((prev) => !prev)}
          whileTap={{ scale: 0.985 }}
          className="relative rounded-2xl border-[4px] overflow-hidden cursor-pointer select-none"
          style={{
            background: CREAM,
            borderColor: NAVY,
            boxShadow: `8px 10px 0 rgba(2,48,71,0.3)`,
          }}
        >
          <motion.div
            animate={
              revealed
                ? {
                    rotate: [0, -0.7, 0.7, -0.4, 0],
                  }
                : {}
            }
            transition={{
              duration: 0.5,
            }}
            className="relative"
          >
            {/* certificate */}
            <div
              className="relative p-7 md:p-8 text-center"
              style={{
                color: NAVY,
              }}
            >
              <p className="text-[11px] font-black uppercase tracking-[0.35em]">
                BACHELOR'S DEGREE
              </p>

              <div
                className="mt-2 mx-auto h-1 rounded-full"
                style={{
                  width: '5.5rem',
                  background: ORANGE,
                }}
              />

              <h3 className="mt-4 font-black text-2xl md:text-3xl leading-tight">
                Ontario Tech University
              </h3>

              <p className="mt-2 font-bold text-sm md:text-base">
                Software Engineering · 2026
              </p>

              {/* education pills */}
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {EDUCATION_PILLS.map((p) => (
                  <span
                    key={p}
                    className="px-3 py-1.5 rounded-full text-xs font-black border-2"
                    style={{
                      borderColor: NAVY,
                      background: 'transparent',
                      color: NAVY,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>

              {/* seal */}
              <div className="mt-6 flex justify-center">
                <div className="relative">
                  <div
                    className="w-14 h-14 rounded-full border-[3px] flex items-center justify-center"
                    style={{
                      background: YELLOW,
                      borderColor: NAVY,
                    }}
                  >
                    <Award
                      className="w-7 h-7"
                      style={{
                        color: NAVY,
                      }}
                    />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex">
                    <div
                      className="w-3 h-5"
                      style={{
                        background: PINK,
                        clipPath:
                          'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)',
                      }}
                    />

                    <div
                      className="w-3 h-5"
                      style={{
                        background: RED,
                        clipPath:
                          'polygon(0 0, 100% 0, 100% 100%, 50% 72%, 0 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* HOVER SPOTLIGHT */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                background: NAVY,
                opacity: hover && !revealed ? 1 : 0,
                clipPath: mask,
                WebkitClipPath: mask,
                transition: 'opacity 120ms linear',
              }}
            >
              <div className="text-center px-6">
                <div
                  className="font-black italic uppercase leading-[0.78] tracking-[-0.06em]"
                  style={{
                    color: CREAM,
                    fontSize: 'clamp(2.7rem, 7vw, 5.5rem)',
                    transform: 'rotate(-5deg)',
                    textShadow: `4px 4px 0 ${ORANGE}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  FINALLY
                  <br />
                  DONE!
                </div>

                <div
                  className="mt-3 font-black uppercase tracking-[0.2em] text-xs"
                  style={{
                    color: YELLOW,
                  }}
                >
                  2026 ✦ WE MADE IT
                </div>
              </div>
            </div>

            {/* FULL CLICK REVEAL */}
            <motion.div
              initial={false}
              animate={{
                opacity: revealed ? 1 : 0,
              }}
              transition={{
                duration: 0.22,
                ease: 'easeOut',
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                background: NAVY,
              }}
            >
              {/* Decorative stars — only animate once revealed */}
              {revealed && (
                <>
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        repeat: Infinity,
                        duration: 8,
                        ease: 'linear',
                      },
                      scale: {
                        repeat: Infinity,
                        duration: 2,
                      },
                    }}
                    className="absolute top-5 left-5"
                  >
                    <Sparkles
                      size={28}
                      strokeWidth={3}
                      style={{
                        color: YELLOW,
                      }}
                    />
                  </motion.div>

                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                    }}
                    className="absolute bottom-6 right-7"
                  >
                    <Star
                      size={26}
                      fill={PINK}
                      strokeWidth={3}
                      style={{
                        color: PINK,
                      }}
                    />
                  </motion.div>

                  <motion.div
                    animate={{
                      x: [-3, 3, -3],
                      y: [0, -4, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.5,
                    }}
                    className="absolute top-7 right-7"
                  >
                    <Heart
                      size={23}
                      fill={RED}
                      strokeWidth={3}
                      style={{
                        color: RED,
                      }}
                    />
                  </motion.div>
                </>
              )}

              <div className="relative z-10 text-center px-6">
                <motion.div
                  initial={false}
                  animate={
                    revealed
                      ? {
                          scale: [0.7, 1.08, 1],
                          rotate: [8, -5, -5],
                        }
                      : {
                          scale: 0.7,
                        }
                  }
                  transition={{
                    duration: 0.65,
                    type: 'spring',
                    stiffness: 180,
                    damping: 10,
                  }}
                  className="font-black italic uppercase leading-[0.78] tracking-[-0.06em]"
                  style={{
                    color: CREAM,
                    fontSize: 'clamp(2.7rem, 7vw, 5.5rem)',
                    textShadow: `5px 6px 0 ${ORANGE}`,
                    whiteSpace: 'nowrap',
                  }}
                >
                  FINALLY
                  <br />
                  DONE!
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: revealed ? 1 : 0,
                    y: revealed ? 0 : 10,
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                  }}
                  className="mt-5 font-black uppercase tracking-[0.2em] text-xs"
                  style={{
                    color: YELLOW,
                  }}
                >
                  2026 ✦ WE MADE IT ✦
                </motion.div>

                <motion.div
                  initial={false}
                  animate={{
                    opacity: revealed ? 1 : 0,
                    scale: revealed ? 1 : 0.8,
                  }}
                  transition={{
                    delay: 0.35,
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 border-2"
                  style={{
                    color: NAVY,
                    background: YELLOW,
                    borderColor: CREAM,
                    boxShadow: `3px 3px 0 ${ORANGE}`,
                  }}
                >
                  <Zap
                    size={14}
                    fill={NAVY}
                  />

                  <span className="text-xs font-black uppercase tracking-wider">
                    Software Engineer
                  </span>
                </motion.div>
              </div>

              {/* Confetti */}
              {revealed &&
                [
                  { x: '12%', y: '18%', color: PINK, r: -20 },
                  { x: '82%', y: '22%', color: CYAN, r: 25 },
                  { x: '18%', y: '76%', color: YELLOW, r: 15 },
                  { x: '87%', y: '72%', color: RED, r: -25 },
                  { x: '6%', y: '48%', color: ORANGE, r: 35 },
                  { x: '94%', y: '48%', color: CYAN, r: -35 },
                ].map((piece, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-1.5 rounded-full"
                    style={{
                      left: piece.x,
                      top: piece.y,
                      background: piece.color,
                      transform: `rotate(${piece.r}deg)`,
                    }}
                    animate={{
                      y: [0, -8, 0],
                      rotate: [
                        piece.r,
                        piece.r + 15,
                        piece.r,
                      ],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8 + i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   STATIC SQUIGGLE
------------------------------------------------------- */

function StaticSquiggle({
  color = NAVY,
  width = 100,
  height = 35,
}) {
  return (
    <svg
      viewBox="0 0 120 40"
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M2 20 C 12 2, 22 38, 32 20 S 52 2, 62 20 S 82 38, 92 20 S 108 5, 118 20"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------------------------------
   FLOATING DOODLES
------------------------------------------------------- */

function FloatingDoodles() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  const items = [
    {
      pos: 'absolute top-[10%] right-[5%] md:right-[10%]',
      node: (
        <Sparkles
          size={34}
          strokeWidth={3}
          style={{ color: YELLOW }}
        />
      ),
    },
    {
      pos: 'absolute left-[3%] top-[45%]',
      node: (
        <ArrowDownRight
          size={45}
          strokeWidth={3}
          style={{ color: NAVY }}
        />
      ),
    },
    {
      pos: 'absolute top-[20%] left-[18%]',
      node: (
        <Star
          size={24}
          fill={PINK}
          strokeWidth={3}
          style={{ color: PINK }}
        />
      ),
    },
    {
      pos: 'absolute top-[60%] right-[2%]',
      node: (
        <Heart
          size={30}
          fill={RED}
          strokeWidth={3}
          style={{ color: RED }}
        />
      ),
    },
    {
      pos: 'absolute bottom-[20%] left-[46%]',
      node: (
        <Zap
          size={28}
          fill={YELLOW}
          strokeWidth={3}
          style={{ color: NAVY }}
        />
      ),
    },
    {
      pos: 'absolute bottom-[12%] right-[18%]',
      node: (
        <Circle
          size={42}
          strokeWidth={2}
          strokeDasharray="4 7"
          style={{ color: CREAM }}
        />
      ),
    },

    {
      pos: 'absolute top-[15%] left-[48%]',
      node: (
        <StaticSquiggle
          color={PINK}
          width={85}
          height={30}
        />
      ),
    },
    {
      pos: 'absolute top-[39%] right-[4%]',
      node: (
        <StaticSquiggle
          color={YELLOW}
          width={90}
          height={30}
        />
      ),
    },
    {
      pos: 'absolute bottom-[31%] left-[5%]',
      node: (
        <StaticSquiggle
          color={CREAM}
          width={105}
          height={35}
        />
      ),
    },
    {
      pos: 'absolute bottom-[6%] right-[40%]',
      node: (
        <StaticSquiggle
          color={ORANGE}
          width={75}
          height={28}
        />
      ),
    },

    {
      pos: 'absolute top-[31%] left-[8%] text-4xl font-black',
      node: <span style={{ color: ORANGE }}>×</span>,
    },
    {
      pos: 'absolute bottom-[28%] right-[6%] text-3xl font-black',
      node: <span style={{ color: CYAN }}>×</span>,
    },
    {
      pos: 'absolute top-[73%] left-[28%] text-2xl font-black',
      node: <span style={{ color: YELLOW }}>+</span>,
    },

    {
      pos: 'absolute top-[15%] left-[42%]',
      node: (
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: 9999,
            background: PINK,
          }}
        />
      ),
    },
    {
      pos: 'absolute top-[35%] right-[22%]',
      node: (
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: 9999,
            background: YELLOW,
          }}
        />
      ),
    },
    {
      pos: 'absolute top-[72%] left-[8%]',
      node: (
        <div
          style={{
            width: 11,
            height: 11,
            borderRadius: 9999,
            background: CYAN,
          }}
        />
      ),
    },
    {
      pos: 'absolute top-[83%] right-[38%]',
      node: (
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: 9999,
            background: ORANGE,
          }}
        />
      ),
    },
    {
      pos: 'absolute top-[53%] left-[51%]',
      node: (
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: 9999,
            background: CREAM,
          }}
        />
      ),
    },

    {
      pos: 'absolute top-[48%] left-[21%]',
      node: (
        <svg
          width="38"
          height="38"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M20 2 L22 14 L34 7 L26 18 L39 20 L26 22 L34 34 L22 26 L20 39 L18 26 L6 34 L14 22 L1 20 L14 18 L6 6 L18 14 Z"
            stroke={YELLOW}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      pos: 'absolute bottom-[17%] left-[18%]',
      node: (
        <svg
          width="45"
          height="45"
          viewBox="0 0 50 50"
          fill="none"
        >
          <path
            d="M25 5 C8 5 5 19 16 25 C27 31 38 20 31 13 C24 6 14 14 18 20 C22 26 31 24 32 18"
            stroke={NAVY}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
    },

    {
      pos: 'absolute top-[68%] right-[31%]',
      node: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M16 3 L29 27 L3 27 Z"
            stroke={PINK}
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },

    {
      pos: 'absolute top-[25%] right-[30%]',
      node: (
        <svg
          width="55"
          height="30"
          viewBox="0 0 55 30"
          fill="none"
        >
          <path
            d="M3 22 C14 2 25 28 35 10 C41 0 48 7 52 3"
            stroke={ORANGE}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            y: 60,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            delay: i * 0.05,
            duration: 0.5,
            ease: 'easeOut',
          }}
          className={item.pos}
        >
          {item.node}
        </motion.div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------
   MAIN BIO
------------------------------------------------------- */

export default function Bio({ season }) {
  return (
    <section
      id="bio"
      tabIndex="0"
      aria-labelledby="bio-heading"
      className="relative min-h-screen overflow-hidden py-20 md:py-28 px-6"
      style={{
        background: TEAL,
        color: NAVY,
        '--s-bg': TEAL,
        '--s-text': NAVY,
        '--s-card': CREAM,
        '--s-accent': ORANGE,
      }}
    >
      <FloatingDoodles />

      <div className="relative max-w-6xl mx-auto">
        {/* TOP: BIG HELLO */}

        <div className="relative max-w-5xl">
          <BigGreeting />

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '45%' }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.5,
            }}
            className="h-2 mt-3 rounded-full"
            style={{
              background: NAVY,
              transform: 'rotate(-1deg)',
            }}
          />
        </div>

        {/* COLLAGE */}

        <div className="relative mt-6 xl:mt-8 xl:min-h-[720px]">
          {/* PORTRAIT */}

          <div
            className="
              relative
              w-[72%]
              sm:w-[55%]
              md:w-[45%]
              xl:w-[38%]
              max-w-sm
              xl:absolute
              xl:left-[4%]
              xl:top-[8%]
              z-20
            "
          >
            <PortraitFrame />
          </div>

          {/* BIO COPY */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            whileHover={{
              y: -5,
              transition: HOVER_TRANSITION,
            }}
            className="
              mt-16
              xl:mt-0
              xl:absolute
              xl:right-[3%]
              xl:top-[3%]
              w-full
              xl:w-[42%]
              z-10
            "
          >
            <div
              className="relative rounded-[2rem] border-[3px] p-7 md:p-9"
              style={{
                background: CREAM,
                borderColor: NAVY,
                boxShadow: `8px 9px 0 ${NAVY}`,
                transform: 'rotate(1.5deg)',
              }}
            >
              <div
                className="absolute -top-4 -right-4 px-4 py-1.5 rounded-full border-2 font-black text-xs uppercase tracking-wider"
                style={{
                  background: YELLOW,
                  borderColor: NAVY,
                  transform: 'rotate(5deg)',
                }}
              >
                start here:
              </div>

              <p
                className="text-lg md:text-xl font-bold leading-relaxed"
                style={{
                  color: NAVY,
                }}
              >
                {BODY}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {PILLS.map((pill, index) => (
                  <motion.span
                    key={pill}
                    whileHover={{
                      y: -4,
                      rotate:
                        index % 2 === 0
                          ? -3
                          : 3,
                      transition: HOVER_TRANSITION,
                    }}
                    className="px-3 py-1.5 rounded-full border-2 text-xs font-black"
                    style={{
                      borderColor: NAVY,
                      background:
                        index === 0
                          ? CYAN
                          : index === 1
                          ? PINK
                          : YELLOW,
                      boxShadow: `2px 2px 0 ${NAVY}`,
                    }}
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* DIPLOMA */}

          <div
            className="
              mt-20
              xl:mt-0
              xl:absolute
              xl:right-[9%]
              xl:top-[38%]
              w-full
              xl:w-[47%]
              z-30
            "
          >
            <Diploma />
          </div>

          {/* GRADUATE CHARACTER */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              rotate: 5,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              rotate: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.35,
              duration: 0.5,
            }}
            className="
              absolute
              hidden
              xl:block
              left-[33%]
              bottom-[2%]
              w-28
              z-40
            "
          >
            <Image
              src={GRAD_URL}
              alt="Graduate illustration"
              fittingType="fit"
              className="w-full h-auto drop-shadow-[4px_5px_0_rgba(2,48,71,0.25)]"
            />
          </motion.div>

          {/* GIANT LOOKING FOR WORK STICKER */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.5,
              rotate: 12,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: -7,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.45,
              type: 'spring',
              stiffness: 100,
              damping: 10,
            }}
            whileHover={{
              scale: 1.05,
              rotate: -4,
              transition: HOVER_TRANSITION,
            }}
            className="
              absolute
              hidden
              xl:block
              left-[0%]
              bottom-[4%]
              z-10
              cursor-default
            "
          >
            <div
              className="font-black italic uppercase leading-[0.75] tracking-[-0.06em]"
              style={{
                color: RED,
                fontSize:
                  'clamp(3rem, 6vw, 6rem)',
                WebkitTextStroke: `2px ${CREAM}`,
                textShadow: `6px 7px 0 ${NAVY}`,
              }}
            >
              LOOKING
              <br />
              FOR WORK
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}