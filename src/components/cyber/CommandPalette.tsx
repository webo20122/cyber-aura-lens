import { useNavigate } from "@tanstack/react-router";
import { Search, ArrowRight, Zap, Bug, Crosshair, Layers, FileText, Settings, Plug, Activity, Users } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { to: "/dashboard", label: "Dashboard", group: "Navigate", icon: Activity },
  { to: "/scans", label: "Scans", group: "Navigate", icon: Zap },
  { to: "/findings", label: "Findings", group: "Navigate", icon: Bug },
  { to: "/attack-paths", label: "Attack Paths", group: "Navigate", icon: Crosshair },
  { to: "/assets", label: "Assets", group: "Navigate", icon: Layers },
  { to: "/reports", label: "Reports", group: "Navigate", icon: FileText },
  { to: "/integrations", label: "Integrations", group: "Navigate", icon: Plug },
  { to: "/team", label: "Team", group: "Navigate", icon: Users },
  { to: "/settings", label: "Settings", group: "Navigate", icon: Settings },
  { to: "/scans", label: "New scan…", group: "Actions", icon: Zap },
  { to: "/onboarding", label: "Run setup wizard", group: "Actions", icon: ArrowRight },
];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const filtered = items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => { if (!open) { setQ(""); setI(0); } }, [open]);
  useEffect(() => { setI(0); }, [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
      if (e.key === "ArrowDown") { e.preventDefault(); setI((v) => Math.min(filtered.length - 1, v + 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setI((v) => Math.max(0, v - 1)); }
      if (e.key === "Enter" && filtered[i]) {
        navigate({ to: filtered[i].to as string });
        onOpenChange(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, i, navigate, onOpenChange]);

  if (!open) return null;

  const groups = Array.from(new Set(filtered.map((f) => f.group)));

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[14vh] px-4 bg-background/80 backdrop-blur-sm" onClick={() => onOpenChange(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="cyber-card w-full max-w-xl overflow-hidden"
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="search or run a command…"
            className="flex-1 bg-transparent text-sm font-mono placeholder:text-muted-foreground/70 focus:outline-none"
          />
          <kbd className="text-[10px] font-mono text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">esc</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <div className="px-4 py-8 text-center text-xs font-mono text-muted-foreground">no matches.</div>
          )}
          {groups.map((g) => (
            <div key={g}>
              <div className="px-4 pt-2 pb-1 text-[10px] uppercase tracking-widest text-muted-foreground">{g}</div>
              {filtered.filter((f) => f.group === g).map((it) => {
                const idx = filtered.indexOf(it);
                const active = idx === i;
                return (
                  <button
                    key={it.label + it.to}
                    onMouseEnter={() => setI(idx)}
                    onClick={() => { navigate({ to: it.to as string }); onOpenChange(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-xs ${active ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-white/[0.03]"}`}
                  >
                    <it.icon className={`w-3.5 h-3.5 ${active ? "text-primary" : ""}`} />
                    <span className="flex-1 text-left font-mono">{it.label}</span>
                    {active && <ArrowRight className="w-3 h-3 text-primary" />}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-white/[0.06] px-4 py-2 text-[10px] font-mono text-muted-foreground">
          <span>↑↓ navigate · ↵ select</span>
          <span>aethersec://palette</span>
        </div>
      </div>
    </div>
  );
}
