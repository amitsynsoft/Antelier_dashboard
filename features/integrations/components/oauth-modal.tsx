"use client"

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useWorkspace } from "@/context/workspace-context"
import { notify } from "@/lib/toast"
import { Select } from "@/components/ui/select"
import { IntegrationDefinition } from "../data/integrations-data"
import {
  X,
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Sparkles,
  Key,
  Mail,
  SlidersHorizontal,
} from "lucide-react"

interface OAuthModalProps {
  integration: IntegrationDefinition | null
  isOpen: boolean
  initialStep?: 1 | 4 | 5
  onClose: () => void
  onOpenLogs?: (integrationId: string) => void
}

export function OAuthModal({
  integration,
  isOpen,
  initialStep = 1,
  onClose,
  onOpenLogs
}: OAuthModalProps) {
  const { connectIntegration, getIntegrationAccount, getIntegrationConfig } = useWorkspace()

  const [step, setStep] = React.useState<number>(initialStep)
  const [isLoading, setIsLoading] = React.useState(false)
  const [loadingText, setLoadingText] = React.useState("")

  // Mock Authentication Form State
  const [authEmail, setAuthEmail] = React.useState("")
  const [authPassword, setAuthPassword] = React.useState("••••••••••••")
  const [selectedGoogleAccount, setSelectedGoogleAccount] = React.useState("alexandra@antelier.io")
  const [phoneCountry, setPhoneCountry] = React.useState("+1")
  const [phoneNumber, setPhoneNumber] = React.useState("(312) 555-0198")
  const [otpSent, setOtpSent] = React.useState(false)
  const [voiceProvider, setVoiceProvider] = React.useState("ElevenLabs / Vapi Engine")
  const [voiceApiKey, setVoiceApiKey] = React.useState("sk_live_vapi_98410298492048")
  const [voiceRegion, setVoiceRegion] = React.useState("us-east-1 (N. Virginia)")

  // Configuration Form State
  const [configValues, setConfigValues] = React.useState<Record<string, string>>({})
  const [connectedAccountName, setConnectedAccountName] = React.useState("")

  // Reset or Sync state when modal opens or integration changes
  React.useEffect(() => {
    if (integration && isOpen) {
      setStep(initialStep)
      setIsLoading(false)

      // Initialize config values
      const existingConfig = getIntegrationConfig(integration.id)
      const defaultFieldValues: Record<string, string> = {}
      integration.configFields.forEach((field) => {
        defaultFieldValues[field.key] = existingConfig[field.key] || field.defaultValue
      })
      setConfigValues(defaultFieldValues)

      const account = getIntegrationAccount(integration.id) || integration.defaultAccount
      setConnectedAccountName(account)
      setAuthEmail(account.includes("@") ? account : `alexandra@${integration.id}-app.com`)
    }
  }, [integration, isOpen, initialStep])

  if (!isOpen || !integration) return null

  // Step 2 Authentication Submission Handler
  const handleAuthenticate = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsLoading(true)
    setLoadingText(`Verifying OAuth credentials with ${integration.name}...`)

    setTimeout(() => {
      setIsLoading(false)
      // Determine account identifier based on provider
      let acct = authEmail
      if (integration.id === "whatsapp") acct = `${phoneCountry} ${phoneNumber}`
      if (integration.id === "gmail" || integration.id === "gcal") acct = selectedGoogleAccount
      if (integration.id === "voice_agent") acct = `${voiceProvider} (${voiceRegion})`
      
      setConnectedAccountName(acct)
      setStep(3) // Move to Permissions
    }, 850)
  }

  // Step 3 Permissions Consent Handler
  const handleAllowPermissions = () => {
    setIsLoading(true)
    setLoadingText(`Authorizing AntelierHub token with ${integration.name}...`)

    setTimeout(() => {
      setIsLoading(false)
      setStep(4) // Move to Configuration
    }, 600)
  }

  // Step 4 Configuration Save Handler
  const handleSaveConfiguration = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsLoading(true)
    setLoadingText(`Activating integration pipelines...`)

    setTimeout(() => {
      setIsLoading(false)
      connectIntegration(integration.id, connectedAccountName, configValues)
      notify.success(`Connected ${integration.name}!`, {
        description: `OAuth 2.0 handshake verified for ${connectedAccountName}.`,
      })
      setStep(5) // Move to Success Screen
    }, 700)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl sm:rounded-3xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden flex flex-col max-h-[95vh] sm:max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between gap-2 px-3.5 py-3 sm:px-6 sm:py-4 border-b border-border/60 bg-muted/20">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl sm:rounded-2xl border p-1.5 sm:p-2 shrink-0 shadow-2xs"
              style={{ backgroundColor: integration.accentBg, borderColor: `${integration.brandColor}40` }}
            >
              <Image
                src={integration.icon}
                alt={integration.name}
                width={28}
                height={28}
                className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                unoptimized
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap min-w-0">
                <h2 className="text-xs sm:text-base font-bold text-foreground truncate">{integration.name}</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap shrink-0">
                  Step {step} of 5
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground truncate">{integration.badgeText}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/40 shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-card/95 backdrop-blur-sm p-6 text-center space-y-4"
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl border p-3 shadow-lg animate-pulse"
                style={{ backgroundColor: integration.accentBg, borderColor: integration.brandColor }}
              >
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-foreground">{loadingText}</h3>
                <p className="text-xs text-muted-foreground">Securing OAuth 2.0 handshake protocol...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* ========================================================================= */}
          {/* STEP 1 — INTRODUCTION */}
          {/* ========================================================================= */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Header Hero Banner */}
              <div
                className="p-6 rounded-2xl border flex flex-col sm:flex-row items-center gap-5"
                style={{ backgroundColor: integration.accentBg, borderColor: `${integration.brandColor}30` }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background border border-border/80 shadow-md shrink-0 p-3">
                  <Image
                    src={integration.icon}
                    alt={integration.name}
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain"
                    unoptimized
                  />
                </div>
                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="text-lg font-extrabold text-foreground">Connect {integration.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {integration.fullDescription}
                  </p>
                </div>
              </div>

              {/* Key Benefits Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Key Benefits & Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {integration.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-border/60 bg-muted/20 flex items-start gap-2.5"
                    >
                      <div className="h-5 w-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-xs font-medium text-foreground leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Required Permissions Preview */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Required Access Scopes ({integration.permissions.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {integration.permissions.map((perm) => (
                    <span
                      key={perm.id}
                      className="px-3 py-1 rounded-full text-[11px] font-semibold bg-background border border-border text-foreground flex items-center gap-1.5 shadow-2xs"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {perm.title}
                    </span>
                  ))}
                </div>
              </div>

              {/* Security Notice Pill */}
              <div className="p-3.5 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-600 dark:text-blue-400 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-blue-500" />
                  <span className="font-semibold">
                    256-bit SSL encrypted • SOC-2 Type II Certified • OAuth 2.0 handshake
                  </span>
                </div>
                <Lock className="h-3.5 w-3.5 shrink-0 text-blue-400" />
              </div>

              {/* Action Bar */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-border hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 shadow-md cursor-pointer transition-all flex items-center gap-2"
                >
                  <span>Connect with {integration.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 2 — MOCK AUTHENTICATION */}
          {/* ========================================================================= */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Authenticate Header */}
              <div className="text-center space-y-1">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-muted border border-border p-2 mb-1 shadow-xs">
                  <Image
                    src={integration.icon}
                    alt={integration.name}
                    width={32}
                    height={32}
                    className="h-7 w-7 object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="text-lg font-bold text-foreground">Sign in to {integration.name}</h3>
                <p className="text-xs text-muted-foreground">
                  Simulate logging in to your {integration.name} provider account using test credentials.
                </p>
              </div>

              {/* PROVIDER SPECIFIC LOGIN UIs */}

              {/* 1. HUBSPOT SPECIFIC AUTH */}
              {integration.id === "hubspot" && (
                <form onSubmit={handleAuthenticate} className="space-y-4 max-w-sm mx-auto p-5 rounded-2xl border border-border bg-muted/20 shadow-xs">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-foreground">HubSpot User Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        required
                        value={authEmail}
                        onChange={(e) => setAuthEmail(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none font-medium"
                        placeholder="alexandra@hubspot-org.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-foreground">Password</label>
                    <div className="relative">
                      <Key className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <input
                        type="password"
                        required
                        value={authPassword}
                        onChange={(e) => setAuthPassword(e.target.value)}
                        className="w-full h-9 pl-9 pr-3 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold rounded-xl text-white shadow-md transition-all cursor-pointer hover:opacity-95"
                    style={{ backgroundColor: "#FF7A59" }}
                  >
                    Sign In to HubSpot
                  </button>
                  <p className="text-[11px] text-center text-muted-foreground">
                    Mock credentials enabled • No actual backend request
                  </p>
                </form>
              )}

              {/* 2. GMAIL / GOOGLE CALENDAR SPECIFIC AUTH */}
              {(integration.id === "gmail" || integration.id === "gcal") && (
                <div className="space-y-4 max-w-md mx-auto p-5 rounded-2xl border border-border bg-card shadow-xs">
                  <span className="text-xs font-bold text-foreground block text-left">
                    Choose a Google Account to authorize:
                  </span>
                  <div className="space-y-2">
                    {[
                      { email: "alexandra@antelier.io", name: "Alexandra (Primary Work)" },
                      { email: "alexandra.vance@gmail.com", name: "Alexandra Vance (Personal)" }
                    ].map((acct) => (
                      <button
                        key={acct.email}
                        type="button"
                        onClick={() => {
                          setSelectedGoogleAccount(acct.email)
                          handleAuthenticate()
                        }}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          selectedGoogleAccount === acct.email
                            ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                            : "border-border hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center text-xs">
                            {acct.name[0]}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-foreground block">{acct.name}</span>
                            <span className="text-[11px] text-muted-foreground">{acct.email}</span>
                          </div>
                        </div>
                        <Check className={`h-4 w-4 ${selectedGoogleAccount === acct.email ? "text-primary" : "opacity-0"}`} />
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAuthenticate()}
                    className="w-full py-2.5 text-xs font-bold rounded-xl bg-red-600 text-white shadow-md hover:bg-red-500 cursor-pointer transition-colors"
                  >
                    Continue with Google Account
                  </button>
                </div>
              )}

              {/* 3. WHATSAPP BUSINESS SPECIFIC AUTH */}
              {integration.id === "whatsapp" && (
                <div className="space-y-4 max-w-sm mx-auto p-5 rounded-2xl border border-border bg-muted/20 shadow-xs">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-foreground">Business Phone Number</label>
                    <div className="flex gap-2">
                      <div className="w-28">
                        <Select
                          value={phoneCountry}
                          onChange={(val) => setPhoneCountry(val)}
                          className="h-9 text-xs"
                          options={[
                            { value: "+1", label: "🇺🇸 +1" },
                            { value: "+44", label: "🇬🇧 +44" },
                            { value: "+91", label: "🇮🇳 +91" },
                          ]}
                        />
                      </div>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="flex-1 h-9 px-3 rounded-xl border border-input bg-background text-xs font-mono text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                      />
                    </div>
                  </div>

                  {!otpSent ? (
                    <button
                      type="button"
                      onClick={() => setOtpSent(true)}
                      className="w-full py-2.5 text-xs font-bold rounded-xl text-white shadow-md cursor-pointer hover:opacity-95"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      Send Verification SMS Code
                    </button>
                  ) : (
                    <div className="space-y-3 pt-2">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold text-center">
                        Verification code sent to {phoneCountry} {phoneNumber} (Mock: 884-102)
                      </div>
                      <div className="flex justify-center gap-1.5">
                        {[8, 8, 4, 1, 0, 2].map((num, i) => (
                          <input
                            key={i}
                            type="text"
                            readOnly
                            value={num}
                            className="h-9 w-9 text-center font-mono font-bold text-sm rounded-lg border border-input bg-background"
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAuthenticate()}
                        className="w-full py-2.5 text-xs font-bold rounded-xl text-white shadow-md cursor-pointer hover:opacity-95"
                        style={{ backgroundColor: "#25D366" }}
                      >
                        Verify & Authorize Number
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 4. AI VOICE AGENT SPECIFIC AUTH */}
              {integration.id === "voice_agent" && (
                <form onSubmit={handleAuthenticate} className="space-y-4 max-w-sm mx-auto p-5 rounded-2xl border border-border bg-muted/20 shadow-xs">
                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-foreground">Voice Engine Provider</label>
                    <Select
                      value={voiceProvider}
                      onChange={(val) => setVoiceProvider(val)}
                      className="h-9 text-xs"
                      options={[
                        "ElevenLabs / Vapi Engine",
                        "Bland AI Telephony",
                        "Deepgram Nova-2 + Retell AI",
                      ]}
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-foreground">API Key (Mock)</label>
                    <input
                      type="text"
                      value={voiceApiKey}
                      onChange={(e) => setVoiceApiKey(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl border border-input bg-background font-mono text-xs text-foreground"
                    />
                  </div>

                  <div className="space-y-1 text-left">
                    <label className="text-xs font-bold text-foreground">Deployment Region</label>
                    <Select
                      value={voiceRegion}
                      onChange={(val) => setVoiceRegion(val)}
                      className="h-9 text-xs"
                      options={[
                        "us-east-1 (N. Virginia)",
                        "eu-west-1 (Ireland)",
                        "ap-southeast-1 (Singapore)",
                      ]}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold rounded-xl bg-purple-600 text-white shadow-md hover:bg-purple-500 cursor-pointer transition-colors"
                  >
                    Authenticate Voice Telephony Key
                  </button>
                </form>
              )}

              {/* Footer navigation */}
              <div className="pt-2 flex items-center justify-between border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-muted text-muted-foreground flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Back</span>
                </button>

                <span className="text-[11px] font-mono text-muted-foreground">
                  Simulated Auth Mode
                </span>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 3 — PERMISSIONS OAUTH CONSENT */}
          {/* ========================================================================= */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Permissions Banner Header */}
              <div className="p-5 rounded-2xl border border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-xs">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">AntelierHub Request</h3>
                    <p className="text-xs text-muted-foreground">
                      Connecting account: <span className="font-semibold text-foreground">{connectedAccountName}</span>
                    </p>
                  </div>
                </div>

                <div className="h-8 w-8 rounded-full border border-border bg-background flex items-center justify-center p-1">
                  <Image
                    src={integration.icon}
                    alt={integration.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                    unoptimized
                  />
                </div>
              </div>

              {/* Permissions Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  AntelierHub is requesting permission to:
                </h4>

                <div className="space-y-2.5">
                  {integration.permissions.map((perm) => (
                    <div
                      key={perm.id}
                      className="p-3.5 rounded-xl border border-border/70 bg-card flex items-start gap-3 shadow-2xs hover:border-primary/40 transition-colors"
                    >
                      <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-foreground">{perm.title}</h5>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">{perm.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy notice */}
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                By clicking <span className="font-bold text-foreground">Allow Access</span>, you authorize AntelierHub to exchange OAuth tokens with {integration.name}. You can revoke access anytime.
              </p>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-border hover:bg-muted text-muted-foreground cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAllowPermissions}
                  className="px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 shadow-md cursor-pointer transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Allow Access</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 4 — CONFIGURATION */}
          {/* ========================================================================= */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border/50 pb-4">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <SlidersHorizontal className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{integration.name} Settings</h3>
                  <p className="text-xs text-muted-foreground">
                    Customize provider pipeline rules, default lead assignments, and sync behaviors.
                  </p>
                </div>
              </div>

              {/* Dynamic Config Form Fields */}
              <form onSubmit={handleSaveConfiguration} className="space-y-4">
                <div className="p-3 rounded-xl border border-border/60 bg-muted/20 flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-foreground">Authorized Account</span>
                  <span className="font-mono text-muted-foreground font-semibold">{connectedAccountName}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {integration.configFields.map((field) => (
                    <div key={field.key} className="space-y-1.5 text-left">
                      <label className="text-xs font-bold text-foreground">{field.label}</label>
                      
                      {field.type === "select" && (
                        <Select
                          value={configValues[field.key] || field.defaultValue}
                          onChange={(val) => setConfigValues({ ...configValues, [field.key]: val })}
                          className="h-9 text-xs"
                          options={field.options || []}
                        />
                      )}

                      {field.type === "text" && (
                        <input
                          type="text"
                          value={configValues[field.key] || field.defaultValue}
                          onChange={(e) => setConfigValues({ ...configValues, [field.key]: e.target.value })}
                          placeholder={field.placeholder}
                          className="w-full h-9 rounded-xl border border-input bg-background px-3 text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      )}

                      {field.type === "textarea" && (
                        <textarea
                          rows={3}
                          value={configValues[field.key] || field.defaultValue}
                          onChange={(e) => setConfigValues({ ...configValues, [field.key]: e.target.value })}
                          className="w-full p-2.5 rounded-xl border border-input bg-background text-xs text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      )}

                      {field.description && (
                        <p className="text-[10px] text-muted-foreground">{field.description}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-border/60">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-muted text-muted-foreground cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:opacity-90 shadow-md cursor-pointer transition-all flex items-center gap-2"
                  >
                    <span>Save & Activate Integration</span>
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* STEP 5 — SUCCESS */}
          {/* ========================================================================= */}
          {step === 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center py-2">
              {/* Animated Celebration Icon */}
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-500 ring-4 ring-emerald-500/20 shadow-inner mx-auto">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  Connected Successfully!
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  {integration.name} is now actively connected to your AntelierHub workspace.
                </p>
              </div>

              {/* Status Summary Card */}
              <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 max-w-md mx-auto text-left space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
                  <span className="text-xs font-bold text-foreground">Connected Account</span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[200px]">
                    {connectedAccountName}
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
                  <span className="text-xs font-bold text-foreground">Health Status</span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Operational 100%
                  </span>
                </div>

                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
                  <span className="text-xs font-bold text-foreground">Last Synced</span>
                  <span className="text-xs text-muted-foreground font-mono">Just now</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">Permissions Authorized</span>
                  <span className="text-xs font-semibold text-foreground">
                    {integration.permissions.length} Scopes Active
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-center gap-3">
                {onOpenLogs && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      onOpenLogs(integration.id)
                    }}
                    className="px-4 py-2.5 text-xs font-bold rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
                  >
                    View Integration Logs
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-4 py-2.5 text-xs font-bold rounded-xl border border-border bg-card hover:bg-muted text-foreground transition-colors cursor-pointer"
                >
                  Configure Settings
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 shadow-md cursor-pointer transition-all"
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
