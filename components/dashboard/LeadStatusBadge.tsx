import { cn } from "@/lib/utils";

type LeadStatus = "Nuevo" | "Contactado" | "Cotizado" | "Ganado" | "Perdido";

interface LeadStatusBadgeProps {
  status: LeadStatus;
  className?: string;
}

export function LeadStatusBadge({ status, className }: LeadStatusBadgeProps) {
  const statusConfig = {
    Nuevo: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Contactado: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Cotizado: "bg-[var(--color-gold)]/15 text-[var(--color-gold)] border-[var(--color-gold)]/30",
    Ganado: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    Perdido: "bg-red-500/15 text-red-400 border-red-500/30",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border",
        statusConfig[status],
        className
      )}
    >
      {status}
    </span>
  );
}
