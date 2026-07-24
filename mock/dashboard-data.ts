import {
  UserProfile,
  MetricData,
  AiConversation,
  WorkflowExecution,
  ConnectedIntegration,
  PendingTask,
  UpcomingReminder,
  ActivityItem,
  NavGroup
} from "@/types"

export type DemoWorkspace = {
  id: string
  name: string
  industry: string
  status: "AI Ready" | "AI Training" | "Configuring"
  avatar: string
  current: boolean
}

export const currentUser: UserProfile = {
  name: "Alexandra",
  email: "alexandra@antelier.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  role: "Workspace Owner",
  organization: "Aether Health Systems",
  plan: "Enterprise AI"
}

export const demoWorkspaces: DemoWorkspace[] = [
  {
    id: "ws-1",
    name: "Aether Health Systems",
    industry: "Healthcare",
    status: "AI Ready",
    avatar: "🏥",
    current: true
  },
  {
    id: "ws-2",
    name: "Chicago Family Law",
    industry: "Legal Services",
    status: "AI Ready",
    avatar: "⚖️",
    current: false
  },
  {
    id: "ws-3",
    name: "Smile Dental Group",
    industry: "Dental & Medical",
    status: "AI Training",
    avatar: "🦷",
    current: false
  },
  {
    id: "ws-4",
    name: "Prime Financial Advisors",
    industry: "Fintech & Wealth",
    status: "AI Ready",
    avatar: "📈",
    current: false
  }
]

export const navigationGroups: NavGroup[] = [
  {
    groupLabel: "WORKSPACE",
    items: [
      { title: "AI Playground", href: "/playground", icon: "Bot" },
      { title: "Workflow Builder", href: "/workflows", icon: "GitFork" },
      { title: "Business Profile", href: "/business-profile", icon: "Building2" },
      { title: "Knowledge Base", href: "/knowledge-base", icon: "FileText" },
      { title: "Prompt Studio", href: "/prompt-studio", icon: "Sliders" },
      { title: "Integrations", href: "/integrations", icon: "Plug" }
    ]
  },
  {
    groupLabel: "OPERATIONS",
    items: [
      { title: "Conversations", href: "/conversations", icon: "MessageSquare" },
      { title: "Activity Center", href: "/activity", icon: "Clock" }
    ]
  },
  {
    groupLabel: "ADMINISTRATION",
    items: [
      { title: "Users & Permissions", href: "/users", icon: "Users" },
      { title: "Settings", href: "/settings", icon: "Settings" }
    ]
  }
]

export const kpiMetrics: MetricData[] = [
  {
    id: "total-conversations",
    title: "Total Conversations",
    value: "1,248",
    change: "↗ 18.4%",
    trend: "up",
    trendLabel: "vs last 7 days",
    sparkline: [35, 42, 48, 55, 62, 70, 85, 92, 110, 128],
    description: "Total conversations handled by your AI assistant",
    icon: "MessageSquare"
  },
  {
    id: "knowledge-documents",
    title: "Knowledge Documents",
    value: "46",
    change: "↗ 12.5%",
    trend: "up",
    trendLabel: "vs last 7 days",
    sparkline: [20, 22, 25, 28, 32, 36, 40, 42, 44, 46],
    description: "Documents indexed for AI RAG retrieval",
    icon: "FileText"
  },
  {
    id: "active-integrations",
    title: "Active Integrations",
    value: "4",
    change: "— No change",
    trend: "neutral",
    trendLabel: "",
    sparkline: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    description: "Connected third-party tools and services",
    icon: "Plug"
  },
  {
    id: "active-workflows",
    title: "Active Workflows",
    value: "12",
    change: "↗ 2 new this week",
    trend: "up",
    trendLabel: "",
    sparkline: [8, 8, 9, 9, 10, 10, 11, 11, 12, 12],
    description: "Automated business logic workflows",
    icon: "GitFork"
  },
  {
    id: "team-members",
    title: "Team Members",
    value: "8",
    change: "— No change",
    trend: "neutral",
    trendLabel: "",
    sparkline: [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    description: "Team members with workspace access",
    icon: "Users"
  }
]

// Playground Scenario Mock Data
export type PlaygroundScenario = {
  id: string
  industry: "Healthcare" | "Legal" | "Dental" | "Financial"
  title: string
  customerName: string
  customerAvatar: string
  initialMessages: { sender: "user" | "bot"; text: string; time: string }[]
  insights: {
    knowledgeSource: string
    promptVersion: string
    confidenceScore: string
    workflowTriggered: string
    crmAction: string
    escalationStatus: string
    collectedFields: Record<string, string>
    responseTimeMs: number
  }
}

export const playgroundScenariosMock: PlaygroundScenario[] = [
  {
    id: "sc-1",
    industry: "Healthcare",
    title: "New Cardiology Intake & Insurance Check",
    customerName: "Eleanor Vance",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    initialMessages: [
      { sender: "user", text: "Hi, I need to schedule a consultation with Dr. Miller for chest pain and verify if BlueCross PPO is accepted.", time: "10:14 AM" },
      { sender: "bot", text: "Hello Eleanor! I can certainly help you set up an appointment with Dr. Miller. Aether Health accepts BlueCross PPO with 0% copay for in-network Specialist Intake. Before I book your slot, could you confirm your Date of Birth and Member ID?", time: "10:14 AM" },
      { sender: "user", text: "DOB is 04/18/1982 and Member ID is BCX-98214-77.", time: "10:15 AM" }
    ],
    insights: {
      knowledgeSource: "Patient_Registration_SOP_2026.pdf (Page 4)",
      promptVersion: "v12 - Consultative Healthcare Intake",
      confidenceScore: "98.8%",
      workflowTriggered: "New Patient Intake & EHR Sync",
      crmAction: "Created Salesforce Contact ID: 00D80000000hYxE",
      escalationStatus: "Auto-qualified for Dr. Miller",
      collectedFields: {
        "Full Name": "Eleanor Vance",
        "Payer": "BlueCross PPO",
        "Member ID": "BCX-98214-77",
        "Primary Symptom": "Chest discomfort"
      },
      responseTimeMs: 380
    }
  },
  {
    id: "sc-2",
    industry: "Legal",
    title: "Corporate Contract Dispute Consultation",
    customerName: "Marcus Sterling",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    initialMessages: [
      { sender: "user", text: "We have a vendor breach of contract issue involving $250k in undelivered software licenses.", time: "11:02 AM" },
      { sender: "bot", text: "Thank you for reaching out, Marcus. Chicago Family & Commercial Law handles vendor dispute claims over $100k. I can assign a Senior Partner for a 30-minute case evaluation today at 2:00 PM or 4:30 PM.", time: "11:02 AM" }
    ],
    insights: {
      knowledgeSource: "Commercial_Litigation_Retainer_Rules.docx",
      promptVersion: "v9 - Legal Intake & Jurisdiction Filter",
      confidenceScore: "96.4%",
      workflowTriggered: "High-Value Case Escalation",
      crmAction: "Created HubSpot Deal: $250k Vendor Dispute",
      escalationStatus: "Escalated to Senior Partner (Sarah Jenkins)",
      collectedFields: {
        "Client Name": "Marcus Sterling",
        "Dispute Amount": "$250,000",
        "Category": "Breach of Contract"
      },
      responseTimeMs: 410
    }
  },
  {
    id: "sc-3",
    industry: "Dental",
    title: "Emergency Toothache & Dental Implant Inquiry",
    customerName: "Sophia Lin",
    customerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    initialMessages: [
      { sender: "user", text: "I broke a molar this morning and I am in severe pain. Do you have emergency openings today?", time: "09:30 AM" },
      { sender: "bot", text: "I am so sorry to hear that, Sophia! Yes, Smile Dental Group reserves same-day emergency slots. I have an immediate slot at 11:15 AM with Dr. Aris. May I reserve this for you?", time: "09:30 AM" }
    ],
    insights: {
      knowledgeSource: "Dental_Emergency_Protocol_v3.pdf",
      promptVersion: "v14 - Urgent Medical Routing",
      confidenceScore: "99.2%",
      workflowTriggered: "Same-Day Emergency Booking",
      crmAction: "Created Calendar Event: Dr. Aris Emergency #402",
      escalationStatus: "High Priority Emergency Flag",
      collectedFields: {
        "Patient Name": "Sophia Lin",
        "Urgency Level": "High (Severe Pain / Broken Molar)",
        "Assigned Doctor": "Dr. Aris"
      },
      responseTimeMs: 340
    }
  },
  {
    id: "sc-4",
    industry: "Financial",
    title: "Wealth Management & Tax Strategy Consultation",
    customerName: "David Miller",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    initialMessages: [
      { sender: "user", text: "Looking for estate tax planning for a portfolio valued at $3.5M.", time: "02:15 PM" },
      { sender: "bot", text: "Hello David! Prime Financial specializes in High Net Worth estate planning and capital gains tax optimization. I've routed your inquiry to our Principal Wealth Advisor, Robert Sterling. Would you prefer a Zoom consultation or an in-person meeting at our Chicago office?", time: "02:15 PM" }
    ],
    insights: {
      knowledgeSource: "HNW_Wealth_Advisory_Framework.pdf",
      promptVersion: "v8 - Wealth Advisory Persona",
      confidenceScore: "97.5%",
      workflowTriggered: "HNW Lead Qualification & Routing",
      crmAction: "Updated Salesforce Opportunity Stage: Qualified Lead",
      escalationStatus: "Assigned to Robert Sterling (Principal)",
      collectedFields: {
        "Prospect Name": "David Miller",
        "Portfolio Tier": "$3.5M HNW",
        "Interest": "Estate Tax Planning"
      },
      responseTimeMs: 390
    }
  }
]

// Workflow Builder Mock Data
export type WorkflowItem = {
  id: string
  title: string
  description: string
  category: "Intake" | "Scheduling" | "Escalation" | "Notification"
  status: "Active" | "Draft" | "Paused"
  executionsCount: number
  lastRun: string
  nodes: {
    id: string
    type: "trigger" | "condition" | "action"
    label: string
    subtitle: string
    icon: string
  }[]
}

export const workflowsMock: WorkflowItem[] = [
  {
    id: "wf-1",
    title: "New Client Intake & CRM Sync",
    description: "Captures qualified prospective leads, verifies insurance/retainer, and creates Salesforce/HubSpot deal records.",
    category: "Intake",
    status: "Active",
    executionsCount: 482,
    lastRun: "3 minutes ago",
    nodes: [
      { id: "n-1", type: "trigger", label: "New AI Chatbot Conversation", subtitle: "Triggers when a prospect submits initial intake form", icon: "Bot" },
      { id: "n-2", type: "condition", label: "Evaluate Lead Qualification Score", subtitle: "If Lead Score >= 80 & Insurance Verified", icon: "Sliders" },
      { id: "n-3", type: "action", label: "Create CRM Lead Record", subtitle: "Pushes contact to Salesforce & HubSpot", icon: "Plug" },
      { id: "n-4", type: "action", label: "Send Automated SMS Confirmation", subtitle: "Sends Twilio SMS with intake summary", icon: "MessageSquare" }
    ]
  },
  {
    id: "wf-2",
    title: "Appointment Booking & Calendar Lock",
    description: "Checks practitioner calendar availability, reserves slot, and sends Google Calendar invites.",
    category: "Scheduling",
    status: "Active",
    executionsCount: 310,
    lastRun: "12 minutes ago",
    nodes: [
      { id: "n-1", type: "trigger", label: "Appointment Slot Requested", subtitle: "Triggers when customer selects date & time", icon: "Clock" },
      { id: "n-2", type: "condition", label: "Check Calendar Slot Conflicts", subtitle: "Verifies Google Calendar & Outlook slot availability", icon: "Sliders" },
      { id: "n-3", type: "action", label: "Lock Calendar Booking", subtitle: "Creates calendar invite & Zoom meeting link", icon: "Plug" },
      { id: "n-4", type: "action", label: "Dispatch Email Reminder", subtitle: "Sends Gmail confirmation with calendar ICS file", icon: "MessageSquare" }
    ]
  },
  {
    id: "wf-3",
    title: "Urgent Escalation & On-Call Alert",
    description: "Flags severe medical emergencies or high-value litigation cases and immediately pings Slack & SMS on-call teams.",
    category: "Escalation",
    status: "Active",
    executionsCount: 64,
    lastRun: "1 hour ago",
    nodes: [
      { id: "n-1", type: "trigger", label: "High Severity Sentiment Flagged", subtitle: "Triggers on keywords: emergency, severe pain, breach", icon: "Bot" },
      { id: "n-2", type: "action", label: "Notify Slack #urgent-intake", subtitle: "Posts rich notification payload to Slack", icon: "MessageSquare" },
      { id: "n-3", type: "action", label: "Escalate to Human Supervisor", subtitle: "Transfers live session to on-call manager dashboard", icon: "Users" }
    ]
  }
]

// Unified Conversations Inbox Mock Data
export type InboxConversation = {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAvatar: string
  channel: "Website Chat" | "WhatsApp" | "Voice" | "Email" | "SMS"
  leadStatus: "Qualified" | "In Review" | "Scheduled" | "Unqualified"
  aiStatus: "AI Handling" | "Human Took Over" | "Escalated"
  assignedStaff: string
  lastActivityTime: string
  unread: boolean
  messages: {
    id: string
    sender: "customer" | "ai" | "human"
    senderName: string
    text: string
    timestamp: string
  }[]
}

export const conversationsInboxMock: InboxConversation[] = [
  {
    id: "conv-101",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.vance@gmail.com",
    customerPhone: "+1 (312) 555-0198",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    channel: "Website Chat",
    leadStatus: "Qualified",
    aiStatus: "AI Handling",
    assignedStaff: "Dr. Miller / Alexandra",
    lastActivityTime: "2m ago",
    unread: true,
    messages: [
      { id: "m1", sender: "customer", senderName: "Eleanor Vance", text: "Hi, I need to schedule a consultation with Dr. Miller for chest pain and verify if BlueCross PPO is accepted.", timestamp: "10:14 AM" },
      { id: "m2", sender: "ai", senderName: "Ava (AI Intake)", text: "Hello Eleanor! I can certainly help you set up an appointment with Dr. Miller. Aether Health accepts BlueCross PPO with 0% copay for in-network Specialist Intake. Could you confirm your DOB and Member ID?", timestamp: "10:14 AM" },
      { id: "m3", sender: "customer", senderName: "Eleanor Vance", text: "DOB is 04/18/1982 and Member ID is BCX-98214-77.", timestamp: "10:15 AM" },
      { id: "m4", sender: "ai", senderName: "Ava (AI Intake)", text: "Thank you! I've validated your coverage. I have Dr. Miller available today at 3:30 PM or tomorrow at 10:00 AM.", timestamp: "10:15 AM" }
    ]
  },
  {
    id: "conv-102",
    customerName: "Marcus Sterling",
    customerEmail: "marcus@sterlingcorp.com",
    customerPhone: "+1 (312) 555-0842",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    channel: "WhatsApp",
    leadStatus: "In Review",
    aiStatus: "Human Took Over",
    assignedStaff: "Sarah Jenkins (Senior Partner)",
    lastActivityTime: "14m ago",
    unread: false,
    messages: [
      { id: "m1", sender: "customer", senderName: "Marcus Sterling", text: "We have a vendor breach of contract issue involving $250k in undelivered software licenses.", timestamp: "11:02 AM" },
      { id: "m2", sender: "ai", senderName: "Legal Copilot (AI)", text: "Chicago Family & Commercial Law handles vendor dispute claims over $100k. I will connect you with a Senior Partner.", timestamp: "11:02 AM" },
      { id: "m3", sender: "human", senderName: "Sarah Jenkins (Partner)", text: "Hello Marcus, I am reviewing your case files now. Let's get on a call at 2:00 PM today.", timestamp: "11:12 AM" }
    ]
  },
  {
    id: "conv-103",
    customerName: "Sophia Lin",
    customerEmail: "sophia.lin@outlook.com",
    customerPhone: "+1 (312) 555-0421",
    customerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    channel: "SMS",
    leadStatus: "Scheduled",
    aiStatus: "AI Handling",
    assignedStaff: "Dr. Aris",
    lastActivityTime: "45m ago",
    unread: false,
    messages: [
      { id: "m1", sender: "customer", senderName: "Sophia Lin", text: "I broke a molar this morning and I am in severe pain. Do you have emergency openings today?", timestamp: "09:30 AM" },
      { id: "m2", sender: "ai", senderName: "Smile Dental AI", text: "Yes! We have reserved a same-day emergency slot at 11:15 AM with Dr. Aris. I have confirmed your reservation.", timestamp: "09:31 AM" }
    ]
  },
  {
    id: "conv-104",
    customerName: "David Miller",
    customerEmail: "david@millerwealth.io",
    customerPhone: "+1 (312) 555-0912",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    channel: "Email",
    leadStatus: "Qualified",
    aiStatus: "Escalated",
    assignedStaff: "Robert Sterling",
    lastActivityTime: "2h ago",
    unread: false,
    messages: [
      { id: "m1", sender: "customer", senderName: "David Miller", text: "Inquiry regarding estate tax planning for a $3.5M portfolio.", timestamp: "02:15 PM" },
      { id: "m2", sender: "ai", senderName: "Prime Advisory AI", text: "Thank you David. Your inquiry has been routed directly to Principal Wealth Advisor Robert Sterling.", timestamp: "02:16 PM" }
    ]
  }
]

// Unified Activity Center Mock Data
export type ActivityLogEntry = {
  id: string
  category: "AI Activity" | "Workflow Executions" | "Audit History"
  title: string
  detail: string
  actor: string
  timestamp: string
  status: "Success" | "Warning" | "Failed" | "Info"
  metadata: Record<string, string>
}

export const activityCenterMock: ActivityLogEntry[] = [
  {
    id: "log-1",
    category: "AI Activity",
    title: "RAG Retrieval Executed",
    detail: "Fetched Patient_Registration_SOP.pdf (Page 4) with cosine similarity 0.942",
    actor: "Ava AI Copilot",
    timestamp: "2 minutes ago",
    status: "Success",
    metadata: {
      "Model": "gpt-4o",
      "Embedding Model": "text-embedding-3-large",
      "Latency": "240ms",
      "Tokens Used": "1,420 tokens"
    }
  },
  {
    id: "log-2",
    category: "Workflow Executions",
    title: "Workflow 'New Client Intake' Completed",
    detail: "Created Salesforce Contact ID: 00D80000000hYxE and sent Twilio SMS",
    actor: "Automation Engine",
    timestamp: "12 minutes ago",
    status: "Success",
    metadata: {
      "Workflow ID": "wf-1",
      "Steps Completed": "4/4",
      "Duration": "1.2s",
      "Trigger": "Web Chat Form Submission"
    }
  },
  {
    id: "log-3",
    category: "Audit History",
    title: "User Role Updated",
    detail: "Alexandra updated Sarah Jenkins' role from Agent to Senior Partner",
    actor: "Alexandra (Workspace Owner)",
    timestamp: "1 hour ago",
    status: "Info",
    metadata: {
      "Target User": "Sarah Jenkins",
      "Previous Role": "Agent",
      "New Role": "Senior Partner",
      "IP Address": "192.168.1.42"
    }
  },
  {
    id: "log-4",
    category: "AI Activity",
    title: "System Prompt Version v12 Deployed",
    detail: "Updated prompt rules with HIPAA compliance enforcement & escalation score 85",
    actor: "Alexandra",
    timestamp: "3 hours ago",
    status: "Success",
    metadata: {
      "Prompt Version": "v12",
      "Rules Count": "12 Active Rules",
      "Guardrails": "Active"
    }
  },
  {
    id: "log-5",
    category: "Workflow Executions",
    title: "Slack Alert Dispatched",
    detail: "Posted urgent intake notification payload to #urgent-intake",
    actor: "Webhook Dispatcher",
    timestamp: "5 hours ago",
    status: "Success",
    metadata: {
      "Channel": "#urgent-intake",
      "Payload Size": "2.4 KB",
      "Status Code": "200 OK"
    }
  }
]

// Users & Permissions Mock Data
export type UserItem = {
  id: string
  name: string
  email: string
  avatar: string
  role: "Workspace Owner" | "AI Admin" | "Operations Manager" | "Agent"
  team: "Clinical Operations" | "Legal Counsel" | "Patient Care" | "Wealth Management"
  status: "Active" | "Invited" | "Inactive"
  lastActive: string
}

export const usersListMock: UserItem[] = [
  {
    id: "u-1",
    name: "Alexandra",
    email: "alexandra@antelier.io",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    role: "Workspace Owner",
    team: "Clinical Operations",
    status: "Active",
    lastActive: "Just now"
  },
  {
    id: "u-2",
    name: "Dr. Robert Miller",
    email: "r.miller@aetherhealth.org",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=150&q=80",
    role: "AI Admin",
    team: "Clinical Operations",
    status: "Active",
    lastActive: "15 minutes ago"
  },
  {
    id: "u-3",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@law.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    role: "Operations Manager",
    team: "Legal Counsel",
    status: "Active",
    lastActive: "1 hour ago"
  },
  {
    id: "u-4",
    name: "Dr. Aris Vance",
    email: "aris@smiledental.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80",
    role: "Agent",
    team: "Patient Care",
    status: "Active",
    lastActive: "3 hours ago"
  },
  {
    id: "u-5",
    name: "Robert Sterling",
    email: "robert@primewealth.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    role: "Operations Manager",
    team: "Wealth Management",
    status: "Active",
    lastActive: "Yesterday"
  },
  {
    id: "u-6",
    name: "Elena Rostova",
    email: "elena@aetherhealth.org",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    role: "Agent",
    team: "Clinical Operations",
    status: "Invited",
    lastActive: "Pending Invite"
  }
]

export const quickActionsMock = [
  { id: "upload-knowledge", title: "Upload Knowledge", description: "Add documents & files", icon: "Upload", href: "/dashboard#knowledge-base" },
  { id: "configure-prompt", title: "Configure Prompt", description: "Tune your AI assistant", icon: "Sliders", href: "/dashboard#prompt-studio" },
  { id: "test-ai-assistant", title: "Test AI Assistant", description: "Start a test conversation", icon: "Sparkles", href: "/playground" },
  { id: "connect-integration", title: "Connect Integration", description: "Add new integrations", icon: "PlusCircle", href: "/dashboard#integrations" },
  { id: "create-workflow", title: "Create Workflow", description: "Automate processes", icon: "GitFork", href: "/workflows" },
  { id: "invite-team-member", title: "Invite Team Member", description: "Add users to workspace", icon: "UserPlus", href: "/users" }
]

export const aiAssistantOverviewMock = {
  name: "Ava",
  version: "v12",
  role: "Healthcare Intake Assistant",
  status: "Operational",
  tone: "Professional & Friendly",
  language: "English",
  promptVersion: "v12 (Updated 2d ago)",
  lastTested: "2 hours ago"
}

export const integrationsDashboardMock = [
  { id: "hubspot", name: "HubSpot", connected: true, icon: "/icons/hubspot.png" },
  { id: "gcal", name: "Google Calendar", connected: true, icon: "/icons/google-calendar.png" },
  { id: "whatsapp", name: "WhatsApp Business", connected: true, icon: "/icons/whatsapp.png" },
  { id: "twilio", name: "Twilio (SMS)", connected: false, icon: "/icons/twilio.png" },
  { id: "gmail", name: "Gmail", connected: true, icon: "/icons/gmail.png" }
]

export const knowledgeBaseBreakdownMock = {
  totalDocs: 46,
  lastIndexed: "2 minutes ago",
  categories: [
    { name: "PDF Documents", count: 12, color: "#3B82F6" },
    { name: "SOPs & Policies", count: 6, color: "#06B6D4" },
    { name: "FAQs", count: 15, color: "#10B981" },
    { name: "Web Pages", count: 8, color: "#6366F1" },
    { name: "Others", count: 5, color: "#D97349" }
  ]
}

export const promptStudioSummaryMock = {
  personality: "Professional",
  rulesCount: 12,
  restrictionsCount: 4,
  escalationsCount: 2,
  requiredInfo: "6 Fields"
}

export const recentActivityFeedMock = [
  { id: "act-1", type: "document", title: "Knowledge document uploaded", detail: "Patient_Registration_SOP.pdf", timeAgo: "2m ago" },
  { id: "act-2", type: "prompt", title: "Prompt updated", detail: "Added 2 new rules to escalation", timeAgo: "15m ago" },
  { id: "act-3", type: "integration", title: "WhatsApp integration connected", detail: "+91 98765 43210", timeAgo: "1h ago" },
  { id: "act-4", type: "workflow", title: "Workflow created", detail: "New Patient Intake Flow", timeAgo: "2h ago" },
  { id: "act-5", type: "business", title: "Business hours updated", detail: "Mon - Sat, 9:00 AM - 7:00 PM", timeAgo: "3h ago" }
]

export const aiConversationsMock: AiConversation[] = []
export const workflowExecutionsMock: WorkflowExecution[] = []
export const connectedIntegrationsMock: ConnectedIntegration[] = []
export const pendingTasksMock: PendingTask[] = []
export const upcomingRemindersMock: UpcomingReminder[] = []
export const recentActivityMock: ActivityItem[] = []
