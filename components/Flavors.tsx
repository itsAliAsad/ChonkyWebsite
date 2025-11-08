"use client"

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBoxBuilder } from "@/components/box/BoxContext"

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
    label: "Classics",
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
  const tabs: { key: CollectionKey; label: string }[] = [
    { key: "classics", label: collections.classics.label },
    { key: "chocolate", label: collections.chocolate.label },
  ]

  return (
    <section id="flavors" className="w-full">
      <div className="mb-6 text-center space-y-1">
        <h2 className="text-3xl font-heading">Flavors by Collection</h2>
        <p className="text-base text-muted-foreground">Explore our cookies by category and discover your next favorite.</p>
      </div>
      <Tabs defaultValue="classics" className="w-full">
        <div className="flex justify-center">
          <TabsList>
            {tabs.map((t) => (
              <TabsTrigger key={t.key} value={t.key}>
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((t) => (
          <TabsContent key={t.key} value={t.key} className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections[t.key].items.map((p) => (
                <Card key={p.id} className="overflow-hidden">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full border-b-2 border-border bg-secondary-background">
                      <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-6 dark:invert" />
                    </div>
                  </CardHeader>
                  <CardContent className="py-4">
                    <CardTitle className="text-lg">{p.name}</CardTitle>
                    <CardDescription className="mt-1">{p.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="justify-between">
                    <span className="font-heading">{p.price}</span>
                    <Button size="sm" onClick={() => addFlavorToBox(p.name, 1)}>Add to Box</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}


