export type IntegrationId =
  | "hubspot"
  | "gmail"
  | "whatsapp"
  | "voice_agent"
  | "gcal"

export type IntegrationCategory =
  | "CRM & Sales"
  | "Messaging & Chat"
  | "Voice & AI"
  | "Calendar & Email"

export type IntegrationPermission = {
  id: string
  title: string
  description: string
}

export type IntegrationConfigField = {
  key: string
  label: string
  type: "text" | "select" | "textarea" | "toggle"
  options?: string[]
  defaultValue: string
  placeholder?: string
  description?: string
}

export type IntegrationLogEntry = {
  id: string
  timestamp: string
  event: string
  status: 200 | 201 | 400 | 500
  latencyMs: number
  payloadSummary: string
  requestPayload?: string
  responseBody?: string
}

export type IntegrationDefinition = {
  id: IntegrationId
  name: string
  category: IntegrationCategory
  shortDescription: string
  fullDescription: string
  icon: string
  brandColor: string
  accentBg: string
  badgeText: string
  defaultAccount: string
  benefits: string[]
  permissions: IntegrationPermission[]
  configFields: IntegrationConfigField[]
  mockLogs: IntegrationLogEntry[]
}

export const INTEGRATIONS_CATALOG: IntegrationDefinition[] = [
  {
    id: "hubspot",
    name: "HubSpot CRM",
    category: "CRM & Sales",
    shortDescription: "Bi-directional lead sync, CRM pipeline automation, and deal stage tracking.",
    fullDescription: "Seamlessly map inbound AI-qualified leads directly into your HubSpot CRM pipelines, assign sales owners, and automatically record conversation transcripts and activity timeline events.",
    icon: "/icons/hubspot.png",
    brandColor: "#FF7A59",
    accentBg: "rgba(255, 122, 89, 0.1)",
    badgeText: "HubSpot Certified App",
    defaultAccount: "alexandra@aetherhealth-crm.hubspot.com",
    benefits: [
      "Auto-create CRM Contacts & Deals from AI chat sessions",
      "Bi-directional sync of deal stages and lifecycle updates",
      "Custom field mapping for lead score and intake symptoms",
      "Real-time owner assignment and SLA notifications"
    ],
    permissions: [
      { id: "p1", title: "Read & Write Contacts", description: "Access and create contact records in your HubSpot CRM." },
      { id: "p2", title: "Create & Update Deals", description: "Manage pipeline deals, stages, and deal values." },
      { id: "p3", title: "Read User Accounts", description: "Fetch team owner IDs for automated lead assignment." },
      { id: "p4", title: "Publish Timeline Events", description: "Log AI conversation notes and activity history." }
    ],
    configFields: [
      {
        key: "pipeline",
        label: "CRM Pipeline",
        type: "select",
        options: ["Sales Inbound Pipeline", "Service & Support Pipeline", "Enterprise Deals"],
        defaultValue: "Sales Inbound Pipeline",
        description: "Select which HubSpot pipeline newly qualified leads should enter."
      },
      {
        key: "leadOwner",
        label: "Default Lead Owner",
        type: "select",
        options: ["Alexandra (Workspace Owner)", "Dr. Robert Miller (AI Admin)", "Sarah Jenkins (Operations)", "Auto-Assign Round Robin"],
        defaultValue: "Alexandra (Workspace Owner)",
        description: "Team member who will be assigned ownership of inbound leads."
      },
      {
        key: "syncFrequency",
        label: "Sync Frequency",
        type: "select",
        options: ["Real-time (Instant)", "Every 15 Minutes", "Hourly Batch"],
        defaultValue: "Real-time (Instant)"
      },
      {
        key: "defaultStage",
        label: "Default Deal Stage",
        type: "select",
        options: ["New Qualified Lead", "Initial Contact Made", "Consultation Scheduled", "Proposal Sent"],
        defaultValue: "New Qualified Lead"
      }
    ],
    mockLogs: [
      {
        id: "log-hs-1",
        timestamp: "2 mins ago",
        event: "POST /crm/v3/objects/contacts",
        status: 201,
        latencyMs: 184,
        payloadSummary: "Created Contact 'Eleanor Vance' (ID: hs_984102)",
        requestPayload: '{\n  "properties": {\n    "firstname": "Eleanor",\n    "lastname": "Vance",\n    "email": "eleanor.vance@gmail.com",\n    "lifecyclestage": "lead",\n    "antelier_score": "98"\n  }\n}',
        responseBody: '{\n  "id": "hs_984102",\n  "status": "created",\n  "createdAt": "2026-07-24T18:28:10.000Z"\n}'
      },
      {
        id: "log-hs-2",
        timestamp: "18 mins ago",
        event: "POST /crm/v3/objects/deals",
        status: 200,
        latencyMs: 210,
        payloadSummary: "Created Deal 'Aether Health Consult - $4,500'",
        requestPayload: '{\n  "properties": {\n    "dealname": "Aether Health Consult - Eleanor Vance",\n    "amount": "4500",\n    "pipeline": "default",\n    "dealstage": "appointmentscheduled"\n  }\n}',
        responseBody: '{\n  "id": "deal_55109",\n  "status": "success"\n}'
      }
    ]
  },
  {
    id: "gmail",
    name: "Gmail / Google Workspace",
    category: "Calendar & Email",
    shortDescription: "Automated email ingestion, AI reply drafting, and transactional messaging.",
    fullDescription: "Connect your enterprise Google Workspace email account to automatically parse incoming intake inquiries, generate contextual AI email drafts, and trigger follow-up sequences.",
    icon: "/icons/gmail.png",
    brandColor: "#EA4335",
    accentBg: "rgba(234, 67, 53, 0.1)",
    badgeText: "Google Verified",
    defaultAccount: "alexandra@antelier.io",
    benefits: [
      "Parse inbound email inquiries into structured workspace leads",
      "Send automated transactional email confirmations with custom signatures",
      "Draft AI intelligent responses for agent review",
      "Thread conversation histories under unified inbox view"
    ],
    permissions: [
      { id: "p1", title: "Send Email on Your Behalf", description: "Send outbound confirmation and triage emails." },
      { id: "p2", title: "Read Inbound Messages", description: "Scan incoming emails matching designated intake labels." },
      { id: "p3", title: "Manage Email Labels", description: "Apply 'Antelier-Qualified' labels to organized emails." }
    ],
    configFields: [
      {
        key: "senderEmail",
        label: "Sender Email Address",
        type: "text",
        defaultValue: "alexandra@antelier.io",
        placeholder: "intake@yourcompany.com",
        description: "The primary email address used to send AI automated replies."
      },
      {
        key: "signature",
        label: "Email Signature Footer",
        type: "textarea",
        defaultValue: "Best regards,\nAntelier AI Patient Concierge | Aether Health Systems",
        description: "Appended to all outgoing automated email responses."
      },
      {
        key: "replyAddress",
        label: "Reply-To Address",
        type: "text",
        defaultValue: "support@aetherhealth.org",
        description: "Where customer replies will be routed if they respond directly."
      }
    ],
    mockLogs: [
      {
        id: "log-gm-1",
        timestamp: "5 mins ago",
        event: "POST /gmail/v1/users/me/messages/send",
        status: 200,
        latencyMs: 142,
        payloadSummary: "Sent confirmation email to 'eleanor.vance@gmail.com'",
        requestPayload: '{\n  "to": "eleanor.vance@gmail.com",\n  "subject": "Consultation Confirmation - Aether Health",\n  "threadId": "1894a8c1"\n}',
        responseBody: '{\n  "id": "msg_992140",\n  "threadId": "1894a8c1",\n  "labelIds": ["SENT"]\n}'
      }
    ]
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    category: "Messaging & Chat",
    shortDescription: "Official WhatsApp Business API integration for multi-channel intake & instant alerts.",
    fullDescription: "Engage clients directly on WhatsApp with AI conversational agents, send instant appointment reminders, and handle 24/7 client inquiries with high open rates.",
    icon: "/icons/whatsapp.png",
    brandColor: "#25D366",
    accentBg: "rgba(37, 211, 102, 0.1)",
    badgeText: "Meta Official API",
    defaultAccount: "+1 (312) 555-0198 (Verified Business)",
    benefits: [
      "24/7 automated chat intake over WhatsApp Business Messaging",
      "Approved HSM template messaging for appointment reminders",
      "Rich media support (PDF intake documents, image attachments)",
      "Instant seamless handoff to human agents"
    ],
    permissions: [
      { id: "p1", title: "Read & Send WhatsApp Messages", description: "Receive customer messages and send automated replies." },
      { id: "p2", title: "Manage Message Templates", description: "Access pre-approved Meta message templates for notification." },
      { id: "p3", title: "Read Business Profile", description: "Sync business details and phone number metadata." }
    ],
    configFields: [
      {
        key: "businessNumber",
        label: "Verified Business Phone Number",
        type: "text",
        defaultValue: "+1 (312) 555-0198",
        description: "Official WhatsApp Cloud API registered number."
      },
      {
        key: "defaultTemplate",
        label: "Default Greeting Template",
        type: "select",
        options: ["Instant Intake & Triage (English)", "Appointment Booking Confirmation", "Emergency Escalation Welcome"],
        defaultValue: "Instant Intake & Triage (English)"
      },
      {
        key: "autoReply",
        label: "Auto-Reply Status",
        type: "select",
        options: ["Enabled 24/7", "Enabled After Hours Only", "Disabled (Manual Only)"],
        defaultValue: "Enabled 24/7"
      }
    ],
    mockLogs: [
      {
        id: "log-wa-1",
        timestamp: "12 mins ago",
        event: "POST /v18.0/phone_number_id/messages",
        status: 200,
        latencyMs: 198,
        payloadSummary: "Dispatched HSM Template 'appointment_reminder' to +13125550842",
        requestPayload: '{\n  "messaging_product": "whatsapp",\n  "to": "+13125550842",\n  "type": "template",\n  "template": { "name": "appointment_reminder" }\n}',
        responseBody: '{\n  "messages": [{ "id": "wamid.HBgLMzEyNTU1MDg0Mg==" }]\n}'
      }
    ]
  },
  {
    id: "voice_agent",
    name: "AI Voice Agent",
    category: "Voice & AI",
    shortDescription: "Ultra-low latency conversational AI voice intake for phone calls & telephony.",
    fullDescription: "Deploy human-sounding AI voice agents to handle inbound phone calls, conduct patient triage, schedule appointments over phone, and stream structured call summaries.",
    icon: "/icons/twilio.png",
    brandColor: "#7C3AED",
    accentBg: "rgba(124, 58, 237, 0.1)",
    badgeText: "Voice Telephony AI",
    defaultAccount: "Vapi / ElevenLabs Account (us-east-1)",
    benefits: [
      "Sub-400ms conversational voice latency with realistic intonation",
      "Inbound phone answering & outbound voice booking calls",
      "Automatic call recording, transcription, and sentiment scoring",
      "Direct PSTN phone number provisioning and SIP trunking"
    ],
    permissions: [
      { id: "p1", title: "Inbound & Outbound Call Routing", description: "Answer phone calls and place automated confirmation calls." },
      { id: "p2", title: "Speech Synthesis & Transcription", description: "Transcribe spoken audio in real-time and stream synthesized audio." },
      { id: "p3", title: "SIP Trunking Access", description: "Connect to your existing PBX or telephony gateway." }
    ],
    configFields: [
      {
        key: "voiceModel",
        label: "AI Voice Model Engine",
        type: "select",
        options: ["Antelier Turbo Voice v2.5", "ElevenLabs Multilingual v2", "Deepgram Nova-2 + Vapi"],
        defaultValue: "Antelier Turbo Voice v2.5"
      },
      {
        key: "voicePersona",
        label: "Voice Persona Profile",
        type: "select",
        options: ["Ava - Warm & Professional (Female)", "Rachel - Executive & Direct (Female)", "Adam - Calm & Reassuring (Male)"],
        defaultValue: "Ava - Warm & Professional (Female)"
      },
      {
        key: "language",
        label: "Primary Language",
        type: "select",
        options: ["English (US)", "Spanish (US)", "French (CA)", "Bilingual (Auto Detect)"],
        defaultValue: "English (US)"
      },
      {
        key: "greeting",
        label: "Call Opening Greeting Prompt",
        type: "textarea",
        defaultValue: "Hello! Thank you for calling Aether Health Systems. I'm Ava, your virtual intake assistant. How can I help you today?",
        description: "Initial sentence spoken by the voice agent when answering the call."
      }
    ],
    mockLogs: [
      {
        id: "log-va-1",
        timestamp: "30 mins ago",
        event: "POST /v1/voice/call-session",
        status: 200,
        latencyMs: 310,
        payloadSummary: "Inbound Call Connected (+1 312 555 0421) - Duration 2m 14s",
        requestPayload: '{\n  "call_id": "call_88192a",\n  "direction": "inbound",\n  "from": "+13125550421",\n  "voice": "Ava-Turbo"\n}',
        responseBody: '{\n  "status": "completed",\n  "transcription_summary": "Patient requested emergency appointment for molar toothache.",\n  "duration_seconds": 134\n}'
      }
    ]
  },
  {
    id: "gcal",
    name: "Google Calendar",
    category: "Calendar & Email",
    shortDescription: "Live calendar availability lookup, slot booking, and automated event invites.",
    fullDescription: "Connect your team's Google Calendars to enable real-time slot checking, prevent double-booking, and send instant calendar invitations with Google Meet video links.",
    icon: "/icons/google-calendar.png",
    brandColor: "#4285F4",
    accentBg: "rgba(66, 133, 244, 0.1)",
    badgeText: "Google Workspace App",
    defaultAccount: "scheduling@aetherhealth.org",
    benefits: [
      "Real-time 2-way calendar sync for staff availability",
      "Automated event creation with Google Meet / Zoom links",
      "Custom buffer times between consecutive appointments",
      "Timezone detection and automatic slot conversion"
    ],
    permissions: [
      { id: "p1", title: "Read Calendar Free/Busy Slots", description: "Check availability to present booking windows." },
      { id: "p2", title: "Create & Modify Calendar Events", description: "Book appointments and send calendar invites." }
    ],
    configFields: [
      {
        key: "calendarSelection",
        label: "Target Calendar",
        type: "select",
        options: ["Primary Clinical Calendar", "Dr. Miller Consultations", "Emergency Triage Slots"],
        defaultValue: "Primary Clinical Calendar"
      },
      {
        key: "bookingDuration",
        label: "Default Consultation Duration",
        type: "select",
        options: ["15 Minutes", "30 Minutes", "45 Minutes", "60 Minutes"],
        defaultValue: "30 Minutes"
      },
      {
        key: "timezone",
        label: "Primary Timezone",
        type: "select",
        options: ["America/Chicago (CST)", "America/New_York (EST)", "America/Los_Angeles (PST)", "Europe/London (GMT)"],
        defaultValue: "America/Chicago (CST)"
      }
    ],
    mockLogs: [
      {
        id: "log-gc-1",
        timestamp: "45 mins ago",
        event: "POST /calendar/v3/calendars/primary/events",
        status: 200,
        latencyMs: 165,
        payloadSummary: "Created Event 'Dr. Miller Consult - Eleanor Vance'",
        requestPayload: '{\n  "summary": "Specialist Intake - Dr. Miller",\n  "start": { "dateTime": "2026-07-24T15:30:00-05:00" },\n  "end": { "dateTime": "2026-07-24T16:00:00-05:00" }\n}',
        responseBody: '{\n  "id": "evt_99182a",\n  "htmlLink": "https://calendar.google.com/calendar/event?eid=..."\n}'
      }
    ]
  }
]
