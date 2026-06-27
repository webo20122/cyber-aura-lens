import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus, Server, Globe, Box, Cloud, GitBranch } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader, SeverityChip } from "@/components/cyber/PageHeader";
import { assets } from "@/lib/mock/data";

export const Route = createFileRoute("/assets")({
  head: () => ({ meta: [{ title: "Assets — AetherSec" }] }),
  component: AssetsPage,
});

const typeIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  host: Server, domain: Globe, container: Box, cloud: Cloud, repo: GitBranch,
};

function AssetsPage() {
  const [q, setQ] = useState("");
  const [envFilter, setEnvFilter] = useState<string>("all");
  const list = assets.filter((a) => (envFilter === "all" || a.env === envFilter) && a.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          crumb={["workspace", "atlas-ops", "assets"]}
          title="Asset Inventory"
          subtitle={`${assets.length} discovered · ${assets.filter((a) => a.exposure === "internet").length} internet-exposed`}
          actions={
            <button className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-primary text-primary-foreground glow-cyan hover:brightness-110">
              <Plus className="w-3.5 h-3.5" /> Add target
            </button>
          }
        />

        <div className="cyber-card overflow-hidden">
          <div className="p-3 border-b border-white/[0.06] flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="name, ip, domain…"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-md pl-9 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:border-primary/40"
              />
            </div>
            <div className="flex items-center gap-1">
              {["all", "prod", "stage", "dev"].map((e) => (
                <button
                  key={e}
                  onClick={() => setEnvFilter(e)}
                  className={`px-2 py-1 text-[10px] font-mono uppercase rounded border transition ${
                    envFilter === e ? "border-primary/40 text-primary bg-primary/10" : "border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[640px]">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-white/[0.06]">
                <tr className="text-left">
                  <th className="px-4 py-2 font-normal">Asset</th>
                  <th className="px-4 py-2 font-normal">Type</th>
                  <th className="px-4 py-2 font-normal">Env</th>
                  <th className="px-4 py-2 font-normal">Exposure</th>
                  <th className="px-4 py-2 font-normal">Risk</th>
                  <th className="px-4 py-2 font-normal text-right">Findings</th>
                  <th className="px-4 py-2 font-normal text-right">Seen</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {list.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">no assets match.</td></tr>
                )}
                {list.map((a) => {
                  const Icon = typeIcon[a.type] || Server;
                  return (
                    <tr key={a.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition cursor-pointer">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate max-w-[240px]">{a.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-muted-foreground">{a.type}</td>
                      <td className="px-4 py-2.5 text-muted-foreground uppercase">{a.env}</td>
                      <td className="px-4 py-2.5">
                        <span className={`text-[10px] uppercase ${a.exposure === "internet" ? "text-cyber-red" : a.exposure === "internal" ? "text-cyber-yellow" : "text-cyber-green"}`}>
                          {a.exposure}
                        </span>
                      </td>
                      <td className="px-4 py-2.5"><SeverityChip severity={a.risk} /></td>
                      <td className="px-4 py-2.5 text-right text-foreground">{a.findings}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{a.lastSeen}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
