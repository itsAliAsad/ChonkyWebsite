import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Flavors from "@/components/Flavors"
import CustomizeBox from "@/components/CustomizeBox"
import Footer from "@/components/Footer"
import { BoxProvider } from "@/components/box/BoxContext"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 snap-y snap-mandatory overflow-y-auto">
        <section id="home" className="snap-start py-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="rounded-base border-2 border-border bg-white shadow-shadow p-8">
              <Hero />
            </div>
          </div>
        </section>
        <BoxProvider>
          <section id="flavors-section" className="snap-start py-10">
            <div className="mx-auto max-w-6xl px-4">
              <div className="rounded-base border-2 border-border bg-white shadow-shadow p-8">
                <Flavors />
              </div>
            </div>
          </section>
          <section id="customize" className="snap-start py-10">
            <div className="mx-auto max-w-6xl px-4">
              <div className="rounded-base border-2 border-border bg-white shadow-shadow p-8">
                <CustomizeBox />
              </div>
            </div>
          </section>
        </BoxProvider>
      </main>
      <Footer />
    </div>
  );
}
