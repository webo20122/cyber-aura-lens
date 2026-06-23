import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity, Layers, Bug, FileText, Users, Settings, Zap, Radar, Crosshair,
  Terminal, Network, Bell, Search, Command, ChevronsLeft, ChevronsRight, LogOut,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { LogoMark } from "@/components/cyber/LogoMark";

const nav = [
  {
    title: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: Activity },
    ],
  },
  {
    title: "Operations",
    items: [
      { to: "/dashboard?view=scans", label: "Scans", icon: Zap, badge: "12" },
      { to: "/dashboard?view=findings", label: "Findings", icon: Bug, badge: "47" },
      { to: "/dashboard?view=paths", label: "Attack Paths", icon: Crosshair },
      { to: "/dashboard?view=surface", label: "Attack Surface", icon: Radar },
      { to: "/dashboard?view=terminal", label: "AI Terminal", icon: Terminal },
    ],
  },
  {
    title: "Platform",
    items: [
      { to: "/dashboard?view=assets", label: "Assets", icon: Layers },
      { to: "/dashboard?view=topology", label: "Topology", icon: Network },
      { to: "/dashboard?view=reports", label: "Reports", icon: FileText },
      { to: "/dashboard?view=team", label: "Team", icon: Users },
      { to: "/dashboard?view=settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AppShell({
  children,
  view = "dashboard",
  onViewChange,
}: {
  children: ReactNode;
  view?: string;
  onViewChange?: (v: string) => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const handleClick = (label: string) => {
    onViewChange?.(label.toLowerCase().replace(/\s+/g, "-"));
    setMobileOpen(false);
  };

  return (
    <div className="relative min-h-screen flex font-sans text-foreground">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" aria-hidden />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          fixed lg:sticky top-0 left-0 z-50 h-screen shrink-0 transition-all duration-300
          border-r border-white/[0.06] bg-depth-1/60 backdrop-blur-xl
          ${collapsed ? "lg:w-[68px]" : "lg:w-[240px]"} w-[260px]
          flex flex-col`}
      >
        <div className={`h-14 flex items-center border-b border-white/[0.06] px-3 ${collapsed ? "justify-center" : "justify-between"}`}>
          <Link to="/dashboard" className="flex items-center gap-2 min-w-0">
            <LogoMark size={7} />
            {!collapsed && (
              <span className="font-semibold tracking-tight text-sm truncate">
                Aether<span className="text-primary">Sec</span>
              </span>
            )}
          </Link>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden lg:inline-flex p-1 text-muted-foreground hover:text-foreground"
              aria-label="Collapse sidebar"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
          {nav.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <div className="px-2 text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">
                  {group.title}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const slug = item.label.toLowerCase().replace(/\s+/g, "-");
                  const active = view === slug || (slug === "dashboard" && view === "dashboard");
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleClick(item.label)}
                      title={collapsed ? item.label : undefined}
                      className={`relative w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-xs transition-colors ${
                        active
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-white/[0.03] hover:text-foreground"
                      }`}
                    >
                      {active && (
                        <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r bg-primary" />
                      )}
                      <item.icon className={`w-4 h-4 shrink-0 ${active ? "text-primary" : ""}`} strokeWidth={1.5} />
                      {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                      {!collapsed && item.badge && (
                        <span className="text-[9px] font-mono bg-white/[0.05] text-muted-foreground px-1.5 py-0.5 rounded">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className={`border-t border-white/[0.06] p-3 ${collapsed ? "flex flex-col items-center gap-2" : ""}`}>
          {collapsed ? (
            <button onClick={() => setCollapsed(false)} className="p-1.5 text-muted-foreground hover:text-foreground" aria-label="Expand">
              <ChevronsRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="flex items-center gap-2.5 p-2 rounded-md bg-white/[0.02] border border-white/[0.05]">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium truncate">Alex Chen</div>
                <div className="text-[10px] font-mono text-muted-foreground truncate">atlas-ops · operator</div>
              </div>
              <Link to="/" title="Sign out" className="text-muted-foreground hover:text-cyber-red">
                <LogOut className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {void path}
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 h-14 flex items-center gap-3 px-4 sm:px-6 border-b border-white/[0.06] bg-background/70 backdrop-blur-xl">
          <button
            className="lg:hidden p-1.5 -ml-1 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                placeholder="search findings, CVEs, assets…"
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-md pl-9 pr-12 py-1.5 text-xs font-mono placeholder:text-muted-foreground/70 focus:outline-none focus:border-primary/40"
              />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 text-[9px] font-mono text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">
                <Command className="w-2.5 h-2.5" />K
              </kbd>
            </div>
          </div>

          <div className="flex-1 md:hidden" />

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground border border-white/10 rounded px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              engine.online · v2.0.1
            </span>
            <button className="relative text-muted-foreground hover:text-foreground" aria-label="Notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-cyber-red" />
            </button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary" />
          </div>
        </header>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
