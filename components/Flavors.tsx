"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useBoxBuilder } from "@/components/box/BoxContext"
import { Plus, Star } from "lucide-react"

type Flavor = {
  id: string
  name: string
  description: string
  price: string
  image: string
}

type CollectionKey = "classics" | "chocolate"

const collections: Record<CollectionKey, { label: string; items: Flavor[] }> = {
  classics: {
    label: "The Classics",
    items: [
      { id: "g1", name: "Golden Chunk", description: "Butter cookie with golden chocolate chunks.", price: "Rs. 350", image: "/file.svg" },
      { id: "rv1", name: "Red Velvet", description: "Red velvet with cream cheese chips.", price: "Rs. 450", image: "/file.svg" },
      { id: "sc1", name: "Salted Caramel", description: "Caramel swirls with a hint of salt.", price: "Rs. 350", image: "/file.svg" },
      { id: "b1", name: "Biscoff", description: "Spiced cookie with Biscoff notes.", price: "Rs. 450", image: "/file.svg" },
    ],
  },
  chocolate: {
    label: "Chocolate Lovers",
    items: [
      { id: "hz1", name: "Hazel Hug", description: "Hazelnut-chocolate goodness.", price: "Rs. 450", image: "/file.svg" },
      { id: "sm1", name: "S’mores", description: "Chocolate, marshmallow, and biscuit.", price: "Rs. 350", image: "/file.svg" },
    ],
  },
}

export default function Flavors() {
  const { addFlavorToBox } = useBoxBuilder()

  return (
    <section id="flavors-section" className="w-full py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary-background/30 -skew-x-12 -z-10" />

      <div className="container mx-auto px-4">
        <div className="mb-24 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-bold uppercase tracking-wider bg-white/50 backdrop-blur-sm">
            <Star className="size-4 fill-main text-main" />
            Freshly Baked
          </div>
          <h2 className="text-6xl md:text-8xl font-heading uppercase tracking-tight">The Lineup</h2>
          <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto text-muted-foreground">
            Gooey on the inside, crispy on the outside. Pick your poison.
          </p>
        </div>

        <div className="space-y-32">
          {Object.entries(collections).map(([key, collection]) => (
            <div key={key} className="space-y-12">
              <div className="flex items-center gap-6">
                <h3 className="text-4xl md:text-5xl font-heading uppercase text-stroke-sm md:text-stroke text-transparent relative z-10">
                  {collection.label}
                  <span className="absolute -bottom-2 left-0 w-full h-4 bg-main/40 -z-10 -rotate-1" />
                </h3>
                <div className="h-px flex-1 bg-border/20"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {collection.items.map((p) => (
                  <div key={p.id} className="group relative flex flex-col h-full">
                    <div className="relative aspect-square mb-6 rounded-[2rem] bg-secondary-background/50 border-2 border-transparent group-hover:border-border transition-all duration-300 overflow-visible">
                      <div className="absolute inset-0 bg-main/0 group-hover:bg-main/10 rounded-[2rem] transition-colors duration-300" />
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain p-8 drop-shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute -top-4 -right-4 bg-white border-2 border-border px-4 py-2 font-heading text-lg rounded-full shadow-shadow group-hover:shadow-shadow-hover group-hover:-translate-y-1 transition-all">
                        {p.price}
                      </div>
                    </div>

                    <div className="space-y-4 px-2 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h4 className="text-3xl font-heading uppercase mb-2 group-hover:text-main transition-colors">{p.name}</h4>
                        <p className="text-lg text-muted-foreground font-medium leading-relaxed">{p.description}</p>
                      </div>

                      <Button
                        className="w-full h-14 text-lg font-bold rounded-xl border-2 border-border bg-background text-foreground shadow-sm hover:bg-main hover:text-main-foreground hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        onClick={() => addFlavorToBox(p.name, 1)}
                      >
                        <Plus className="mr-2 h-5 w-5" /> Add to Box
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


