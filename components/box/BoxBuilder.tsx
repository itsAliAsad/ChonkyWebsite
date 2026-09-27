"use client"

import * as React from "react"
import { AnimatePresence, motion, useSpring, useTransform, useAnimationControls } from "motion/react"
import { toast } from "sonner"
import CookiePhoto from "@/components/cookie/CookiePhoto"
import { allFlavors, COOKIE_GRAMS, DELIVERY_FEE, flavorById, formatRs } from "@/lib/flavors"
import { getCheckoutUrl } from "@/lib/shopify"
import { BOX_SIZES, useBox } from "./BoxContext"

const TILT = 42

/* ─────────────────────────── the box ─────────────────────────── */

function Well({ index }: { index: number }) {
  const { wells, pending, remove, landedAt, closed } = useBox()
  const id = wells[index]
  const flavor = id ? flavorById.get(id) : undefined
  const visible = flavor && !pending.has(index)
  const controls = useAnimationControls()

  React.useEffect(() => {
    if (landedAt?.well === index) {
      controls.start({
        scaleX: [1.18, 0.94, 1.03, 1],
        scaleY: [0.8, 1.08, 0.98, 1],
        transition: { duration: 0.5, ease: "easeOut" },
      })
    }
  }, [landedAt, index, controls])

  return (
    <div data-well={index} className="relative aspect-square rounded-full" style={{ transformStyle: "preserve-3d" }}>
      {/* the paper cup the cookie sits in */}
      <div className="absolute inset-[3%] rounded-full bg-[#b37e4b] shadow-[inset_0_6px_14px_rgba(58,31,22,0.55),inset_0_-2px_0_rgba(255,235,200,0.35)]" />
      <AnimatePresence>
        {visible && (
          <motion.button
            key={id}
            type="button"
            disabled={closed}
            onClick={() => remove(index)}
            aria-label={`Remove ${flavor.name} from box`}
            className="group absolute bottom-[26%] left-[-14%] w-[128%] origin-bottom"
            style={{ transformStyle: "preserve-3d" }}
            initial={false}
            // Cookies stand up toward the camera so their height shows; they lie down when the lid goes on.
            animate={{ rotateX: closed ? 0 : -TILT - 4 }}
            exit={{ scale: 0, opacity: 0, transition: { duration: 0.25 } }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.div animate={controls} className="origin-bottom">
              <CookiePhoto
                flavor={flavor}
                className="block w-full drop-shadow-[0_8px_6px_rgba(58,31,22,0.45)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:-rotate-3"
              />
            </motion.div>
            <span className="pointer-events-none absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              <span className="rounded-full bg-cocoa px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-butter">Remove</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

function Crumbs({ burst }: { burst: number }) {
  // A few crumbs jump out of the box whenever a cookie lands.
  const bits = React.useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        x: (Math.random() - 0.5) * 260,
        y: -60 - Math.random() * 90,
        r: Math.random() * 360,
        s: 4 + Math.random() * 6,
        c: i % 3 === 0 ? "#3a1d12" : "#c98b45",
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burst],
  )
  if (!burst) return null
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-30" key={burst}>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[2px]"
          style={{ width: b.s, height: b.s * 0.8, background: b.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: [0, b.y, b.y + 160], rotate: b.r, opacity: [1, 1, 0] }}
          transition={{ duration: 0.9, ease: "easeOut", y: { duration: 0.9, times: [0, 0.35, 1], ease: ["easeOut", "easeIn"] } }}
        />
      ))}
    </div>
  )
}

function Lid({ w, d, h, onSlam }: { w: number; d: number; h: number; onSlam?: () => void }) {
  const { closed, note } = useBox()
  return (
    <motion.div
      className="absolute left-0 top-0"
      style={{ width: w, height: d, transformStyle: "preserve-3d", pointerEvents: closed ? "auto" : "none" }}
      initial={false}
      animate={closed ? { z: h + 1, opacity: 1, rotateZ: 0 } : { z: 520, opacity: 0, rotateZ: -8 }}
      transition={closed ? { type: "spring", stiffness: 260, damping: 17, opacity: { duration: 0.15 } } : { duration: 0.35, ease: "easeIn" }}
      onAnimationComplete={() => closed && onSlam?.()}
    >
      {/* outside of the lid */}
      <div className="kraft absolute inset-0 overflow-hidden rounded-[10px] [backface-visibility:hidden] shadow-[inset_0_0_0_2px_rgba(58,31,22,0.18)]">
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-1 text-cocoa">
            <span className="font-display leading-none" style={{ fontSize: Math.min(w, d * 2) * 0.16 }}>
              CHONKY
            </span>
            <span className="eyebrow text-[9px] opacity-70">Thick cookies · handle with greed</span>
            {note && (
              <span className="mt-2 max-w-[80%] -rotate-3 text-center font-hand leading-none text-cocoa/90" style={{ fontSize: Math.max(18, w * 0.055) }}>
                {note}
              </span>
            )}
          </div>
        </div>
        {/* the sticker that seals it */}
        <AnimatePresence>
          {closed && (
            <motion.div
              className="absolute right-[7%] top-[12%] grid size-[74px] place-items-center rounded-full bg-cherry text-center font-mono text-[9px] font-medium uppercase leading-tight tracking-wider text-paper shadow-[0_3px_0_rgba(58,31,22,0.35)]"
              initial={{ scale: 2.2, opacity: 0, rotate: -40 }}
              animate={{ scale: 1, opacity: 1, rotate: 12 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: 0.45, type: "spring", stiffness: 400, damping: 14 }}
            >
              Packed
              <br />
              with
              <br />
              greed
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function useWellSize() {
  const [s, setS] = React.useState(128)
  React.useEffect(() => {
    const on = () => {
      const vw = window.innerWidth
      const size = vw >= 1024 ? (vw - 64 - 250 - 340 - 80) / 4.6 : vw >= 640 ? vw * 0.15 : (vw - 32) / 4.7
      setS(Math.round(Math.max(70, Math.min(132, size))))
    }
    on()
    window.addEventListener("resize", on)
    return () => window.removeEventListener("resize", on)
  }, [])
  return s
}

function BoxOnScale() {
  const { size, landedAt, grams, count } = useBox()
  const well = useWellSize()
  const cols = size === 2 ? 2 : size === 4 ? 2 : 3
  const rows = size === 2 ? 1 : 2
  const pad = Math.round(well * 0.14)
  const gap = Math.round(well * 0.1)
  const w = cols * well + (cols - 1) * gap + pad * 2
  const d = rows * well + (rows - 1) * gap + pad * 2
  const h = Math.round(well * 0.42)
  const rim = Math.round(well * 0.32)
  const plateW = 3 * well + 2 * gap + pad * 2 + rim * 2
  const plateD = d + rim * 1.6

  // The platform dips a little under each cookie and springs back.
  const dip = useSpring(0, { stiffness: 420, damping: 11 })
  React.useEffect(() => {
    if (!landedAt) return
    dip.jump(9)
    dip.set(0)
  }, [landedAt, dip])
  const [burst, setBurst] = React.useState(0)
  React.useEffect(() => {
    if (landedAt) setBurst(landedAt.t)
  }, [landedAt])

  const shown = useSpring(0, { stiffness: 90, damping: 18 })
  React.useEffect(() => {
    shown.set(grams)
  }, [grams, shown])
  const readout = useTransform(shown, (v) => String(Math.round(v)).padStart(4, "0"))

  const wall = "absolute kraft [backface-visibility:visible]"

  return (
    <div className="relative mx-auto flex flex-col items-center">
      <div className="relative" style={{ perspective: 1500, perspectiveOrigin: "50% 10%", height: plateD * 0.8 + h * 2.4 }}>
        <motion.div
          className="relative"
          style={{ y: dip, width: plateW, height: plateD, transformStyle: "preserve-3d", rotateX: TILT, marginTop: h * 1.6 }}
        >
          {/* scale platform */}
          <div className="absolute inset-0 rounded-[26px] bg-[linear-gradient(135deg,#fdf6ee,#e8d6cb)] shadow-[inset_0_2px_0_#fff,inset_0_-3px_0_rgba(58,31,22,0.12)]" />
          <div
            className="absolute left-0 top-full rounded-b-[20px] bg-[linear-gradient(#ead8cc,#c9b0a2)]"
            style={{ width: plateW, height: 36, transformOrigin: "50% 0", transform: "rotateX(-90deg)" }}
          />
          <div className="absolute inset-4 rounded-[18px] border border-cocoa/10" />

          {/* the box */}
          <motion.div
            layout
            className="absolute"
            style={{ left: (plateW - w) / 2, top: (plateD - d) / 2, width: w, height: d, transformStyle: "preserve-3d", z: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            {/* floor */}
            <div className="kraft absolute inset-0 rounded-[10px] shadow-[inset_0_0_24px_rgba(58,31,22,0.35)]" />
            {/* walls */}
            <div className={wall} style={{ left: 0, top: "100%", width: w, height: h, transformOrigin: "50% 0", transform: "rotateX(-90deg)", filter: "brightness(0.82)" }} />
            <div className={wall} style={{ left: 0, bottom: "100%", width: w, height: h, transformOrigin: "50% 100%", transform: "rotateX(90deg)", filter: "brightness(1.05)" }} />
            <div className={wall} style={{ top: 0, right: "100%", width: h, height: d, transformOrigin: "100% 50%", transform: "rotateY(90deg)", filter: "brightness(0.92)" }} />
            <div className={wall} style={{ top: 0, left: "100%", width: h, height: d, transformOrigin: "0 50%", transform: "rotateY(-90deg)", filter: "brightness(0.7)" }} />

            <div
              className="absolute grid"
              style={{ inset: pad, gridTemplateColumns: `repeat(${cols}, ${well}px)`, gap, transformStyle: "preserve-3d" }}
            >
              {Array.from({ length: size }, (_, i) => (
                <Well key={i} index={i} />
              ))}
            </div>
            <Lid w={w} d={d} h={h} onSlam={() => { dip.jump(14); dip.set(0) }} />
          </motion.div>
        </motion.div>
        <Crumbs burst={burst} />
      </div>

      {/* scale readout */}
      <div className="relative z-10 -mt-2 flex items-center gap-4 rounded-2xl bg-cocoa px-5 py-3 text-butter shadow-[0_8px_0_#1d0e09]">
        <span className="eyebrow text-[10px] text-butter/60">Net wt</span>
        <span className="font-mono text-3xl tabular-nums tracking-wider [text-shadow:0_0_12px_rgba(255,227,154,0.55)]">
          <motion.span>{readout}</motion.span>
          <span className="ml-1 text-base">g</span>
        </span>
        <span className="eyebrow hidden text-[10px] text-butter/60 sm:inline">
          {count} × {COOKIE_GRAMS} g
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────── the ticket ─────────────────────────── */

function Ticket() {
  const { wells, size, subtotal, total, grams, count, closed, setClosed, note, setNote, clear } = useBox()
  const [loading, setLoading] = React.useState(false)

  const lines = React.useMemo(() => {
    const m = new Map<string, number>()
    for (const id of wells) if (id) m.set(id, (m.get(id) ?? 0) + 1)
    return Array.from(m.entries()).map(([id, qty]) => ({ flavor: flavorById.get(id)!, qty }))
  }, [wells])

  const empty = size - count

  const checkout = async () => {
    setLoading(true)
    try {
      const url = await getCheckoutUrl(
        lines.map((l) => ({ name: l.flavor.name, quantity: l.qty })),
        note,
      )
      if (url) window.location.href = url
      else toast("Checkout is not available", { description: "The store did not return a checkout link. Try again in a minute." })
    } catch {
      toast("Checkout is not available", { description: "We could not reach the store. Check your connection and try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[380px] -rotate-1 drop-shadow-[0_24px_30px_rgba(58,31,22,0.28)]">
      <div className="ticket grain rounded-t-md px-6 pt-6 font-mono text-[13px] text-cocoa">
        <div className="relative z-[2]">
          <div className="text-center">
            <div className="font-display text-2xl leading-none">CHONKY</div>
            <div className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-60">Bake shop · order ticket</div>
          </div>
          <div className="my-4 border-t border-dashed border-cocoa/40" />
          <div className="flex justify-between text-[11px] uppercase tracking-wider opacity-70">
            <span>Box of {size}</span>
            <span>{empty > 0 ? `${empty} spot${empty > 1 ? "s" : ""} left` : "Full"}</span>
          </div>

          <ul className="mt-3 min-h-[88px] space-y-1.5">
            <AnimatePresence initial={false}>
              {lines.length === 0 && (
                <motion.li key="empty" className="py-5 text-center text-[12px] leading-relaxed opacity-60" exit={{ opacity: 0, height: 0 }}>
                  Nothing here yet.
                  <br />
                  Tap a cookie on the shelf to drop it in.
                </motion.li>
              )}
              {lines.map((l) => (
                <motion.li
                  key={l.flavor.id}
                  layout
                  initial={{ opacity: 0, height: 0, x: -8 }}
                  animate={{ opacity: 1, height: "auto", x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-baseline gap-2 overflow-hidden uppercase"
                >
                  <motion.span key={l.qty} initial={{ scale: 1.6 }} animate={{ scale: 1 }} className="inline-block w-7 tabular-nums">
                    {l.qty}×
                  </motion.span>
                  <span className="truncate">{l.flavor.name}</span>
                  <span className="mx-1 flex-1 translate-y-[-3px] border-b border-dotted border-cocoa/40" />
                  <span className="tabular-nums">{formatRs(l.flavor.price * l.qty)}</span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <div className="my-4 border-t border-dashed border-cocoa/40" />
          <div className="space-y-1 text-[12px] uppercase">
            <div className="flex justify-between opacity-70">
              <span>Cookies</span>
              <span className="tabular-nums">{formatRs(subtotal)}</span>
            </div>
            <div className="flex justify-between opacity-70">
              <span>Delivery</span>
              <span className="tabular-nums">{count ? formatRs(DELIVERY_FEE) : "—"}</span>
            </div>
            <div className="flex justify-between pt-2 text-base font-medium">
              <span>Total</span>
              <span className="tabular-nums">{formatRs(total)}</span>
            </div>
          </div>

          <label className="mt-5 block">
            <span className="text-[10px] uppercase tracking-[0.18em] opacity-60">Write on the lid (optional)</span>
            <input
              value={note}
              maxLength={36}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Happy birthday, Sana!"
              className="mt-1 w-full border-b-2 border-cocoa/30 bg-transparent pb-1 font-hand text-2xl text-cocoa placeholder:text-cocoa/30 focus:border-cocoa focus:outline-none"
            />
          </label>

          <div className="mt-5 grid gap-2">
            {!closed ? (
              <button type="button" className="btn btn-cocoa h-12 w-full text-sm" disabled={!count} onClick={() => setClosed(true)}>
                Close the box
              </button>
            ) : (
              <button type="button" className="btn btn-cocoa h-12 w-full text-sm" disabled={loading} onClick={checkout}>
                {loading ? "Opening checkout…" : `Checkout · ${formatRs(total)}`}
              </button>
            )}
            <div className="flex justify-between text-[11px] uppercase tracking-wider">
              {closed ? (
                <button type="button" className="underline-offset-4 hover:underline" onClick={() => setClosed(false)}>
                  Open the box
                </button>
              ) : (
                <span className="opacity-60">{count ? `${grams} g of cookie` : "Box is empty"}</span>
              )}
              <button type="button" className="underline-offset-4 hover:underline disabled:opacity-30" disabled={!count} onClick={clear}>
                Empty box
              </button>
            </div>
          </div>

          {/* barcode, purely decorative */}
          <div aria-hidden className="mt-6 flex h-9 items-stretch justify-center gap-[2px] opacity-80">
            {"3121132211312113221131".split("").map((n, i) => (
              <span key={i} className="bg-cocoa" style={{ width: Number(n) }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── the shelf ─────────────────────────── */

function BoxControls() {
  const { size, count, setSize, surprise } = useBox()
  return (
    <div className="mb-2 flex w-full flex-wrap items-center justify-center gap-3">
      <div role="radiogroup" aria-label="Box size" className="flex items-center gap-1 rounded-full bg-cocoa/10 p-1">
        {BOX_SIZES.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={size === n}
            disabled={count > n}
            title={count > n ? `Remove ${count - n} cookie${count - n > 1 ? "s" : ""} to use this box` : undefined}
            onClick={() => setSize(n)}
            className={`relative h-9 rounded-full px-4 text-sm font-bold transition-colors disabled:opacity-30 ${size === n ? "text-butter" : "text-cocoa hover:bg-cocoa/10"}`}
          >
            {size === n && <motion.span layoutId="size-pill" className="absolute inset-0 rounded-full bg-cocoa" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
            <span className="relative">Box of {n}</span>
          </button>
        ))}
      </div>
      <button type="button" className="btn btn-ghost h-9 px-4 text-sm" disabled={count >= size} onClick={surprise}>
        Fill it for me
      </button>
    </div>
  )
}

/** The flavors, ready to throw. A 2×3 rack on desktop, a sticky dock on phones. */
function Shelf() {
  const { add } = useBox()
  return (
    <div className="-mx-4 bg-pink/90 px-4 pb-3 pt-3 shadow-[0_-12px_30px_-18px_rgba(58,31,22,0.4)] backdrop-blur-md lg:shadow-none lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
      <p className="eyebrow mb-3 hidden lg:block">The shelf · tap to add</p>
      <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] lg:grid lg:grid-cols-2 lg:gap-x-3 lg:gap-y-5 lg:overflow-visible">
        {allFlavors.map((f) => (
          <li key={f.id} className="shrink-0">
            <button
              type="button"
              onClick={(e) => {
                const art = (e.currentTarget.querySelector("[data-tray-flavor]") as HTMLElement).getBoundingClientRect()
                add(f.id, art)
              }}
              aria-label={`Add ${f.name} to box, ${formatRs(f.price)}`}
              className="group flex w-[76px] flex-col items-center text-center lg:w-full"
            >
              <span
                data-tray-flavor={f.id}
                className="block aspect-square w-[64px] transition-transform duration-300 [transition-timing-function:var(--ease-squish)] group-hover:-translate-y-2 group-hover:rotate-12 group-active:scale-90 lg:w-[86%]"
              >
                <CookiePhoto flavor={f} className="size-full drop-shadow-[0_10px_8px_rgba(58,31,22,0.3)]" />
              </span>
              <span className="type-name mt-2 text-[13px] leading-none lg:text-lg">{f.name}</span>
              <span className="mt-1 font-mono text-[10px] opacity-70 lg:text-[11px]">{formatRs(f.price)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function BoxBuilder() {
  const { closed } = useBox()
  return (
    <section id="pack" className="relative scroll-mt-16 px-4 pb-24 pt-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Pack a box</p>
            <h2 className="type-name text-[clamp(2.8rem,6.4vw,6rem)]">
              Pack it. Weigh it. <span className="font-display text-[0.82em] tracking-normal text-cherry">Eat it.</span>
            </h2>
          </div>
          <p className="max-w-sm text-cocoa-soft">Tap a cookie to drop it in. Tap it in the box to take it out. Every cookie is baked fresh for your order.</p>
        </header>

        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[250px_minmax(0,1fr)_340px] lg:gap-10">
          <div className="sticky bottom-0 z-20 order-2 lg:static lg:order-1">
            <Shelf />
          </div>
          <div className="order-1 flex min-w-0 flex-col items-center lg:order-2">
            <BoxControls />
            <BoxOnScale />
            {closed && <p className="mt-4 text-center text-sm opacity-70">Adding another cookie opens the box again.</p>}
          </div>
          <div className="order-3 flex justify-center">
            <Ticket />
          </div>
        </div>
      </div>
    </section>
  )
}
