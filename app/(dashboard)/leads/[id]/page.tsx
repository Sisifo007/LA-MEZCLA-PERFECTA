import { createAdminClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  Sparkles, 
  FileText,
  User
} from "lucide-react";
import { StatusSelector } from "./StatusSelector";
import { NoteForm } from "./NoteForm";
import { EVENT_TYPE_LABELS, LEAD_SOURCE_LABELS, EventType, LeadSource } from "@/app/types";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

export const revalidate = 0; // Disable caching

export default async function LeadDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  const supabase = await createAdminClient();

  // Fetch lead data
  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .single();

  if (leadError || !lead) {
    return notFound();
  }

  // Fetch interactions history
  const { data: interactionsData } = await supabase
    .from("interactions")
    .select("*")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  const interactions = interactionsData || [];

  const cleanPhone = (lead.phone || "").replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  // Format type & source labels safely
  const eventLabel = EVENT_TYPE_LABELS[lead.event_type as EventType] || lead.event_type || "Por definir";
  const sourceLabel = LEAD_SOURCE_LABELS[lead.source as LeadSource] || lead.source || "Landing Page";

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Navigation */}
      <div className="flex items-center gap-4">
        <Link 
          href="/leads" 
          className="p-2 hover:bg-[var(--color-surface)] rounded-full transition-colors border border-[var(--color-border)] bg-[var(--color-surface)]"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <span className="text-xs uppercase tracking-wider text-[var(--color-gold)] font-medium">Detalle del Lead (CRM)</span>
          <h1 className="text-3xl font-bold font-display text-foreground mt-0.5">{lead.name}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Lead Information & Interaction History */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Card: Core Details */}
          <div className="card space-y-6 relative overflow-hidden">
            {/* Ambient luxury accent background */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gold)] opacity-[0.02] rounded-full blur-2xl" />
            
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-4">
              <Sparkles className="w-4 h-4 text-[var(--color-gold)]" />
              <h2 className="text-lg font-bold font-display text-foreground">Detalles de la Cotización</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border-light)] text-[var(--color-gold)]">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Tipo de Evento</div>
                  <div className="font-medium text-sm text-foreground mt-0.5">{eventLabel}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border-light)] text-[var(--color-gold)]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Fecha del Evento</div>
                  <div className="font-medium text-sm text-foreground mt-0.5">
                    {lead.event_date ? new Date(lead.event_date).toLocaleDateString("es-PE", { dateStyle: "long" }) : "Fecha sin definir"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border-light)] text-[var(--color-gold)]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Número de Invitados</div>
                  <div className="font-medium text-sm text-foreground mt-0.5">
                    {lead.guests_count ? `${lead.guests_count} personas` : "Cantidad no especificada"}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-[var(--color-surface-light)] border border-[var(--color-border-light)] text-[var(--color-gold)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Ubicación / Distrito</div>
                  <div className="font-medium text-sm text-foreground mt-0.5">{lead.location || "No especificada"}</div>
                </div>
              </div>
            </div>

            {lead.message && (
              <div className="bg-[var(--color-surface-light)] border border-[var(--color-border)] p-4 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1.5 font-medium flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[var(--color-gold)]" /> Mensaje / Detalles Adicionales
                </div>
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  "{lead.message}"
                </p>
              </div>
            )}
          </div>

          {/* Timeline: Interactions */}
          <div className="card space-y-6">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
              <h2 className="text-lg font-bold font-display text-foreground">Historial de Interacciones</h2>
              <span className="text-xs text-muted-foreground">{interactions.length} registros</span>
            </div>

            {/* Note creation box */}
            <div className="bg-[var(--color-surface-light)] border border-[var(--color-border-light)] p-5 rounded-xl space-y-4">
              <div className="text-sm font-medium text-foreground">Añadir Nota de Seguimiento</div>
              <NoteForm leadId={lead.id} />
            </div>

            {/* Vertical timeline */}
            <div className="space-y-6 mt-4">
              {interactions.length === 0 ? (
                <div className="text-center py-6 text-sm text-muted-foreground">
                  No hay interacciones registradas para este lead.
                </div>
              ) : (
                <div className="relative border-l border-[var(--color-border-light)] ml-3 pl-6 space-y-6">
                  {interactions.map((interaction) => {
                    const dateFormatted = new Date(interaction.created_at).toLocaleString("es-PE", {
                      dateStyle: "short",
                      timeStyle: "short"
                    });
                    
                    return (
                      <div key={interaction.id} className="relative group">
                        {/* Bullet point indicator */}
                        <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-surface)] border-2 border-[var(--color-gold)] group-hover:scale-110 transition-transform">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold-light)]" />
                        </span>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-gold-light)]">
                            {interaction.type === "whatsapp_auto" ? "WhatsApp Auto" : 
                             interaction.type === "whatsapp_manual" ? "WhatsApp Manual" : 
                             interaction.type === "llamada" ? "Llamada Telefónica" :
                             interaction.type === "nota" ? "Nota Interna" : interaction.type}
                          </span>
                          <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {dateFormatted}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/90 whitespace-pre-wrap pl-1 bg-[var(--color-surface-light)]/30 p-2.5 rounded-md border border-[var(--color-border)]/50">
                          {interaction.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Lead Status & Actions */}
        <div className="space-y-6">
          
          {/* Card: Status control */}
          <div className="card space-y-6 border-[var(--color-gold)]/20 relative">
            <div className="absolute top-0 right-0 w-3 h-3 bg-[var(--color-gold)] rounded-bl-lg" />
            <h3 className="font-bold font-display text-[var(--color-gold)] border-b border-[var(--color-border)] pb-2.5">
              Estado & Canal
            </h3>
            
            <StatusSelector leadId={lead.id} currentStatus={lead.status} />

            <div className="space-y-4 pt-4 border-t border-[var(--color-border)]">
              <div>
                <span className="text-xs text-muted-foreground">Origen del Lead</span>
                <div className="text-sm font-medium mt-0.5">{sourceLabel}</div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Fecha de Creación</span>
                <div className="text-sm font-medium mt-0.5">
                  {new Date(lead.created_at).toLocaleString("es-PE", { dateStyle: "medium", timeStyle: "short" })}
                </div>
              </div>
              {lead.whatsapp_sent && (
                <div className="bg-green-500/5 text-green-400 p-3 rounded-lg border border-green-500/10 text-xs flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>WhatsApp Automático Enviado</span>
                </div>
              )}
            </div>
          </div>

          {/* Card: Quick Contact actions */}
          <div className="card space-y-4">
            <h3 className="font-bold font-display text-foreground">Acciones Rápidas</h3>
            
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 bg-[var(--color-surface-light)] p-3 rounded-lg border border-[var(--color-border)]">
                <Phone className="w-4 h-4 text-[var(--color-gold)]" />
                <div className="text-sm font-medium">{lead.phone}</div>
              </div>

              {lead.email && (
                <div className="flex items-center gap-2 bg-[var(--color-surface-light)] p-3 rounded-lg border border-[var(--color-border)] overflow-hidden">
                  <Mail className="w-4 h-4 text-[var(--color-gold)]" />
                  <div className="text-sm font-medium truncate">{lead.email}</div>
                </div>
              )}

              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary w-full py-3 bg-[#25D366] hover:bg-[#20ba59] border-none text-white hover:shadow-[0_8px_25px_rgba(37,211,102,0.35)] flex items-center justify-center gap-2 rounded-lg font-semibold text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
