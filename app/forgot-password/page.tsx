"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, ArrowLeft, Mail, CheckCircle2 } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("")
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-background font-sans">
      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold shadow-md">
            <Sparkles className="h-6 w-6" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Reset Your Password
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Enter your enterprise email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto" />
            <h3 className="text-sm font-bold text-foreground">Password Reset Link Sent</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We have dispatched password reset instructions to <strong className="text-foreground">{email}</strong>.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline pt-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-foreground">Work Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full h-10 pl-9 pr-3 text-xs bg-muted/30 border border-input rounded-xl text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-10 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Send Reset Instructions</span>
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
