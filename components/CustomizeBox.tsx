"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { allFlavors } from "@/lib/flavors"
import { useBoxBuilder } from "@/components/box/BoxContext"
import ContinueShoppingModal from "@/components/continue-shopping-modal"
import ReceiptModal from "@/components/receipt-modal"
import { Trash2, Minus, Plus, ShoppingBag, Package } from "lucide-react"

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
    <section id="customize" className="w-full py-32 bg-secondary-background border-t-2 border-border relative">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Box Visualization / Info */}
          <div className="lg:col-span-7 space-y-8 sticky top-24">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold uppercase tracking-wider bg-white/50 backdrop-blur-sm w-fit">
                <Package className="size-4" />
                Build Your Box
              </div>
              <h2 className="text-5xl md:text-7xl font-heading uppercase leading-none">Your Stash</h2>
              <p className="text-xl font-medium text-muted-foreground max-w-md">
                {totalSelected === 0 && "Start adding some chonky goodness."}
                {totalSelected > 0 && totalSelected < 4 && "A good start, but we can do better."}
                {totalSelected >= 4 && totalSelected < 8 && "Now we're talking!"}
                {totalSelected >= 8 && "You are a certified legend."}
              </p>
            </div>

            <div className="relative aspect-video w-full rounded-3xl border-2 border-border bg-white shadow-shadow overflow-hidden flex items-center justify-center group">
              {/* Pattern background */}
              <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#5C4026 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              {activeSlots.length === 0 ? (
                <div className="text-center p-8 opacity-30 group-hover:opacity-50 transition-opacity">
                  <ShoppingBag className="w-32 h-32 mx-auto mb-6" />
                  <p className="text-3xl font-heading uppercase">Box Empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-8 w-full h-full overflow-y-auto content-start custom-scrollbar">
                  {activeSlots.map((slot, i) => (
                    Array.from({ length: slot.quantity }).map((_, j) => {
                      const flavorImg = allFlavors.find(f => f.name === slot.flavor)?.image || "/file.svg"
                      return (
                        <div key={`${i}-${j}`} className="relative aspect-square animate-in zoom-in duration-300 hover:scale-110 transition-transform">
                          <Image src={flavorImg} alt={slot.flavor || "Cookie"} fill className="object-contain drop-shadow-lg" />
                        </div>
                      )
                    })
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Details */}
          <div className="lg:col-span-5 bg-white rounded-3xl border-2 border-border shadow-shadow p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-main/10 rounded-bl-full -z-10" />

            <div className="flex items-center justify-between border-b-2 border-border pb-6">
              <h3 className="text-3xl font-heading uppercase">Order Details</h3>
              <Button variant="ghost" size="sm" onClick={reset} disabled={activeSlots.length === 0} className="text-muted-foreground hover:text-red-500">
                <Trash2 className="w-4 h-4 mr-2" /> Clear
              </Button>
            </div>

            <div className="space-y-6 min-h-[200px]">
              {activeSlots.length === 0 ? (
                <div className="text-center py-12 flex flex-col items-center justify-center h-full space-y-6">
                  <p className="text-muted-foreground text-lg font-medium">Your box is looking a little light.</p>
                  <Button
                    size="lg"
                    className="rounded-full font-bold"
                    onClick={() => document.getElementById('flavors-section')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Browse Flavors
                  </Button>
                </div>
              ) : (
                activeSlots.map((slot, index) => {
                  const originalIndex = slots.indexOf(slot);
                  const flavorDetails = allFlavors.find(f => f.name === slot.flavor);

                  return (
                    <div key={index} className="flex items-center gap-4 bg-secondary-background/30 p-4 rounded-2xl border border-border/50 hover:border-border transition-colors">
                      <div className="relative w-20 h-20 shrink-0 bg-white rounded-xl border border-border/20 p-2">
                        <Image
                          src={flavorDetails?.image || "/file.svg"}
                          alt={slot.flavor || ""}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading text-xl truncate">{slot.flavor}</h4>
                        <p className="text-sm font-bold text-muted-foreground">{flavorDetails?.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-white rounded-full border-2 border-border px-3 py-1.5 shadow-sm">
                        <button
                          className="size-8 flex items-center justify-center hover:bg-secondary-background rounded-full transition-colors text-foreground"
                          onClick={() => setSlotQuantity(originalIndex, Math.max(0, slot.quantity - 1))}
                        >
                          <Minus className="size-4" />
                        </button>
                        <span className="font-heading w-6 text-center text-lg">{slot.quantity}</span>
                        <button
                          className="size-8 flex items-center justify-center hover:bg-secondary-background rounded-full transition-colors text-foreground"
                          onClick={() => setSlotQuantity(originalIndex, slot.quantity + 1)}
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {activeSlots.length > 0 && (
              <div className="space-y-6 border-t-2 border-border pt-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-lg font-medium text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{format(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-medium text-muted-foreground">
                    <span>Shipping</span>
                    <span>{format(shipping)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-3xl pt-4 border-t-2 border-dashed border-border">
                  <span className="font-heading uppercase">Total</span>
                  <span className="font-heading">{format(total)}</span>
                </div>

                <div className="grid gap-4 pt-4">
                  <Button
                    className="w-full h-16 text-xl rounded-xl shadow-shadow hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all bg-main text-main-foreground border-2 border-border"
                    onClick={() => setContinueOpen(true)}
                  >
                    Checkout Now
                  </Button>
                  <button
                    className="text-sm text-muted-foreground font-bold hover:text-foreground text-center uppercase tracking-wide hover:underline decoration-2 underline-offset-4"
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


