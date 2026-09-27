import type { Flavor } from "@/lib/flavors"

type Props = { flavor: Flavor; className?: string; style?: React.CSSProperties; alt?: string }

/** A cut-out cookie photo. Decorative unless given alt text. */
export default function CookiePhoto({ flavor, className, style, alt = "" }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={flavor.image} alt={alt} draggable={false} className={`select-none object-contain ${className ?? ""}`} style={style} />
  )
}
