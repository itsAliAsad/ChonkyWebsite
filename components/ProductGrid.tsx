import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Product = {
  id: string
  name: string
  description: string
  price: string
  image: string
}

const products: Product[] = [
  { id: "1", name: "Classic Choco Chunk", description: "Dark chocolate chunks in a buttery dough.", price: "$4.50", image: "/file.svg" },
  { id: "2", name: "Salted Caramel Dream", description: "Caramel swirls with flaky sea salt.", price: "$4.75", image: "/file.svg" },
  { id: "3", name: "Peanut Butter Bliss", description: "Rich peanut butter with roasted peanuts.", price: "$4.50", image: "/file.svg" },
  { id: "4", name: "Red Velvet Crave", description: "Cream cheese chips in red velvet dough.", price: "$4.75", image: "/file.svg" },
  { id: "5", name: "Matcha White Magic", description: "Earthy matcha with white chocolate.", price: "$4.75", image: "/file.svg" },
  { id: "6", name: "Cookies & Cream", description: "Oreos folded into vanilla dough.", price: "$4.50", image: "/file.svg" },
]

export default function ProductGrid() {
  return (
    <div className="w-full">
      <div className="mb-8 text-center space-y-2">
        <h2 className="text-3xl font-heading">Bestsellers</h2>
        <p className="text-base">Our most-loved chonky picks. 2x3 grid for quick browsing.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
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
              <Button size="sm">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


