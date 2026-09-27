import type { Metadata } from "next"
import { Bagel_Fat_One, Bricolage_Grotesque, DM_Mono, Caveat } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const display = Bagel_Fat_One({ weight: "400", subsets: ["latin"], variable: "--nf-display" })
const sans = Bricolage_Grotesque({ subsets: ["latin"], variable: "--nf-sans", axes: ["wdth", "opsz"] })
const mono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--nf-mono" })
const hand = Caveat({ weight: ["600"], subsets: ["latin"], variable: "--nf-hand" })

export const metadata: Metadata = {
  title: "Chonky — Thick NYC-style cookies",
  description: "170 g cookies with gooey middles. Pick your flavors, pack your box, and we bake it fresh.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} ${hand.variable}`}>
      <body>
        {children}
        <Toaster
          position="bottom-center"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: "toast-ticket",
              title: "toast-title",
              description: "toast-desc",
              actionButton: "toast-action",
            },
          }}
        />
      </body>
    </html>
  )
}
