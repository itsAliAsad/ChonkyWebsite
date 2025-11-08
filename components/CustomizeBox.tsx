"use client"

import * as React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { allFlavors } from "@/lib/flavors"
import { useBoxBuilder } from "@/components/box/BoxContext"
import ContinueShoppingModal from "@/components/continue-shopping-modal"
import ReceiptModal from "@/components/receipt-modal"

export default function CustomizeBox() {
  const { slots, addSlot, reset, setSlotFlavor, setSlotQuantity } = useBoxBuilder()
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

  return (
    <section id="customize-box" className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-3xl font-heading">Customize Your Box</h2>
          <p className="text-base text-muted-foreground">
            Mix your favorite flavors. The next row stays disabled until you choose a quantity for the previous one. Add multiple boxes if you are gifting or stocking up.
          </p>
          <div className="relative aspect-square w-full rounded-base border-2 border-border overflow-hidden bg-secondary-background shadow-shadow">
            <Image src="/window.svg" alt="Cookie box" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-contain p-10 dark:invert" />
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-4 pb-2">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <Button
                onClick={() => addSlot()}
                disabled={!(slots.length === 0 || (!!slots[slots.length - 1]?.flavor && (slots[slots.length - 1]?.quantity ?? 0) > 0))}
              >
                Add cookie
              </Button>
              <Button variant="neutral" onClick={() => reset()}>Reset</Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Selected: <span className="font-heading text-foreground">{totalSelected}</span></p>
                <p className="text-sm text-muted-foreground">Box grows as you add cookies</p>
              </div>

              <div className="space-y-3">
                {slots.map((slot, index) => {
                  const prevComplete = index === 0 ? true : !!slots[index - 1]?.flavor && (slots[index - 1]?.quantity ?? 0) > 0

                  return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_180px] gap-3 items-center">
                      <Select value={slot.flavor} onValueChange={(val) => setSlotFlavor(index, val)}>
                        <SelectTrigger disabled={!prevComplete}>
                          {slot.flavor ? (
                            <span className="truncate">{slot.flavor}</span>
                          ) : (
                            <span className="text-muted-foreground">{`Select cookie ${index + 1}`}</span>
                          )}
                        </SelectTrigger>
                        <SelectContent>
                          {allFlavors.map((f) => (
                            <SelectItem key={f.id} value={f.name} imageSrc={f.image} description={f.description} price={f.price}>
                              {f.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="neutral"
                          size="sm"
                          disabled={!slot.flavor || !prevComplete}
                          onClick={() => setSlotQuantity(index, Math.max(1, (slot.quantity ?? 1)) - 1)}
                        >
                          −
                        </Button>
                        <Input
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={slot.quantity}
                          disabled={!slot.flavor || !prevComplete}
                          onChange={(e) => {
                            const digits = e.target.value.replace(/[^0-9]/g, "")
                            const num = digits === "" ? 0 : parseInt(digits, 10)
                            setSlotQuantity(index, Math.max(1, num))
                          }}
                          className="w-16 text-center"
                          placeholder="0"
                        />
                        <Button
                          variant="neutral"
                          size="sm"
                          disabled={!slot.flavor || !prevComplete}
                          onClick={() => setSlotQuantity(index, Math.max(1, (slot.quantity ?? 1)) + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-3 pt-2"></div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="text-xl font-heading">Summary</h4>
            <button
              className="underline underline-offset-4 text-sm"
              onClick={() => setReceiptOpen(true)}
            >
              View Receipt
            </button>
          </div>
          <BoxesSummary slots={slots} />
          {subtotal > 0 && (
            <div className="mt-4 rounded-base border-2 border-border bg-secondary-background p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-heading">{format(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-heading">{format(shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-base mt-3">
                <span className="font-heading">Total</span>
                <span className="font-heading">{format(total)}</span>
              </div>
            </div>
          )}
          <div className="flex justify-end pt-4">
            <Button onClick={() => setContinueOpen(true)}>Checkout</Button>
          </div>
          <ContinueShoppingModal open={continueOpen} onClose={() => setContinueOpen(false)} />
          <ReceiptModal
            open={receiptOpen}
            onClose={() => setReceiptOpen(false)}
            items={slots.filter((s) => s.flavor && s.quantity > 0).map((s) => ({
              name: s.flavor as string,
              quantity: s.quantity,
              unitPrice: priceByName.get(s.flavor as string) || 0,
              lineTotal: (priceByName.get(s.flavor as string) || 0) * s.quantity,
            }))}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
          />
        </div>
      </div>
    </section>
  )
}

function BoxesSummary({ slots }: { slots: { flavor?: string; quantity: number }[] }) {
  const boxes = React.useMemo(() => {
    const arr = packageIntoBoxes(slots)
    return arr.slice().reverse()
  }, [slots])

  if (boxes.length === 0) return null

  return (
    <div className="border-t-2 border-border pt-2">
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2 min-w-full">
          {boxes.map((box, idx) => (
            <Card key={idx} className="overflow-hidden min-w-[260px]">
              <CardHeader>
                <CardTitle>{box.size === 8 ? "Box of 8" : "Box of 4"}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  {box.items.map((it, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <span className="truncate">{it.flavor}</span>
                      <span className="text-muted-foreground">x{it.quantity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function packageIntoBoxes(slots: { flavor?: string; quantity: number }[]): { size: 8 | 4; items: { flavor: string; quantity: number }[] }[] {
  // Aggregate quantities by flavor
  const flavorTotals = new Map<string, number>()
  for (const s of slots) {
    if (!s.flavor || !s.quantity) continue
    flavorTotals.set(s.flavor, (flavorTotals.get(s.flavor) ?? 0) + s.quantity)
  }
  const queue: { flavor: string; remaining: number }[] = Array.from(flavorTotals, ([flavor, remaining]) => ({ flavor, remaining }))

  const boxes: { size: 8 | 4; items: { flavor: string; quantity: number }[] }[] = []
  let current: { size: 8 | 4; items: { flavor: string; quantity: number }[] } = { size: 8, items: [] }
  let capacity = 8

  const pushCurrent = () => {
    const filled = current.items.reduce((s, it) => s + it.quantity, 0)
    if (filled === 0) return
    current.size = filled <= 4 ? 4 : 8
    boxes.push(current)
    current = { size: 8, items: [] }
    capacity = 8
  }

  while (queue.length > 0) {
    const h = queue[0]
    if (h.remaining === 0) {
      queue.shift()
      continue
    }
    const take = Math.min(h.remaining, capacity)
    current.items.push({ flavor: h.flavor, quantity: take })
    h.remaining -= take
    capacity -= take
    if (capacity === 0) pushCurrent()
  }

  pushCurrent()
  return boxes
}


