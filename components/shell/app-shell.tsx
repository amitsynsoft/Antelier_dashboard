"use client"

import * as React from "react"
import { Sidebar } from "./sidebar"
import { TopNav } from "./top-nav"
import { MobileNav } from "./mobile-nav"
import { CommandPalette } from "./command-palette"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  // Persist collapsed state across page transitions via localStorage
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("antelier_sidebar_collapsed")
        return saved !== null ? JSON.parse(saved) : false
      } catch {
        return false
      }
    }
    return false
  })

  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const toggleSidebar = React.useCallback(() => {
    setSidebarCollapsed((prev) => {
      const next = !prev
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("antelier_sidebar_collapsed", JSON.stringify(next))
        } catch {
          // ignore storage quota errors
        }
      }
      return next
    })
  }, [])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="animate-in slide-in-from-bottom-5 z-50 fixed bottom-6 right-6 flex items-center gap-3 rounded-xl border border-primary/30 bg-popover px-4.5 py-3 text-foreground shadow-2xl">
          <div className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 cursor-pointer text-sm font-bold text-muted-foreground hover:text-foreground"
          >
            ✕
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        onTriggerDemo={() =>
          triggerToast("Launching live client intake simulation demo...")
        }
        className="hidden lg:flex"
      />

      {/* Mobile Slide-over Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      {/* Interactive Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col h-full overflow-hidden">
        <TopNav
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onTriggerDemo={() =>
            triggerToast("Launching product tour and interactive demos...")
          }
        />

        <main className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
