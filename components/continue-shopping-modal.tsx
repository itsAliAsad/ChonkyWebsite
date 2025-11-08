"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onClose: () => void
}

export default function ContinueShoppingModal({ open, onClose }: Props) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-overlay" onClick={onClose} />
      <div className="relative w-full md:w-[560px] m-2 rounded-base border-2 border-border bg-background shadow-shadow p-6 space-y-4">
        <h3 className="text-2xl font-heading">Continue shopping</h3>
        <p className="text-sm text-muted-foreground">
          Keep browsing flavors or build your box now.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="neutral" onClick={onClose}>Continue shopping</Button>
          <Button>Proceed to payment</Button>
        </div>
      </div>
    </div>
  )
}


