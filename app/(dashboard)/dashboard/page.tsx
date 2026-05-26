import { Users, TrendingUp, CalendarCheck, Coins } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { createAdminClient } from "@/lib/supabase/server";

export const revalidate = 0;

const SolIcon = ({ className }: { className?: string }) => (
  <span className={`font-bold font-display text-xl flex items-center justify-center ${className}`}>S/</span>
);

export default async function DashboardPage() {
  const supabase = await createAdminClient();

  // Fetch leads for metrics and recent table
  const { data: leadsData } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const leads = leadsData || [];

  // Calculate Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === "Nuevo").length;
  const wonLeads = leads.filter(l => l.status === "Ganado").length;
  const conversionRate = totalLeads > 0 ? Math.round((wonLeads / totalLeads) * 100) : 0;

  const recentLeads = leads.slice(0, 5); // top 5 recent

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold font-display text-foreground">Hola, Administrador 👋</h1>
        <p className="text-muted-foreground mt-1">Aquí está el resumen de tu negocio de coctelería.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Leads Totales"
          value={totalLeads.toString()}
          description="registrados en el sistema"
          icon={Users}
          trend="up"
          trendValue={`${newLeads} nuevos`}
        />
        <MetricCard 
          title="Tasa de Conversión"
          value={`${conversionRate}%`}
          description="leads ganados / totales"
          icon={TrendingUp}
          trend="neutral"
        />
        <MetricCard 
          title="Eventos Cerrados"
          value={wonLeads.toString()}
          description="pendientes por realizar"
          icon={CalendarCheck}
          trend="neutral"
        />
        <MetricCard 
          title="Cotizaciones Abiertas"
          value={leads.filter(l => l.status === "Cotizado").length.toString()}
          description="esperando respuesta"
          icon={SolIcon}
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leads Recientes */}
        <div className="lg:col-span-2 card p-0 overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border)] flex justify-between items-center">
            <h2 className="text-xl font-bold font-display">Leads Recientes</h2>
            <a href="/leads" className="text-sm text-[var(--color-gold)] hover:underline">Ver todos</a>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Evento</th>
                  <th>Distrito</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-muted-foreground">
                      No hay leads recientes.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td className="font-medium text-foreground">{lead.name}</td>
                      <td>{lead.event_type} <span className="text-muted-foreground text-xs block">{new Date(lead.created_at).toLocaleDateString()}</span></td>
                      <td className="text-muted-foreground">{lead.location || "N/A"}</td>
                      <td>
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          lead.status === 'Nuevo' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' : 
                          lead.status === 'Cotizado' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                          lead.status === 'Contactado' ? 'bg-purple-500/10 text-purple-500 border border-purple-500/20' : 
                          lead.status === 'Ganado' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                          'bg-red-500/10 text-red-500 border border-red-500/20'
                        }`}>
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Próximos Posts */}
        <div className="card">
          <h2 className="text-xl font-bold font-display mb-6">Contenido Programado</h2>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-[var(--color-surface-lighter)] border border-[var(--color-border-light)]">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-[#60A5FA] uppercase">Instagram</span>
                <span className="text-xs text-muted-foreground">Hoy, 18:00</span>
              </div>
              <p className="text-sm line-clamp-2 text-foreground">
                "Preparando nuestra famosa barra libre para una boda inolvidable en La Molina..."
              </p>
            </div>
            
            <a href="/posts/new" className="btn-secondary w-full justify-center mt-4 text-sm py-2">
              Programar Nuevo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
