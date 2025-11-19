"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowDownRight, Star } from "lucide-react"

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="home" className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-background pt-20 lg:pt-0">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-10">
            <div className="space-y-2 animate-in slide-in-from-bottom-10 fade-in duration-700">
              <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold uppercase tracking-wider bg-white/50 backdrop-blur-sm w-fit">
                <Star className="size-4 fill-main text-main" />
                NYC Style Cookies
              </div>
              <h1 className="text-[15vw] lg:text-[10vw] font-heading uppercase leading-[0.8] text-foreground">
                Thicc<br />
                <span className="text-transparent text-stroke hover:text-main transition-colors duration-500">Fatt</span><br />
                Chonky
              </h1>
              <p className="max-w-[600px] text-xl md:text-2xl font-medium text-muted-foreground leading-relaxed">
                The most <span className="text-main font-bold">indulgent</span>, gooey, and massive cookies you'll ever eat.
                Warning: May cause extreme happiness.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-200">
              <Button
                size="lg"
                className="h-16 px-10 text-xl rounded-full border-2 border-border bg-foreground text-background hover:bg-main hover:text-main-foreground shadow-shadow hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
                onClick={() => scrollToSection("customize")}
              >
                Get Your Box
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="h-16 px-10 text-xl rounded-full border-2 border-border hover:bg-secondary-background shadow-sm hover:shadow-none transition-all"
                onClick={() => scrollToSection("flavors-section")}
              >
                View Flavors <ArrowDownRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[50vh] lg:h-[80vh] flex items-center justify-center">
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-main/20 to-secondary-background/20 rounded-full blur-3xl -z-10 animate-pulse" />

            <div className="relative w-full h-full animate-float">
              <Image
                src="/hero-cookie.png"
                alt="Giant Chonky Cookie"
                fill
                className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-in-out"
                priority
              />
            </div>

            {/* Floating badges */}
            <div className="absolute top-10 right-0 md:right-10 bg-white border-2 border-border p-4 rounded-full shadow-shadow rotate-12 animate-bounce delay-700">
              <span className="font-heading text-xl">6oz Each!</span>
            </div>
            <div className="absolute bottom-20 left-0 bg-main border-2 border-border p-4 rounded-full shadow-shadow -rotate-6 animate-bounce delay-1000">
              <span className="font-heading text-xl">Gooey Center</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-20 opacity-5" style={{ backgroundImage: 'radial-gradient(#5C4026 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    </section>
  )
}


