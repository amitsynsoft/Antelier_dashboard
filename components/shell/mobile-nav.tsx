"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { navigationGroups } from "@/mock/dashboard-data"
import { UserProfileDropdown } from "./user-profile-dropdown"
import {
  LayoutDashboard,
  Users,
  Bot,
  Plug,
  FileText,
  GitFork,
  MessageSquare,
  Clock,
  Settings,
  X,
  Sparkles,
  Building2,
  Sliders,
  LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Bot,
  Plug,
  FileText,
  GitFork,
  MessageSquare,
  Clock,
  Settings,
  Building2,
  Sliders,
  Sparkles,
}

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 animate-in bg-background/80 backdrop-blur-sm transition-opacity fade-in-50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 flex w-4/5 max-w-xs animate-in flex-col justify-between border-r border-border bg-sidebar p-4 text-sidebar-foreground shadow-2xl duration-200 slide-in-from-left">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0E1A24] shadow-2xs dark:bg-stone-100">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D97349]" />
              </span>
              <span className="font-serif text-2xl leading-none font-bold tracking-tight text-foreground">
                Antelier<span className="font-sans text-xl text-primary">Hub</span>
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-border bg-background p-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="no-scrollbar max-h-[70vh] space-y-5 overflow-y-auto pr-1">
            {navigationGroups.map((group, idx) => (
              <div key={idx} className="space-y-1">
                <div className="px-2 font-sans text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
                  {group.groupLabel}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon] || LayoutDashboard

                    return (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={onClose}
                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                      >
                        <Icon className="h-4.5 w-4.5 text-muted-foreground" />
                        <span>{item.title}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-border/60">
          <UserProfileDropdown />
        </div>
      </div>
    </div>
  )
}
