"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { currentUser } from "@/mock/dashboard-data"
import {
  User,
  Settings,
  ShieldCheck,
  CreditCard,
  LogOut,
  ChevronDown,
  Sparkles,
  Command,
} from "lucide-react"

export function UserProfileDropdown() {
  const router = useRouter()
  const { logout } = useAuth()
  const [open, setOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSignOut = () => {
    setOpen(false)
    logout()
    router.push("/login")
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-xl border border-border/60 bg-background hover:bg-muted/50 transition-all shadow-2xs focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
      >
        <Image
          src={currentUser.avatar}
          alt={currentUser.name}
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div className="hidden md:flex flex-col text-left">
          <span className="text-xs font-bold tracking-tight text-foreground leading-none">
            {currentUser.name}
          </span>
          <span className="text-[11px] text-muted-foreground mt-0.5 leading-none">
            {currentUser.role}
          </span>
        </div>
        <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-border bg-popover p-2 text-popover-foreground shadow-2xl z-50 animate-in fade-in-50 zoom-in-95 space-y-1">
          {/* User Details Header */}
          <div className="flex items-center gap-3 p-2.5 border-b border-border/50">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/30"
            />
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-bold text-foreground leading-tight truncate">
                {currentUser.name}
              </span>
              <span className="text-xs text-muted-foreground truncate">
                {currentUser.email}
              </span>
              <span className="text-[10px] font-semibold text-primary mt-0.5">
                {currentUser.role}
              </span>
            </div>
          </div>

          {/* Actions List */}
          <div className="space-y-0.5 pt-1">
            <a
              href="#settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/70 transition-colors"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              <span>Profile Settings</span>
            </a>

            <a
              href="#workspace-settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/70 transition-colors"
            >
              <Settings className="h-4 w-4 text-muted-foreground" />
              <span>Workspace Preferences</span>
            </a>

            <a
              href="#billing"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>Plan & Billing</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.5 rounded-full">
                {currentUser.plan}
              </span>
            </a>
          </div>

          <div className="h-[1px] bg-border/60 my-1" />

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors text-left"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  )
}
