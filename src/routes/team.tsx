import { createFileRoute } from "@tanstack/react-router";
import { Plus, MoreVertical, Mail } from "lucide-react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader } from "@/components/cyber/PageHeader";
import { teamMembers } from "@/lib/mock/data";

export const Route = createFileRoute("/team")({
  head: () => ({ meta: [{ title: "Team — AetherSec" }] }),
  component: TeamPage,
});

const statusColor: Record<string, string> = {
  online: "bg-cyber-green",
  idle: "bg-cyber-yellow",
  offline: "bg-muted-foreground",
};

function TeamPage() {
  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[1600px] mx-auto">
        <PageHeader
          crumb={["workspace", "atlas-ops", "team"]}
          title="Team"
          subtitle={`${teamMembers.length} members · 1 owner · 1 operator`}
          actions={
            <button className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-md bg-primary text-primary-foreground glow-cyan hover:brightness-110">
              <Plus className="w-3.5 h-3.5" /> Invite member
            </button>
          }
        />

        <div className="cyber-card overflow-hidden">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground border-b border-white/[0.06]">
              <tr className="text-left">
                <th className="px-4 py-2 font-normal">Member</th>
                <th className="px-4 py-2 font-normal">Role</th>
                <th className="px-4 py-2 font-normal">Status</th>
                <th className="px-4 py-2 font-normal text-right"></th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((u) => (
                <tr key={u.id} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[11px] font-mono font-medium shrink-0">
                        {u.initials}
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-background ${statusColor[u.status]}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-foreground truncate">{u.name}</div>
                        <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1 truncate"><Mail className="w-2.5 h-2.5" /> {u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono uppercase text-[10px] text-primary">{u.role}</td>
                  <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground capitalize">{u.status}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-1.5 text-muted-foreground hover:text-foreground"><MoreVertical className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
