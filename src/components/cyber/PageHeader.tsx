import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  crumb,
  title,
  subtitle,
  actions,
}: {
  crumb: string[];
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 mb-6">
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground mb-1">
          {crumb.map((c, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              <span className={i === crumb.length - 1 ? "text-foreground" : ""}>{c}</span>
            </span>
          ))}
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight truncate">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5 font-mono">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function SeverityChip({ severity, className = "" }: { severity: string; className?: string }) {
  const map: Record<string, string> = {
    Critical: "border-cyber-red/40 text-cyber-red bg-cyber-red/10",
    High: "border-cyber-orange/40 text-cyber-orange bg-cyber-orange/10",
    Medium: "border-cyber-yellow/40 text-cyber-yellow bg-cyber-yellow/10",
    Low: "border-primary/40 text-primary bg-primary/10",
    Info: "border-secondary/40 text-secondary bg-secondary/10",
  };
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border ${map[severity] || ""} ${className}`}>
      <span className="w-1 h-1 rounded-full bg-current" />
      {severity}
    </span>
  );
}
