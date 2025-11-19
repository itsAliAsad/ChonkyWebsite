"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDownRight } from "lucide-react"

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative w-full overflow-hidden border-b-2 border-border bg-secondary-background pt-10 lg:pt-0">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center min-h-[80vh]">
          <div className="flex flex-col justify-center space-y-8 py-12 lg:py-0">
            <div className="space-y-4">
              <div className="inline-block rounded-full border-2 border-border bg-main px-4 py-1.5 text-sm font-bold shadow-shadow">
                NYC Style Cookies
              </div>
              <h1 className="text-6xl font-heading tracking-wide sm:text-7xl xl:text-9xl uppercase leading-[0.9]">
                Thicc<br />
                Fatt<br />
                <span className="text-main drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-stroke-2">Chonky</span>
              </h1>
              <p className="max-w-[600px] text-xl md:text-2xl font-medium text-muted-foreground">
                The most indulgent, gooey, and massive cookies you'll ever eat. 
                Warning: May cause extreme happiness.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Button 
                size="lg" 
                className="h-14 px-8 text-xl border-2 shadow-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                onClick={() => scrollToSection("customize")}
              >
                Get Your Box
              </Button>
              <Button 
                variant="neutral" 
                size="lg" 
                className="h-14 px-8 text-xl border-2 shadow-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                onClick={() => scrollToSection("flavors-section")}
              >
                View Flavors <ArrowDownRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-[600px] lg:max-w-none lg:h-full flex items-center justify-center">
             {/* Decorative elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-main/20 rounded-full blur-3xl -z-10" />
             
             <div className="relative w-full aspect-square rotate-[-12deg] hover:rotate-0 transition-transform duration-500 ease-in-out">
                <Image
                  src="/window.svg"
                  alt="Giant Chonky Cookie"
                  fill
                  className="object-contain drop-shadow-[8px_8px_0px_rgba(0,0,0,1)]"
                  priority
                />
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}


