"use client"

import * as React from "react"
import PhoneInputWithCountrySelect, {
  Value,
  getCountryCallingCode,
} from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { ChevronDown, Search, Check } from "lucide-react"

// Custom Theme-Compatible Country Select Dropdown
function CustomCountrySelect({
  value,
  onChange,
  options,
  iconComponent: FlagIcon,
}: any) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  const selectedOption =
    options.find((o: any) => o.value === value) || options[0]

  const filteredOptions = React.useMemo(() => {
    if (!search.trim()) return options
    const query = search.toLowerCase()
    return options.filter(
      (o: any) =>
        o.label?.toLowerCase().includes(query) ||
        o.value?.toLowerCase().includes(query)
    )
  }, [options, search])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative mr-2 shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-border/60 bg-muted/40 px-2 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted/70 focus:outline-none"
      >
        {value && FlagIcon && (
          <FlagIcon
            country={value}
            label={selectedOption?.label}
            className="h-3.5 w-5 rounded-xs object-cover"
          />
        )}
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-1.5 max-h-72 w-64 max-w-[calc(100vw-2.5rem)] animate-in overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-2xl fade-in-50 zoom-in-95">
          {/* Search Header */}
          <div className="border-b border-border/50 bg-muted/20 p-2">
            <div className="relative">
              <Search className="absolute top-2.5 left-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search country..."
                className="h-8 w-full rounded-xl border border-input bg-background pr-2.5 pl-8 text-xs font-medium text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Country List */}
          <div className="max-h-56 scrollbar-none space-y-0.5 overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-center text-xs text-muted-foreground">
                No countries found
              </div>
            ) : (
              filteredOptions.map((option: any) => {
                const isSelected = option.value === value
                let callingCode = ""
                try {
                  if (option.value) {
                    callingCode = getCountryCallingCode(option.value)
                  }
                } catch (e) {
                  // ignore
                }

                return (
                  <button
                    key={option.value || "international"}
                    type="button"
                    onClick={() => {
                      onChange(option.value)
                      setIsOpen(false)
                      setSearch("")
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-colors ${
                      isSelected
                        ? "bg-primary/10 font-bold text-primary"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {option.value && FlagIcon && (
                        <FlagIcon
                          country={option.value}
                          label={option.label}
                          className="h-3.5 w-5 shrink-0 rounded-xs object-cover"
                        />
                      )}
                      <span className="truncate">{option.label}</span>
                    </div>

                    <div className="ml-2 flex shrink-0 items-center gap-1.5">
                      {callingCode && (
                        <span className="font-mono text-[11px] text-muted-foreground">
                          +{callingCode}
                        </span>
                      )}
                      {isSelected && (
                        <Check className="h-3.5 w-3.5 text-primary" />
                      )}
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export interface PhoneInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  defaultCountry?: any
}

export function PhoneInput({
  value = "",
  onChange,
  placeholder = "Enter phone number",
  disabled = false,
  className = "",
  id,
  defaultCountry = "US",
}: PhoneInputProps) {
  const handleChange = (val?: Value) => {
    onChange?.(val ? String(val) : "")
  }

  return (
    <div
      className={`antelier-phone-input-wrapper relative flex h-10 sm:h-11 items-center rounded-xl border border-input bg-background px-3 sm:px-3.5 shadow-2xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      } ${className}`}
    >
      <PhoneInputWithCountrySelect
        id={id}
        international
        defaultCountry={defaultCountry}
        value={value as Value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        countrySelectComponent={CustomCountrySelect}
        className="w-full text-xs font-medium text-foreground sm:text-sm"
      />
    </div>
  )
}
