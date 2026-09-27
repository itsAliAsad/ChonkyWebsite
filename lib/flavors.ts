export type CollectionKey = "classics" | "chocolate"

export type Flavor = {
  id: string
  /** Must match the product title in Shopify. */
  name: string
  description: string
  collection: CollectionKey
  price: number
  /** Cut-out photo, three-quarter view, in /public/cookies. */
  image: string
}

export const COOKIE_GRAMS = 170
export const DELIVERY_FEE = 250

export const collectionLabels: Record<CollectionKey, string> = {
  classics: "Classic",
  chocolate: "Chocolate lovers",
}

export const allFlavors: Flavor[] = [
  {
    id: "golden-chunk",
    image: "/cookies/golden-chunk.webp",
    name: "Golden Chunk",
    description: "Brown-butter dough, golden chocolate chunks, flaky salt.",
    collection: "classics",
    price: 350,
  },
  {
    id: "red-velvet",
    image: "/cookies/red-velvet.webp",
    name: "Red Velvet",
    description: "Cocoa-red dough loaded with cream cheese chips.",
    collection: "classics",
    price: 450,
  },
  {
    id: "salted-caramel",
    image: "/cookies/salted-caramel.webp",
    name: "Salted Caramel",
    description: "Caramel swirls folded through, sea salt on top.",
    collection: "classics",
    price: 350,
  },
  {
    id: "biscoff",
    image: "/cookies/biscoff.webp",
    name: "Biscoff",
    description: "Speculoos spice, crushed Lotus biscuit, cookie butter core.",
    collection: "classics",
    price: 450,
  },
  {
    id: "hazel-hug",
    image: "/cookies/hazel-hug.webp",
    name: "Hazel Hug",
    description: "Dark cocoa dough, roasted hazelnuts, a hazelnut-spread heart.",
    collection: "chocolate",
    price: 450,
  },
  {
    id: "smores",
    image: "/cookies/smores.webp",
    name: "S’mores",
    description: "Graham crumbs, milk chocolate, torched marshmallow.",
    collection: "chocolate",
    price: 350,
  },
]

export const flavorById = new Map(allFlavors.map((f) => [f.id, f]))

export const formatRs = (n: number) => `Rs. ${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
