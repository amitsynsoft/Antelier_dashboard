"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"
import { BreadcrumbItem } from "@/types"

interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({
  items = [
    { label: "Antelier", href: "/dashboard" },
    { label: "Client Intake Dashboard", current: true }
  ],
  className
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center space-x-1.5 text-sm text-muted-foreground font-medium", className)}>
      <a
        href="/"
        className="flex items-center gap-1 hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted/50"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </a>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />
          {item.current ? (
            <span className="font-semibold text-foreground truncate max-w-[150px] sm:max-w-none">
              {item.label}
            </span>
          ) : (
            <a
              href={item.href || "#"}
              className="hover:text-foreground transition-colors truncate max-w-[120px] sm:max-w-none"
            >
              {item.label}
            </a>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}
