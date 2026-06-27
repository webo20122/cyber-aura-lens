import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/cyber/AppShell";
import { PageHeader, SeverityChip } from "@/components/cyber/PageHeader";
import { notifications as initial } from "@/lib/mock/data";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — AetherSec" }] }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const [items, setItems] = useState(initial);
  const markAll = () => setItems(items.map((i) => ({ ...i, read: true })));

  return (
    <AppShell>
      <div className="px-4 sm:px-6 py-6 max-w-[900px] mx-auto">
        <PageHeader
          crumb={["workspace", "atlas-ops", "notifications"]}
          title="Notifications"
          subtitle={`${items.filter((i) => !i.read).length} unread`}
          actions={
            <button onClick={markAll} className="inline-flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.05]">
              <Check className="w-3.5 h-3.5" /> Mark all read
            </button>
          }
        />

        <div className="cyber-card divide-y divide-white/[0.04]">
          {items.map((n) => (
            <button
              key={n.id}
              onClick={() => setItems(items.map((i) => i.id === n.id ? { ...i, read: true } : i))}
              className={`w-full text-left p-4 grid grid-cols-[auto_minmax(0,1fr)_auto] gap-3 items-start hover:bg-white/[0.02] transition ${
                !n.read ? "bg-primary/[0.03]" : ""
              }`}
            >
              <span className={`mt-1 w-1.5 h-1.5 rounded-full ${n.read ? "bg-transparent" : "bg-primary"}`} />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <SeverityChip severity={n.severity} />
                  <span className="text-xs font-medium truncate">{n.title}</span>
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">{n.body}</div>
              </div>
              <span className="text-[10px] font-mono text-muted-foreground shrink-0">{n.time}</span>
            </button>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
