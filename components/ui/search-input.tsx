import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  shortcutHint?: string
  containerClassName?: string
}

export function SearchInput({
  value,
  onChange,
  onClear,
  placeholder = "Search intakes, agents, workflows...",
  shortcutHint = "⌘K",
  containerClassName,
  className,
  ...props
}: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center w-full", containerClassName)}>
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "w-full h-9 pl-9 pr-14 text-xs sm:text-sm bg-muted/40 border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200",
          className
        )}
        {...props}
      />
      {value && onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
          <span className="sr-only">Clear search</span>
        </button>
      ) : shortcutHint ? (
        <kbd className="absolute right-3 hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-xs font-mono font-semibold text-muted-foreground bg-background border rounded shadow-2xs pointer-events-none">
          {shortcutHint}
        </kbd>
      ) : null}
    </div>
  )
}
