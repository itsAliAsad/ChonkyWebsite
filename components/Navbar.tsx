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
    <header className="w-full sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b-2 border-border">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 font-heading text-2xl uppercase tracking-tight hover:scale-105 transition-transform" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <div className="size-10 grid place-items-center rounded-full border-2 border-border bg-main text-main-foreground shadow-sm">
            <Cookie className="size-6" />
          </div>
          Chonky
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="font-heading text-lg hover:text-main-foreground/80 hover:underline decoration-2 underline-offset-4 transition-all"
              onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            className="hidden md:flex rounded-full px-6 font-bold border-2 shadow-sm hover:shadow-none"
            onClick={() => scrollToSection('customize')}
          >
            <ShoppingBag className="mr-2 h-5 w-5" /> Your Box
          </Button>

          <Button 
            variant="neutral" 
            size="icon" 
            className="md:hidden rounded-full border-2"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-background border-t-2 border-border flex flex-col p-6 animate-in slide-in-from-top-5 duration-200">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-4xl font-heading uppercase py-4 border-b-2 border-border/20 hover:text-main transition-colors"
                onClick={(e) => { e.preventDefault(); scrollToSection(item.href); }}
              >
                {item.label}
              </a>
            ))}
            <Button className="w-full mt-8 h-14 text-xl rounded-full border-2 shadow-shadow" onClick={() => scrollToSection('customize')}>
              <ShoppingBag className="mr-2" /> View Your Box
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}


