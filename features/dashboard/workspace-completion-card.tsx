"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { CheckCircle2, Circle, ArrowRight, BookOpen } from "lucide-react"

export function WorkspaceCompletionCard() {
  const steps = [
    { title: "Business Profile", status: "completed" },
    { title: "Knowledge Base", status: "completed" },
    { title: "Prompt Studio", status: "in_progress" },
    { title: "Integrations", status: "completed" },
    { title: "Workflow Builder", status: "completed" },
  ]

  return (
    /* Single Unified Hero Card Banner */
    <div className="relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-r from-card via-card/95 to-primary/5 p-6 shadow-xs lg:flex-row">
      {/* Sub-Section 1: Progress Stat & Action CTAs */}
      <div className="w-full flex-1 space-y-5">
        <div>
          <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Workspace Configuration
          </p>
          <h2 className="mt-1.5 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            92% Complete
          </h2>
        </div>

        {/* Smooth Progress Bar */}
        <div className="max-w-md space-y-2">
          <div className="h-3 w-full overflow-hidden rounded-full border border-border/40 bg-muted/80 p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "92%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-primary shadow-2xs"
            />
          </div>
          <p className="text-xs font-medium text-muted-foreground">
            You&apos;re almost ready to launch your AI assistant!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="#prompt-studio"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground shadow-2xs transition-all hover:opacity-95 sm:text-sm"
          >
            <span>Continue Setup</span>
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="#guide"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs font-semibold text-foreground shadow-2xs transition-all hover:bg-muted/70 sm:text-sm"
          >
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span>View Setup Guide</span>
          </a>
        </div>
      </div>

      {/* Sub-Section 2: Step Checklist Table Box */}
      <div className="w-full shrink-0 space-y-3.5 rounded-2xl border border-border/60 bg-card p-4 shadow-xs sm:p-5 lg:w-[320px]">
        {steps.map((step) => {
          const isCompleted = step.status === "completed"
          return (
            <div
              key={step.title}
              className="flex items-center justify-between py-0.5 text-xs sm:text-sm"
            >
              <div className="flex items-center gap-2.5">
                {isCompleted ? (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                ) : (
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-amber-500 text-amber-500">
                    <Circle className="h-2 w-2 fill-current" />
                  </div>
                )}
                <span className="font-semibold text-foreground">
                  {step.title}
                </span>
              </div>

              <span
                className={
                  isCompleted
                    ? "text-xs font-semibold text-muted-foreground"
                    : "text-xs font-bold text-amber-600 dark:text-amber-400"
                }
              >
                {isCompleted ? "Completed" : "In Progress"}
              </span>
            </div>
          )
        })}
      </div>

      {/* Sub-Section 3: Stationary Rounded Chatbot with Radiating Concentric Rings */}
      <div className="relative flex min-h-[270px] w-full shrink-0 flex-col items-center justify-center py-2 text-center lg:w-[340px]">
        {/* Flicker-Free Continuous Radiating Concentric Rings Container */}
        <div className="relative my-1 flex h-64 w-full items-center justify-center sm:h-72">
          {/* Radiating Ring 1 */}
          <motion.div
            animate={{
              scale: [0.95, 1.25, 1.55],
              opacity: [0, 0.45, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute h-48 w-48 rounded-full border border-primary/40 bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent sm:h-56 sm:w-56"
          />

          {/* Radiating Ring 2 (Staggered 1.5s) */}
          <motion.div
            animate={{
              scale: [0.95, 1.25, 1.55],
              opacity: [0, 0.45, 0],
            }}
            transition={{
              duration: 4.5,
              delay: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute h-48 w-48 rounded-full border border-primary/35 bg-gradient-to-tr from-primary/15 via-primary/5 to-transparent sm:h-56 sm:w-56"
          />

          {/* Radiating Ring 3 (Staggered 3.0s) */}
          <motion.div
            animate={{
              scale: [0.95, 1.25, 1.55],
              opacity: [0, 0.45, 0],
            }}
            transition={{
              duration: 4.5,
              delay: 3.0,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute h-48 w-48 rounded-full border border-primary/30 bg-gradient-to-tr from-primary/10 via-primary/5 to-transparent sm:h-56 sm:w-56"
          />

          {/* Stationary Rounded Mascot Avatar Image */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative z-10 flex h-52 w-52 cursor-pointer items-center justify-center overflow-hidden rounded-full border-4 border-card bg-card shadow-2xl sm:h-60 sm:w-60"
          >
            <Image
              src="/images/hero-bot.png"
              alt="AI Assistant"
              width={240}
              height={240}
              priority
              className="h-full w-full object-cover scale-110"
            />
          </motion.div>
        </div>

        {/* Bottom Status Pill Badge with Framer Motion Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 mt-1 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 shadow-2xs backdrop-blur-xs dark:text-emerald-400"
        >
          <span className="h-2 w-2 animate-ping rounded-full bg-emerald-500" />
          <span>AI Assistant is Ready</span>
        </motion.div>
      </div>
    </div>
  )
}
