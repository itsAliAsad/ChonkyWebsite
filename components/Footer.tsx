"use client"

import * as React from "react"

export default function Footer() {
  const [joined, setJoined] = React.useState(false)
  return (
    <footer className="relative overflow-hidden bg-cocoa text-pink">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-10 pt-24 md:grid-cols-[1.3fr_1fr] md:px-8">
        <div>
          <p className="eyebrow mb-4 text-butter/70">New flavors drop without warning</p>
          <h2 className="type-name text-[clamp(2.6rem,6vw,5rem)] text-butter">Get first dibs.</h2>
          <form
            className="mt-8 flex max-w-md items-center gap-2 border-b-2 border-pink/30 pb-2 focus-within:border-butter"
            onSubmit={(e) => {
              e.preventDefault()
              setJoined(true)
            }}
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input id="email" type="email" required placeholder="you@email.com" className="min-w-0 flex-1 bg-transparent py-2 text-lg text-paper placeholder:text-pink/40 focus:outline-none" />
            <button type="submit" className="btn h-10 bg-butter px-5 text-sm text-cocoa">
              {joined ? "You're in" : "Join the list"}
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm md:justify-self-end">
          <div className="space-y-3">
            <p className="eyebrow text-butter/60">Shop</p>
            <a className="block hover:text-butter" href="#lineup">Flavors</a>
            <a className="block hover:text-butter" href="#pack">Pack a box</a>
          </div>
          <div className="space-y-3">
            <p className="eyebrow text-butter/60">Follow</p>
            <a className="block hover:text-butter" href="#">Instagram</a>
            <a className="block hover:text-butter" href="#">TikTok</a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl justify-between px-4 pb-6 text-xs text-pink/50 md:px-8">
        <span>© {new Date().getFullYear()} Chonky Cookies</span>
        <span>Baked with an unreasonable amount of butter.</span>
      </div>
      <p aria-hidden className="select-none whitespace-nowrap text-center font-display text-[25vw] leading-[0.72] text-pink/[0.08] translate-y-[12%]">
        CHONKY
      </p>
    </footer>
  )
}
