import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full border-t-2 border-border bg-main text-main-foreground">
      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-heading text-4xl uppercase">Stay Sweet</h3>
            <p className="text-xl font-medium max-w-md">
              Join our mailing list for exclusive drops, secret flavors, and free cookie alerts.
            </p>
            <div className="flex gap-2 max-w-md">
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="flex-1 rounded-base border-2 border-border p-3 font-bold placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="rounded-base border-2 border-border bg-white px-6 py-3 font-bold shadow-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                Join
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-heading text-2xl uppercase">Menu</h4>
            <nav className="flex flex-col gap-2 text-lg font-bold">
              <Link href="#home" className="hover:underline decoration-2 underline-offset-4">Home</Link>
              <Link href="#flavors-section" className="hover:underline decoration-2 underline-offset-4">Flavors</Link>
              <Link href="#customize" className="hover:underline decoration-2 underline-offset-4">Build Box</Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-heading text-2xl uppercase">Socials</h4>
            <nav className="flex flex-col gap-2 text-lg font-bold">
              <a href="#" className="hover:underline decoration-2 underline-offset-4">Instagram</a>
              <a href="#" className="hover:underline decoration-2 underline-offset-4">TikTok</a>
              <a href="#" className="hover:underline decoration-2 underline-offset-4">Twitter</a>
            </nav>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t-2 border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-bold">© {new Date().getFullYear()} Chonky Cookies. All rights reserved.</p>
          <p className="font-bold">Designed for the sweet tooth.</p>
        </div>
      </div>
      
      {/* Massive Footer Logo */}
      <div className="w-full overflow-hidden border-t-2 border-border bg-white">
        <h1 className="text-[15vw] leading-none font-heading text-center tracking-tighter text-main select-none">
          CHONKY
        </h1>
      </div>
    </footer>
  )
}


