import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Flavors from "@/components/Flavors"
import CustomizeBox from "@/components/CustomizeBox"
import Footer from "@/components/Footer"
import { BoxProvider } from "@/components/box/BoxContext"
import Marquee from "@/components/ui/marquee"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-base">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <div className="border-y-2 border-border bg-main py-4 overflow-hidden">
           <Marquee className="[--duration:20s] font-heading text-4xl">
             <span>THICC • FATT • CHONKY • GOOEY • INDULGENT • SWEET • </span>
             <span>THICC • FATT • CHONKY • GOOEY • INDULGENT • SWEET • </span>
           </Marquee>
        </div>

        <BoxProvider>
          <Flavors />
          <CustomizeBox />
        </BoxProvider>
      </main>
      <Footer />
    </div>
  );
}
