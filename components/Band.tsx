const WORDS = ["Thicc", "Fatt", "Chonky", "Gooey", "170 g", "Baked fresh", "Never flat"]

/** A tilted strip of cocoa between the hero and the menu. */
export default function Band() {
  const row = (
    <span className="flex shrink-0 items-center gap-8 pr-8">
      {WORDS.map((w) => (
        <span key={w} className="flex items-center gap-8">
          <span>{w}</span>
          <span aria-hidden className="inline-block size-3 rounded-full bg-cherry" />
        </span>
      ))}
    </span>
  )
  return (
    <div aria-hidden className="relative z-10 -my-2 -rotate-2 overflow-hidden bg-cocoa py-5 text-butter shadow-[0_20px_40px_-20px_rgba(58,31,22,0.6)]">
      <div className="flex w-max animate-marquee font-display text-4xl leading-none md:text-6xl">
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  )
}
