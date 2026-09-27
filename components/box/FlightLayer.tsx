"use client"

import * as React from "react"
import { animate } from "motion"
import CookiePhoto from "@/components/cookie/CookiePhoto"
import { flavorById } from "@/lib/flavors"
import { useBox } from "./BoxContext"

type Flight = ReturnType<typeof useBox>["flights"][number]

const onScreen = (r: DOMRect) => r.width > 0 && r.bottom > 40 && r.top < window.innerHeight - 40

/** A cookie thrown from where it was tapped into its well (or the nav pill when the box is off-screen). */
function FlyingCookie({ flight }: { flight: Flight }) {
  const { land } = useBox()
  const ref = React.useRef<HTMLDivElement>(null)
  const flavor = flavorById.get(flight.flavorId)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    let cancelled = false
    // Wait two frames so an upgraded box has re-rendered its wells before we measure.
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (cancelled) return
        const well = document.querySelector<HTMLElement>(`[data-well="${flight.well}"]`)
        const pill = document.querySelector<HTMLElement>("[data-box-pill]")
        let to = well?.getBoundingClientRect()
        const toPill = !to || !onScreen(to)
        if (toPill) to = pill?.getBoundingClientRect()
        if (!to) return land(flight)

        const from = flight.from
        const size = from.width
        const fx = from.left
        const fy = from.top
        const tx = to.left + to.width / 2 - size / 2
        const ty = to.top + to.height / 2 - size / 2
        const lift = Math.min(fy, ty) - Math.max(120, Math.abs(tx - fx) * 0.25)
        const endScale = toPill ? 0.22 : to.width / size
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const duration = reduce ? 0.01 : 0.72

        animate(
          el,
          {
            x: [fx, tx],
            y: [fy, lift, ty],
            scale: [1, 1.15, endScale],
            rotate: [0, toPill ? 180 : 320 + Math.random() * 60],
            opacity: toPill ? [1, 1, 0.2] : 1,
          },
          {
            duration,
            x: { duration, ease: [0.45, 0, 0.35, 1] },
            y: { duration, times: [0, 0.42, 1], ease: ["easeOut", "easeIn"] },
            scale: { duration, times: [0, 0.4, 1] },
          },
        ).then(() => land(flight))
      }),
    )
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!flavor) return null
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[80] will-change-transform"
      style={{ width: flight.from.width, height: flight.from.width, transform: `translate(${flight.from.left}px, ${flight.from.top}px)` }}
    >
      <CookiePhoto flavor={flavor} className="size-full drop-shadow-[0_24px_18px_rgba(58,31,22,0.35)]" />
    </div>
  )
}

export default function FlightLayer() {
  const { flights } = useBox()
  return (
    <>
      {flights.map((f) => (
        <FlyingCookie key={f.key} flight={f} />
      ))}
    </>
  )
}
