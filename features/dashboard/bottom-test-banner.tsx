"use client"

import * as React from "react"
import Image from "next/image"
import { Sparkles, ArrowRight } from "lucide-react"

interface BottomTestBannerProps {
  onTestAi?: () => void
}

export function BottomTestBanner({ onTestAi }: BottomTestBannerProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-primary/5 p-5 shadow-2xs sm:flex-row sm:p-6">
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="flex h-15 w-15 shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-card p-0.5 shadow-md">
          <Image
            src="/images/hero-bot.png"
            alt="AI Assistant"
            width={60}
            height={60}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-extrabold tracking-tight text-foreground sm:text-lg">
            Ready to test your AI Assistant?
          </h3>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Start a conversation and see how your AI handles real customer
            inquiries.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onTestAi}
        className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:opacity-95 sm:text-sm"
      >
        <Sparkles className="h-4 w-4" />
        <span>Test AI Assistant</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
