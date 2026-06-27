import { createFileRoute } from "@tanstack/react-router";
import { Key, Copy, Trash2, Plus, Building, Globe, Bell, Shield } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader } from "@/components/cyber/PageHeader";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — AetherSec" }] }),
  component: SettingsPage,
});

const TABS = [
  { id: "workspace", label: "Workspace", icon: Building },
  { id: "api", label: "API keys", icon: Key },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: Globe },
] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("workspace");
  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1400px] mx-auto">
        <PageHeader crumb={["workspace", "atlas-ops", "settings"]} title="Settings" subtitle="workspace · members · billing · api" />

        <div className="grid grid-cols-12 gap-4">
          <aside className="col-span-12 md:col-span-3 cyber-card p-2 h-fit">
            {TABS.map((t) => {
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition ${
                    active ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-white/[0.03]"
                  }`}
                >
                  <t.icon className={`w-3.5 h-3.5 ${active ? "text-primary" : ""}`} />
                  {t.label}
                </button>
              );
            })}
          </aside>

          <div className="col-span-12 md:col-span-9 cyber-card p-6 min-w-0">
            {tab === "workspace" && <WorkspaceTab />}
            {tab === "api" && <ApiKeysTab />}
            {tab === "security" && <SecurityTab />}
            {tab === "notifications" && <NotificationsTab />}
            {tab === "billing" && <BillingTab />}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_minmax(0,1fr)] gap-3 py-4 border-b border-white/[0.04] last:border-0">
      <div>
        <div className="text-xs font-medium">{label}</div>
        {hint && <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{hint}</div>}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function Field({ defaultValue, type = "text" }: { defaultValue: string; type?: string }) {
  return (
    <input
      defaultValue={defaultValue}
      type={type}
      className="w-full bg-white/[0.03] border border-white/[0.06] rounded-md px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-primary/40"
    />
  );
}

function WorkspaceTab() {
  return (
    <div>
      <h3 className="text-sm font-medium mb-1">Workspace</h3>
      <p className="text-[11px] font-mono text-muted-foreground mb-4">name, slug, default scan profile.</p>
      <Row label="Workspace name" hint="visible to all members"><Field defaultValue="atlas-ops" /></Row>
      <Row label="Slug" hint="aethersec.io/atlas-ops"><Field defaultValue="atlas-ops" /></Row>
      <Row label="Primary target" hint="default scope for new scans"><Field defaultValue="vault.atlas.io" /></Row>
      <Row label="Default profile" hint="standard · deep · red-team">
        <select className="w-full bg-white/[0.03] border border-white/[0.06] rounded-md px-3 py-1.5 text-xs font-mono">
          <option>Standard</option><option>Deep</option><option>Red-Team</option>
        </select>
      </Row>
      <div className="pt-5 flex justify-end">
        <button className="text-xs font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground glow-cyan hover:brightness-110">Save changes</button>
      </div>
    </div>
  );
}

function ApiKeysTab() {
  const keys = [
    { name: "ci-pipeline", value: "sk_live_•••••••••a4f2", created: "2 weeks ago" },
    { name: "siem-stream", value: "sk_live_•••••••••8b1c", created: "1 month ago" },
  ];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium">API keys</h3>
          <p className="text-[11px] font-mono text-muted-foreground">authenticate API & webhook calls.</p>
        </div>
        <button className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-md bg-primary text-primary-foreground glow-cyan hover:brightness-110">
          <Plus className="w-3.5 h-3.5" /> New key
        </button>
      </div>
      <div className="divide-y divide-white/[0.04]">
        {keys.map((k) => (
          <div key={k.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center py-3">
            <div className="min-w-0">
              <div className="text-xs font-medium">{k.name}</div>
              <div className="text-[10px] font-mono text-muted-foreground truncate">{k.value} · created {k.created}</div>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded border border-white/10 text-muted-foreground hover:text-foreground"><Copy className="w-3 h-3" /></button>
              <button className="p-1.5 rounded border border-white/10 text-muted-foreground hover:text-cyber-red"><Trash2 className="w-3 h-3" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurityTab() {
  return (
    <div>
      <h3 className="text-sm font-medium mb-1">Security</h3>
      <p className="text-[11px] font-mono text-muted-foreground mb-4">enforce policy across the workspace.</p>
      <Toggle label="Require SSO for all members" desc="SAML 2.0 · Okta / Azure AD" on />
      <Toggle label="Enforce MFA" desc="WebAuthn / TOTP" on />
      <Toggle label="Restrict scan targets to allowlist" desc="prevent accidental out-of-scope" on={false} />
      <Toggle label="Auto-redact secrets in evidence" desc="regex + entropy detection" on />
    </div>
  );
}

function NotificationsTab() {
  return (
    <div>
      <h3 className="text-sm font-medium mb-1">Notifications</h3>
      <p className="text-[11px] font-mono text-muted-foreground mb-4">how AetherSec reaches you.</p>
      <Toggle label="Email · Critical findings" desc="instant" on />
      <Toggle label="Email · Weekly digest" desc="mondays 09:00 UTC" on />
      <Toggle label="Slack · #sec-ops" desc="all severities" on />
      <Toggle label="Webhook · siem-stream" desc="JSON push to https://siem.atlas.io/in" on />
    </div>
  );
}

function BillingTab() {
  return (
    <div>
      <h3 className="text-sm font-medium mb-1">Billing</h3>
      <p className="text-[11px] font-mono text-muted-foreground mb-4">plan, usage, invoices.</p>
      <div className="rounded-md border border-primary/30 bg-primary/[0.05] p-4 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-primary">// current plan</div>
            <div className="text-lg font-semibold mt-1">AetherSec Pro</div>
            <div className="text-[11px] font-mono text-muted-foreground">$2,400 / month · billed annually</div>
          </div>
          <button className="text-xs px-3 py-2 rounded-md border border-white/10 hover:bg-white/[0.05]">Manage plan</button>
        </div>
      </div>
      <Row label="Scans this month" hint="unlimited on Pro"><div className="text-xs font-mono">128 / ∞</div></Row>
      <Row label="Targets" hint="unlimited on Pro"><div className="text-xs font-mono">1,284 / ∞</div></Row>
      <Row label="Seats" hint="$80 / seat / month over 10"><div className="text-xs font-mono">4 / 10 included</div></Row>
    </div>
  );
}

function Toggle({ label, desc, on }: { label: string; desc: string; on: boolean }) {
  const [v, setV] = useState(on);
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center py-3 border-b border-white/[0.04] last:border-0">
      <div className="min-w-0">
        <div className="text-xs font-medium">{label}</div>
        <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{desc}</div>
      </div>
      <button
        onClick={() => setV(!v)}
        className={`relative w-9 h-5 rounded-full border transition ${v ? "bg-primary/30 border-primary/60" : "bg-white/[0.04] border-white/10"}`}
        aria-pressed={v}
      >
        <span className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 rounded-full bg-foreground transition-transform ${v ? "translate-x-4 bg-primary" : ""}`} />
      </button>
    </div>
  );
}
