"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      style={{ fontFamily: "inherit", overflowWrap: "anywhere" }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "bg-background text-foreground border-border border-2 font-heading shadow-shadow rounded-base text-[13px] flex items-center gap-2.5 p-4 w-[356px] [&:has(button)]:justify-between",
          description: "font-base",
          actionButton:
            "font-base inline-flex items-center justify-center h-10 px-4 text-sm border-2 border-border rounded-base shrink-0 bg-main text-main-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ring-offset-white",
          cancelButton:
            "font-base inline-flex items-center justify-center h-10 px-4 text-sm border-2 border-border rounded-base shrink-0 bg-secondary-background text-foreground shadow-shadow transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ring-offset-white",
          error: "bg-black text-white",
          loading:
            "[&[data-sonner-toast]_[data-icon]]:flex [&[data-sonner-toast]_[data-icon]]:size-4 [&[data-sonner-toast]_[data-icon]]:relative [&[data-sonner-toast]_[data-icon]]:justify-start [&[data-sonner-toast]_[data-icon]]:items-center [&[data-sonner-toast]_[data-icon]]:flex-shrink-0",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
