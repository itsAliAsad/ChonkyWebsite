"use client"

import * as React from "react"
import { motion, useAnimationControls } from "motion/react"
import { useBox } from "@/components/box/BoxContext"

export default function Nav() {
  const { count, size, landedAt } = useBox()
  const pill = useAnimationControls()
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    on()
    window.addEventListener("scroll", on, { passive: true })
    return () => window.removeEventListener("scroll", on)
  }, [])

  React.useEffect(() => {
    if (landedAt) pill.start({ scale: [1, 1.18, 0.96, 1], transition: { duration: 0.45 } })
  }, [landedAt, pill])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full py-1.5 pl-5 pr-1.5 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${scrolled ? "bg-pink/85 shadow-[0_10px_30px_-12px_rgba(58,31,22,0.35)] backdrop-blur-md" : ""}`}
      >
        <a href="#top" className="font-display text-2xl leading-none text-cocoa md:text-3xl" aria-label="Chonky, back to top">
          CHONKY
        </a>
        <nav className="flex items-center gap-2 md:gap-6">
          <a href="#lineup" className="hidden text-sm font-bold underline-offset-4 hover:underline sm:block">
            Flavors
          </a>
          <a href="#pack" className="hidden text-sm font-bold underline-offset-4 hover:underline sm:block">
            Pack a box
          </a>
          <motion.a
            href="#pack"
            data-box-pill
            animate={pill}
            className="flex h-11 items-center gap-3 rounded-full bg-cocoa pl-4 pr-2 text-sm font-bold text-butter shadow-[0_4px_0_#1d0e09]"
            aria-label={`Your box: ${count} of ${size} cookies`}
          >
            Your box
            <span className="flex items-center gap-1 rounded-full bg-butter/15 px-2 py-1.5" aria-hidden>
              {Array.from({ length: size }, (_, i) => (
                <span key={i} className={`size-2 rounded-full transition-colors duration-300 ${i < count ? "bg-butter" : "bg-butter/25"}`} />
              ))}
            </span>
          </motion.a>
        </nav>
      </div>
    </header>
  )
}
