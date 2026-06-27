import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity, Bug, Layers, Eye, ArrowUpRight, Zap, Plus, Terminal, Crosshair,
  Radar, ChevronRight, Sparkles,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppShell } from "@/components/cyber/AppShell";
import {
  findings as allFindings, scans, severityBars, severityColor,
  terminalLines, type Severity,
} from "@/lib/mock/data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — AetherSec" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader />
        <KPIRow />
        <div className="mt-4 grid grid-cols-12 gap-4">
          <SeverityPanel />
          <ScansPanel />
          <FindingsPanel />
          <MissionPanel />
        </div>
      </div>
    </AppShell>
  );
}

function PageHeader() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 mb-6">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground mb-1">
          <span>workspace</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">atlas-ops</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">dashboard</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight truncate">
          Good evening, Alex.
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5 font-mono">
          last engagement closed 3h ago · 7 criticals remediated
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link to="/onboarding" className="hidden sm:inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05]">
          <Plus className="w-3.5 h-3.5" /> New target
        </Link>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-primary text-primary-foreground glow-cyan hover:brightness-110">
          <Zap className="w-3.5 h-3.5" /> Launch scan
        </button>
      </div>
    </div>
  );
}

const kpis = [
  { label: "Active scans", value: "12", trend: "+3", icon: Activity, color: "text-primary" },
  { label: "Critical findings", value: "47", trend: "-8", icon: Bug, color: "text-cyber-red" },
  { label: "Assets monitored", value: "1,284", trend: "+24", icon: Layers, color: "text-secondary" },
  { label: "Coverage", value: "94%", trend: "+2%", icon: Eye, color: "text-cyber-green" },
];

function KPIRow() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {kpis.map((k, i) => (
        <motion.div
          key={k.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="cyber-card cyber-card-interactive p-4 min-w-0"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground truncate">{k.label}</span>
            <k.icon className={`w-4 h-4 shrink-0 ${k.color}`} />
          </div>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-semibold font-mono">{k.value}</span>
            <span className="text-[11px] text-cyber-green font-mono mb-1 flex items-center">
              <ArrowUpRight className="w-3 h-3" />{k.trend}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SeverityPanel() {
  const [filter, setFilter] = useState<Severity | "All">("All");
  return (
    <div className="col-span-12 lg:col-span-7 cyber-card p-5 min-w-0">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 mb-5">
        <div className="min-w-0">
          <h3 className="text-sm font-medium">Findings by severity</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">last 30 days · click a bar to filter</p>
        </div>
        {filter !== "All" && (
          <button
            onClick={() => setFilter("All")}
            className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline"
          >
            clear ×
          </button>
        )}
      </div>
      <div className="flex items-end justify-between gap-3 sm:gap-4 h-44 sm:h-52">
        {severityBars.map((b) => {
          const active = filter === b.l;
          return (
            <button
              key={b.l}
              onClick={() => setFilter(active ? "All" : b.l)}
              className="flex-1 flex flex-col items-center gap-2 group min-w-0"
            >
              <div className="w-full flex-1 flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${b.v}%`, opacity: filter === "All" || active ? 1 : 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-full rounded-t-md bg-gradient-to-t ${b.c} group-hover:brightness-125 transition`}
                />
              </div>
              <span className={`text-[10px] font-mono ${active ? severityColor[b.l] : "text-muted-foreground"}`}>
                {b.l}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 text-[10px] font-mono text-muted-foreground">
        showing: <span className="text-primary">{filter}</span> · {filter === "All" ? allFindings.length : allFindings.filter((f) => f.severity === filter).length} findings
      </div>
    </div>
  );
}

function ScansPanel() {
  return (
    <div className="col-span-12 lg:col-span-5 cyber-card p-5 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Active engagements</h3>
        <button className="text-[10px] font-mono uppercase tracking-widest text-primary hover:underline">view all →</button>
      </div>
      <div className="space-y-2.5">
        {scans.slice(0, 5).map((s) => (
          <div key={s.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-xs py-2 border-b border-white/[0.04] last:border-0">
            <div className="min-w-0">
              <div className="font-mono text-foreground truncate">{s.target}</div>
              <div className="font-mono text-[10px] text-muted-foreground">{s.id} · {s.startedAt}</div>
              {s.status === "running" && (
                <div className="mt-1.5 h-0.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.progress}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
              )}
            </div>
            <StatusPill status={s.status} />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    running: "bg-cyber-yellow/10 border-cyber-yellow/30 text-cyber-yellow",
    completed: "bg-cyber-green/10 border-cyber-green/30 text-cyber-green",
    failed: "bg-cyber-red/10 border-cyber-red/30 text-cyber-red",
    pending: "bg-primary/10 border-primary/30 text-primary",
  };
  return (
    <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border shrink-0 ${map[status]}`}>
      {status}
    </span>
  );
}

function FindingsPanel() {
  return (
    <div className="col-span-12 lg:col-span-7 cyber-card p-5 min-w-0 overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Findings list</h3>
        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
          <span className="px-2 py-0.5 rounded border border-white/10">today</span>
          <span>·</span>
          <span className="hover:text-primary cursor-pointer">7d</span>
          <span className="hover:text-primary cursor-pointer">30d</span>
        </div>
      </div>
      <table className="w-full text-xs min-w-[520px]">
        <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
          <tr className="text-left">
            <th className="pb-3 font-normal">CVE</th>
            <th className="pb-3 font-normal">Title</th>
            <th className="pb-3 font-normal">Severity</th>
            <th className="pb-3 font-normal">Asset</th>
            <th className="pb-3 font-normal text-right">Status</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {allFindings.map((f) => (
            <tr key={f.cve} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition cursor-pointer">
              <td className="py-2.5 text-primary whitespace-nowrap">{f.cve}</td>
              <td className="py-2.5 text-foreground/90 max-w-[180px] truncate">{f.title}</td>
              <td className={`py-2.5 ${severityColor[f.severity]}`}>{f.severity}</td>
              <td className="py-2.5 text-muted-foreground truncate max-w-[140px]">{f.asset}</td>
              <td className="py-2.5 text-right text-muted-foreground">{f.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MissionPanel() {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  const launch = () => {
    if (running) return;
    setRunning(true);
    setProgress(0);
    setLines([]);
    let i = 0;
    timer.current = setInterval(() => {
      setLines((prev) => [...prev, terminalLines[i % terminalLines.length]]);
      setProgress((p) => Math.min(100, p + 100 / terminalLines.length));
      i++;
      if (i >= terminalLines.length) {
        if (timer.current) clearInterval(timer.current);
        setRunning(false);
      }
    }, 380);
  };

  return (
    <div className="col-span-12 lg:col-span-5 cyber-card scanline p-5 min-w-0 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-mono uppercase tracking-widest text-primary">// mission control</p>
        <Sparkles className="w-3.5 h-3.5 text-primary" />
      </div>
      <h3 className="text-sm font-medium">Auto Pentest</h3>
      <p className="text-[11px] text-muted-foreground mt-0.5 font-mono">52 modules · cognitive engine v2</p>

      <div className="flex items-center justify-center my-5">
        <button
          onClick={launch}
          disabled={running}
          className="relative w-28 h-28 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/50 animate-pulse-glow disabled:animate-none transition hover:brightness-125"
        >
          <div className="absolute inset-2 rounded-full border border-primary/30" />
          <div className="absolute inset-5 rounded-full border border-primary/20" />
          <span className="relative font-semibold text-xs flex flex-col items-center">
            <Zap className="w-5 h-5 text-primary mb-1" />
            {running ? "Running…" : "Launch"}
          </span>
        </button>
      </div>

      <div className="w-full mb-3">
        <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
          <span>progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-gradient-to-r from-primary to-secondary"
          />
        </div>
      </div>

      <div className="flex-1 min-h-[140px] max-h-44 overflow-y-auto bg-black/40 rounded-md border border-white/[0.05] p-2.5 font-mono text-[10px] leading-relaxed">
        {lines.length === 0 ? (
          <div className="text-muted-foreground">
            <span className="text-primary">$</span> aether engage --target=10.20.14.0/24
            <br />
            <span className="text-muted-foreground/60">// press Launch to stream the cognitive engine</span>
          </div>
        ) : (
          lines.map((l, i) => (
            <div key={i} className={l.startsWith("[!]") ? "text-cyber-red" : l.startsWith("[+]") ? "text-cyber-green" : "text-muted-foreground"}>
              {l}
            </div>
          ))
        )}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] font-mono">
        <Mini icon={Radar} label="recon" v="42" />
        <Mini icon={Terminal} label="exploit" v="7" />
        <Mini icon={Crosshair} label="paths" v="3" />
      </div>
    </div>
  );
}

function Mini({ icon: Icon, label, v }: { icon: React.ComponentType<{ className?: string }>; label: string; v: string }) {
  return (
    <div className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-2 flex items-center gap-1.5 min-w-0">
      <Icon className="w-3 h-3 text-primary shrink-0" />
      <span className="text-muted-foreground truncate">{label}</span>
      <span className="ml-auto text-foreground">{v}</span>
    </div>
  );
}
