// ==========================================
// COCTELERÍA PRO — Shared Types
// ==========================================

export type LeadSource =
  | "landing_page"
  | "facebook_lead_ad"
  | "instagram_dm"
  | "whatsapp"
  | "manual"
  | "referido";

export type LeadStatus =
  | "nuevo"
  | "contactado"
  | "cotizado"
  | "cerrado_ganado"
  | "cerrado_perdido";

export type EventType =
  | "boda"
  | "corporativo"
  | "fiesta_privada"
  | "reunion"
  | "xv_anos"
  | "baby_shower"
  | "graduacion"
  | "otro";

export interface Lead {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email?: string;
  event_type: EventType;
  event_date?: string;
  guests_count?: number;
  message?: string;
  source: LeadSource;
  status: LeadStatus;
  notes?: string;
  whatsapp_sent: boolean;
  whatsapp_sent_at?: string;
}

export interface Interaction {
  id: string;
  created_at: string;
  lead_id: string;
  type:
    | "whatsapp_auto"
    | "whatsapp_manual"
    | "llamada"
    | "email"
    | "nota"
    | "cotizacion";
  content: string;
  direction: "entrante" | "saliente";
}

export type PostPlatform = "facebook" | "instagram";

export type PostStatus = "draft" | "scheduled" | "published" | "failed";

export interface Post {
  id: string;
  created_at: string;
  content: string;
  media_url?: string;
  platforms: PostPlatform[];
  scheduled_at?: string;
  published_at?: string;
  status: PostStatus;
  meta_post_id?: string;
}

export interface DashboardMetrics {
  total_leads: number;
  leads_today: number;
  leads_this_week: number;
  leads_this_month: number;
  conversion_rate: number;
  events_closed: number;
  pending_quotes: number;
  posts_scheduled: number;
}

export interface LeadFormData {
  name: string;
  phone: string;
  email?: string;
  event_type: EventType;
  event_date?: string;
  guests_count?: number;
  message?: string;
}

// Event type labels for display
export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  boda: "Boda",
  corporativo: "Evento Corporativo",
  fiesta_privada: "Fiesta Privada",
  reunion: "Reunión",
  xv_anos: "XV Años",
  baby_shower: "Baby Shower",
  graduacion: "Graduación",
  otro: "Otro",
};

// Lead status labels for display
export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  cotizado: "Cotizado",
  cerrado_ganado: "Cerrado ✓",
  cerrado_perdido: "Perdido",
};

// Lead source labels for display
export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  landing_page: "Landing Page",
  facebook_lead_ad: "Facebook Lead Ad",
  instagram_dm: "Instagram DM",
  whatsapp: "WhatsApp",
  manual: "Manual",
  referido: "Referido",
};
