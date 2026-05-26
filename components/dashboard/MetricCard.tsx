import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

export function MetricCard({ title, value, description, icon: Icon, trend, trendValue }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-foreground">{value}</h3>
        </div>
        <div className="w-10 h-10 rounded-full bg-[var(--color-surface-lighter)] flex items-center justify-center">
          <Icon className="w-5 h-5 text-[var(--color-gold)]" />
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-4 text-sm">
        {trend && (
          <span 
            className={`font-medium ${
              trend === "up" ? "text-emerald-400" : 
              trend === "down" ? "text-red-400" : "text-muted-foreground"
            }`}
          >
            {trend === "up" && "+"}
            {trend === "down" && "-"}
            {trendValue}
          </span>
        )}
        <span className="text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}
