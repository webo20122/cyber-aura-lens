import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, ArrowLeft, Building2, Globe, Server, Cloud, Check,
  Radar, Crosshair, Zap, Shield, Mail, Plus, Loader2,
} from "lucide-react";
import { useState } from "react";
import { WordMark, LogoMark } from "@/components/cyber/LogoMark";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [{ title: "Setup — AetherSec" }],
  }),
  component: OnboardingPage,
});

const steps = [
  { id: 1, title: "Workspace", desc: "Name your operations theater." },
  { id: 2, title: "Target", desc: "Declare in-scope assets." },
  { id: 3, title: "Profile", desc: "Pick engagement intensity." },
  { id: 4, title: "Team", desc: "Invite operators." },
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [provisioning, setProvisioning] = useState(false);
  const [data, setData] = useState({
    workspace: "Atlas Ops",
    targetKind: "domain" as "domain" | "ip" | "cloud",
    target: "atlas.io",
    profile: "standard" as "recon" | "standard" | "deep" | "redteam",
    invites: ["alex@atlas.io"],
  });

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));
  const finish = () => {
    setProvisioning(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 1100);
  };

  return (
    <div className="relative min-h-screen grid lg:grid-cols-[320px_1fr] font-sans overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" aria-hidden />

      {/* Rail */}
      <aside className="relative border-r border-white/[0.06] bg-depth-1/30 px-6 py-8 lg:py-10">
        <Link to="/" className="inline-flex mb-10"><WordMark /></Link>

        <ol className="space-y-5">
          {steps.map((s) => {
            const state = step === s.id ? "active" : step > s.id ? "done" : "todo";
            return (
              <li key={s.id} className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 shrink-0 rounded-md border flex items-center justify-center text-[11px] font-mono ${
                    state === "active"
                      ? "border-primary/60 bg-primary/15 text-primary glow-cyan"
                      : state === "done"
                        ? "border-cyber-green/40 bg-cyber-green/10 text-cyber-green"
                        : "border-white/10 bg-white/[0.02] text-muted-foreground"
                  }`}
                >
                  {state === "done" ? <Check className="w-3.5 h-3.5" /> : s.id.toString().padStart(2, "0")}
                </div>
                <div className="min-w-0">
                  <div className={`text-sm ${state === "todo" ? "text-muted-foreground" : "text-foreground"}`}>
                    {s.title}
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{s.desc}</div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="absolute bottom-8 left-6 right-6 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          // setup · step {step} / 4
        </div>
      </aside>

      {/* Pane */}
      <main className="relative flex flex-col">
        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10">
          <div className="w-full max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && <StepWorkspace data={data} setData={setData} />}
                {step === 2 && <StepTarget data={data} setData={setData} />}
                {step === 3 && <StepProfile data={data} setData={setData} />}
                {step === 4 && <StepTeam data={data} setData={setData} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="border-t border-white/[0.06] px-6 sm:px-10 py-4 flex items-center justify-between gap-3 bg-depth-1/30">
          <button
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 4 ? (
            <button
              onClick={next}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-5 py-2.5 rounded-lg glow-cyan hover:brightness-110 transition"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={provisioning}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium text-sm px-5 py-2.5 rounded-lg glow-cyan hover:brightness-110 transition disabled:opacity-60"
            >
              {provisioning ? <><Loader2 className="w-4 h-4 animate-spin" /> Arming engine…</> : <>Launch workspace <Zap className="w-4 h-4" /></>}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

/* ---------------- Steps ---------------- */
type Data = {
  workspace: string;
  targetKind: "domain" | "ip" | "cloud";
  target: string;
  profile: "recon" | "standard" | "deep" | "redteam";
  invites: string[];
};
type StepProps = { data: Data; setData: React.Dispatch<React.SetStateAction<Data>> };

function Heading({ tag, title, sub }: { tag: string; title: string; sub: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">// {tag}</p>
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground max-w-lg">{sub}</p>
    </div>
  );
}

function StepWorkspace({ data, setData }: StepProps) {
  return (
    <div>
      <Heading tag="step 01" title="Name your theater of operations." sub="This appears at the top of every report and on shared evidence packs." />
      <div className="cyber-card p-6">
        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Workspace name</label>
        <div className="relative mt-2">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={data.workspace}
            onChange={(e) => setData({ ...data, workspace: e.target.value })}
            className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-3 py-3 text-sm font-mono focus:outline-none focus:border-primary/60 transition"
          />
        </div>
        <div className="mt-5 flex items-center gap-3 p-3 rounded-md border border-white/[0.06] bg-white/[0.02]">
          <LogoMark />
          <div className="min-w-0">
            <div className="text-sm truncate">{data.workspace || "Untitled"}</div>
            <div className="text-[11px] font-mono text-muted-foreground">aether.sh/{(data.workspace || "ws").toLowerCase().replace(/\s+/g, "-")}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTarget({ data, setData }: StepProps) {
  const kinds = [
    { id: "domain" as const, icon: Globe, label: "Domain / URL", hint: "atlas.io" },
    { id: "ip" as const, icon: Server, label: "IP range / CIDR", hint: "10.20.14.0/24" },
    { id: "cloud" as const, icon: Cloud, label: "Cloud account", hint: "aws://prod-vpc" },
  ];
  return (
    <div>
      <Heading tag="step 02" title="Declare your primary in-scope target." sub="Out-of-scope assets are blacklisted automatically. You can add more targets after setup." />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {kinds.map((k) => {
          const active = data.targetKind === k.id;
          return (
            <button
              key={k.id}
              onClick={() => setData({ ...data, targetKind: k.id, target: k.hint })}
              className={`cyber-card cyber-card-interactive p-4 text-left ${active ? "border-primary/60" : ""}`}
            >
              <k.icon className={`w-5 h-5 mb-3 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-sm font-medium">{k.label}</div>
              <div className="text-[11px] font-mono text-muted-foreground mt-0.5">{k.hint}</div>
            </button>
          );
        })}
      </div>
      <div className="cyber-card p-5">
        <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Target identifier</label>
        <input
          value={data.target}
          onChange={(e) => setData({ ...data, target: e.target.value })}
          className="mt-2 w-full bg-white/[0.03] border border-white/10 rounded-lg px-3 py-3 text-sm font-mono focus:outline-none focus:border-primary/60 transition"
        />
      </div>
    </div>
  );
}

function StepProfile({ data, setData }: StepProps) {
  const profiles = [
    { id: "recon" as const, icon: Radar, name: "Recon-only", desc: "Passive enum, no exploit attempts.", risk: "low", duration: "~15m" },
    { id: "standard" as const, icon: Shield, name: "Standard", desc: "Recon + safe exploit validation.", risk: "low", duration: "~2h", rec: true },
    { id: "deep" as const, icon: Crosshair, name: "Deep", desc: "Recon + full exploit + lateral movement.", risk: "medium", duration: "~6h" },
    { id: "redteam" as const, icon: Zap, name: "Red Team", desc: "Stealth, post-ex, persistence. Authorized only.", risk: "high", duration: "~24h" },
  ];
  const riskColor = { low: "text-cyber-green", medium: "text-cyber-yellow", high: "text-cyber-red" };
  return (
    <div>
      <Heading tag="step 03" title="Choose engagement intensity." sub="Profile determines the modules the cognitive engine can fire. You can override per-scan later." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profiles.map((p) => {
          const active = data.profile === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setData({ ...data, profile: p.id })}
              className={`cyber-card cyber-card-interactive p-5 text-left relative ${active ? "border-primary/60" : ""}`}
            >
              {p.rec && (
                <span className="absolute top-3 right-3 text-[9px] font-mono uppercase tracking-widest bg-primary/15 text-primary px-1.5 py-0.5 rounded">
                  recommended
                </span>
              )}
              <p.icon className={`w-5 h-5 mb-3 ${active ? "text-primary" : "text-muted-foreground"}`} />
              <div className="text-sm font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{p.desc}</div>
              <div className="mt-4 flex items-center gap-3 text-[10px] font-mono">
                <span className={riskColor[p.risk as keyof typeof riskColor]}>risk:{p.risk}</span>
                <span className="text-muted-foreground">eta:{p.duration}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepTeam({ data, setData }: StepProps) {
  const [email, setEmail] = useState("");
  const add = () => {
    const v = email.trim();
    if (!v || data.invites.includes(v)) return;
    setData({ ...data, invites: [...data.invites, v] });
    setEmail("");
  };
  return (
    <div>
      <Heading tag="step 04" title="Invite your operators." sub="Roles can be tuned later. New invitees receive an SSO-eligible workspace link." />
      <div className="cyber-card p-5">
        <div className="flex gap-2">
          <div className="relative flex-1 min-w-0">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
              placeholder="operator@company.com"
              className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-3 py-3 text-sm font-mono focus:outline-none focus:border-primary/60 transition"
            />
          </div>
          <button onClick={add} className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-sm hover:bg-white/[0.05] shrink-0">
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>

        <ul className="mt-4 space-y-1.5">
          {data.invites.map((e) => (
            <li key={e} className="flex items-center justify-between text-sm py-2 px-3 rounded-md bg-white/[0.02] border border-white/[0.05]">
              <span className="font-mono truncate">{e}</span>
              <span className="text-[10px] font-mono uppercase text-primary">operator</span>
            </li>
          ))}
        </ul>
        {data.invites.length === 0 && (
          <p className="mt-4 text-xs text-muted-foreground font-mono">// no invites yet — you can do this later</p>
        )}
      </div>
    </div>
  );
}
