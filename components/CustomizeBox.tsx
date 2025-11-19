"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { allFlavors } from "@/lib/flavors"
import { useBoxBuilder } from "@/components/box/BoxContext"
import ContinueShoppingModal from "@/components/continue-shopping-modal"
import ReceiptModal from "@/components/receipt-modal"
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"

export default function CustomizeBox() {
  const { slots, setSlotQuantity, reset } = useBoxBuilder()
  const [continueOpen, setContinueOpen] = React.useState(false)
  const [receiptOpen, setReceiptOpen] = React.useState(false)

  const priceByName = React.useMemo(() => {
    const map = new Map<string, number>()
    for (const f of allFlavors) {
      const num = Number((f.price || "").replace(/[^0-9.]/g, "")) || 0
      map.set(f.name, num)
    }
    return map
  }, [])

  const subtotal = React.useMemo(() => {
    return slots.reduce((sum, s) => {
      if (!s.flavor || !s.quantity) return sum
      const unit = priceByName.get(s.flavor) || 0
      return sum + unit * s.quantity
    }, 0)
  }, [slots, priceByName])

  const shipping = subtotal > 0 ? 5 : 0
  const total = subtotal + shipping
  const format = (n: number) => `$${n.toFixed(2)}`

  const totalSelected = React.useMemo(
    () => slots.filter((s) => s.flavor).reduce((sum, s) => sum + (s.quantity || 0), 0),
    [slots],
  )

  const activeSlots = slots.filter(s => s.flavor && s.quantity > 0);

  return (
    <section id="customize" className="w-full py-20 bg-secondary-background border-t-2 border-border">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column: Box Visualization / Info */}
          <div className="space-y-8 sticky top-24">
            <div className="space-y-4">
              <h2 className="text-5xl font-heading uppercase">Your Stash</h2>
              <p className="text-xl font-medium text-muted-foreground">
                You have {totalSelected} cookies in your box. 
                {totalSelected < 4 && " Add a few more to fill a small box!"}
                {totalSelected >= 4 && totalSelected < 8 && " Almost a full large box!"}
                {totalSelected >= 8 && " That's a party right there."}
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-base border-2 border-border bg-white shadow-shadow overflow-hidden flex items-center justify-center">
               {activeSlots.length === 0 ? (
                 <div className="text-center p-8 opacity-50">
                    <ShoppingBag className="w-24 h-24 mx-auto mb-4" />
                    <p className="text-2xl font-heading">Your box is empty</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 w-full h-full overflow-y-auto content-start">
                    {activeSlots.map((slot, i) => (
                      Array.from({ length: slot.quantity }).map((_, j) => {
                         const flavorImg = allFlavors.find(f => f.name === slot.flavor)?.image || "/file.svg"
                         return (
                           <div key={`${i}-${j}`} className="relative aspect-square animate-in zoom-in duration-300">
                              <Image src={flavorImg} alt={slot.flavor || "Cookie"} fill className="object-contain drop-shadow-md" />
                           </div>
                         )
                      })
                    ))}
                 </div>
               )}
            </div>
          </div>

          {/* Right Column: Order Details */}
          <div className="bg-white rounded-base border-2 border-border shadow-shadow p-6 md:p-8 space-y-8">
            <div className="flex items-center justify-between border-b-2 border-border pb-4">
              <h3 className="text-2xl font-heading">Order Details</h3>
              <Button variant="neutral" size="sm" onClick={reset} disabled={activeSlots.length === 0}>
                <Trash2 className="w-4 h-4 mr-2" /> Clear All
              </Button>
            </div>

            <div className="space-y-6 min-h-[200px]">
              {activeSlots.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No cookies selected yet.</p>
                  <Button onClick={() => document.getElementById('flavors-section')?.scrollIntoView({ behavior: 'smooth' })}>
                    Browse Flavors
                  </Button>
                </div>
              ) : (
                activeSlots.map((slot, index) => {
                   // Find original index in slots array to update
                   const originalIndex = slots.indexOf(slot);
                   const flavorDetails = allFlavors.find(f => f.name === slot.flavor);
                   
                   return (
                    <div key={index} className="flex items-center gap-4 bg-secondary-background p-4 rounded-base border-2 border-border">
                      <div className="relative w-16 h-16 shrink-0">
                        <Image 
                          src={flavorDetails?.image || "/file.svg"} 
                          alt={slot.flavor || ""} 
                          fill 
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-lg truncate">{slot.flavor}</h4>
                        <p className="text-sm text-muted-foreground">{flavorDetails?.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-full border-2 border-border px-2 py-1">
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary-background rounded-full transition-colors"
                          onClick={() => setSlotQuantity(originalIndex, Math.max(0, slot.quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-heading w-4 text-center">{slot.quantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-secondary-background rounded-full transition-colors"
                          onClick={() => setSlotQuantity(originalIndex, slot.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                   )
                })
              )}
            </div>

            {activeSlots.length > 0 && (
              <div className="space-y-4 border-t-2 border-border pt-6">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-heading">{format(subtotal)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-heading">{format(shipping)}</span>
                </div>
                <div className="flex justify-between text-2xl pt-4 border-t-2 border-dashed border-border">
                  <span className="font-heading">Total</span>
                  <span className="font-heading">{format(total)}</span>
                </div>

                <div className="grid gap-4 pt-4">
                  <Button className="w-full h-14 text-xl shadow-shadow hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all" onClick={() => setContinueOpen(true)}>
                    Checkout Now
                  </Button>
                  <button 
                    className="text-sm text-muted-foreground underline hover:text-foreground text-center"
                    onClick={() => setReceiptOpen(true)}
                  >
                    View detailed receipt
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ContinueShoppingModal open={continueOpen} onClose={() => setContinueOpen(false)} />
      <ReceiptModal
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
        items={activeSlots.map((s) => ({
          name: s.flavor as string,
          quantity: s.quantity,
          unitPrice: priceByName.get(s.flavor as string) || 0,
          lineTotal: (priceByName.get(s.flavor as string) || 0) * s.quantity,
        }))}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
      />
    </section>
  )
}

function BoxesSummary({ slots }: { slots: { flavor?: string; quantity: number }[] }) {
  return null; // Deprecated for new design
}

function packageIntoBoxes(slots: { flavor?: string; quantity: number }[]): { size: 8 | 4; items: { flavor: string; quantity: number }[] }[] {
  return []; // Deprecated
}


