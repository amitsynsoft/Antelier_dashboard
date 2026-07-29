"use client"

import { useTheme } from "next-themes"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  const { theme = "light" } = useTheme()

  return (
    <SonnerToaster
      theme={theme as "light" | "dark"}
      position="top-center"
      expand={true}
      visibleToasts={5}
      gap={10}
      closeButton
      duration={3500}
      toastOptions={{
        style: {
          zIndex: 99999,
        },
        className: "!font-sans !rounded-2xl !p-4 !shadow-2xl",
      }}
    />
  )
}
