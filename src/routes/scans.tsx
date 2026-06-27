import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, Search, Filter, Play, Pause, MoreVertical, Terminal, Radar, Crosshair, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader, SeverityChip } from "@/components/cyber/PageHeader";
import { scans, type MockScan } from "@/lib/mock/data";

export const Route = createFileRoute("/scans")({
  head: () => ({ meta: [{ title: "Scans — AetherSec" }] }),
  component: ScansPage,
});

const STATUS = ["all", "running", "completed", "failed", "pending"] as const;

function ScansPage() {
  const [filter, setFilter] = useState<(typeof STATUS)[number]>("all");
  const [selected, setSelected] = useState<MockScan | null>(scans[0]);
  const [q, setQ] = useState("");
  const list = scans.filter((s) => (filter === "all" || s.status === filter) && s.target.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          crumb={["workspace", "atlas-ops", "scans"]}
          title="Scans"
          subtitle={`${scans.length} engagements · ${scans.filter((s) => s.status === "running").length} active · cognitive engine v2.0.1`}
          actions={
            <>
              <button className="hidden sm:inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05]">
                <Filter className="w-3.5 h-3.5" /> Filters
              </button>
              <Link to="/onboarding" className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-primary text-primary-foreground glow-cyan hover:brightness-110">
                <Plus className="w-3.5 h-3.5" /> New scan
              </Link>
            </>
          }
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7 cyber-card p-0 min-w-0 overflow-hidden">
            <div className="flex items-center gap-3 p-3 border-b border-white/[0.06]">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="target, id…"
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-md pl-9 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:border-primary/40"
                />
              </div>
              <div className="hidden sm:flex items-center gap-1">
                {STATUS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={`px-2 py-1 text-[10px] font-mono uppercase rounded border transition ${
                      filter === s ? "border-primary/40 text-primary bg-primary/10" : "border-white/10 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-white/[0.04]">
              {list.length === 0 && (
                <div className="px-4 py-16 text-center text-xs font-mono text-muted-foreground">
                  no scans match this filter.
                </div>
              )}
              {list.map((s, i) => {
                const active = selected?.id === s.id;
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    onClick={() => setSelected(s)}
                    className={`w-full text-left p-4 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 items-center transition ${
                      active ? "bg-primary/[0.06]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <StatusDot status={s.status} />
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-foreground truncate">{s.target}</div>
                      <div className="font-mono text-[10px] text-muted-foreground flex items-center gap-2 mt-0.5">
                        <span>{s.id}</span>
                        <span>·</span>
                        <span>{s.profile} · {s.modules} mods</span>
                        <span>·</span>
                        <span>{s.startedAt}</span>
                      </div>
                      {s.status === "running" && (
                        <div className="mt-2 h-0.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${s.progress}%` }} transition={{ duration: 1 }} className="h-full bg-gradient-to-r from-primary to-secondary" />
                        </div>
                      )}
                    </div>
                    <SeverityChip severity={s.severity} />
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 cyber-card p-5 min-w-0">
            {selected ? <ScanDetail scan={selected} /> : <div className="text-xs font-mono text-muted-foreground">select a scan.</div>}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function StatusDot({ status }: { status: string }) {
  const map: Record<string, string> = {
    running: "bg-cyber-yellow animate-pulse",
    completed: "bg-cyber-green",
    failed: "bg-cyber-red",
    pending: "bg-primary",
  };
  return <span className={`w-2 h-2 rounded-full shrink-0 ${map[status]}`} />;
}

function ScanDetail({ scan }: { scan: MockScan }) {
  const lines = [
    `[+] target=${scan.target}`,
    `[+] profile=${scan.profile} modules=${scan.modules}`,
    `[*] phase=recon module=nmap hosts=42`,
    `[*] phase=recon module=httpx web=18`,
    `[!] CVE-2024-21893 confirmed`,
    `[+] foothold established`,
    `[*] phase=lateral cred=NTLM/relay`,
    `[+] mission ${scan.status === "completed" ? "complete" : "in-progress"}`,
  ];
  return (
    <div className="flex flex-col gap-4 min-h-[420px]">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-widest text-primary">// engagement</div>
          <div className="font-mono text-sm font-medium truncate">{scan.target}</div>
          <div className="font-mono text-[10px] text-muted-foreground mt-0.5">{scan.id} · operator: {scan.operator}</div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded border border-white/10 text-muted-foreground hover:text-foreground"><Play className="w-3 h-3" /></button>
          <button className="p-1.5 rounded border border-white/10 text-muted-foreground hover:text-foreground"><Pause className="w-3 h-3" /></button>
          <button className="p-1.5 rounded border border-white/10 text-muted-foreground hover:text-foreground"><MoreVertical className="w-3 h-3" /></button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
        <Stat icon={Radar} label="recon" value="42" />
        <Stat icon={Terminal} label="exploit" value="7" />
        <Stat icon={Crosshair} label="paths" value="3" />
      </div>

      <div>
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
          <span>progress</span>
          <span>{scan.progress}%</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div animate={{ width: `${scan.progress}%` }} className="h-full bg-gradient-to-r from-primary to-secondary" />
        </div>
      </div>

      <div className="flex-1 bg-black/40 rounded-md border border-white/[0.05] p-3 font-mono text-[10px] leading-relaxed overflow-y-auto">
        {lines.map((l, i) => (
          <div key={i} className={l.startsWith("[!]") ? "text-cyber-red" : l.startsWith("[+]") ? "text-cyber-green" : "text-muted-foreground"}>{l}</div>
        ))}
      </div>

      <Link to="/attack-paths" className="flex items-center justify-between text-xs px-3 py-2 rounded-md border border-white/10 hover:border-primary/40 hover:bg-primary/[0.04]">
        <span className="font-mono text-muted-foreground">view derived attack path</span>
        <ChevronRight className="w-3.5 h-3.5 text-primary" />
      </Link>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-2 flex items-center gap-1.5 min-w-0">
      <Icon className="w-3 h-3 text-primary shrink-0" />
      <span className="text-muted-foreground truncate">{label}</span>
      <span className="ml-auto text-foreground">{value}</span>
    </div>
  );
}
{ void Zap }
