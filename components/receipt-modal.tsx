"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type LineItem = {
  name: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

type ReceiptModalProps = {
  open: boolean
  onClose: () => void
  items: LineItem[]
  subtotal: number
  shipping: number
  total: number
}

export default function ReceiptModal({ open, onClose, items, subtotal, shipping, total }: ReceiptModalProps) {
  if (!open) return null
  const format = (n: number) => `$${n.toFixed(2)}`
  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-overlay" onClick={onClose} />
      <div className="relative w-full md:w-[720px] m-2 rounded-base border-2 border-border bg-background shadow-shadow p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-heading">Receipt</h3>
          <Button variant="neutral" size="sm" onClick={onClose}>Close</Button>
        </div>

        <div className="rounded-base border-2 border-border bg-secondary-background overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Qty</TableHead>
                <TableHead className="text-right">Unit</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-heading">{it.name}</TableCell>
                  <TableCell className="text-right">{it.quantity}</TableCell>
                  <TableCell className="text-right">{format(it.unitPrice)}</TableCell>
                  <TableCell className="text-right">{format(it.lineTotal)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-1 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-heading">{format(subtotal)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-heading">{format(shipping)}</span>
          </div>
          <div className="flex items-center justify-between text-base mt-1">
            <span className="font-heading">Total</span>
            <span className="font-heading">{format(total)}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="neutral" onClick={onClose}>Continue shopping</Button>
          <Button>Proceed to checkout</Button>
        </div>
      </div>
    </div>
  )
}


