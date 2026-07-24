import * as React from "react"
import { cn } from "@/lib/utils"

export type FilterOption = {
  id: string
  label: string
  count?: number
}

interface FilterBarProps {
  options: FilterOption[]
  activeId: string
  onChange: (id: string) => void
  className?: string
}

export function FilterBar({
  options,
  activeId,
  onChange,
  className
}: FilterBarProps) {
  return (
    <div className={cn("flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1", className)}>
      {options.map((option) => {
        const isActive = activeId === option.id
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-150 whitespace-nowrap",
              isActive
                ? "bg-primary text-primary-foreground shadow-2xs font-bold"
                : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-mono font-semibold",
                  isActive
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-muted-foreground/15 text-muted-foreground"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
