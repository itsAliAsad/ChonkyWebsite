"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, ShoppingBag, Cookie } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "The Lineup", href: "#flavors-section" },
    { label: "Build Box", href: "#customize" },
  ]

  const scrollToSection = (id: string) => {
    setMobileOpen(false)
    const element = document.getElementById(id.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="w-full sticky top-4 z-50 px-4 md:px-8">
      <div className="glass-panel rounded-full mx-auto max-w-7xl h-20 md:h-24 flex items-center justify-between px-6 md:px-10 shadow-shadow transition-all hover:shadow-shadow-hover">
        <Link
          href="#home"
          className="flex items-center gap-3 group"
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
        >
          <div className="size-12 md:size-14 grid place-items-center rounded-full border-2 border-border bg-main text-main-foreground shadow-sm group-hover:rotate-12 transition-transform duration-300">
            <Cookie className="size-7 md:size-8" />
          </div>
          <span className="font-heading text-3xl md:text-4xl uppercase hidden sm:block group-hover:text-main-foreground transition-colors">
            Chonky
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-heading text-xl hover:text-main-foreground hover:-translate-y-1 transition-all duration-300 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-current after:transition-all hover:after:w-full"
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button
            className="hidden md:flex rounded-full px-8 h-12 text-lg font-bold border-2 border-border bg-foreground text-background hover:bg-main hover:text-main-foreground shadow-sm hover:shadow-none transition-all hover:-translate-y-0.5"
            onClick={() => scrollToSection('customize')}
          >
            <ShoppingBag className="mr-2 h-5 w-5" /> Your Box
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full border-2 border-border size-12 hover:bg-main hover:text-main-foreground transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-x-4 top-28 bottom-4 z-40 glass-panel rounded-3xl flex flex-col p-8 animate-in slide-in-from-bottom-10 fade-in duration-300 shadow-shadow">
          <nav className="flex flex-col gap-6 h-full justify-center items-center">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-5xl md:text-6xl font-heading uppercase hover:text-main hover:scale-110 transition-all duration-300"
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              >
                {item.label}
              </a>
            ))}
            <Button
              className="w-full max-w-xs mt-12 h-16 text-2xl rounded-full border-2 border-border bg-main text-main-foreground shadow-shadow hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              onClick={() => scrollToSection('customize')}
            >
              <ShoppingBag className="mr-3 size-6" /> View Box
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}


