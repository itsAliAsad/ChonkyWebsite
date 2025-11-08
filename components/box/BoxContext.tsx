"use client"

import * as React from "react"
import { toast } from "sonner"

export type Slot = {
	flavor?: string
	quantity: number
}

type BoxContextValue = {
	slots: Slot[]
	addSlot: () => void
	reset: () => void
	setSlotFlavor: (index: number, flavor: string) => void
	setSlotQuantity: (index: number, qty: number) => void
	addFlavorToBox: (flavor: string, qty?: number) => void
}

const BoxContext = React.createContext<BoxContextValue | undefined>(undefined)

export function BoxProvider({ children }: { children: React.ReactNode }) {
	const [slots, setSlots] = React.useState<Slot[]>([{ quantity: 0 }])
	const toastIdRef = React.useRef<string | number | null>(null)

	const addSlot = React.useCallback(() => {
		setSlots((prev) => [...prev, { quantity: 0 }])
	}, [])

	const reset = React.useCallback(() => {
		setSlots([{ quantity: 0 }])
	}, [])

	const setSlotFlavor = React.useCallback((index: number, flavor: string) => {
		setSlots((prev) => {
			const next = [...prev]
			const currentQty = next[index]?.quantity ?? 0
			next[index] = { ...next[index], flavor, quantity: currentQty === 0 ? 1 : currentQty }
			return next
		})
	}, [])

	const setSlotQuantity = React.useCallback((index: number, qty: number) => {
		setSlots((prev) => {
			const next = [...prev]
			next[index] = { ...next[index], quantity: Math.max(0, Math.floor(qty)) }
			return next
		})
	}, [])

	const addFlavorToBox = React.useCallback((flavor: string, qty: number = 1) => {
		setSlots((prev) => {
			// If flavor exists, increment its quantity, else append a new filled slot
			const next = [...prev]
			const existingIndex = next.findIndex((s) => s.flavor === flavor)
			if (existingIndex !== -1) {
				next[existingIndex] = { ...next[existingIndex], quantity: (next[existingIndex].quantity || 0) + qty }
				return next
			}
			// Find the first empty slot to reuse
			const emptyIndex = next.findIndex((s) => !s.flavor)
			if (emptyIndex !== -1) {
				next[emptyIndex] = { flavor, quantity: Math.max(1, qty) }
			} else {
				next.push({ flavor, quantity: Math.max(1, qty) })
			}
			return next
		})
		// Show a single persistent toast; if one already exists, do not spawn another
		if (toastIdRef.current == null) {
			toastIdRef.current = toast("Added to box", {
				description: `${qty} × ${flavor} added.`,
				action: {
					label: "Finalize your box",
					onClick: () => {
						const el = document.getElementById("customize")
						if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
					},
				},
				duration: Infinity,
				// Clear ref when toast is dismissed
				onDismiss: () => {
					toastIdRef.current = null
				},
			})
		} else {
			// Update existing toast description to reflect latest addition
			toast.message("Added to box", {
				description: `${qty} × ${flavor} added.`,
				id: toastIdRef.current as any,
			})
		}
	}, [])

	const value: BoxContextValue = {
		slots,
		addSlot,
		reset,
		setSlotFlavor,
		setSlotQuantity,
		addFlavorToBox,
	}

	return <BoxContext.Provider value={value}>{children}</BoxContext.Provider>
}

export function useBoxBuilder() {
	const ctx = React.useContext(BoxContext)
	if (!ctx) throw new Error("useBoxBuilder must be used within a BoxProvider")
	return ctx
}


