import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Shield, Terminal, Network, Cloud, GitBranch, Cpu, Radar, Activity, Lock,
  ArrowRight, ChevronRight, Sparkles, Zap, Search, Bell, Plus, Circle, Triangle,
  Layers, Eye, Bug, FileText, Users, Settings, Workflow, Crosshair, Brain,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/aethersec-logo.png";
import { LogoMark as SharedLogoMark } from "@/components/cyber/LogoMark";
import { severityBars, terminalLines, type Severity, severityColor } from "@/lib/mock/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AetherSec — AI-Native Pentesting Platform" },
      {
        name: "description",
        content:
          "Autonomous penetration testing for modern enterprises. Continuous offensive coverage, attack-path analysis, and AI-driven exploit reasoning.",
      },
    ],
  }),
  component: LandingPage,
});

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans text-foreground">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <Nav />
      <Hero />
      <LogoStrip />
      <DashboardPreview />
      <Features />
      <Workflow3Step />
      <CapabilityMatrix />
      <CTASection />
      <Footer />
    </div>
  );
}

/* ---------------- Nav ---------------- */
function Nav() {
  const links = [
    { label: "Platform", href: "#platform" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Workflow", href: "#workflow" },
    { label: "Enterprise", href: "#enterprise" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <a href="#" className="flex items-center gap-2 min-w-0">
          <SharedLogoMark />
          <span className="font-semibold tracking-tight text-base sm:text-lg truncate">
            Aether<span className="text-primary">Sec</span>
          </span>
          <span className="hidden sm:inline ml-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">
            Pro
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/login"
            className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-foreground px-3 py-2"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium bg-primary text-primary-foreground px-3 sm:px-4 py-2 rounded-lg glow-cyan hover:brightness-110 transition"
          >
            Request access <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

function LogoMark() {
  return <SharedLogoMark />;
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div className="mx-auto max-w-7xl px-6 text-center relative">
        <motion.div
          {...fadeUp}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-muted-foreground mb-8"
        >
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-70" />
            <span className="relative rounded-full w-1.5 h-1.5 bg-primary" />
          </span>
          v2.0 — Cognitive Engine now live
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.02] max-w-5xl mx-auto"
        >
          The AI-native{" "}
          <span className="bg-gradient-to-br from-primary via-primary to-secondary bg-clip-text text-transparent text-glow">
            pentesting
          </span>{" "}
          platform for the modern adversary.
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
        >
          AetherSec orchestrates 52+ offensive tools through an autonomous cognitive engine —
          continuous attack-surface discovery, exploit reasoning, and full attack-path analysis at
          machine speed.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-3 rounded-lg glow-cyan hover:brightness-110 transition"
          >
            Launch a mission <Zap className="w-4 h-4" />
          </Link>
          <a
            href="#platform"
            className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-5 py-3 rounded-lg hover:bg-white/[0.05] transition"
          >
            <Terminal className="w-4 h-4 text-primary" /> See it operate
          </a>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-muted-foreground"
        >
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyber-green" /> SOC2 · ISO 27001
          </span>
          <span className="flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-primary" /> MITRE ATT&amp;CK aligned
          </span>
          <span className="flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-secondary" /> Zypheron AI Engine
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Logo strip ---------------- */
function LogoStrip() {
  const items = ["NORTHWIND", "CIPHERLAB", "ATLAS9", "BLACKBYTE", "OMNICORP", "VERTEX·SEC"];
  return (
    <section className="border-y border-white/[0.05] bg-white/[0.01] py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
          Trusted by offensive security teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60">
          {items.map((i) => (
            <span key={i} className="font-mono text-sm tracking-widest text-muted-foreground">
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Dashboard preview ---------------- */
function DashboardPreview() {
  return (
    <section id="platform" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">
            // mission control
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            A command surface, not a dashboard.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Findings, scans, network topology, and the autonomous engine — orchestrated in one
            dark-mode operator console.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/15 blur-3xl pointer-events-none" />
          <div className="relative cyber-card overflow-hidden">
            <DashboardMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="grid grid-cols-12 min-h-[680px]">
      {/* Sidebar */}
      <aside className="hidden md:flex md:col-span-2 flex-col border-r border-white/[0.06] bg-depth-1/40 p-3 text-xs">
        <div className="flex items-center gap-2 px-2 py-2 mb-3">
          <LogoMark />
          <span className="font-semibold">AetherSec</span>
        </div>
        <NavGroup title="Workspace" items={[
          { icon: Network, label: "Network Map" },
          { icon: Cloud, label: "Cloud Arch" },
          { icon: GitBranch, label: "AD Graph" },
        ]} />
        <NavGroup title="Operations" items={[
          { icon: Zap, label: "Auto Pentest", badge: "NEW", active: true },
          { icon: Radar, label: "Attack Surface" },
          { icon: Crosshair, label: "Attack Paths" },
          { icon: Terminal, label: "AI Terminal" },
        ]} />
        <NavGroup title="Platform" items={[
          { icon: Activity, label: "Dashboard" },
          { icon: Layers, label: "Assets" },
          { icon: Bug, label: "Findings" },
          { icon: FileText, label: "Reports" },
          { icon: Users, label: "Users" },
        ]} />
        <div className="mt-auto pt-3">
          <button className="w-full bg-primary text-primary-foreground rounded-md py-2 text-xs font-medium glow-cyan flex items-center justify-center gap-1">
            <Plus className="w-3.5 h-3.5" /> New Scan
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="col-span-12 md:col-span-10 flex flex-col">
        {/* topbar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 h-12">
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-md px-2.5 py-1.5 text-xs text-muted-foreground w-64">
              <Search className="w-3.5 h-3.5" />
              <span className="font-mono">search findings, CVEs...</span>
            </div>
            <Bell className="w-4 h-4 text-muted-foreground" />
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary" />
          </div>
        </div>

        <div className="p-5 grid grid-cols-12 gap-4 flex-1">
          {/* Stat cards */}
          {[
            { label: "Active scans", value: "12", trend: "+3", icon: Activity, color: "text-primary" },
            { label: "Critical findings", value: "47", trend: "-8", icon: Bug, color: "text-cyber-red" },
            { label: "Assets monitored", value: "1,284", trend: "+24", icon: Layers, color: "text-secondary" },
            { label: "Coverage", value: "94%", trend: "+2%", icon: Eye, color: "text-cyber-green" },
          ].map((s) => (
            <div key={s.label} className="col-span-6 lg:col-span-3 cyber-card cyber-card-interactive p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{s.label}</span>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-semibold font-mono">{s.value}</span>
                <span className="text-[11px] text-cyber-green font-mono mb-1">{s.trend}</span>
              </div>
            </div>
          ))}

          {/* Findings by severity */}
          <div className="col-span-12 lg:col-span-7 cyber-card p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-sm font-medium">Findings by severity</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Last 30 days</p>
              </div>
              <div className="flex gap-3 text-[10px] font-mono text-muted-foreground">
                {[
                  ["Critical", "bg-cyber-red"],
                  ["High", "bg-cyber-orange"],
                  ["Medium", "bg-cyber-yellow"],
                  ["Low", "bg-primary"],
                  ["Info", "bg-secondary"],
                ].map(([l, c]) => (
                  <span key={l} className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-sm ${c}`} /> {l}
                  </span>
                ))}
              </div>
            </div>
            <SeverityChart />
          </div>

          {/* Scans history */}
          <div className="col-span-12 lg:col-span-5 cyber-card p-5">
            <h3 className="text-sm font-medium mb-4">Recent scans</h3>
            <div className="space-y-2.5">
              {[
                { id: "scan_7df2", t: "10.20.14.0/24", status: "running", c: "text-cyber-yellow", b: "bg-cyber-yellow/10 border-cyber-yellow/30" },
                { id: "scan_7df1", t: "vault.atlas.io", status: "completed", c: "text-cyber-green", b: "bg-cyber-green/10 border-cyber-green/30" },
                { id: "scan_7df0", t: "192.168.10.0/16", status: "completed", c: "text-cyber-green", b: "bg-cyber-green/10 border-cyber-green/30" },
                { id: "scan_7dee", t: "ad.corp.local", status: "failed", c: "text-cyber-red", b: "bg-cyber-red/10 border-cyber-red/30" },
                { id: "scan_7ded", t: "aws://prod-vpc", status: "pending", c: "text-primary", b: "bg-primary/10 border-primary/30" },
              ].map((s) => (
                <div key={s.id} className="flex items-center justify-between text-xs py-2 border-b border-white/[0.04] last:border-0">
                  <div className="min-w-0">
                    <div className="font-mono text-foreground truncate">{s.t}</div>
                    <div className="font-mono text-[10px] text-muted-foreground">{s.id}</div>
                  </div>
                  <span className={`font-mono text-[10px] uppercase px-2 py-0.5 rounded border ${s.b} ${s.c}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Findings list */}
          <div className="col-span-12 lg:col-span-7 cyber-card p-5">
            <h3 className="text-sm font-medium mb-4">Findings list</h3>
            <table className="w-full text-xs">
              <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
                <tr className="text-left">
                  <th className="pb-3 font-normal">CVE</th>
                  <th className="pb-3 font-normal">Severity</th>
                  <th className="pb-3 font-normal">Asset</th>
                  <th className="pb-3 font-normal text-right">Status</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {[
                  ["CVE-2024-21893", "Critical", "10.20.14.42", "open", "text-cyber-red"],
                  ["CVE-2024-3094", "High", "build-srv-01", "triage", "text-cyber-orange"],
                  ["CVE-2023-4863", "High", "edge.atlas.io", "open", "text-cyber-orange"],
                  ["CVE-2024-1086", "Medium", "vault.atlas.io", "patching", "text-cyber-yellow"],
                  ["CVE-2024-6387", "Critical", "10.20.14.51", "remediated", "text-cyber-red"],
                ].map(([cve, sev, asset, st, c]) => (
                  <tr key={cve} className="border-t border-white/[0.04]">
                    <td className="py-2.5 text-primary">{cve}</td>
                    <td className={c}>{sev}</td>
                    <td className="text-muted-foreground">{asset}</td>
                    <td className="text-right text-muted-foreground">{st}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Auto pentest mission */}
          <div className="col-span-12 lg:col-span-5 cyber-card scanline p-5 flex flex-col items-center justify-center text-center relative">
            <p className="text-[10px] font-mono uppercase tracking-widest text-primary mb-2">
              Auto Pentest — Mission Control
            </p>
            <p className="text-xs text-muted-foreground mb-6 max-w-[28ch]">
              52 tools orchestrated by the cognitive engine
            </p>
            <button className="relative w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/50 animate-pulse-glow">
              <div className="absolute inset-2 rounded-full border border-primary/30" />
              <div className="absolute inset-5 rounded-full border border-primary/20" />
              <span className="relative font-semibold text-sm flex flex-col items-center">
                <Zap className="w-5 h-5 text-primary mb-1" />
                Launch
              </span>
            </button>
            <div className="mt-6 w-full">
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mb-1">
                <span>Progress</span>
                <span>74%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full w-[74%] bg-gradient-to-r from-primary to-secondary" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavGroup({
  title,
  items,
}: {
  title: string;
  items: { icon: React.ComponentType<{ className?: string }>; label: string; badge?: string; active?: boolean }[];
}) {
  return (
    <div className="mb-4">
      <div className="px-2 text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
        {title}
      </div>
      <div className="space-y-0.5">
        {items.map((i) => (
          <div
            key={i.label}
            className={`relative flex items-center gap-2 px-2 py-1.5 rounded-md ${
              i.active
                ? "bg-primary/10 text-foreground"
                : "text-muted-foreground hover:bg-white/[0.03]"
            }`}
          >
            {i.active && (
              <span className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-primary" />
            )}
            <i.icon className={`w-3.5 h-3.5 ${i.active ? "text-primary" : ""}`} />
            <span className="truncate">{i.label}</span>
            {i.badge && (
              <span className="ml-auto text-[8px] font-mono bg-primary/20 text-primary px-1 py-0.5 rounded">
                {i.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SeverityChart() {
  const bars = [
    { l: "Critical", v: 88, c: "from-cyber-red to-cyber-red/40" },
    { l: "High", v: 64, c: "from-cyber-orange to-cyber-orange/40" },
    { l: "Medium", v: 48, c: "from-cyber-yellow to-cyber-yellow/40" },
    { l: "Low", v: 30, c: "from-primary to-primary/30" },
    { l: "Info", v: 18, c: "from-secondary to-secondary/30" },
  ];
  return (
    <div className="flex items-end justify-between gap-4 h-48">
      {bars.map((b) => (
        <div key={b.l} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full flex-1 flex items-end">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${b.v}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full rounded-t-md bg-gradient-to-t ${b.c}`}
            />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">{b.l}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Features ---------------- */
function Features() {
  const features = [
    {
      icon: Brain,
      title: "Cognitive engine V2",
      desc: "Autonomous reasoning across recon, exploitation, lateral movement, and exfiltration. Plans like an operator, executes at machine speed.",
    },
    {
      icon: Crosshair,
      title: "Attack-path analysis",
      desc: "Evidence-edge graph models every reachable blast radius — from initial foothold to crown-jewel compromise.",
    },
    {
      icon: Network,
      title: "Continuous discovery",
      desc: "Network, cloud, and AD topology mapped in real time. Newly exposed assets enter the testing rotation automatically.",
    },
    {
      icon: Terminal,
      title: "AI terminal",
      desc: "Natural language → 52+ offensive tools. Compose, pivot, and report without leaving the prompt.",
    },
    {
      icon: Workflow,
      title: "MITRE-aligned coverage",
      desc: "Every finding maps to ATT&CK tactics, techniques, and sub-techniques. Heatmaps surface coverage gaps instantly.",
    },
    {
      icon: Shield,
      title: "Compliance-ready",
      desc: "SOC2, ISO 27001, PCI-DSS evidence collected automatically alongside every engagement.",
    },
  ];

  return (
    <section id="capabilities" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">
            // capabilities
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            Built for operators who measure outcomes in shells, not scans.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="cyber-card cyber-card-interactive p-6 group"
            >
              <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Workflow ---------------- */
function Workflow3Step() {
  const steps = [
    {
      n: "01",
      icon: Radar,
      title: "Discover",
      desc: "AetherSec maps your external + internal attack surface continuously. Network, cloud, AD, and SaaS — no agent required.",
    },
    {
      n: "02",
      icon: Cpu,
      title: "Reason",
      desc: "The cognitive engine plans multi-stage attack chains, picks the right tool, and validates exploitability before executing.",
    },
    {
      n: "03",
      icon: FileText,
      title: "Report",
      desc: "Every finding ships with reproduction steps, blast-radius graph, MITRE mapping, and a remediation plan your team can ship.",
    },
  ];

  return (
    <section id="workflow" className="py-24 border-y border-white/[0.05] bg-white/[0.01]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">
            // workflow
          </p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
            One click. A full kill chain.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          {steps.map((s, idx) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="cyber-card p-7 relative"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-muted-foreground tracking-widest">
                  STEP {s.n}
                </span>
                <s.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Capability Matrix ---------------- */
function CapabilityMatrix() {
  const rows = [
    { cat: "Reconnaissance", count: 12, items: ["nmap", "amass", "subfinder", "httpx", "..."] },
    { cat: "Web exploitation", count: 9, items: ["nuclei", "ffuf", "sqlmap", "..."] },
    { cat: "AD / Identity", count: 7, items: ["bloodhound", "kerbrute", "impacket", "..."] },
    { cat: "Cloud (AWS/GCP/Azure)", count: 8, items: ["prowler", "scoutsuite", "pacu", "..."] },
    { cat: "Post-exploitation", count: 10, items: ["mimikatz", "covenant", "sliver", "..."] },
    { cat: "SAST / Supply chain", count: 6, items: ["semgrep", "trivy", "syft", "..."] },
  ];

  return (
    <section id="enterprise" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">
              // coverage matrix
            </p>
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-5">
              52 tools. One orchestration layer.
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Every category of offensive tooling, normalized into a single evidence model.
              Findings deduplicate across tools, severities reconcile automatically, and the
              cognitive engine picks the next move.
            </p>
            <div className="flex flex-wrap gap-2">
              {["JWT auth", "RBAC", "Audit logs", "Stripe billing", "On-prem option"].map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.02] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="cyber-card overflow-hidden">
            {rows.map((r, i) => (
              <div
                key={r.cat}
                className={`flex items-center justify-between p-4 ${
                  i !== rows.length - 1 ? "border-b border-white/[0.05]" : ""
                } hover:bg-primary/[0.04] transition`}
              >
                <div>
                  <div className="text-sm font-medium">{r.cat}</div>
                  <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
                    {r.items.join(" · ")}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-primary">{r.count}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative cyber-card gradient-border p-12 sm:p-16 text-center overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 blur-3xl rounded-full" />
          <div className="relative">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight max-w-2xl mx-auto">
              Deploy your autonomous red team this week.
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              Early access cohort is open for security teams operating critical infrastructure.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg glow-cyan hover:brightness-110 transition"
              >
                Request access <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-6 py-3 rounded-lg hover:bg-white/[0.05] transition"
              >
                <Settings className="w-4 h-4" /> Talk to engineering
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="AetherSec" className="h-6 w-auto opacity-90" />
        </div>
        <p className="text-xs font-mono text-muted-foreground">
          © {new Date().getFullYear()} AetherSec Labs · All operations logged.
        </p>
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Security</a>
          <a href="#" className="hover:text-foreground">Docs</a>
          <a href="#" className="hover:text-foreground">Status</a>
          <span className="flex items-center gap-1.5">
            <Circle className="w-2 h-2 fill-cyber-green text-cyber-green" />
            <span className="font-mono">all systems nominal</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

// Silence unused import warning while keeping icon set complete.
void Triangle;
