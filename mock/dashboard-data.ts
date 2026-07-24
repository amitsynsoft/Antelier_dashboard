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
      { title: "Business Profile", href: "#business-profile", icon: "Building2" },
      { title: "Knowledge Base", href: "#knowledge-base", icon: "FileText" },
      { title: "Prompt Studio", href: "#prompt-studio", icon: "Sliders" },
      { title: "Integrations", href: "#integrations", icon: "Plug" },
      { title: "Workflow Builder", href: "#workflow-builder", icon: "GitFork" }
    ]
  },
  {
    groupLabel: "OPERATIONS",
    items: [
      { title: "Conversations", href: "#conversations", icon: "MessageSquare" },
      { title: "Activity Logs", href: "#activity-logs", icon: "Clock" }
    ]
  },
  {
    groupLabel: "ADMINISTRATION",
    items: [
      { title: "Users & Permissions", href: "#users-permissions", icon: "Users" },
      { title: "Settings", href: "#settings", icon: "Settings" }
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

export const quickActionsMock = [
  {
    id: "upload-knowledge",
    title: "Upload Knowledge",
    description: "Add documents & files",
    icon: "Upload",
    href: "#knowledge-base"
  },
  {
    id: "configure-prompt",
    title: "Configure Prompt",
    description: "Tune your AI assistant",
    icon: "Sliders",
    href: "#prompt-studio"
  },
  {
    id: "test-ai-assistant",
    title: "Test AI Assistant",
    description: "Start a test conversation",
    icon: "Sparkles",
    href: "#test-ai"
  },
  {
    id: "connect-integration",
    title: "Connect Integration",
    description: "Add new integrations",
    icon: "PlusCircle",
    href: "#integrations"
  },
  {
    id: "create-workflow",
    title: "Create Workflow",
    description: "Automate processes",
    icon: "GitFork",
    href: "#workflow-builder"
  },
  {
    id: "invite-team-member",
    title: "Invite Team Member",
    description: "Add users to workspace",
    icon: "UserPlus",
    href: "#users-permissions"
  }
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
  {
    id: "act-1",
    type: "document",
    title: "Knowledge document uploaded",
    detail: "Patient_Registration_SOP.pdf",
    timeAgo: "2m ago"
  },
  {
    id: "act-2",
    type: "prompt",
    title: "Prompt updated",
    detail: "Added 2 new rules to escalation",
    timeAgo: "15m ago"
  },
  {
    id: "act-3",
    type: "integration",
    title: "WhatsApp integration connected",
    detail: "+91 98765 43210",
    timeAgo: "1h ago"
  },
  {
    id: "act-4",
    type: "workflow",
    title: "Workflow created",
    detail: "New Patient Intake Flow",
    timeAgo: "2h ago"
  },
  {
    id: "act-5",
    type: "business",
    title: "Business hours updated",
    detail: "Mon - Sat, 9:00 AM - 7:00 PM",
    timeAgo: "3h ago"
  }
]

export const aiConversationsMock: AiConversation[] = []
export const workflowExecutionsMock: WorkflowExecution[] = []
export const connectedIntegrationsMock: ConnectedIntegration[] = []
export const pendingTasksMock: PendingTask[] = []
export const upcomingRemindersMock: UpcomingReminder[] = []
export const recentActivityMock: ActivityItem[] = []
