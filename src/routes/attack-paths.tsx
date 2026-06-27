import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crosshair, Sparkles, AlertTriangle } from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader, SeverityChip } from "@/components/cyber/PageHeader";
import { attackPath } from "@/lib/mock/data";

export const Route = createFileRoute("/attack-paths")({
  head: () => ({ meta: [{ title: "Attack Paths — AetherSec" }] }),
  component: AttackPathsPage,
});

// hand-placed coordinates for the canonical chain edge → tier-0
const positions: Record<string, { x: number; y: number }> = {
  n1: { x: 80, y: 200 },
  n2: { x: 240, y: 120 },
  n3: { x: 240, y: 300 },
  n4: { x: 420, y: 320 },
  n5: { x: 440, y: 120 },
  n6: { x: 620, y: 120 },
  n7: { x: 800, y: 200 },
};

const kindIcon: Record<string, string> = {
  edge: "🌐",
  host: "▣",
  service: "◆",
  identity: "◈",
  data: "★",
};

function AttackPathsPage() {
  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          crumb={["workspace", "atlas-ops", "attack paths"]}
          title="Attack Paths"
          subtitle="3 chains reach tier-0 · derived by cognitive engine v2.0.1"
          actions={
            <button className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05]">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Re-derive
            </button>
          }
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 cyber-card scanline p-5 min-w-0 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <Crosshair className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm font-medium">Chain · edge.atlas.io → tier-0 vault</span>
              <SeverityChip severity="Critical" className="ml-auto" />
            </div>

            <svg viewBox="0 0 900 420" className="w-full min-w-[720px] h-[420px]">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M0,0 L10,5 L0,10 z" fill="currentColor" className="text-primary" />
                </marker>
                <linearGradient id="edgeGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="oklch(0.85 0.18 200)" stopOpacity="0.8" />
                  <stop offset="1" stopColor="oklch(0.65 0.25 25)" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {attackPath.edges.map((e, i) => {
                const a = positions[e.from];
                const b = positions[e.to];
                const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
                return (
                  <g key={i}>
                    <motion.line
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ delay: i * 0.18, duration: 0.6 }}
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="url(#edgeGrad)" strokeWidth="1.5"
                      markerEnd="url(#arrow)"
                    />
                    <text x={mid.x} y={mid.y - 6} fontSize="9" textAnchor="middle" className="fill-muted-foreground font-mono">
                      {e.label}
                    </text>
                  </g>
                );
              })}

              {attackPath.nodes.map((n, i) => {
                const p = positions[n.id];
                const color =
                  n.severity === "Critical" ? "fill-cyber-red/20 stroke-cyber-red" :
                  n.severity === "High" ? "fill-cyber-orange/20 stroke-cyber-orange" :
                  "fill-primary/20 stroke-primary";
                return (
                  <motion.g key={n.id} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}>
                    <circle cx={p.x} cy={p.y} r="28" className={`${color}`} strokeWidth="1.5" />
                    <text x={p.x} y={p.y + 4} fontSize="14" textAnchor="middle" className="fill-foreground">{kindIcon[n.kind]}</text>
                    <text x={p.x} y={p.y + 46} fontSize="10" textAnchor="middle" className="fill-foreground font-mono">{n.label}</text>
                    <text x={p.x} y={p.y + 58} fontSize="8" textAnchor="middle" className="fill-muted-foreground font-mono uppercase tracking-wider">{n.kind}</text>
                  </motion.g>
                );
              })}
            </svg>
          </div>

          <div className="col-span-12 lg:col-span-4 cyber-card p-5 min-w-0">
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary">// chain reasoning</div>
            <h3 className="text-sm font-medium mt-1">7 hops · 4 weaponized</h3>

            <div className="mt-4 space-y-2">
              {attackPath.edges.map((e, i) => (
                <div key={i} className="rounded border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[11px] font-mono">
                  <div className="text-foreground">{e.label}</div>
                  <div className="text-muted-foreground text-[10px] mt-0.5">{e.from} → {e.to}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-white/[0.06] pt-4 text-[11px] font-mono text-foreground/80 leading-relaxed">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-cyber-red mb-1.5">
                <AlertTriangle className="w-3 h-3" /> blast radius
              </div>
              compromise of tier-0 vault unlocks 412 AD accounts, 14 S3 buckets, and 3 production databases. estimated dwell-time-to-impact: <span className="text-cyber-red">4 hours</span>.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
