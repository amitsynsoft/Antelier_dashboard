export type ChannelType = "voice" | "email" | "chat" | "whatsapp"

export interface IntakeChannelOverview {
  id: ChannelType | "total"
  label: string
  subtitle: string
  count: number
  change: string
  trend: "up" | "down" | "neutral"
  icon: string
  accentColor: string
  detailText: string
}

export interface IntakeTrendPoint {
  date: string
  voice: number
  email: number
  chat: number
  whatsapp: number
  total: number
}

export interface IntakeSourceShare {
  name: string
  channel: ChannelType
  count: number
  percentage: number
  color: string
}

export interface IntentCategory {
  id: string
  name: string
  description: string
  count: number
  percentage: number
  accuracyScore: number
  primaryAction: string
  badgeColor: string
}

export interface RecentIntakeRecord {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAvatar: string
  channel: ChannelType
  channelLabel: string
  detectedIntent: string
  confidenceScore: number
  status: "Qualified" | "Scheduled" | "Urgent Escalation" | "Auto-Resolved" | "Pending Review"
  statusVariant: "success" | "info" | "warning" | "default"
  timestamp: string
  summary: string
  actionTaken: string
}

export interface AiPerformanceMetrics {
  avgResponseTimeMs: number
  avgResponseTimeSec: string
  automationRate: number
  escalationRate: number
  aiResolutionRate: number
  csatScore: number
  csatRating: string
  totalHandled: number
}

export interface PerformanceTrendPoint {
  date: string
  resolutionRate: number
  csatScore: number
  automationRate: number
}

// ----------------------------------------------------
// Mock Data Exports
// ----------------------------------------------------

export const intakeOverviewChannels: IntakeChannelOverview[] = [
  {
    id: "total",
    label: "Total Intakes",
    subtitle: "Across all active touchpoints",
    count: 1284,
    change: "+18.4%",
    trend: "up",
    icon: "BarChart3",
    accentColor: "from-primary/20 to-primary/5",
    detailText: "100% routed & logged",
  },
  {
    id: "voice",
    label: "Calls (AI Voice)",
    subtitle: "Always-on voice copilot",
    count: 412,
    change: "+22.1%",
    trend: "up",
    icon: "PhoneCall",
    accentColor: "from-blue-500/20 to-blue-500/5",
    detailText: "Avg duration 1m 45s",
  },
  {
    id: "chat",
    label: "Website Chat",
    subtitle: "Embedded widget assistant",
    count: 354,
    change: "+14.8%",
    trend: "up",
    icon: "MessageSquare",
    accentColor: "from-emerald-500/20 to-emerald-500/5",
    detailText: "88.4% engagement rate",
  },
  {
    id: "email",
    label: "Emails (AI Parser)",
    subtitle: "Inbound email intake",
    count: 328,
    change: "+11.2%",
    trend: "up",
    icon: "Mail",
    accentColor: "from-violet-500/20 to-violet-500/5",
    detailText: "1.2s parse speed",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Business",
    subtitle: "Direct mobile messaging",
    count: 190,
    change: "+29.5%",
    trend: "up",
    icon: "MessageCircle",
    accentColor: "from-amber-500/20 to-amber-500/5",
    detailText: "94.1% instant reply",
  },
]

export const intakeTrend7Days: IntakeTrendPoint[] = [
  { date: "Mon", voice: 48, email: 38, chat: 42, whatsapp: 20, total: 148 },
  { date: "Tue", voice: 54, email: 44, chat: 46, whatsapp: 24, total: 168 },
  { date: "Wed", voice: 62, email: 48, chat: 52, whatsapp: 28, total: 190 },
  { date: "Thu", voice: 58, email: 50, chat: 54, whatsapp: 30, total: 192 },
  { date: "Fri", voice: 71, email: 54, chat: 60, whatsapp: 34, total: 219 },
  { date: "Sat", voice: 52, email: 42, chat: 45, whatsapp: 22, total: 161 },
  { date: "Sun", voice: 67, email: 52, chat: 55, whatsapp: 32, total: 206 },
]

export const intakeTrend30Days: IntakeTrendPoint[] = [
  { date: "W1", voice: 88, email: 72, chat: 78, whatsapp: 40, total: 278 },
  { date: "W2", voice: 98, email: 80, chat: 86, whatsapp: 46, total: 310 },
  { date: "W3", voice: 110, email: 86, chat: 94, whatsapp: 50, total: 340 },
  { date: "W4", voice: 116, email: 90, chat: 96, whatsapp: 54, total: 356 },
]

export const intakeSourceShareMock: IntakeSourceShare[] = [
  { name: "AI Voice Calls", channel: "voice", count: 412, percentage: 32.1, color: "#3B82F6" },
  { name: "Website Chat", channel: "chat", count: 354, percentage: 27.6, color: "#10B981" },
  { name: "Emails", channel: "email", count: 328, percentage: 25.5, color: "#8B5CF6" },
  { name: "WhatsApp", channel: "whatsapp", count: 190, percentage: 14.8, color: "#F59E0B" },
]

export const intentCategoriesMock: IntentCategory[] = [
  {
    id: "intent-1",
    name: "Appointment Request",
    description: "Customer requested to book, reschedule, or confirm a meeting slot",
    count: 436,
    percentage: 34.0,
    accuracyScore: 98.6,
    primaryAction: "Calendar Sync & Confirmation",
    badgeColor: "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  {
    id: "intent-2",
    name: "New Client Intake",
    description: "Prospect inquiring about services, pricing, or onboarding",
    count: 334,
    percentage: 26.0,
    accuracyScore: 97.4,
    primaryAction: "HubSpot CRM Lead Creation",
    badgeColor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "intent-3",
    name: "Support / Troubleshooting",
    description: "Existing client asking technical or operational support questions",
    count: 231,
    percentage: 18.0,
    accuracyScore: 96.8,
    primaryAction: "Knowledge Base RAG Retrieval",
    badgeColor: "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  },
  {
    id: "intent-4",
    name: "Invoice & Billing",
    description: "Queries regarding invoices, payment receipts, or fee structure",
    count: 154,
    percentage: 12.0,
    accuracyScore: 99.1,
    primaryAction: "Stripe Billing Route",
    badgeColor: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  {
    id: "intent-5",
    name: "Urgent Escalation",
    description: "High priority emergency requiring immediate human specialist handoff",
    count: 77,
    percentage: 6.0,
    accuracyScore: 99.5,
    primaryAction: "AE / On-Call Phone Call Alert",
    badgeColor: "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400",
  },
  {
    id: "intent-6",
    name: "General Inquiry",
    description: "General office hours, location, or unclassified information requests",
    count: 52,
    percentage: 4.0,
    accuracyScore: 95.2,
    primaryAction: "Automated AI Greeting Response",
    badgeColor: "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400",
  },
]

export const recentIntakesMock: RecentIntakeRecord[] = [
  {
    id: "intake-101",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.vance@gmail.com",
    customerPhone: "+1 (312) 555-0198",
    customerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    channel: "chat",
    channelLabel: "Website Chat",
    detectedIntent: "Appointment Request",
    confidenceScore: 98.8,
    status: "Qualified",
    statusVariant: "success",
    timestamp: "3 mins ago",
    summary: "Requested consultation with Dr. Miller for BlueCross PPO verification & scheduling.",
    actionTaken: "Created Salesforce Contact ID #00D800 & booked 3:30 PM slot",
  },
  {
    id: "intake-102",
    customerName: "Marcus Sterling",
    customerEmail: "marcus@sterlingcorp.com",
    customerPhone: "+1 (312) 555-0842",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    channel: "whatsapp",
    channelLabel: "WhatsApp",
    detectedIntent: "New Client Intake",
    confidenceScore: 96.4,
    status: "Urgent Escalation",
    statusVariant: "warning",
    timestamp: "12 mins ago",
    summary: "Corporate contract dispute involving $250k in undelivered software licenses.",
    actionTaken: "Escalated to Senior Partner Sarah Jenkins via phone alert",
  },
  {
    id: "intake-103",
    customerName: "Sophia Lin",
    customerEmail: "sophia.lin@outlook.com",
    customerPhone: "+1 (312) 555-0421",
    customerAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    channel: "voice",
    channelLabel: "Voice Call",
    detectedIntent: "Urgent Escalation",
    confidenceScore: 99.2,
    status: "Scheduled",
    statusVariant: "info",
    timestamp: "24 mins ago",
    summary: "Emergency molar fracture with acute pain. Requested immediate same-day slot.",
    actionTaken: "Reserved 11:15 AM emergency slot with Dr. Aris & sent SMS confirmation",
  },
  {
    id: "intake-104",
    customerName: "David Miller",
    customerEmail: "david@millerwealth.io",
    customerPhone: "+1 (312) 555-0912",
    customerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    channel: "email",
    channelLabel: "Email Intake",
    detectedIntent: "New Client Intake",
    confidenceScore: 97.5,
    status: "Qualified",
    statusVariant: "success",
    timestamp: "45 mins ago",
    summary: "Inquiry regarding estate tax planning for a $3.5M wealth management portfolio.",
    actionTaken: "Assigned HNW Deal to Principal Advisor Robert Sterling in HubSpot",
  },
  {
    id: "intake-105",
    customerName: "Claire Dupont",
    customerEmail: "c.dupont@innovate.co",
    customerPhone: "+1 (312) 555-0371",
    customerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    channel: "chat",
    channelLabel: "Website Chat",
    detectedIntent: "Invoice & Billing",
    confidenceScore: 99.1,
    status: "Auto-Resolved",
    statusVariant: "default",
    timestamp: "1 hour ago",
    summary: "Requested Q2 billing statement and PDF receipt for tax reporting.",
    actionTaken: "AI RAG fetched Stripe invoice link & dispatched receipt via chat",
  },
  {
    id: "intake-106",
    customerName: "Jonathan Hayes",
    customerEmail: "jhayes@techlink.net",
    customerPhone: "+1 (312) 555-0773",
    customerAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    channel: "voice",
    channelLabel: "Voice Call",
    detectedIntent: "Support / Troubleshooting",
    confidenceScore: 96.8,
    status: "Auto-Resolved",
    statusVariant: "default",
    timestamp: "2 hours ago",
    summary: "Inquired about portal login procedures and multi-factor authentication reset.",
    actionTaken: "AI Voice copilot recited MFA reset protocol & texted guide link",
  },
]

export const aiPerformanceMetricsMock: AiPerformanceMetrics = {
  avgResponseTimeMs: 1420,
  avgResponseTimeSec: "1.4s",
  automationRate: 84.2,
  escalationRate: 12.5,
  aiResolutionRate: 87.5,
  csatScore: 4.9,
  csatRating: "98.2% Positive",
  totalHandled: 1284,
}

export const performanceTrendMock: PerformanceTrendPoint[] = [
  { date: "Mon", resolutionRate: 84.5, csatScore: 4.7, automationRate: 81.2 },
  { date: "Tue", resolutionRate: 85.8, csatScore: 4.8, automationRate: 82.5 },
  { date: "Wed", resolutionRate: 86.4, csatScore: 4.8, automationRate: 83.1 },
  { date: "Thu", resolutionRate: 87.0, csatScore: 4.9, automationRate: 84.0 },
  { date: "Fri", resolutionRate: 88.2, csatScore: 4.9, automationRate: 85.1 },
  { date: "Sat", resolutionRate: 87.1, csatScore: 4.9, automationRate: 84.3 },
  { date: "Sun", resolutionRate: 87.5, csatScore: 4.9, automationRate: 84.2 },
]
