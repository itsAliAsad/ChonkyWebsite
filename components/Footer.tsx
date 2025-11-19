import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-foreground text-background overflow-hidden">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid gap-16 lg:grid-cols-12 mb-24">
          <div className="lg:col-span-6 space-y-8">
            <h3 className="font-heading text-6xl md:text-8xl uppercase leading-[0.8]">
              Stay<br />Sweet
            </h3>
            <p className="text-2xl font-medium max-w-md text-background/80">
              Join our mailing list for exclusive drops, secret flavors, and free cookie alerts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b-2 border-background/30 p-4 text-xl placeholder:text-background/30 focus:outline-none focus:border-main transition-colors"
              />
              <button className="group flex items-center gap-2 text-xl font-bold uppercase tracking-wide hover:text-main transition-colors">
                Join the Club <ArrowUpRight className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="font-heading text-3xl uppercase text-main">Menu</h4>
            <nav className="flex flex-col gap-4 text-xl font-medium">
              <Link href="#home" className="hover:text-main transition-colors w-fit">Home</Link>
              <Link href="#flavors-section" className="hover:text-main transition-colors w-fit">The Lineup</Link>
              <Link href="#customize" className="hover:text-main transition-colors w-fit">Build Box</Link>
              <Link href="#" className="hover:text-main transition-colors w-fit">Merch</Link>
              <Link href="#" className="hover:text-main transition-colors w-fit">Locations</Link>
            </nav>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="font-heading text-3xl uppercase text-main">Socials</h4>
            <nav className="flex flex-col gap-4 text-xl font-medium">
              <a href="#" className="hover:text-main transition-colors w-fit">Instagram</a>
              <a href="#" className="hover:text-main transition-colors w-fit">TikTok</a>
              <a href="#" className="hover:text-main transition-colors w-fit">Twitter</a>
              <a href="#" className="hover:text-main transition-colors w-fit">YouTube</a>
            </nav>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-background/60">
          <p className="font-medium">© {new Date().getFullYear()} Chonky Cookies. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <Link href="#" className="hover:text-background transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-background transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Massive Footer Logo */}
      <div className="w-full border-t-2 border-background/10 bg-main">
        <h1 className="text-[22vw] leading-[0.8] font-heading text-center tracking-tighter text-foreground select-none mix-blend-multiply opacity-90">
          CHONKY
        </h1>
      </div>
    </footer>
  )
}


