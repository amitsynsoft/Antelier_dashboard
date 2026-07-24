"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Bell, Check, Sparkles, AlertTriangle, ShieldCheck, FileCheck2, Trash2 } from "lucide-react"

type NotificationItem = {
  id: string
  title: string
  message: string
  time: string
  unread: boolean
  type: "intake" | "sla" | "security" | "system"
}

const initialNotifications: NotificationItem[] = [
  {
    id: "N-101",
    title: "High Value Prospect Qualified",
    message: "Starlight Financial Systems reached Lead Score 96 via RFP Auto-Parse AI Agent.",
    time: "2 min ago",
    unread: true,
    type: "intake"
  },
  {
    id: "N-102",
    title: "SLA Warning: Quantum Cloud",
    message: "Custom terms approval required within 15 minutes to avoid SLA breach.",
    time: "14 min ago",
    unread: true,
    type: "sla"
  },
  {
    id: "N-103",
    title: "SOC-2 Auto Audit Passed",
    message: "All 14 connected workflow endpoints passed daily compliance check.",
    time: "1 hour ago",
    unread: false,
    type: "security"
  },
  {
    id: "N-104",
    title: "Salesforce CRM Sync Complete",
    message: "142 accounts successfully mapped and enriched in Salesforce Enterprise.",
    time: "3 hours ago",
    unread: false,
    type: "system"
  }
]

export function NotificationCenter() {
  const [open, setOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState<NotificationItem[]>(initialNotifications)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => n.unread).length

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "intake":
        return <Sparkles className="h-4 w-4 text-emerald-500" />
      case "sla":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "security":
        return <ShieldCheck className="h-4 w-4 text-blue-500" />
      default:
        return <FileCheck2 className="h-4 w-4 text-purple-500" />
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-background hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-ring"
        aria-label="Open notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-xs font-bold text-white shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-popover p-0 text-popover-foreground shadow-2xl z-50 animate-in fade-in-50 zoom-in-95">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-muted/20">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold tracking-tight text-foreground">Notifications</h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary text-primary-foreground">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-medium">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Check className="h-3.5 w-3.5" />
                  <span>Mark read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="p-1 text-muted-foreground hover:text-rose-500 transition-colors"
                  title="Clear all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-border/40">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No notifications to display
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-start gap-3 p-3.5 transition-colors hover:bg-muted/30",
                    item.unread && "bg-muted/15 font-medium"
                  )}
                >
                  <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-muted/60">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground tracking-tight">
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-snug">{item.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-2.5 border-t border-border/50 bg-muted/20 text-center">
            <a
              href="#activity"
              onClick={() => setOpen(false)}
              className="text-sm font-semibold text-primary hover:underline"
            >
              View complete activity audit trail →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
