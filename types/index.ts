export type NavItem = {
  title: string
  href: string
  icon: string
  badge?: string | number
  active?: boolean
  children?: NavItem[]
}

export type NavGroup = {
  groupLabel: string
  items: NavItem[]
}

export type BreadcrumbItem = {
  label: string
  href?: string
  current?: boolean
}

export type UserProfile = {
  name: string
  email: string
  avatar: string
  role: string
  organization: string
  plan: string
}

export type MetricTrend = "up" | "down" | "neutral"

export type MetricData = {
  id: string
  title: string
  value: string
  change: string
  trend: MetricTrend
  trendLabel: string
  sparkline: number[]
  description: string
  icon: string
}

export type IntakeStatus = "active" | "qualifying" | "review_needed" | "completed" | "escalated" | "dropped"

export type IntakeChannel = "Web Portal" | "RFP Auto-Parse" | "Email AI" | "API Webhook" | "Voice Bot"

export type AiConversation = {
  id: string
  clientName: string
  clientLogo?: string
  contactEmail: string
  companySize: string
  estimatedValue: string
  leadScore: number // 0 - 100
  channel: IntakeChannel
  status: IntakeStatus
  currentStage: string
  aiAgentAssigned: string
  lastActivityTime: string
  riskLevel: "low" | "medium" | "high"
  tags: string[]
}

export type WorkflowStatus = "running" | "success" | "warning" | "failed" | "queued"

export type WorkflowExecution = {
  id: string
  name: string
  trigger: string
  status: WorkflowStatus
  startedAt: string
  duration: string
  completedSteps: number
  totalSteps: number
  affectedEntity: string
  successRate: number
}

export type IntegrationCategory = "CRM" | "Communication" | "Automation" | "Data Lake" | "Support" | "Analytics"

export type IntegrationHealth = "healthy" | "degraded" | "disconnected" | "syncing"

export type ConnectedIntegration = {
  id: string
  name: string
  category: IntegrationCategory
  status: IntegrationHealth
  lastSync: string
  icon: string
  eventsProcessed: string
  latencyMs: number
}

export type PriorityLevel = "urgent" | "high" | "medium" | "low"

export type PendingTask = {
  id: string
  title: string
  category: "Intake Review" | "Compliance Signoff" | "CRM Mapping" | "SLA Approval"
  priority: PriorityLevel
  assigneeName: string
  assigneeAvatar: string
  dueDate: string
  status: "pending" | "in_progress" | "completed"
  clientRef?: string
}

export type UpcomingReminder = {
  id: string
  title: string
  time: string
  type: "meeting" | "sla_deadline" | "review" | "audit"
  location: string
}

export type ActivityType = 
  | "intake_qualified"
  | "human_handoff"
  | "workflow_completed"
  | "integration_synced"
  | "sla_warning"
  | "document_parsed"
  | "task_completed"

export type ActivityItem = {
  id: string
  timestamp: string
  type: ActivityType
  title: string
  description: string
  userOrBotName: string
  avatar?: string
  status: "info" | "success" | "warning" | "error"
  metadata?: Record<string, string>
}
