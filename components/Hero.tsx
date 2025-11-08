import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-heading leading-tight">
          Thicc Fatt Chonky Cooookies
        </h1>
        <p className="text-base">
          Handcrafted cookies with premium ingredients. Crispy edges, gooey centers, and flavors for days.
        </p>
        <div className="flex gap-4">
          <Button className="min-w-32">Get Your Box</Button>
          <Button variant="neutral" className="min-w-32">View All Flavors</Button>
        </div>
      </div>
      <div className="relative aspect-square md:aspect-[4/3] w-full rounded-base border-2 border-border overflow-hidden shadow-shadow">
        <Image
          src="/window.svg"
          alt="Fresh cookies"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover p-8 dark:invert"
          priority
        />
      </div>
    </div>
  )
}


