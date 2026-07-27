"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useAuth } from "@/context/auth-context"
import { useWorkspace } from "@/context/workspace-context"
import { Sparkles, ArrowRight, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { loadDemoPreset, resetWorkspace } = useWorkspace()

  const [email, setEmail] = React.useState("alexandra.vance@antelier.io")
  const [password, setPassword] = React.useState("••••••••••••")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = (e: React.FormEvent, isFirstTime: boolean = false) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      login(email, isFirstTime)
      if (isFirstTime) {
        resetWorkspace()

        router.push("/workspace-setup")
      } else {
        loadDemoPreset("Healthcare")

        router.push("/dashboard")
      }
    }, 600)
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-sans lg:flex-row">
      {/* Left Column: Visual Branding Panel */}
      <div className="bg-antelier-grid relative flex flex-1 flex-col justify-between overflow-hidden border-b border-border/80 bg-card p-8 lg:border-r lg:border-b-0 lg:p-16">
        <div className="pointer-events-none absolute top-0 right-0 -mt-16 -mr-16 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0E1A24] shadow-2xs dark:bg-stone-100">
            <span className="h-3 w-3 rounded-full bg-[#D97349]" />
          </span>
          <span className="font-serif text-2xl leading-none font-bold tracking-tight text-foreground">
            Antelier
          </span>
        </div>

        {/* Hero Pitch */}
        <div className="relative z-10 my-12 max-w-lg space-y-6 lg:my-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs tracking-[0.18em] text-primary uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Premium Client Intake Platform
          </div>

          <h1 className="font-serif text-3xl leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Your next customer is calling.{" "}
            <em className="mt-1 block text-primary italic">
              Never lose a customer because no one picked up.
            </em>
          </h1>

          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Antelier builds always-on voice and chat intake systems — qualifying
            every enquiry in real time and integrating seamlessly into your own
            CRM.
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-border/50 pt-4">
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-foreground">
                24/7
              </span>
              <p className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Always-On Intake
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-foreground">
                &lt;10s
              </span>
              <p className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Pickup Latency
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-foreground">
                &lt;60s
              </span>
              <p className="font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                Qualification Window
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 font-mono text-xs text-muted-foreground sm:text-sm">
          © 2026 Antelier Tech Global • Version 2.4.0
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex flex-1 items-center justify-center bg-background p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Sign in to your dashboard
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your credentials or choose a demo login persona below.
            </p>
          </div>

          {/* Demo Login Quick Switcher Buttons */}
          <div className="space-y-3 rounded-2xl border border-primary/30 bg-primary/5 p-4">
            <span className="flex items-center gap-1.5 font-mono text-xs font-bold tracking-wider text-primary uppercase">
              <Sparkles className="h-4 w-4" />
              Sales Demo Persona Switcher
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={(e) => handleLogin(e, true)}
                className="cursor-pointer rounded-xl bg-primary px-3.5 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90"
              >
                First-Time User (Wizard)
              </button>
              <button
                type="button"
                onClick={(e) => handleLogin(e, false)}
                className="cursor-pointer rounded-xl border border-border bg-card px-3.5 py-2.5 text-center text-sm font-semibold text-foreground shadow-2xs transition-all hover:bg-muted"
              >
                Returning User (Dashboard)
              </button>
            </div>
          </div>

          {/* Standard Login Form */}
          <form onSubmit={(e) => handleLogin(e, true)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">
                Work Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full rounded-xl border border-input bg-muted/30 pr-3.5 pl-10 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Password
                </label>
                <a
                  href="/forgot-password"
                  className="text-xs font-semibold text-primary hover:underline sm:text-sm"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="pointer-events-none absolute left-3.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 w-full rounded-xl border border-input bg-muted/30 pr-3.5 pl-10 text-sm text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Antelier</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an enterprise workspace?{" "}
            <a
              href="http://antelierhub.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Request Platform Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
