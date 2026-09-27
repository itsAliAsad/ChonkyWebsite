"use client"

import * as React from "react"
import { toast } from "sonner"
import { allFlavors, COOKIE_GRAMS, DELIVERY_FEE, flavorById } from "@/lib/flavors"

export const BOX_SIZES = [2, 4, 6] as const
export type BoxSize = (typeof BOX_SIZES)[number]

type BoxState = {
  size: BoxSize
  wells: (string | null)[]
  closed: boolean
  note: string
}

type Flight = { key: number; flavorId: string; from: DOMRect; well: number }

type BoxContextValue = BoxState & {
  count: number
  subtotal: number
  total: number
  grams: number
  /** Wells whose cookie is still flying toward them. */
  pending: Set<number>
  /** Bumps every time a cookie lands, so the box and scale can react. */
  landedAt: { well: number; t: number } | null
  flights: Flight[]
  add: (flavorId: string, from?: DOMRect) => void
  remove: (well: number) => void
  setSize: (size: BoxSize) => void
  surprise: () => void
  clear: () => void
  setClosed: (closed: boolean) => void
  setNote: (note: string) => void
  land: (flight: Flight) => void
}

const BoxContext = React.createContext<BoxContextValue | undefined>(undefined)

const resize = (wells: (string | null)[], size: number) => {
  const packed = wells.filter(Boolean) as string[]
  return Array.from({ length: size }, (_, i) => packed[i] ?? null)
}

export function BoxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<BoxState>({ size: 6, wells: Array(6).fill(null), closed: false, note: "" })
  const [pending, setPending] = React.useState<Set<number>>(() => new Set())
  const [flights, setFlights] = React.useState<Flight[]>([])
  const [landedAt, setLandedAt] = React.useState<BoxContextValue["landedAt"]>(null)
  const stateRef = React.useRef(state)
  stateRef.current = state
  const flightKey = React.useRef(0)

  const commit = React.useCallback((next: BoxState) => {
    stateRef.current = next
    setState(next)
  }, [])

  const launch = React.useCallback((flavorId: string, well: number, from?: DOMRect) => {
    if (!from) return
    const key = ++flightKey.current
    setPending((p) => new Set(p).add(well))
    setFlights((f) => [...f, { key, flavorId, from, well }])
  }, [])

  const add = React.useCallback(
    (flavorId: string, from?: DOMRect) => {
      let s = stateRef.current
      if (s.closed) s = { ...s, closed: false }
      let well = s.wells.indexOf(null)
      if (well === -1) {
        const bigger = BOX_SIZES.find((n) => n > s.size)
        if (!bigger) {
          toast("Your box of 6 is full", { description: "Tap a cookie in the box to swap it out." })
          return
        }
        s = { ...s, size: bigger, wells: resize(s.wells, bigger) }
        well = s.wells.indexOf(null)
        toast(`Upgraded to a box of ${bigger}`, { description: "More room for more chonk." })
      }
      const wells = [...s.wells]
      wells[well] = flavorId
      commit({ ...s, wells })
      launch(flavorId, well, from)
    },
    [commit, launch],
  )

  const land = React.useCallback((flight: Flight) => {
    setFlights((f) => f.filter((x) => x.key !== flight.key))
    setPending((p) => {
      const n = new Set(p)
      n.delete(flight.well)
      return n
    })
    setLandedAt({ well: flight.well, t: performance.now() })
  }, [])

  const remove = React.useCallback(
    (well: number) => {
      const s = stateRef.current
      commit({ ...s, wells: s.wells.map((w, i) => (i === well ? null : w)), closed: false })
    },
    [commit],
  )

  const setSize = React.useCallback(
    (size: BoxSize) => {
      const s = stateRef.current
      if (s.wells.filter(Boolean).length > size) return
      commit({ ...s, size, wells: resize(s.wells, size), closed: false })
    },
    [commit],
  )

  const surprise = React.useCallback(() => {
    const s = stateRef.current
    const empty = s.wells.map((w, i) => (w ? -1 : i)).filter((i) => i >= 0)
    if (!empty.length) return
    const wells = [...s.wells]
    const tray = document.querySelectorAll<HTMLElement>("[data-tray-flavor]")
    empty.forEach((well, n) => {
      const flavor = allFlavors[Math.floor(Math.random() * allFlavors.length)]
      wells[well] = flavor.id
      const src = Array.from(tray).find((el) => el.dataset.trayFlavor === flavor.id)
      window.setTimeout(() => launch(flavor.id, well, src?.getBoundingClientRect()), n * 120)
      if (src) setPending((p) => new Set(p).add(well))
    })
    commit({ ...s, wells, closed: false })
  }, [commit, launch])

  const clear = React.useCallback(() => commit({ ...stateRef.current, wells: Array(stateRef.current.size).fill(null), closed: false }), [commit])
  const setClosed = React.useCallback((closed: boolean) => commit({ ...stateRef.current, closed }), [commit])
  const setNote = React.useCallback((note: string) => commit({ ...stateRef.current, note }), [commit])

  const filled = state.wells.filter(Boolean) as string[]
  const subtotal = filled.reduce((sum, id) => sum + (flavorById.get(id)?.price ?? 0), 0)

  const value: BoxContextValue = {
    ...state,
    count: filled.length,
    subtotal,
    total: subtotal > 0 ? subtotal + DELIVERY_FEE : 0,
    grams: filled.length * COOKIE_GRAMS,
    pending,
    landedAt,
    flights,
    add,
    remove,
    setSize,
    surprise,
    clear,
    setClosed,
    setNote,
    land,
  }

  return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>
}

export function useBox() {
  const ctx = React.useContext(BoxContext)
  if (!ctx) throw new Error("useBox must be used within a BoxProvider")
  return ctx
}
