"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: React.ReactNode
  description?: string
  disabled?: boolean
  id?: string
  className?: string
  name?: string
}

export function Checkbox({
  checked,
  onCheckedChange,
  onChange,
  label,
  description,
  disabled = false,
  id,
  className,
  name,
}: CheckboxProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (disabled) return
    const nextState = !checked
    onCheckedChange?.(nextState)
    if (onChange) {
      const event = {
        target: { checked: nextState, name, id },
      } as React.ChangeEvent<HTMLInputElement>
      onChange(event)
    }
  }

  return (
    <div
      id={id}
      onClick={handleClick}
      role="checkbox"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault()
          handleClick(e as unknown as React.MouseEvent)
        }
      }}
      className={cn(
        "group inline-flex cursor-pointer items-start gap-3 select-none outline-none",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <div
        className={cn(
          "relative flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-150 mt-0.5",
          checked
            ? "border-primary bg-primary text-primary-foreground shadow-2xs ring-2 ring-primary/20"
            : "border-input bg-muted/30 group-hover:border-primary/50 group-hover:bg-muted/50"
        )}
      >
        <motion.div
          initial={false}
          animate={{ scale: checked ? 1 : 0, opacity: checked ? 1 : 0 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          <Check className="h-3.5 w-3.5 stroke-[3] text-primary-foreground" />
        </motion.div>
      </div>

      {(label || description) && (
        <div className="space-y-0.5">
          {label && (
            <span className="block text-sm font-semibold leading-none text-foreground">
              {label}
            </span>
          )}
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      )}
    </div>
  )
}
