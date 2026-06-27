import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Download, ExternalLink, Shield, AlertTriangle, Bug, Sparkles } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader, SeverityChip } from "@/components/cyber/PageHeader";
import { findings, type MockFinding, type Severity } from "@/lib/mock/data";

export const Route = createFileRoute("/findings")({
  head: () => ({ meta: [{ title: "Findings — AetherSec" }] }),
  component: FindingsPage,
});

const SEVERITIES: (Severity | "All")[] = ["All", "Critical", "High", "Medium", "Low", "Info"];

function FindingsPage() {
  const [sev, setSev] = useState<Severity | "All">("All");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<MockFinding>(findings[0]);
  const list = findings.filter((f) => (sev === "All" || f.severity === sev) && (f.cve.toLowerCase().includes(q.toLowerCase()) || f.title.toLowerCase().includes(q.toLowerCase())));

  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          crumb={["workspace", "atlas-ops", "findings"]}
          title="Findings"
          subtitle={`${findings.length} total · ${findings.filter((f) => f.severity === "Critical").length} critical · ${findings.filter((f) => f.status === "open").length} open`}
          actions={
            <button className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05]">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          }
        />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-7 cyber-card overflow-hidden min-w-0">
            <div className="p-3 border-b border-white/[0.06] flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="CVE, title, asset…"
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-md pl-9 pr-3 py-1.5 text-xs font-mono focus:outline-none focus:border-primary/40"
                />
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-2 border-b border-white/[0.06] overflow-x-auto">
              {SEVERITIES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSev(s)}
                  className={`px-2 py-1 text-[10px] font-mono uppercase rounded border transition shrink-0 ${
                    sev === s ? "border-primary/40 text-primary bg-primary/10" : "border-white/10 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[560px]">
                <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-white/[0.06]">
                  <tr className="text-left">
                    <th className="px-4 py-2 font-normal">CVE</th>
                    <th className="px-4 py-2 font-normal">Title</th>
                    <th className="px-4 py-2 font-normal">Severity</th>
                    <th className="px-4 py-2 font-normal">Asset</th>
                    <th className="px-4 py-2 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {list.length === 0 && (
                    <tr><td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">no findings match.</td></tr>
                  )}
                  {list.map((f) => (
                    <tr
                      key={f.cve}
                      onClick={() => setSelected(f)}
                      className={`border-t border-white/[0.04] cursor-pointer transition ${
                        selected.cve === f.cve ? "bg-primary/[0.06]" : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <td className="px-4 py-2.5 text-primary whitespace-nowrap">{f.cve}</td>
                      <td className="px-4 py-2.5 text-foreground/90 max-w-[200px] truncate">{f.title}</td>
                      <td className="px-4 py-2.5"><SeverityChip severity={f.severity} /></td>
                      <td className="px-4 py-2.5 text-muted-foreground truncate max-w-[140px]">{f.asset}</td>
                      <td className="px-4 py-2.5 text-right text-muted-foreground">{f.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <FindingDetail finding={selected} />
        </div>
      </div>
    </AppShell>
  );
}

function FindingDetail({ finding: f }: { finding: MockFinding }) {
  return (
    <motion.div key={f.cve} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="col-span-12 lg:col-span-5 cyber-card p-5 min-w-0">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <div className="text-[10px] font-mono uppercase tracking-widest text-primary">// finding</div>
          <div className="font-mono text-sm font-medium text-primary mt-0.5">{f.cve}</div>
          <div className="text-sm text-foreground mt-1">{f.title}</div>
        </div>
        <SeverityChip severity={f.severity} />
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono mb-4">
        <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-2">
          <div className="text-muted-foreground">CVSS</div>
          <div className="text-foreground text-sm mt-0.5">{f.cvss ?? "—"}</div>
        </div>
        <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-2">
          <div className="text-muted-foreground">Exploit</div>
          <div className="text-cyber-orange text-sm mt-0.5">{f.exploit ?? "—"}</div>
        </div>
        <div className="rounded border border-white/[0.06] bg-white/[0.02] px-2 py-2">
          <div className="text-muted-foreground">Detected</div>
          <div className="text-foreground text-sm mt-0.5">{f.detected}</div>
        </div>
      </div>

      <Section icon={Bug} title="Evidence">
        <pre className="bg-black/40 border border-white/[0.05] rounded p-3 font-mono text-[10px] text-muted-foreground overflow-x-auto">
{`POST /api/v1/system HTTP/1.1
Host: ${f.asset}
Cookie: session=...
X-Forwarded-For: 169.254.169.254

→ 200 OK · response leaked metadata token`}
        </pre>
      </Section>

      <Section icon={AlertTriangle} title="Exploit chain">
        <ol className="text-[11px] font-mono text-muted-foreground space-y-1 list-decimal pl-4">
          <li>SSRF on /api/v1/system bypasses auth</li>
          <li>Fetch IMDS metadata token</li>
          <li>Assume iam-role/build, list S3 buckets</li>
          <li>Read tier-0 secrets bucket</li>
        </ol>
      </Section>

      <Section icon={Sparkles} title="AI remediation">
        <div className="text-[11px] font-mono text-foreground/80 bg-primary/[0.04] border border-primary/20 rounded p-3 leading-relaxed">
          Patch to vendor build ≥ 22.6R2.2. As compensating control, enforce IMDSv2 (hop-limit=1) on the underlying instance and restrict outbound metadata access via security group egress to 169.254.169.254.
        </div>
      </Section>

      <Section icon={Shield} title="Linked tickets">
        <div className="flex items-center justify-between rounded border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[11px] font-mono">
          <span className="text-muted-foreground">jira://ATLAS-2841</span>
          <ExternalLink className="w-3 h-3 text-primary" />
        </div>
      </Section>
    </motion.div>
  );
}

function Section({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5">
        <Icon className="w-3 h-3 text-primary" /> {title}
      </div>
      {children}
    </div>
  );
}
