"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const pathname = usePathname()

  if (!isOpen) return null

  const isDashboardActive = pathname === "/dashboard" || pathname === "/"

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
            {/* Dashboard Main Link */}
            <div>
              <Link
                href="/dashboard"
                onClick={onClose}
                className={cn(
                  "flex cursor-pointer items-center gap-3.5 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all",
                  isDashboardActive
                    ? "border-l-4 border-primary bg-primary/10 pl-3 font-bold text-primary shadow-2xs"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <LayoutDashboard
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isDashboardActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                <span>Dashboard</span>
              </Link>
            </div>

            {/* Navigation Groups */}
            {navigationGroups.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center gap-3 px-3 pt-1">
                  <span className="shrink-0 font-sans text-[11px] font-bold tracking-wider text-muted-foreground/60 uppercase">
                    {group.groupLabel}
                  </span>
                  <div className="h-[1px] flex-1 bg-border/50" />
                </div>
                <div className="space-y-1.5">
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon] || LayoutDashboard
                    const isActive = pathname === item.href

                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex cursor-pointer items-center gap-3.5 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all",
                          isActive
                            ? "border-l-4 border-primary bg-primary/10 pl-3 font-bold text-primary shadow-2xs"
                            : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-4.5 w-4.5 shrink-0 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                        <span>{item.title}</span>
                      </Link>
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
