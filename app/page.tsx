import Nav from "@/components/Nav"
import HeroBreak from "@/components/HeroBreak"
import Band from "@/components/Band"
import Lineup from "@/components/Lineup"
import BoxBuilder from "@/components/box/BoxBuilder"
import FlightLayer from "@/components/box/FlightLayer"
import Footer from "@/components/Footer"
import SmoothScroll from "@/components/SmoothScroll"
import { BoxProvider } from "@/components/box/BoxContext"

export default function Home() {
  return (
    <BoxProvider>
      <SmoothScroll />
      <Nav />
      <main>
        <HeroBreak />
        <Band />
        <Lineup />
        <BoxBuilder />
      </main>
      <Footer />
      <FlightLayer />
    </BoxProvider>
  )
}
