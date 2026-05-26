import { Search, Filter, MessageSquare, Edit } from "lucide-react";
import { LeadStatusBadge } from "@/components/dashboard/LeadStatusBadge";
import { createAdminClient } from "@/lib/supabase/server";
import { LeadsHeader } from "./LeadsHeader";
import Link from "next/link";

export const revalidate = 0; // Disable cache to always show latest leads

export default async function LeadsPage() {
  const supabase = await createAdminClient();
  
  // Fetch leads
  const { data: leadsData } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = leadsData || [];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <LeadsHeader />

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, teléfono o distrito..." 
            className="form-input pl-10 py-2.5"
          />
        </div>
        <div className="flex gap-2">
          <select className="form-select py-2.5 w-[160px] text-sm">
            <option value="">Estado: Todos</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Contactado">Contactado</option>
            <option value="Cotizado">Cotizado</option>
            <option value="Ganado">Ganado</option>
            <option value="Perdido">Perdido</option>
          </select>
          <button className="btn-secondary py-2.5 px-4 text-sm flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="card p-0 overflow-x-auto">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Contacto</th>
              <th>Detalles del Evento</th>
              <th>Origen</th>
              <th>Estado</th>
              <th className="text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-muted-foreground">
                  No hay leads registrados aún.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td>
                    <Link href={`/leads/${lead.id}`} className="font-medium text-foreground hover:text-[var(--color-gold)] transition-colors block">
                      {lead.name}
                    </Link>
                    <div className="text-xs text-muted-foreground mt-0.5">{lead.location || "Ubicación no especificada"}</div>
                  </td>
                  <td>
                    <a href={`https://wa.me/${(lead.phone || "").replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer" className="text-sm text-[var(--color-info)] hover:underline flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {lead.phone}
                    </a>
                  </td>
                  <td>
                    <div className="text-sm uppercase text-xs text-[var(--color-gold-light)] font-medium">{lead.event_type}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{lead.guests_count} inv. • {lead.event_date ? new Date(lead.event_date).toLocaleDateString() : "Fecha sin definir"}</div>
                  </td>
                  <td>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded bg-[var(--color-surface-lighter)]">
                      {lead.source}
                    </span>
                  </td>
                  <td>
                    <LeadStatusBadge status={lead.status as any} />
                  </td>
                  <td className="text-right">
                    <Link href={`/leads/${lead.id}`} className="p-2 text-muted-foreground hover:text-[var(--color-gold)] transition-colors rounded-full hover:bg-[var(--color-surface-lighter)] inline-block">
                      <Edit className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Paginación */}
      <div className="flex justify-between items-center text-sm text-muted-foreground pt-4">
        <span>Mostrando {leads.length} leads</span>
      </div>
    </div>
  );
}

