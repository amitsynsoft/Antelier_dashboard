"use client"

import * as React from "react"
import { HelpCircle, BookOpen, Command, MessageSquare, Compass, ExternalLink } from "lucide-react"

interface HelpPopoverProps {
  onOpenCommandPalette?: () => void
  onTriggerDemo?: () => void
}

export function HelpPopover({
  onOpenCommandPalette,
  onTriggerDemo,
}: HelpPopoverProps) {
  const [open, setOpen] = React.useState(false)
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

  return (
    <div className="relative" ref={popoverRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-xl border border-border/60 bg-background text-muted-foreground shadow-2xs hover:bg-muted/60 hover:text-foreground transition-all focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
        aria-label="Open help and documentation"
        title="Help & Documentation"
      >
        <HelpCircle className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl p-2 z-50 animate-in fade-in-50 zoom-in-95 space-y-1.5">
          <div className="px-3 py-2 border-b border-border/50">
            <h4 className="text-xs font-bold text-foreground">Help & Resources</h4>
            <p className="text-[11px] text-muted-foreground">AntelierHub Documentation & SLA</p>
          </div>

          <div className="space-y-0.5 pt-1">
            <a
              href="#docs"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Documentation</span>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
            </a>

            <button
              type="button"
              onClick={() => {
                setOpen(false)
                if (onOpenCommandPalette) onOpenCommandPalette()
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/70 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Command className="h-4 w-4 text-primary" />
                <span>Keyboard Shortcuts</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono border border-border rounded bg-background text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false)
                if (onTriggerDemo) onTriggerDemo()
              }}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/70 transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Compass className="h-4 w-4 text-primary" />
                <span>Product Tour & Demos</span>
              </div>
            </button>

            <a
              href="#support"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-foreground hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span>Enterprise Support & SLA</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
