"use client"

import * as React from "react"

export type BusinessProfileData = {
  companyName: string
  industry: string
  companySize: string
  targetTier: string
  brandTone: "formal" | "consultative" | "direct" | "friendly"
  primaryIntakeGoal: string
  supportEmail: string
}

export type KnowledgeBaseData = {
  sourcesCount: number
  uploadedFiles: string[]
  scrapeUrls: string[]
  syncInterval: "realtime" | "hourly" | "daily" | "weekly"
  autoParsePdf: boolean
}

export type AiAssistantData = {
  agentName: string
  avatar: string
  primaryModel: "gpt-4o" | "claude-3.5-sonnet" | "gemini-1.5-pro"
  systemPrompt: string
  greetingMessage: string
  handoffScoreThreshold: number
  escalationRole: string
}

export type IntegrationsData = {
  salesforce: boolean
  salesforceOrgId?: string
  hubspot: boolean
  slack: boolean
  slackChannel?: string
  webhookUrl: string
  snowflake: boolean
}

export type WorkspaceState = {
  isOnboarded: boolean
  showWizardModal: boolean
  currentStep: number
  businessProfile: BusinessProfileData
  knowledgeBase: KnowledgeBaseData
  aiAssistant: AiAssistantData
  integrations: IntegrationsData
}

const defaultState: WorkspaceState = {
  isOnboarded: false,
  showWizardModal: true,
  currentStep: 1,
  businessProfile: {
    companyName: "Antelier Tech Global",
    industry: "Enterprise Software & AI",
    companySize: "1,000 - 5,000",
    targetTier: "Fortune 500 & Mid-Market",
    brandTone: "consultative",
    primaryIntakeGoal: "Qualify RFP leads & automate SOC-2 compliance checks",
    supportEmail: "intake-ops@antelier.io"
  },
  knowledgeBase: {
    sourcesCount: 4,
    uploadedFiles: [
      "Enterprise_Security_Whitepaper_2026.pdf",
      "Standard_Master_Services_Agreement.docx",
      "API_Integration_Capabilities_Guide.pdf"
    ],
    scrapeUrls: ["https://antelier.io/docs", "https://antelier.io/pricing"],
    syncInterval: "hourly",
    autoParsePdf: true
  },
  aiAssistant: {
    agentName: "Antelier Enterprise Intake Copilot",
    avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80",
    primaryModel: "gpt-4o",
    systemPrompt:
      "You are the senior client intake specialist for Antelier. Your objective is to politely qualify prospective enterprise clients, check technical requirements, and route leads with score >= 85 directly to Senior Account Executives.",
    greetingMessage:
      "Hello! Welcome to Antelier. I can help answer technical specifications, evaluate custom enterprise SLAs, or guide your team through our client intake process.",
    handoffScoreThreshold: 85,
    escalationRole: "Senior Enterprise AE"
  },
  integrations: {
    salesforce: true,
    salesforceOrgId: "00D80000000hYxE",
    hubspot: true,
    slack: true,
    slackChannel: "#lead-intake-alerts",
    webhookUrl: "https://api.antelier.io/v1/webhooks/intake",
    snowflake: true
  }
}

interface WorkspaceContextType {
  state: WorkspaceState
  updateBusinessProfile: (data: Partial<BusinessProfileData>) => void
  updateKnowledgeBase: (data: Partial<KnowledgeBaseData>) => void
  updateAiAssistant: (data: Partial<AiAssistantData>) => void
  updateIntegrations: (data: Partial<IntegrationsData>) => void
  setCurrentStep: (step: number) => void
  skipWizard: () => void
  completeWizard: () => void
  openWizard: () => void
  closeWizard: () => void
  resetWorkspace: () => void
  completionPercentage: number
}

const WorkspaceContext = React.createContext<WorkspaceContextType | undefined>(undefined)

const STORAGE_KEY = "antelier_workspace_state_v1"

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<WorkspaceState>(defaultState)
  const [isHydrated, setIsHydrated] = React.useState(false)

  // Hydrate state from localStorage after initial client mount to avoid hydration mismatch
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setState(JSON.parse(saved))
      }
    } catch (e) {
      console.error("Failed to load workspace state from localStorage", e)
    }
    setIsHydrated(true)
  }, [])

  // Auto-save state changes to localStorage after initial hydration
  React.useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (e) {
      console.error("Failed to save workspace state to localStorage", e)
    }
  }, [state, isHydrated])

  const completionPercentage = React.useMemo(() => {
    let score = 0
    if (state.businessProfile.companyName) score += 10
    if (state.businessProfile.industry) score += 10
    if (state.businessProfile.primaryIntakeGoal) score += 5

    if (state.knowledgeBase.uploadedFiles.length > 0) score += 15
    if (state.knowledgeBase.scrapeUrls.length > 0) score += 10

    if (state.aiAssistant.agentName) score += 10
    if (state.aiAssistant.systemPrompt) score += 15

    if (state.integrations.salesforce || state.integrations.hubspot) score += 15
    if (state.integrations.slack || state.integrations.webhookUrl) score += 10

    return Math.min(100, score)
  }, [state])

  const updateBusinessProfile = (data: Partial<BusinessProfileData>) => {
    setState((prev) => ({
      ...prev,
      businessProfile: { ...prev.businessProfile, ...data }
    }))
  }

  const updateKnowledgeBase = (data: Partial<KnowledgeBaseData>) => {
    setState((prev) => ({
      ...prev,
      knowledgeBase: { ...prev.knowledgeBase, ...data }
    }))
  }

  const updateAiAssistant = (data: Partial<AiAssistantData>) => {
    setState((prev) => ({
      ...prev,
      aiAssistant: { ...prev.aiAssistant, ...data }
    }))
  }

  const updateIntegrations = (data: Partial<IntegrationsData>) => {
    setState((prev) => ({
      ...prev,
      integrations: { ...prev.integrations, ...data }
    }))
  }

  const setCurrentStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }))
  }

  const skipWizard = () => {
    setState((prev) => ({
      ...prev,
      showWizardModal: false
    }))
  }

  const completeWizard = () => {
    setState((prev) => ({
      ...prev,
      isOnboarded: true,
      showWizardModal: false,
      currentStep: 5
    }))
  }

  const openWizard = () => {
    setState((prev) => ({
      ...prev,
      showWizardModal: true
    }))
  }

  const closeWizard = () => {
    setState((prev) => ({
      ...prev,
      showWizardModal: false
    }))
  }

  const resetWorkspace = () => {
    setState(defaultState)
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <WorkspaceContext.Provider
      value={{
        state,
        updateBusinessProfile,
        updateKnowledgeBase,
        updateAiAssistant,
        updateIntegrations,
        setCurrentStep,
        skipWizard,
        completeWizard,
        openWizard,
        closeWizard,
        resetWorkspace,
        completionPercentage
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = React.useContext(WorkspaceContext)
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider")
  }
  return context
}
