"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useWorkspace } from "@/context/workspace-context"
import { currentUser } from "@/mock/dashboard-data"
import {
  User,
  Building2,
  CreditCard,
  LogOut,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UserProfileDropdownProps {
  variant?: "navbar" | "sidebar"
  collapsed?: boolean
  className?: string
}

export function UserProfileDropdown({
  variant = "sidebar",
  collapsed = false,
  className,
}: UserProfileDropdownProps) {
  const router = useRouter()
  const { logout } = useAuth()
  const { resetWorkspace } = useWorkspace()
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = () => {
    setOpen(false)
    resetWorkspace()
    logout()
    router.push("/login")
  }

  if (variant === "navbar") {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border/60 bg-background p-1 shadow-2xs transition-all hover:bg-muted/50 focus:ring-2 focus:ring-ring focus:outline-none sm:px-2.5 sm:py-1.5"
        >
          <Image
            src={currentUser.avatar}
            alt={currentUser.name}
            width={28}
            height={28}
            className="h-7 w-7 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="hidden flex-col text-left md:flex">
            <span className="text-xs font-bold leading-none tracking-tight text-foreground">
              {currentUser.name}
            </span>
            <span className="mt-0.5 text-[11px] leading-none text-muted-foreground">
              {currentUser.role}
            </span>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground sm:block" />
        </button>

        {open && (
          <div className="animate-in fade-in-50 zoom-in-95 z-50 absolute right-0 mt-2 w-72 space-y-1 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl">
            <div className="flex items-center gap-3 border-b border-border/50 p-2.5">
              <Image
                src={currentUser.avatar}
                alt={currentUser.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-bold leading-tight text-foreground">
                  {currentUser.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {currentUser.email}
                </span>
                <span className="mt-0.5 text-xs font-semibold text-primary">
                  {currentUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-0.5 pt-1">
              <Link
                href="/users"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted/70"
              >
                <User className="h-4 w-4 text-muted-foreground" />
                <span>Profile & Team Access</span>
              </Link>

              <Link
                href="/business-profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted/70"
              >
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>Business Profile</span>
              </Link>

              <a
                href="#billing"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted/70"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Plan & Billing</span>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  {currentUser.plan}
                </span>
              </a>
            </div>

            <div className="my-1 h-[1px] bg-border/60" />

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-rose-500 transition-colors hover:bg-rose-500/10"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out & Reset Setup</span>
            </button>
          </div>
        )}
      </div>
    )
  }

  // Sidebar variant (bottom profile trigger)
  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      {/* Popover Menu opening upward */}
      {open && (
        <div
          className={cn(
            "animate-in fade-in-50 slide-in-from-bottom-2 z-50 absolute bottom-full mb-2 w-64 space-y-1 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl",
            collapsed ? "left-16" : "left-0"
          )}
        >
          <div className="flex items-center gap-3 border-b border-border/50 p-2.5">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-bold leading-tight text-foreground">
                {currentUser.name}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {currentUser.email}
              </span>
              <span className="mt-0.5 text-xs font-semibold text-primary">
                {currentUser.role}
              </span>
            </div>
          </div>

          <div className="space-y-0.5 pt-1">
            <Link
              href="/users"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted/70"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Profile & Team Access</span>
            </Link>

            <Link
              href="/business-profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted/70"
            >
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>Business Profile</span>
            </Link>

            <a
              href="#billing"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted/70"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>Plan & Billing</span>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {currentUser.plan}
              </span>
            </a>
          </div>

          <div className="my-1 h-[1px] bg-border/60" />

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-left text-xs font-bold text-rose-500 transition-colors hover:bg-rose-500/10"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out & Reset Setup</span>
          </button>
        </div>
      )}

      {/* Clickable Sidebar Bottom User Profile Card */}
      {collapsed ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          title={`${currentUser.name} (${currentUser.role})`}
          className={cn(
            "mx-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl p-0.5 transition-all duration-150 hover:scale-105 focus:outline-none",
            open ? "ring-2 ring-primary bg-primary/10" : "hover:bg-muted/80"
          )}
        >
          <Image
            src={currentUser.avatar}
            alt={currentUser.name}
            width={36}
            height={36}
            className="h-8.5 w-8.5 rounded-xl object-cover ring-1 ring-primary/30"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full cursor-pointer items-center gap-3 rounded-2xl p-2 text-left transition-all duration-150 hover:bg-muted/70 focus:outline-none",
            open && "bg-muted/70"
          )}
        >
          <Image
            src={currentUser.avatar}
            alt={currentUser.name}
            width={36}
            height={36}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
          />
          <div className="flex flex-1 flex-col overflow-hidden">
            <span className="truncate text-sm font-bold leading-snug text-foreground">
              {currentUser.name}
            </span>
            <span className="truncate text-xs leading-tight text-muted-foreground">
              {currentUser.role}
            </span>
          </div>
          {open ? (
            <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          )}
        </button>
      )}
    </div>
  )
}
