"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useBoxBuilder } from "@/components/box/BoxContext"
import { Plus } from "lucide-react"

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
    <section id="flavors-section" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center space-y-4">
          <h2 className="text-5xl md:text-7xl font-heading uppercase">The Lineup</h2>
          <p className="text-xl font-medium max-w-2xl mx-auto">
            Freshly baked, gooey on the inside, crispy on the outside. Pick your poison.
          </p>
        </div>

        <div className="space-y-20">
          {Object.entries(collections).map(([key, collection]) => (
            <div key={key} className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-3xl md:text-4xl font-heading bg-main px-4 py-2 border-2 border-border shadow-shadow rotate-1 inline-block">
                  {collection.label}
                </h3>
                <div className="h-1 flex-1 bg-border rounded-full opacity-20"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {collection.items.map((p) => (
                  <div key={p.id} className="group relative bg-white border-2 border-border rounded-base shadow-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 flex flex-col overflow-hidden">
                    <div className="relative aspect-square bg-secondary-background border-b-2 border-border p-8 group-hover:bg-main/20 transition-colors">
                      <Image 
                        src={p.image} 
                        alt={p.name} 
                        fill 
                        className="object-contain p-4 drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute top-4 right-4 bg-white border-2 border-border px-3 py-1 font-bold rounded-full text-sm shadow-sm">
                        {p.price}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1 gap-4">
                      <div>
                        <h4 className="text-2xl font-heading mb-2">{p.name}</h4>
                        <p className="text-muted-foreground font-medium leading-relaxed">{p.description}</p>
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <Button 
                          className="w-full text-lg font-bold border-2 shadow-sm hover:shadow-none" 
                          onClick={() => addFlavorToBox(p.name, 1)}
                        >
                          <Plus className="mr-2 h-5 w-5" /> Add to Box
                        </Button>
                      </div>
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


