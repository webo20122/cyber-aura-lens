import { createFileRoute } from "@tanstack/react-router";
import { Check, Plug, AlertCircle, Plus } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader } from "@/components/cyber/PageHeader";
import { integrations } from "@/lib/mock/data";

export const Route = createFileRoute("/integrations")({
  head: () => ({ meta: [{ title: "Integrations — AetherSec" }] }),
  component: IntegrationsPage,
});

const CATS = ["All", "SIEM", "Ticketing", "Chat", "Code", "Cloud"] as const;

function IntegrationsPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const list = integrations.filter((i) => cat === "All" || i.category === cat);

  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          crumb={["workspace", "atlas-ops", "integrations"]}
          title="Integrations"
          subtitle={`${integrations.filter((i) => i.status === "connected").length} connected · ${integrations.filter((i) => i.status === "error").length} need attention`}
        />

        <div className="flex items-center gap-1 mb-4 overflow-x-auto">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded border transition shrink-0 ${
                cat === c ? "border-primary/40 text-primary bg-primary/10" : "border-white/10 text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((it) => (
            <div key={it.id} className="cyber-card cyber-card-interactive p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{it.category}</span>
                <StatusBadge status={it.status} />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center">
                  <Plug className="w-4 h-4 text-primary" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{it.name}</div>
                  <div className="text-[11px] font-mono text-muted-foreground truncate">{it.detail}</div>
                </div>
              </div>
              <button className={`mt-4 inline-flex items-center justify-center gap-1.5 text-xs px-3 py-2 rounded-md border transition ${
                it.status === "connected" ? "border-white/10 bg-white/[0.02] text-muted-foreground hover:bg-white/[0.05]"
                : it.status === "error" ? "border-cyber-red/40 bg-cyber-red/10 text-cyber-red hover:bg-cyber-red/20"
                : "border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
              }`}>
                {it.status === "connected" ? "Configure" : it.status === "error" ? "Re-authorize" : (<><Plus className="w-3 h-3" /> Connect</>)}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "connected") return <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyber-green"><Check className="w-3 h-3" /> connected</span>;
  if (status === "error") return <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyber-red"><AlertCircle className="w-3 h-3" /> error</span>;
  return <span className="text-[10px] font-mono text-muted-foreground">available</span>;
}
