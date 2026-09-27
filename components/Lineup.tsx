"use client"

import * as React from "react"
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import CookiePhoto from "@/components/cookie/CookiePhoto"
import { allFlavors, collectionLabels, formatRs } from "@/lib/flavors"
import { useBox } from "@/components/box/BoxContext"

export default function Lineup() {
  const { add } = useBox()
  const [hover, setHover] = React.useState<string | null>(null)
  const listRef = React.useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 260, damping: 26 })
  const y = useSpring(my, { stiffness: 260, damping: 26 })
  const hovered = allFlavors.find((f) => f.id === hover)

  const onMove = (e: React.PointerEvent) => {
    const r = listRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <section id="lineup" className="relative scroll-mt-20 px-4 pb-16 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">The lineup · {allFlavors.length} flavors</p>
            <h2 className="type-name text-[clamp(3.2rem,9vw,8.5rem)]">Pick your poison.</h2>
          </div>
          <p className="max-w-xs text-cocoa-soft">Every cookie weighs 170 g. Mix any flavors in one box.</p>
        </header>

        <div ref={listRef} className="relative" onPointerMove={onMove} onPointerLeave={() => setHover(null)}>
        <ul className="border-t-2 border-cocoa">
          {allFlavors.map((f) => (
            <li
              key={f.id}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHover(f.id)}
              className="group relative grid grid-cols-[64px_1fr_auto] items-center gap-x-4 border-b-2 border-dotted border-cocoa/40 py-5 md:grid-cols-[1fr_minmax(0,22rem)_auto] md:gap-x-10 md:py-7"
            >
              <CookiePhoto flavor={f} className="size-16 drop-shadow-[0_6px_5px_rgba(58,31,22,0.3)] md:hidden" />
              <div className="min-w-0">
                <h3 className="type-name text-[clamp(2.1rem,6.4vw,6rem)] transition-transform duration-500 [transition-timing-function:var(--ease-squish)] md:group-hover:translate-x-6">
                  {f.name}
                </h3>
                <p className="mt-2 text-sm text-cocoa-soft md:hidden">{f.description}</p>
              </div>
              <div className="hidden md:block">
                <span className="eyebrow text-[10px] opacity-60">{collectionLabels[f.collection]}</span>
                <p className="mt-1 leading-snug text-cocoa-soft">{f.description}</p>
              </div>
              <div
                className="col-start-3 row-span-2 flex flex-col items-end gap-3 md:row-span-1 md:flex-row md:items-center md:gap-6"
                onPointerEnter={() => setHover(null)}
                onPointerLeave={(e) => e.pointerType === "mouse" && setHover(f.id)}
              >
                <span className="font-mono text-sm tabular-nums md:text-base">{formatRs(f.price)}</span>
                <button
                  type="button"
                  onClick={(e) => add(f.id, e.currentTarget.getBoundingClientRect())}
                  className="btn btn-cocoa size-12 text-2xl leading-none md:size-14"
                  aria-label={`Add ${f.name} to box`}
                >
                  <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                    <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>

          {/* the cookie that follows your cursor down the menu */}
          <motion.div aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block" style={{ x, y }}>
            <AnimatePresence mode="popLayout">
              {hovered && (
                <motion.div
                  key={hovered.id}
                  className="-ml-[130px] -mt-[130px] size-[260px]"
                  initial={{ scale: 0.4, rotate: -60, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.4, rotate: 60, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CookiePhoto flavor={hovered} className="size-full drop-shadow-[0_30px_24px_rgba(58,31,22,0.35)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
