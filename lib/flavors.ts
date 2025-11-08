export type CollectionKey = "classics" | "chocolate"

export type Flavor = {
  id: string
  name: string
  description: string
  image: string
  collections: CollectionKey[]
  price: string
}

export const allFlavors: Flavor[] = [
  { id: "golden-chunk", name: "Golden Chunk", description: "Butter cookie with golden chocolate chunks.", image: "/file.svg", collections: ["classics"], price: "Rs. 350" },
  { id: "hazel-hug", name: "Hazel Hug", description: "Hazelnut-chocolate goodness.", image: "/file.svg", collections: ["chocolate"], price: "Rs. 450" },
  { id: "red-velvet", name: "Red Velvet", description: "Red velvet with cream cheese chips.", image: "/file.svg", collections: ["classics"], price: "Rs. 450" },
  { id: "salted-caramel", name: "Salted Caramel", description: "Caramel swirls with a hint of salt.", image: "/file.svg", collections: ["classics"], price: "Rs. 350" },
  { id: "smores", name: "S’mores", description: "Chocolate, marshmallow, and biscuit.", image: "/file.svg", collections: ["chocolate"], price: "Rs. 350" },
  { id: "biscoff", name: "Biscoff", description: "Spiced cookie with Biscoff notes.", image: "/file.svg", collections: ["classics"], price: "Rs. 450" },
]

export const flavorCollections: Record<CollectionKey, { label: string; items: Flavor[] }> = {
  classics: { label: "Classics", items: allFlavors.filter((f) => f.collections.includes("classics")) },
  chocolate: { label: "Chocolate Lovers", items: allFlavors.filter((f) => f.collections.includes("chocolate")) },
}


