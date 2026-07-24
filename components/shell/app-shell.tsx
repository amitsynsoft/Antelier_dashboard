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
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = React.useState(false)
  const [toastMessage, setToastMessage] = React.useState<string | null>(null)

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 4000)
  }

  return (
    <div className="flex h-screen w-full bg-background font-sans overflow-hidden">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4.5 py-3 rounded-xl border border-primary/30 bg-popover text-foreground shadow-2xl animate-in slide-in-from-bottom-5">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-sm text-muted-foreground hover:text-foreground ml-2 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onTriggerDemo={() => triggerToast("Launching live client intake simulation demo...")}
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
          onTriggerDemo={() => triggerToast("Launching product tour and interactive demos...")}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {children}
        </main>
      </div>
    </div>
  )
}
