"use client"

import { useTheme } from "next-themes"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  const { theme = "light" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as "light" | "dark"}
      position="top-center"
      richColors
      closeButton
      duration={3500}
      toastOptions={{
        style: {
          zIndex: 99999,
        },
        className:
          "!font-sans !rounded-2xl !border !border-border/80 !shadow-2xl !text-sm !font-semibold !p-4",
      }}
    />
  )
}
