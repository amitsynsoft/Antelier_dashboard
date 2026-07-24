"use client"

import * as React from "react"
import Image from "next/image"
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
  Play,
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
  onTriggerDemo,
  className,
}: SidebarProps) {
  const [activeTab, setActiveTab] = React.useState("Dashboard")

  return (
    <aside
      className={cn(
        "relative z-30 flex h-screen shrink-0 flex-col justify-between border-r border-border/70 bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out select-none",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      {/* Top Section: Brand Header, Product Descriptor & Navigation */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 flex-col justify-center border-b border-border/50 px-4">
          <div className="flex items-center justify-between">
            {!collapsed ? (
              <a
                href="#"
                className="group flex flex-col transition-opacity hover:opacity-90"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0E1A24] shadow-2xs dark:bg-stone-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D97349]" />
                  </span>
                  <span className="pt-0.5 font-serif text-2xl leading-none tracking-tight text-foreground">
                    Antelier
                    <span className="font-sans text-xl font-bold text-primary">
                      Hub
                    </span>
                  </span>
                </div>
              </a>
            ) : (
              <a
                href="#"
                className="mx-auto flex items-center justify-center transition-transform hover:scale-105"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0E1A24] shadow-2xs dark:bg-stone-100">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D97349]" />
                </span>
              </a>
            )}

            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden h-7 w-7 cursor-pointer items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground shadow-2xs transition-all hover:bg-muted hover:text-foreground md:flex"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation List */}
        <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto px-3 py-3">
          {/* Dashboard Item */}
          <div className="space-y-1">
            <a
              href="#"
              onClick={() => setActiveTab("Dashboard")}
              className={cn(
                "group relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150",
                activeTab === "Dashboard"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              )}
            >
              <LayoutDashboard className="h-4.5 w-4.5 shrink-0" />
              {!collapsed && <span>Dashboard</span>}
            </a>
          </div>

          {/* Grouped Navigation Hierarchy */}
          {navigationGroups.map((group, idx) => (
            <div key={idx} className="space-y-1.5">
              {!collapsed && (
                <div className="px-2.5 font-sans text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
                  {group.groupLabel}
                </div>
              )}

              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard
                  const isActive = activeTab === item.title

                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setActiveTab(item.title)}
                      className={cn(
                        "group relative flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-primary/15 font-bold text-primary shadow-2xs"
                          : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        )}
                      />

                      {!collapsed && (
                        <span className="truncate">{item.title}</span>
                      )}
                    </a>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section: Contextual Demo Card & User Profile Footer */}
      {!collapsed && (
        <div className="space-y-3 border-t border-border/50 p-3">
          {/* Contextual Demo Card */}
          <div className="space-y-2.5 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card to-card p-3.5 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-base">🚀</span>
              <p className="text-xs leading-tight font-bold text-foreground">
                Ready to launch your AI?
              </p>
            </div>
            <p className="text-[11px] leading-snug text-muted-foreground">
              Run a complete client intake simulation using your current
              configuration.
            </p>
            <button
              type="button"
              onClick={onTriggerDemo}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-2xs transition-opacity hover:opacity-95"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Run Demo Conversation</span>
            </button>
          </div>

          {/* User Profile Footer */}
          <div className="pt-0.5">
            <UserProfileDropdown />
          </div>
        </div>
      )}
    </aside>
  )
}
