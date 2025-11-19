"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useBoxBuilder } from "@/components/box/BoxContext"
import { getCheckoutUrl } from "@/lib/shopify"
import { toast } from "sonner"

type Props = {
  open: boolean
  onClose: () => void
}

export default function ContinueShoppingModal({ open, onClose }: Props) {
  const { slots } = useBoxBuilder()
  const [loading, setLoading] = React.useState(false)

  if (!open) return null

  const handleCheckout = async () => {
    setLoading(true)
    try {
      // Aggregate items from the box context
      const items = slots
        .filter(s => s.flavor && s.quantity > 0)
        .map(s => ({ name: s.flavor!, quantity: s.quantity }))
      
      if (items.length === 0) {
        toast.error("Your box is empty!")
        setLoading(false)
        return
      }

      const url = await getCheckoutUrl(items)
      if (url) {
        window.location.href = url
      } else {
        toast.error("Could not create checkout. Please check your connection.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong connecting to the store.")
    } finally {
      setLoading(false)
    }
  }

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
          <Button onClick={handleCheckout} disabled={loading}>
            {loading ? "Processing..." : "Proceed to payment"}
          </Button>
        </div>
      </div>
    </div>
  )
}


