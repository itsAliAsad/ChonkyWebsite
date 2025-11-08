import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-border bg-secondary-background">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div className="space-y-2">
          <h3 className="font-heading text-xl">Chonky Cookies</h3>
          <p className="text-sm">Small-batch bakery crafting joy in every bite.</p>
        </div>
        <div className="space-y-2">
          <h4 className="font-heading">Links</h4>
          <nav className="flex flex-col gap-1">
            <Link href="#products" className="underline-offset-4 hover:underline">Shop</Link>
            <Link href="#about" className="underline-offset-4 hover:underline">About</Link>
            <Link href="#contact" className="underline-offset-4 hover:underline">Contact</Link>
          </nav>
        </div>
        <div className="space-y-2">
          <h4 className="font-heading">Visit</h4>
          <p className="text-sm">123 Cookie Lane, Sweet City</p>
          <p className="text-sm">Open Tue–Sun, 10am–7pm</p>
        </div>
      </div>
      <div className="border-t-2 border-border">
        <div className="mx-auto max-w-6xl px-4 py-4 text-sm flex items-center justify-between">
          <span>© {new Date().getFullYear()} Chonky Cookies</span>
          <span className="text-xs">Baked with love.</span>
        </div>
      </div>
    </footer>
  )
}


