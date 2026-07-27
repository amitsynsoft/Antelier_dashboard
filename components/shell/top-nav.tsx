"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Menu, Search } from "lucide-react"
import { ThemeSwitcher } from "./theme-switcher"
import { NotificationCenter } from "./notification-center"
import { HelpPopover } from "./help-popover"

interface TopNavProps {
  onOpenMobileNav: () => void
  onOpenCommandPalette: () => void
  onTriggerDemo?: () => void
  className?: string
}

export function TopNav({
  onOpenMobileNav,
  onOpenCommandPalette,
  onTriggerDemo,
  className,
}: TopNavProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/60 bg-background/85 px-4 backdrop-blur-md transition-all sm:px-6",
        className
      )}
    >
      {/* Left: Mobile Navigation Toggle & Mobile Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          className="rounded-xl border border-border/60 bg-background p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="lg:hidden flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0E1A24] shadow-2xs dark:bg-stone-100">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D97349]" />
          </span>
          <span className="font-serif text-xl leading-none text-foreground">
            Antelier<span className="font-sans font-bold text-primary">Hub</span>
          </span>
        </div>
      </div>

      {/* Global Actions Header: Search, Notifications, Help, Theme */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">

        {/* Global Command Search */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="group flex w-40 sm:w-60 md:w-72 cursor-pointer items-center justify-between rounded-xl border border-border/70 bg-muted/40 px-3.5 py-2 text-xs sm:text-sm text-muted-foreground shadow-2xs transition-all hover:bg-muted/70 hover:text-foreground"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            <span className="truncate">Search workspaces, knowledge, prompts...</span>
          </div>
          <kbd className="py-0.5 hidden shrink-0 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[11px] font-semibold text-muted-foreground shadow-2xs md:inline-flex">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Center */}
        <NotificationCenter />

        {/* Help & Documentation Popover */}
        <HelpPopover
          onOpenCommandPalette={onOpenCommandPalette}
          onTriggerDemo={onTriggerDemo}
        />

        {/* Theme Mode Toggle (Icon only) */}
        <ThemeSwitcher />
      </div>
    </header>
  )
}
