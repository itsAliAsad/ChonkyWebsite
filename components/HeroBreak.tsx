"use client"

import * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

// The photo is 800×708. Everything below works in that coordinate space.
const VW = 1130
const VH = 1000
const SEAM = VW / 2

// A jagged break line, top to bottom.
const seamPts: [number, number][] = [
  [568, -20], [538, 60], [588, 130], [553, 210], [598, 280], [563, 350], [518, 430], [578, 500], [548, 570], [603, 640], [558, 720], [583, 800], [538, 880], [573, 960], [553, 1020],
]
const pct = ([x, y]: [number, number]) => `${((x / VW) * 100).toFixed(2)}% ${((y / VH) * 100).toFixed(2)}%`
const leftClip = `polygon(-10% -10%, ${seamPts.map(pct).join(", ")}, -10% 110%)`
const rightClip = `polygon(110% -10%, ${seamPts.map(pct).join(", ")}, 110% 110%)`

const STRANDS = [230, 330, 420, 520, 610, 700, 790]
const LETTERS = "CHONKY".split("")
const seamPoly = seamPts.map(([x, y]) => `${x},${y}`).join(" ")

/** Molten chocolate that clings to both halves, stretches, thins, and snaps. */
function Goo({ gap }: { gap: MotionValue<number> }) {
  return (
    <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
      <defs>
        <filter id="goo" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="13" result="b" />
          <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -11" result="goo" />
          <feGaussianBlur in="goo" stdDeviation="7" result="soft" />
          <feSpecularLighting in="soft" surfaceScale="5" specularConstant="0.75" specularExponent="55" lightingColor="#ffd9b8" result="spec">
            <feDistantLight azimuth="235" elevation="52" />
          </feSpecularLighting>
          <feComposite in="spec" in2="goo" operator="in" result="shine" />
          <feMerge>
            <feMergeNode in="goo" />
            <feMergeNode in="shine" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#goo)" fill="#3d1e10" stroke="#3d1e10">
        {STRANDS.map((y, i) => (
          <Strand key={y} y={y} i={i} gap={gap} />
        ))}
      </g>
    </svg>
  )
}

function Strand({ y, i, gap }: { y: number; i: number; gap: MotionValue<number> }) {
  // Each strand snaps at its own point, then its ends pull back into the halves.
  const snap = 0.2 + ((i * 5) % 7) * 0.03
  const thick = 64 + ((i * 3) % 4) * 14
  const edge = (g: number, side: -1 | 1) => SEAM + (side * g * VW) / 2 + side * -28
  const d = useTransform(gap, (g) => {
    const L = edge(g, -1)
    const R = edge(g, 1)
    const sag = Math.min(g / snap, 1) * (90 + (i % 3) * 50)
    return `M${L.toFixed(1)} ${y} Q${SEAM} ${(y + sag).toFixed(1)} ${R.toFixed(1)} ${y}`
  })
  const width = useTransform(gap, [0, snap * 0.5, snap * 0.97, snap], [thick, thick * 0.55, 30, 0])
  const lx = useTransform(gap, (g) => edge(g, -1))
  const rx = useTransform(gap, (g) => edge(g, 1))
  // After the snap, a bead hangs off each edge and shrinks back in.
  const bead = useTransform(gap, [snap, snap + 0.04, snap + 0.2], [thick * 0.55, thick * 0.4, 0])
  const beadY = useTransform(gap, [snap, snap + 0.2], [y + 20, y + 70])
  return (
    <>
      <motion.path d={d} fill="none" strokeLinecap="round" style={{ strokeWidth: width }} />
      <motion.circle cx={lx} cy={beadY} r={bead} stroke="none" />
      <motion.circle cx={rx} cy={beadY} r={bead} stroke="none" />
    </>
  )
}

/** One half of the cookie, with the broken, underbaked edge showing along the seam. */
function Half({ side, x, y, rotate, edge }: { side: "left" | "right"; x: MotionValue<string>; y: MotionValue<number>; rotate: MotionValue<number>; edge: MotionValue<number> }) {
  return (
    <motion.div
      className="absolute inset-0 drop-shadow-[0_40px_40px_rgba(58,31,22,0.35)]"
      style={{ x, y, rotate, transformOrigin: side === "left" ? "30% 60%" : "70% 60%" }}
    >
      <div className="absolute inset-0" style={{ clipPath: side === "left" ? leftClip : rightClip }}>
        <img
          src="/cookies/golden-chunk.webp"
          alt={side === "right" ? "A thick, craggy Golden Chunk cookie" : ""}
          draggable={false}
          className="absolute inset-0 size-full select-none"
        />
        <motion.svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 size-full" style={{ opacity: edge }} aria-hidden>
          <defs>
            <filter id={`crumb-${side}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" seed={side === "left" ? 3 : 8} />
              <feDisplacementMap in="SourceGraphic" scale="22" />
            </filter>
            <mask id={`in-${side}`}>
              <ellipse cx={SEAM} cy={VH / 2} rx={VW * 0.46} ry={VH * 0.44} fill="#fff" />
            </mask>
          </defs>
          <g filter={`url(#crumb-${side})`} mask={`url(#in-${side})`} fill="none" strokeLinejoin="round">
            <polyline points={seamPoly} stroke="#e3c088" strokeWidth={70} />
            <polyline points={seamPoly} stroke="#c99659" strokeWidth={30} />
            <polyline points={seamPoly} stroke="#4a2616" strokeWidth={10} />
          </g>
        </motion.svg>
      </div>
    </motion.div>
  )
}

function Crumb({ i, p }: { i: number; p: MotionValue<number> }) {
  const x = ((i * 37) % 11) - 5
  const y = useTransform(p, [0.12, 0.7], [0, 260 + (i % 4) * 90])
  const xx = useTransform(p, [0.12, 0.7], [0, x * 24])
  const rotate = useTransform(p, [0.12, 0.7], [0, (i % 2 ? 1 : -1) * 280])
  const opacity = useTransform(p, [0.1, 0.14, 0.6, 0.72], [0, 1, 1, 0])
  const s = 8 + (i % 3) * 6
  return (
    <motion.span
      className="absolute left-1/2 rounded-[3px]"
      style={{ top: `${22 + ((i * 13) % 50)}%`, width: s, height: s * 0.8, background: i % 3 ? "#b8773d" : "#3a1d12", x: xx, y, rotate, opacity }}
    />
  )
}

export default function HeroBreak() {
  const ref = React.useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })

  const gap = useTransform(p, [0.06, 0.62], [0, 0.85], { clamp: true })
  const leftX = useTransform(gap, (g) => `${(-g * 50).toFixed(2)}%`)
  const rightX = useTransform(gap, (g) => `${(g * 50).toFixed(2)}%`)
  const leftR = useTransform(gap, [0, 0.85], [0, -10])
  const rightR = useTransform(gap, [0, 0.85], [0, 12])
  const halfY = useTransform(gap, [0, 0.85], [0, 50])
  const cookieScale = useTransform(p, [0, 0.5], [1, 1.12])
  const introOut = useTransform(p, [0, 0.12], [1, 0])
  const introY = useTransform(p, [0, 0.12], [0, 30])
  const reveal = useTransform(p, [0.4, 0.56], [0, 1])
  const revealScale = useTransform(p, [0.4, 0.66], [0.85, 1])
  const wordY = useTransform(p, [0, 0.4, 0.7], ["0%", "-12%", "-120%"])
  const wordOpacity = useTransform(p, [0.55, 0.66], [1, 0])
  const edgeIn = useTransform(gap, [0, 0.03], [0, 1])

  return (
    <section ref={ref} id="top" className="relative h-[270vh]" aria-label="Chonky cookies">
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* soft light on the counter */}
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_62%,#fbe3e6_0%,transparent_70%)]" />

        {/* the wordmark the cookie lands on */}
        <motion.h1
          aria-label="Chonky"
          className="absolute inset-x-0 top-[15svh] flex select-none justify-center font-display leading-[0.8] text-cocoa md:top-[9svh]"
          style={{ fontSize: "min(22.5vw, 40svh)", y: wordY, opacity: wordOpacity }}
        >
          {LETTERS.map((l, i) => {
            const fromCenter = Math.abs(i - 2.5)
            return (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block origin-bottom"
                initial={reduce ? false : { y: "60%", opacity: 0 }}
                animate={
                  reduce
                    ? undefined
                    : {
                        y: ["60%", "0%", "0%", "7%", "-4%", "0%"],
                        scaleY: [1, 1, 1, 0.82, 1.06, 1],
                        opacity: [0, 1, 1, 1, 1, 1],
                      }
                }
                transition={{
                  duration: 1.9,
                  times: [0, 0.3, 0.52, 0.6, 0.72, 0.85],
                  delay: i * 0.05 + fromCenter * 0.02,
                  ease: "easeOut",
                }}
              >
                {l}
              </motion.span>
            )
          })}
        </motion.h1>

        {/* the cookie */}
        <motion.div
          className="absolute left-1/2 top-[56%] aspect-[1130/1000] w-[min(92vw,78svh)] md:top-[60%] md:w-[min(60vw,74svh)]"
          style={{ x: "-50%", y: "-50%", scale: cookieScale }}
        >
          <motion.div
            className="relative size-full"
            initial={reduce ? false : { y: "-120svh", rotate: -35 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1.2, delay: 0.35 }}
          >
            <Goo gap={gap} />
            <Half side="left" x={leftX} y={halfY} rotate={leftR} edge={edgeIn} />
            <Half side="right" x={rightX} y={halfY} rotate={rightR} edge={edgeIn} />
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {Array.from({ length: 12 }, (_, i) => (
                <Crumb key={i} i={i} p={p} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* what's inside */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-[58%] flex -translate-y-1/2 flex-col items-center px-6 text-center md:top-[60%]"
          style={{ opacity: reveal, scale: revealScale }}
        >
          <p className="eyebrow mb-4">Broken open, just now</p>
          <p className="type-name text-[clamp(2.8rem,7.4vw,7rem)]">
            The middle
            <br />
            is the point.
          </p>
          <p className="mt-5 max-w-sm text-base text-cocoa-soft md:text-lg">Crisp outside. Barely set inside. 170 g, so there is a lot of inside.</p>
        </motion.div>

        {/* intro copy */}
        <motion.div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-4 pb-6 md:px-8 md:pb-8"
          style={{ opacity: introOut, y: introY }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p className="max-w-[19rem] text-sm leading-snug md:text-base">
            <span className="font-bold">NYC-style cookies.</span> Thick as a fist, 170 g each, and gooey all the way through.
          </p>
          <div className="flex flex-col items-end gap-3">
            <a href="#pack" className="btn btn-cocoa h-12 px-6 text-sm">
              Pack a box
            </a>
            <span className="eyebrow hidden md:block">Scroll to break one open ↓</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
