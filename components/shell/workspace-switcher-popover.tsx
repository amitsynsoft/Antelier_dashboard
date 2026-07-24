"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { demoWorkspaces, DemoWorkspace } from "@/mock/dashboard-data"
import { Check, ChevronsUpDown, Plus, Sparkles, Building2 } from "lucide-react"

interface WorkspaceSwitcherPopoverProps {
  collapsed?: boolean
  onWorkspaceChange?: (workspaceName: string) => void
}

export function WorkspaceSwitcherPopover({
  collapsed = false,
  onWorkspaceChange,
}: WorkspaceSwitcherPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedWorkspace, setSelectedWorkspace] = React.useState<DemoWorkspace>(
    demoWorkspaces[0]
  )
  const popoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelectWorkspace = (ws: DemoWorkspace) => {
    setSelectedWorkspace(ws)
    setOpen(false)
    if (onWorkspaceChange) {
      onWorkspaceChange(ws.name)
    }
  }

  if (collapsed) {
    return (
      <div className="flex items-center justify-center p-2">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/70 bg-card text-base shadow-2xs hover:bg-accent transition-colors"
          title={selectedWorkspace.name}
        >
          {selectedWorkspace.avatar}
        </button>
      </div>
    )
  }

  return (
    <div className="relative px-3 pt-2" ref={popoverRef}>
      {/* Clickable Workspace Profile Card Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-border/70 bg-card p-2.5 shadow-2xs transition-all duration-200 hover:border-primary/40 hover:bg-accent/40"
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          {/* Workspace Avatar Icon */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 text-base shadow-2xs">
            {selectedWorkspace.avatar}
          </div>

          <div className="flex flex-col text-left overflow-hidden space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-foreground truncate leading-tight">
                {selectedWorkspace.name}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-muted-foreground truncate leading-tight">
                {selectedWorkspace.industry}
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {selectedWorkspace.status}
              </span>
            </div>
          </div>
        </div>

        <ChevronsUpDown className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
      </button>

      {/* Modern Popover Dropdown */}
      {open && (
        <div className="absolute left-3 right-3 top-full mt-2 z-50 rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl p-2 animate-in fade-in-50 zoom-in-95 space-y-2">
          
          {/* Section 1: Header Label */}
          <div className="px-2 pt-1 pb-1 font-mono text-[10px] font-bold tracking-wider text-muted-foreground/70 uppercase">
            Workspaces ({demoWorkspaces.length})
          </div>

          {/* Section 2: Switch Workspace List */}
          <div className="space-y-1 max-h-64 overflow-y-auto no-scrollbar">
            {demoWorkspaces.map((ws) => {
              const isSelected = ws.id === selectedWorkspace.id

              return (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => handleSelectWorkspace(ws)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl p-2 text-left transition-colors cursor-pointer",
                    isSelected
                      ? "bg-primary/10 border border-primary/20 text-primary font-semibold"
                      : "hover:bg-muted/70 text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-background border border-border/50 text-sm shadow-2xs">
                      {ws.avatar}
                    </div>

                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-xs font-bold truncate leading-tight">
                        {ws.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground truncate leading-tight">
                        {ws.industry} • <span className="text-emerald-600 dark:text-emerald-400 font-medium">{ws.status}</span>
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="h-4 w-4 text-primary shrink-0 ml-2" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-border/60 my-1" />

          {/* Create New Workspace Action */}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              if (onWorkspaceChange) onWorkspaceChange("Create New Workspace")
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-xl p-2 text-xs font-semibold text-primary hover:bg-primary/10 transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Plus className="h-4 w-4" />
            </div>
            <span>Create New Workspace</span>
          </button>

        </div>
      )}
    </div>
  )
}
