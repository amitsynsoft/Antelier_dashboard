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
  ChevronLeft,
  ChevronRight,
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

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  onTriggerDemo?: () => void
  className?: string
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  className,
}: SidebarProps) {
  const pathname = usePathname()
  const [activeHash, setActiveHash] = React.useState<string>("")

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveHash(window.location.hash)
      const handleHashChange = () => setActiveHash(window.location.hash)
      window.addEventListener("hashchange", handleHashChange)
      return () => window.removeEventListener("hashchange", handleHashChange)
    }
  }, [])

  const isDashboardActive =
    pathname === "/dashboard" && (!activeHash || activeHash === "")

  return (
    <aside
      className={cn(
        "relative z-30 flex h-screen shrink-0 select-none flex-col justify-between border-r border-border/70 bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
        collapsed ? "w-18" : "w-68",
        className
      )}
    >
      {/* Top Section: Brand Header & Navigation */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-border/50 px-3.5">
          {!collapsed ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setActiveHash("")}
                className="group flex flex-col transition-opacity hover:opacity-90"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full bg-[#0E1A24] shadow-2xs dark:bg-stone-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D97349]" />
                  </span>
                  <span className="pt-0.5 font-serif text-2xl leading-none tracking-tight text-foreground">
                    Antelier
                    <span className="font-sans text-xl font-bold text-primary">
                      Hub
                    </span>
                  </span>
                </div>
                <p className="mt-1 truncate text-[11px] font-semibold tracking-tight text-muted-foreground">
                  Configurable AI Client Intake Platform
                </p>
              </Link>

              <button
                type="button"
                onClick={onToggleCollapse}
                className="hidden h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground shadow-2xs transition-all hover:bg-muted hover:text-foreground md:flex"
                title="Collapse sidebar"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="relative flex w-full items-center justify-between px-0.5">
              <Link
                href="/dashboard"
                onClick={() => setActiveHash("")}
                className="flex items-center justify-center transition-transform hover:scale-105"
                title="Antelier Hub Dashboard"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0E1A24] shadow-md dark:bg-stone-100">
                  <span className="h-3 w-3 rounded-full bg-[#D97349]" />
                </span>
              </Link>

              <button
                type="button"
                onClick={onToggleCollapse}
                className="flex h-6.5 w-6.5 cursor-pointer items-center justify-center rounded-full border border-border/80 bg-background text-muted-foreground shadow-2xs transition-all hover:bg-primary hover:text-primary-foreground"
                title="Expand sidebar"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation List */}
        <div
          className={cn(
            "no-scrollbar flex-1 space-y-5 overflow-y-auto py-4",
            collapsed ? "px-2" : "px-3.5"
          )}
        >
          {/* Main Dashboard Link */}
          <div>
            <Link
              href="/dashboard"
              onClick={() => setActiveHash("")}
              title={collapsed ? "Dashboard" : undefined}
              className={cn(
                "group flex cursor-pointer items-center transition-all duration-150",
                collapsed
                  ? cn(
                      "mx-auto h-11 w-11 justify-center rounded-2xl",
                      isDashboardActive
                        ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/25 font-bold"
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                    )
                  : cn(
                      "gap-3.5 px-3.5 py-3 text-sm font-semibold",
                      isDashboardActive
                        ? "rounded-l-none rounded-r-2xl border-l-4 border-primary bg-primary/10 pl-3 font-bold text-primary shadow-2xs"
                        : "rounded-2xl text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                    )
              )}
            >
              <LayoutDashboard
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform group-hover:scale-105",
                  collapsed
                    ? isDashboardActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                    : isDashboardActive
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground"
                )}
              />
              {!collapsed && <span>Dashboard</span>}
            </Link>
          </div>

          {/* Grouped Navigation Hierarchy */}
          {navigationGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              {!collapsed ? (
                <div className="flex items-center gap-3 px-3 pt-1">
                  <span className="shrink-0 font-sans text-[11px] font-bold tracking-wider text-muted-foreground/60 uppercase">
                    {group.groupLabel}
                  </span>
                  <div className="h-[1px] flex-1 bg-border/50" />
                </div>
              ) : (
                <div className="mx-auto my-1.5 h-[1px] w-8 bg-border/60" />
              )}

              <nav className="space-y-1.5">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard

                  let isActive = false
                  if (item.href.startsWith("/dashboard#")) {
                    const itemHash = item.href.split("#")[1]
                    isActive =
                      pathname === "/dashboard" && activeHash === `#${itemHash}`
                  } else {
                    isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" &&
                        pathname.startsWith(item.href))
                  }

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => {
                        if (item.href.includes("#")) {
                          setActiveHash(`#${item.href.split("#")[1]}`)
                        } else {
                          setActiveHash("")
                        }
                      }}
                      title={collapsed ? item.title : undefined}
                      className={cn(
                        "group flex cursor-pointer items-center transition-all duration-150",
                        collapsed
                          ? cn(
                              "mx-auto h-11 w-11 justify-center rounded-2xl",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary/25 font-bold"
                                : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                            )
                          : cn(
                              "gap-3.5 px-3.5 py-3 text-sm font-semibold",
                              isActive
                                ? "rounded-l-none rounded-r-2xl border-l-4 border-primary bg-primary/10 pl-3 font-bold text-primary shadow-2xs"
                                : "rounded-2xl text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                            )
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-5 w-5 shrink-0 transition-transform group-hover:scale-105",
                          collapsed
                            ? isActive
                              ? "text-primary-foreground"
                              : "text-muted-foreground group-hover:text-foreground"
                            : isActive
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />

                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: User Profile Card & Trigger */}
      <div className="border-t border-border/60 bg-sidebar p-3">
        <UserProfileDropdown variant="sidebar" collapsed={collapsed} />
      </div>
    </aside>
  )
}
