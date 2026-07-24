"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import {
  Search,
  Building2,
  Sliders,
  FileText,
  GitFork,
  Building,
  MessageSquare,
  Sparkles,
  ArrowRight,
  X,
  Upload
} from "lucide-react"

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onClose()
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isOpen, onClose])

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery("")
    }
  }, [isOpen])

  if (!isOpen) return null

  const commandItems = [
    { title: "Go to Business Profile", category: "Navigation", icon: Building2, action: "profile" },
    { title: "Open Prompt Studio", category: "AI Assistant", icon: Sliders, action: "prompt" },
    { title: "Upload Knowledge Base Documents", category: "RAG Knowledge", icon: Upload, action: "knowledge" },
    { title: "Create Automation Workflow", category: "Workflows", icon: GitFork, action: "workflow" },
    { title: "Switch Workspace to Chicago Family Law", category: "Workspaces", icon: Building, badge: "Legal" },
    { title: "Switch Workspace to Smile Dental Group", category: "Workspaces", icon: Building, badge: "Medical" },
    { title: "Search Documents: Enterprise Security Whitepaper 2026", category: "Documents", icon: FileText, badge: "PDF" },
    { title: "Search Conversations: Intake #1248 (Alexandra)", category: "Conversations", icon: MessageSquare, badge: "Completed" },
  ]

  const filteredItems = commandItems.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-md animate-in fade-in-50">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 border-b border-border/60 bg-muted/20">
          <Search className="h-4 w-4 text-muted-foreground shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search workspaces, knowledge, prompts, documents..."
            className="w-full h-13 text-sm bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-border/30">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No matching commands or resources found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground/70 tracking-wider">
                Quick Actions & Search Results
              </div>
              {filteredItems.map((item, idx) => {
                const ItemIcon = item.icon
                return (
                  <button
                    key={idx}
                    onClick={() => onClose()}
                    className="flex items-center justify-between w-full p-2.5 rounded-xl hover:bg-muted/80 text-foreground transition-all group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <ItemIcon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold tracking-tight">{item.title}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{item.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-secondary text-secondary-foreground border border-border">
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/60 bg-muted/30 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>Navigate: <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-background border rounded">↑↓</kbd></span>
            <span>Select: <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-background border rounded">↵</kbd></span>
            <span>Close: <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-background border rounded">ESC</kbd></span>
          </div>
          <span className="font-semibold text-primary font-mono text-[11px]">Antelier Command Engine</span>
        </div>
      </div>
    </div>
  )
}
