"use client"

import * as React from "react"
import { currentUser } from "@/mock/dashboard-data"

export type DemoPresetType = "Healthcare" | "Legal" | "Dental" | "Financial Services" | "Real Estate"

export type BusinessProfileData = {
  companyName: string
  industry: string
  companySize: string
  targetTier: string
  brandTone: "formal" | "consultative" | "direct" | "friendly"
  primaryIntakeGoal: string
  supportEmail: string
  companyWebsite?: string
  contactNumber?: string
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

export const DEFAULT_PROMPT_STUDIO_BY_INTEGRATION: Record<string, AiAssistantData> = {
  hubspot: {
    agentName: "HubSpot Lead Qualifier & CRM Copilot",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    primaryModel: "gpt-4o",
    systemPrompt:
      "You are the HubSpot Lead Qualification Copilot for Aether Health Systems. Qualify inbound prospects by asking about budget, company size, timeline, and key decision makers. Automatically create lead records and score prospects before routing high-intent deals to senior AEs.",
    greetingMessage:
      "Hello! Welcome to our enterprise portal. I'm your HubSpot Lead Qualification Assistant. I can answer product questions and connect you directly with a dedicated account manager.",
    handoffScoreThreshold: 80,
    escalationRole: "Senior Enterprise Account Executive"
  },
  gmail: {
    agentName: "Gmail Intake & Dispatch Copilot",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    primaryModel: "claude-3.5-sonnet",
    systemPrompt:
      "You are the Gmail Automated Intake Dispatcher. Analyze incoming email threads, extract key customer requests, verify subscriber status, draft structured responses, and flag urgent tickets for human review.",
    greetingMessage:
      "Thank you for reaching out via email! Our automated response engine has received your message and prepared immediate intake details for our support desk.",
    handoffScoreThreshold: 75,
    escalationRole: "Email Support Triage Manager"
  },
  whatsapp: {
    agentName: "WhatsApp Instant Conversational Assistant",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    primaryModel: "gpt-4o",
    systemPrompt:
      "You are the WhatsApp Business AI Assistant. Engage in fast, concise, multi-lingual intake conversations. Collect prospect contact details, answer service FAQs, and offer instant booking links.",
    greetingMessage:
      "Hi there! Welcome to our WhatsApp Business channel. I'm here 24/7 to answer your questions, check appointment slots, or transfer you to a team member.",
    handoffScoreThreshold: 85,
    escalationRole: "Live Chat Operations Desk"
  },
  voice_agent: {
    agentName: "Ava (Clinical Intake Copilot)",
    avatar: "https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&w=250&q=80",
    primaryModel: "gpt-4o",
    systemPrompt:
      "You are Ava, a certified clinical intake coordinator for Aether Health Systems. Verify patient DOB, insurance provider, policy ID, and chief complaint while maintaining strict HIPAA privacy compliance.",
    greetingMessage:
      "Hello, welcome to Aether Health Systems! I'm Ava, your virtual clinical intake coordinator. I can help register your patient file, check insurance copays, or schedule a doctor consultation.",
    handoffScoreThreshold: 85,
    escalationRole: "Duty Triage Nurse"
  },
  gcal: {
    agentName: "Google Calendar Booking & Scheduling Copilot",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    primaryModel: "gemini-1.5-pro",
    systemPrompt:
      "You are the Google Calendar Scheduling Assistant. Cross-reference team calendar availability, handle time zone conversions, propose open appointment slots, and issue automated calendar invitations.",
    greetingMessage:
      "Welcome! Need to book a meeting or consultation? I can inspect real-time calendar availability and secure a convenient slot for you right now.",
    handoffScoreThreshold: 70,
    escalationRole: "Scheduling Coordinator"
  }
}

export type IntegrationsData = {
  salesforce: boolean
  salesforceOrgId?: string
  hubspot: boolean
  slack: boolean
  slackChannel?: string
  webhookUrl: string
  snowflake: boolean
  enabledMap?: Record<string, boolean>
  connectedMap?: Record<string, boolean>
  accountsMap?: Record<string, string>
  configsMap?: Record<string, Record<string, string>>
  promptStudioMap?: Record<string, AiAssistantData>
  lastSyncMap?: Record<string, string>
}

export type WorkspaceState = {
  activePreset: DemoPresetType
  isOnboarded: boolean
  showWizardModal: boolean
  currentStep: number
  skippedSteps: number[]
  businessProfile: BusinessProfileData
  knowledgeBase: KnowledgeBaseData
  aiAssistant: AiAssistantData
  integrations: IntegrationsData
}

export const demoPresetsData: Record<DemoPresetType, Omit<WorkspaceState, "isOnboarded" | "showWizardModal" | "currentStep" | "skippedSteps">> = {
  Healthcare: {
    activePreset: "Healthcare",
    businessProfile: {
      companyName: "Aether Health Systems",
      industry: "Healthcare & Telehealth",
      companySize: "1,000 - 5,000",
      targetTier: "Hospital Networks & Outpatient Clinics",
      brandTone: "consultative",
      primaryIntakeGoal: "Automate HIPAA-compliant patient intake, insurance copay verification, and triage",
      supportEmail: "patient-intake@aetherhealth.org"
    },
    knowledgeBase: {
      sourcesCount: 6,
      uploadedFiles: [
        "HIPAA_Patient_Registration_SOP_2026.pdf",
        "Insurance_Copay_Coverage_Matrix.xlsx",
        "Clinical_Triage_Protocols_v4.pdf"
      ],
      scrapeUrls: ["https://aetherhealth.org/patient-portal", "https://aetherhealth.org/insurance"],
      syncInterval: "realtime",
      autoParsePdf: true
    },
    aiAssistant: {
      agentName: "Ava (Clinical Intake Copilot)",
      avatar: "https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&w=250&q=80",
      primaryModel: "gpt-4o",
      systemPrompt:
        "You are Ava, a certified clinical intake coordinator for Aether Health Systems. Verify patient DOB, insurance provider, policy ID, and chief complaint while maintaining strict HIPAA privacy compliance.",
      greetingMessage:
        "Hello, welcome to Aether Health Systems! I'm Ava, your virtual clinical intake coordinator. I can help register your patient file, check insurance copays, or schedule a doctor consultation.",
      handoffScoreThreshold: 85,
      escalationRole: "Duty Triage Nurse"
    },
    integrations: {
      salesforce: true,
      salesforceOrgId: "00D80000000hYxE",
      hubspot: true,
      slack: true,
      slackChannel: "#urgent-patient-triage",
      webhookUrl: "https://api.aetherhealth.org/v1/ehr/intake-webhook",
      snowflake: true,
      connectedMap: {
        hubspot: true,
        gmail: true,
        whatsapp: true,
        voice_agent: true,
        gcal: true,
        salesforce: true,
        slack: true,
        snowflake: true
      },
      accountsMap: {
        hubspot: "alexandra@aetherhealth-crm.hubspot.com",
        gmail: "alexandra@antelier.io",
        whatsapp: "+1 (312) 555-0198 (Verified Business)",
        voice_agent: "Vapi / ElevenLabs (us-east-1)",
        gcal: "scheduling@aetherhealth.org",
        salesforce: "org_00D80000000hYxE (Aether Health)",
        slack: "antelier-workspace.slack.com (#urgent-intake)",
        snowflake: "antelier_corp.snowflakecomputing.com"
      },
      configsMap: {
        hubspot: { pipeline: "Sales Inbound Pipeline", leadOwner: "Alexandra (Workspace Owner)", syncFrequency: "Real-time (Instant)", defaultStage: "New Qualified Lead" },
        gmail: { senderEmail: "alexandra@antelier.io", replyAddress: "support@aetherhealth.org" },
        whatsapp: { businessNumber: "+1 (312) 555-0198", defaultTemplate: "Instant Intake & Triage (English)", autoReply: "Enabled 24/7" },
        voice_agent: { voiceModel: "Antelier Turbo Voice v2.5", voicePersona: "Ava - Warm & Professional (Female)", language: "English (US)" }
      },
      lastSyncMap: {
        hubspot: "2 mins ago",
        gmail: "5 mins ago",
        whatsapp: "12 mins ago",
        voice_agent: "30 mins ago",
        gcal: "45 mins ago"
      }
    }
  },
  Legal: {
    activePreset: "Legal",
    businessProfile: {
      companyName: "Apex Legal Group LLP",
      industry: "Corporate & Commercial Law",
      companySize: "250 - 500",
      targetTier: "Enterprise Clients & High Net Worth Individuals",
      brandTone: "formal",
      primaryIntakeGoal: "Execute automated conflict of interest checks, retainer evaluations, and case briefs",
      supportEmail: "client-intake@apexlegal.com"
    },
    knowledgeBase: {
      sourcesCount: 8,
      uploadedFiles: [
        "Master_Retainer_Agreement_Template.pdf",
        "Conflict_of_Interest_Policy_2026.pdf",
        "Corporate_Litigation_Intake_Guide.pdf"
      ],
      scrapeUrls: ["https://apexlegal.com/practice-areas", "https://apexlegal.com/fee-structure"],
      syncInterval: "hourly",
      autoParsePdf: true
    },
    aiAssistant: {
      agentName: "Justinian (Legal Intake Specialist)",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80",
      primaryModel: "claude-3.5-sonnet",
      systemPrompt:
        "You are Justinian, lead intake specialist for Apex Legal Group LLP. Conduct preliminary case assessments, perform conflict of interest screening, and gather opposing party details.",
      greetingMessage:
        "Welcome to Apex Legal Group LLP. I am Justinian, your legal intake assistant. I can assist with confidential case evaluation, conflict screening, and retainer scheduling.",
      handoffScoreThreshold: 90,
      escalationRole: "Senior Partner On-Call"
    },
    integrations: {
      salesforce: true,
      salesforceOrgId: "00D80000000legal",
      hubspot: true,
      slack: true,
      slackChannel: "#legal-case-intake",
      webhookUrl: "https://api.apexlegal.com/v1/clio/intake-sync",
      snowflake: false,
      connectedMap: {
        hubspot: true,
        gmail: true,
        whatsapp: false,
        voice_agent: true
      },
      accountsMap: {
        hubspot: "sales@apexlegal.com",
        gmail: "client-intake@apexlegal.com"
      }
    }
  },
  Dental: {
    activePreset: "Dental",
    businessProfile: {
      companyName: "BrightSmile Dental Centers",
      industry: "Dental & Orthodontics",
      companySize: "50 - 100",
      targetTier: "Patients & Family Care Plans",
      brandTone: "friendly",
      primaryIntakeGoal: "Schedule appointment bookings, pre-authorize dental insurance claims, and emergency dental triage",
      supportEmail: "care@brightsmiledental.com"
    },
    knowledgeBase: {
      sourcesCount: 4,
      uploadedFiles: [
        "Dental_Insurance_PreAuth_Guidelines.pdf",
        "Patient_Teeth_Cleaning_SOP.pdf",
        "Orthodontic_Financing_Plans.pdf"
      ],
      scrapeUrls: ["https://brightsmiledental.com/services", "https://brightsmiledental.com/booking"],
      syncInterval: "realtime",
      autoParsePdf: true
    },
    aiAssistant: {
      agentName: "Chloe (Dental Care Coordinator)",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=250&q=80",
      primaryModel: "gpt-4o",
      systemPrompt:
        "You are Chloe, patient care coordinator for BrightSmile Dental. Help patients schedule cleanings, check dental PPO insurance coverage, and handle toothache emergencies.",
      greetingMessage:
        "Hi there! Welcome to BrightSmile Dental! I'm Chloe. I can help book your next dental appointment, verify insurance benefits, or answer treatment questions.",
      handoffScoreThreshold: 80,
      escalationRole: "Front Desk Supervisor"
    },
    integrations: {
      salesforce: false,
      hubspot: true,
      slack: true,
      slackChannel: "#dental-appointments",
      webhookUrl: "https://api.brightsmiledental.com/v1/dentrix/intake",
      snowflake: false,
      connectedMap: {
        hubspot: true,
        whatsapp: true
      }
    }
  },
  "Financial Services": {
    activePreset: "Financial Services",
    businessProfile: {
      companyName: "Vanguard Wealth Partners",
      industry: "Financial Planning & Wealth Management",
      companySize: "500 - 1,000",
      targetTier: "High Net Worth Individuals ($1M+ Investable Assets)",
      brandTone: "direct",
      primaryIntakeGoal: "Qualify accredited investor status, execute KYC/AML checks, and assign wealth advisors",
      supportEmail: "intake@vanguardwealth.com"
    },
    knowledgeBase: {
      sourcesCount: 7,
      uploadedFiles: [
        "FINRA_KYC_AML_Compliance_Manual_2026.pdf",
        "Accredited_Investor_Verification_SOP.pdf",
        "Portfolio_Management_Fee_Schedule.pdf"
      ],
      scrapeUrls: ["https://vanguardwealth.com/services", "https://vanguardwealth.com/compliance"],
      syncInterval: "realtime",
      autoParsePdf: true
    },
    aiAssistant: {
      agentName: "Marcus (Wealth Intake Specialist)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      primaryModel: "gpt-4o",
      systemPrompt:
        "You are Marcus, financial intake analyst at Vanguard Wealth Partners. Assess prospective client investable assets, verify accredited investor qualifications, and schedule initial portfolio consultations.",
      greetingMessage:
        "Welcome to Vanguard Wealth Partners. I am Marcus, your wealth intake specialist. I can assist with evaluating portfolio goals, verifying investor accreditation, and connecting you with a Private Wealth Advisor.",
      handoffScoreThreshold: 88,
      escalationRole: "Managing Director"
    },
    integrations: {
      salesforce: true,
      salesforceOrgId: "00D80000000wealth",
      hubspot: false,
      slack: true,
      slackChannel: "#wealth-intake-leads",
      webhookUrl: "https://api.vanguardwealth.com/v1/charles-schwab/sync",
      snowflake: true,
      connectedMap: {
        salesforce: true,
        slack: true,
        snowflake: true
      }
    }
  },
  "Real Estate": {
    activePreset: "Real Estate",
    businessProfile: {
      companyName: "Prestige Luxury Properties",
      industry: "Real Estate & Commercial Brokerage",
      companySize: "100 - 250",
      targetTier: "Luxury Homebuyers & Commercial Real Estate Investors",
      brandTone: "friendly",
      primaryIntakeGoal: "Qualify buyer budget & mortgage pre-approval, schedule property viewings, and log seller listings",
      supportEmail: "concierge@prestigeproperties.com"
    },
    knowledgeBase: {
      sourcesCount: 5,
      uploadedFiles: [
        "Luxury_Listing_Portfolio_2026.pdf",
        "Mortgage_PreApproval_Requirements.pdf",
        "Commercial_Lease_Intake_Form.pdf"
      ],
      scrapeUrls: ["https://prestigeproperties.com/listings", "https://prestigeproperties.com/agents"],
      syncInterval: "hourly",
      autoParsePdf: true
    },
    aiAssistant: {
      agentName: "Sophia (Property Concierge)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
      primaryModel: "claude-3.5-sonnet",
      systemPrompt:
        "You are Sophia, luxury real estate concierge for Prestige Properties. Qualify buyer budget, preferred locations, pre-approval status, and schedule private villa viewings.",
      greetingMessage:
        "Hello! Welcome to Prestige Luxury Properties. I'm Sophia, your personal real estate concierge. I can help curate exclusive property listings, arrange private viewings, or connect you with a senior broker.",
      handoffScoreThreshold: 82,
      escalationRole: "Lead Listing Agent"
    },
    integrations: {
      salesforce: true,
      salesforceOrgId: "00D80000000realty",
      hubspot: true,
      slack: true,
      slackChannel: "#luxury-property-inquiries",
      webhookUrl: "https://api.prestigeproperties.com/v1/mls/webhook",
      snowflake: false,
      connectedMap: {
        hubspot: true,
        gmail: true,
        whatsapp: true
      }
    }
  }
}

export const emptyWorkspaceState: WorkspaceState = {
  activePreset: "Healthcare",
  isOnboarded: false,
  showWizardModal: false,
  currentStep: 1,
  skippedSteps: [],
  businessProfile: {
    companyName: "",
    industry: "Enterprise Software & AI",
    companySize: "",
    targetTier: "",
    brandTone: "consultative",
    primaryIntakeGoal: "",
    supportEmail: "",
    companyWebsite: "",
    contactNumber: ""
  },
  knowledgeBase: {
    sourcesCount: 0,
    uploadedFiles: [],
    scrapeUrls: [],
    syncInterval: "realtime",
    autoParsePdf: true
  },
  aiAssistant: {
    agentName: "",
    avatar: "",
    primaryModel: "gpt-4o",
    systemPrompt: "",
    greetingMessage: "",
    handoffScoreThreshold: 80,
    escalationRole: ""
  },
  integrations: {
    salesforce: false,
    hubspot: false,
    slack: false,
    webhookUrl: "",
    snowflake: false,
    enabledMap: {},
    connectedMap: {},
    accountsMap: {},
    configsMap: {},
    lastSyncMap: {}
  }
}

const defaultState: WorkspaceState = emptyWorkspaceState

interface WorkspaceContextType {
  state: WorkspaceState
  loadDemoPreset: (presetName: DemoPresetType) => void
  updateBusinessProfile: (data: Partial<BusinessProfileData>) => void
  updateKnowledgeBase: (data: Partial<KnowledgeBaseData>) => void
  updateAiAssistant: (data: Partial<AiAssistantData>) => void
  updateIntegrations: (data: Partial<IntegrationsData>) => void
  connectIntegration: (id: string, accountName: string, config?: Record<string, string>) => void
  updateIntegrationConfig: (id: string, config: Record<string, string>) => void
  disconnectIntegration: (id: string) => void
  isIntegrationConnected: (id: string) => boolean
  isIntegrationEnabled: (id: string) => boolean
  toggleIntegrationEnabled: (id: string, enabled?: boolean) => void
  getIntegrationAccount: (id: string) => string
  getIntegrationConfig: (id: string) => Record<string, string>
  getIntegrationPromptStudio: (id: string) => AiAssistantData
  updateIntegrationPromptStudio: (id: string, data: Partial<AiAssistantData>) => void
  setCurrentStep: (step: number) => void
  skipStep: (stepNumber: number) => void
  unskipStep: (stepNumber: number) => void
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
    let count = 0
    if (state.businessProfile?.companyName?.trim?.() && state.businessProfile?.primaryIntakeGoal?.trim?.()) count++
    if ((state.knowledgeBase?.uploadedFiles?.length || 0) > 0 || (state.knowledgeBase?.scrapeUrls?.length || 0) > 0) count++
    
    const hasConnected =
      Boolean(state.integrations?.hubspot) ||
      Boolean(typeof state.integrations?.webhookUrl === "string" && state.integrations.webhookUrl.trim()) ||
      Boolean(state.integrations?.connectedMap && Object.values(state.integrations.connectedMap).some(Boolean))

    if (hasConnected) count++

    return Math.round((count / 3) * 100)
  }, [state])

  const loadDemoPreset = (presetName: DemoPresetType) => {
    const preset = demoPresetsData[presetName]
    if (preset) {
      setState((prev) => ({
        ...prev,
        ...preset,
        isOnboarded: true,
      }))
    }
  }

  const skipStep = (stepNumber: number) => {
    setState((prev) => ({
      ...prev,
      skippedSteps: (prev.skippedSteps || []).includes(stepNumber)
        ? prev.skippedSteps || []
        : [...(prev.skippedSteps || []), stepNumber],
    }))
  }

  const unskipStep = (stepNumber: number) => {
    setState((prev) => ({
      ...prev,
      skippedSteps: (prev.skippedSteps || []).filter((s) => s !== stepNumber),
    }))
  }

  const updateBusinessProfile = (data: Partial<BusinessProfileData>) => {
    setState((prev) => ({
      ...prev,
      skippedSteps: (prev.skippedSteps || []).filter((s) => s !== 1),
      businessProfile: { ...prev.businessProfile, ...data }
    }))
  }

  const updateKnowledgeBase = (data: Partial<KnowledgeBaseData>) => {
    setState((prev) => ({
      ...prev,
      skippedSteps: (prev.skippedSteps || []).filter((s) => s !== 2),
      knowledgeBase: { ...prev.knowledgeBase, ...data }
    }))
  }

  const updateAiAssistant = (data: Partial<AiAssistantData>) => {
    setState((prev) => ({
      ...prev,
      skippedSteps: (prev.skippedSteps || []).filter((s) => s !== 3),
      aiAssistant: { ...prev.aiAssistant, ...data }
    }))
  }

  const updateIntegrations = (data: Partial<IntegrationsData>) => {
    setState((prev) => ({
      ...prev,
      skippedSteps: (prev.skippedSteps || []).filter((s) => s !== 4),
      integrations: { ...prev.integrations, ...data }
    }))
  }

  const connectIntegration = (id: string, accountName: string, config?: Record<string, string>) => {
    setState((prev) => {
      const currentConnectedMap = prev.integrations.connectedMap || {}
      const currentAccountsMap = prev.integrations.accountsMap || {}
      const currentConfigsMap = prev.integrations.configsMap || {}
      const currentLastSyncMap = prev.integrations.lastSyncMap || {}
      const currentEnabledMap = prev.integrations.enabledMap || {}

      return {
        ...prev,
        skippedSteps: (prev.skippedSteps || []).filter((s) => s !== 3),
        integrations: {
          ...prev.integrations,
          hubspot: id === "hubspot" ? true : prev.integrations.hubspot,
          enabledMap: { ...currentEnabledMap, [id]: true },
          connectedMap: { ...currentConnectedMap, [id]: true },
          accountsMap: { ...currentAccountsMap, [id]: accountName },
          configsMap: { ...currentConfigsMap, [id]: { ...(currentConfigsMap[id] || {}), ...(config || {}) } },
          lastSyncMap: { ...currentLastSyncMap, [id]: "Just now" }
        }
      }
    })
  }

  const isIntegrationEnabled = (id: string) => {
    if (state.integrations?.enabledMap && state.integrations.enabledMap[id] !== undefined) {
      return Boolean(state.integrations.enabledMap[id])
    }
    return false
  }

  const toggleIntegrationEnabled = (id: string, enabled?: boolean) => {
    setState((prev) => {
      const currentEnabledMap = prev.integrations.enabledMap || {}
      const nextState = enabled !== undefined ? enabled : !currentEnabledMap[id]
      return {
        ...prev,
        skippedSteps: (prev.skippedSteps || []).filter((s) => s !== 3),
        integrations: {
          ...prev.integrations,
          enabledMap: {
            ...currentEnabledMap,
            [id]: nextState
          }
        }
      }
    })
  }

  const updateIntegrationConfig = (id: string, config: Record<string, string>) => {
    setState((prev) => {
      const currentConfigsMap = prev.integrations.configsMap || {}
      return {
        ...prev,
        integrations: {
          ...prev.integrations,
          configsMap: {
            ...currentConfigsMap,
            [id]: { ...(currentConfigsMap[id] || {}), ...config }
          }
        }
      }
    })
  }

  const disconnectIntegration = (id: string) => {
    setState((prev) => {
      const currentConnectedMap = prev.integrations.connectedMap || {}
      return {
        ...prev,
        integrations: {
          ...prev.integrations,
          hubspot: id === "hubspot" ? false : prev.integrations.hubspot,
          connectedMap: { ...currentConnectedMap, [id]: false }
        }
      }
    })
  }

  const isIntegrationConnected = (id: string) => {
    if (state.integrations?.connectedMap && state.integrations.connectedMap[id] !== undefined) {
      return Boolean(state.integrations.connectedMap[id])
    }
    // Fallbacks
    if (id === "hubspot") return Boolean(state.integrations?.hubspot)
    if (id === "gmail") return Boolean(typeof state.integrations?.webhookUrl === "string" && state.integrations.webhookUrl.trim())
    return false
  }

  const getIntegrationAccount = (id: string) => {
    if (state.integrations.accountsMap?.[id]) {
      return state.integrations.accountsMap[id]
    }
    return `${currentUser.email}`
  }

  const getIntegrationConfig = (id: string) => {
    return state.integrations.configsMap?.[id] || {}
  }

  const getIntegrationPromptStudio = (id: string): AiAssistantData => {
    if (state.integrations.promptStudioMap?.[id]) {
      return state.integrations.promptStudioMap[id]
    }
    if (DEFAULT_PROMPT_STUDIO_BY_INTEGRATION[id]) {
      return DEFAULT_PROMPT_STUDIO_BY_INTEGRATION[id]
    }
    return state.aiAssistant
  }

  const updateIntegrationPromptStudio = (id: string, data: Partial<AiAssistantData>) => {
    setState((prev) => {
      const currentPromptMap = prev.integrations.promptStudioMap || {}
      const existing = currentPromptMap[id] || DEFAULT_PROMPT_STUDIO_BY_INTEGRATION[id] || prev.aiAssistant
      const updated = { ...existing, ...data }

      return {
        ...prev,
        aiAssistant: id === "voice_agent" || id === "hubspot" ? { ...prev.aiAssistant, ...data } : prev.aiAssistant,
        integrations: {
          ...prev.integrations,
          promptStudioMap: {
            ...currentPromptMap,
            [id]: updated
          }
        }
      }
    })
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
        state: {
          ...state,
          skippedSteps: state.skippedSteps || []
        },
        loadDemoPreset,
        updateBusinessProfile,
        updateKnowledgeBase,
        updateAiAssistant,
        updateIntegrations,
        connectIntegration,
        updateIntegrationConfig,
        disconnectIntegration,
        isIntegrationConnected,
        isIntegrationEnabled,
        toggleIntegrationEnabled,
        getIntegrationAccount,
        getIntegrationConfig,
        getIntegrationPromptStudio,
        updateIntegrationPromptStudio,
        setCurrentStep,
        skipStep,
        unskipStep,
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

