import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Font utility classes matching Tailwind-style tokens used in components
// font-base -> DM Sans Black (900), font-heading -> Bagel Fat One
export const fontBaseClass = "[font-family:var(--font-dm-sans)] font-black"
export const fontHeadingClass = "[font-family:var(--font-bagel-fat-one)]"
