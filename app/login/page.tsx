"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Sparkles, ArrowRight, ShieldCheck, Lock, Mail, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = React.useState("alexandra.vance@antelier.io")
  const [password, setPassword] = React.useState("••••••••••••")
  const [isLoading, setIsLoading] = React.useState(false)

  const handleLogin = (e: React.FormEvent, isFirstTime: boolean = false) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      login(email, isFirstTime)
      if (isFirstTime) {
        router.push("/workspace-setup")
      } else {
        router.push("/dashboard")
      }
    }, 600)
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background font-sans">
      {/* Left Column: Visual Branding Panel */}
      <div className="relative flex-1 bg-card p-8 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/80 overflow-hidden bg-antelier-grid">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="flex items-center gap-2.5 relative z-10">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0E1A24] dark:bg-stone-100 shrink-0 shadow-2xs">
            <span className="h-3 w-3 rounded-full bg-[#D97349]" />
          </span>
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground leading-none">
            Antelier
          </span>
        </div>

        {/* Hero Pitch */}
        <div className="my-12 lg:my-0 space-y-6 relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-[0.18em] bg-primary/10 text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Premium Client Intake Platform
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-foreground leading-[1.2] tracking-tight">
            Your next customer is calling.{" "}
            <em className="italic text-primary block mt-1">Never lose a customer because no one picked up.</em>
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Antelier builds always-on voice and chat intake systems — qualifying every enquiry in real time and integrating seamlessly into your own CRM.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
            <div className="space-y-1">
              <span className="text-2xl font-serif text-foreground font-bold">24/7</span>
              <p className="text-xs uppercase font-mono tracking-wider text-muted-foreground font-semibold">Always-On Intake</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-serif text-foreground font-bold">&lt;10s</span>
              <p className="text-xs uppercase font-mono tracking-wider text-muted-foreground font-semibold">Pickup Latency</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-serif text-foreground font-bold">&lt;60s</span>
              <p className="text-xs uppercase font-mono tracking-wider text-muted-foreground font-semibold">Qualification Window</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs sm:text-sm text-muted-foreground font-mono">
          © 2026 Antelier Tech Global • Version 2.4.0
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-background">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-foreground">
              Sign in to your dashboard
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter your credentials or choose a demo login persona below.
            </p>
          </div>

          {/* Demo Login Quick Switcher Buttons */}
          <div className="p-4 rounded-2xl border border-primary/30 bg-primary/5 space-y-3">
            <span className="text-xs font-mono uppercase font-bold text-primary flex items-center gap-1.5 tracking-wider">
              <Sparkles className="h-4 w-4" />
              Sales Demo Persona Switcher
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={(e) => handleLogin(e, true)}
                className="px-3.5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all text-center cursor-pointer shadow-sm"
              >
                First-Time User (Wizard)
              </button>
              <button
                type="button"
                onClick={(e) => handleLogin(e, false)}
                className="px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-all text-center cursor-pointer shadow-2xs"
              >
                Returning User (Dashboard)
              </button>
            </div>
          </div>

          {/* Standard Login Form */}
          <form onSubmit={(e) => handleLogin(e, false)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground">Work Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 pl-10 pr-3.5 text-sm bg-muted/30 border border-input rounded-xl text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">Password</label>
                <a href="/forgot-password" className="text-xs sm:text-sm font-semibold text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-11 pl-10 pr-3.5 text-sm bg-muted/30 border border-input rounded-xl text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
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
            Don't have an enterprise workspace?{" "}
            <a href="http://antelierhub.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
              Request Platform Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
