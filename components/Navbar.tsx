"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, Cookie } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <header className="w-full sticky top-0 z-50 bg-background/80 backdrop-blur border-b-2 border-border">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="#home" className="flex items-center gap-2 font-heading text-lg">
          <div className="size-8 grid place-items-center rounded-base border-2 border-border bg-main text-main-foreground shadow-shadow">
            <Cookie className="size-4" />
          </div>
          Chonky Cookies
        </Link>

        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu className="bg-secondary-background border-border border-2">
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <Link href={item.href}>
                    <NavigationMenuLink className="font-heading">
                      {item.label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="neutral" size="sm">
            <ShoppingCart className="mr-2" /> Cart
          </Button>
        </div>

        <div className="md:hidden">
          <Button aria-label="Toggle menu" variant="neutral" size="icon" onClick={() => setMobileOpen((o) => !o)}>
            {mobileOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t-2 border-border bg-background">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="py-2 px-3 rounded-base border-2 border-border bg-secondary-background shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Button className="w-full" variant="neutral">
              <ShoppingCart className="mr-2" /> Cart
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}


