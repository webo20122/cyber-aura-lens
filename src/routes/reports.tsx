import { createFileRoute } from "@tanstack/react-router";
import { FileText, Download, Eye, Sparkles, Loader } from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader } from "@/components/cyber/PageHeader";
import { reports } from "@/lib/mock/data";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "Reports — AetherSec" }] }),
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          crumb={["workspace", "atlas-ops", "reports"]}
          title="Reports"
          subtitle={`${reports.length} generated · signed evidence packs`}
          actions={
            <button className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-primary text-primary-foreground glow-cyan hover:brightness-110">
              <Sparkles className="w-3.5 h-3.5" /> Generate report
            </button>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {reports.map((r) => (
            <div key={r.id} className="cyber-card cyber-card-interactive p-5 flex flex-col min-w-0">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">// {r.format}</span>
                {r.status === "generating" ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyber-yellow">
                    <Loader className="w-3 h-3 animate-spin" /> generating
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-cyber-green">ready</span>
                )}
              </div>
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-12 rounded bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/30 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{r.title}</div>
                  <div className="text-[11px] font-mono text-muted-foreground mt-0.5 truncate">
                    {r.engagement} · {r.pages || "—"} pages
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground mt-3">generated {r.generated}</div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  disabled={r.status === "generating"}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Eye className="w-3.5 h-3.5" /> View
                </button>
                <button
                  disabled={r.status === "generating"}
                  className="inline-flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
