export type Severity = "Critical" | "High" | "Medium" | "Low" | "Info";

export const severityColor: Record<Severity, string> = {
  Critical: "text-cyber-red",
  High: "text-cyber-orange",
  Medium: "text-cyber-yellow",
  Low: "text-primary",
  Info: "text-secondary",
};

export const severityBg: Record<Severity, string> = {
  Critical: "bg-cyber-red",
  High: "bg-cyber-orange",
  Medium: "bg-cyber-yellow",
  Low: "bg-primary",
  Info: "bg-secondary",
};

export type ScanStatus = "running" | "completed" | "failed" | "pending";

export interface MockScan {
  id: string;
  target: string;
  status: ScanStatus;
  severity: Severity;
  progress: number;
  startedAt: string;
  profile?: string;
  modules?: number;
  operator?: string;
}

export const scans: MockScan[] = [
  { id: "scan_7df2", target: "10.20.14.0/24", status: "running", severity: "Critical", progress: 64, startedAt: "2m ago", profile: "Deep", modules: 52, operator: "alex.chen" },
  { id: "scan_7df1", target: "vault.atlas.io", status: "completed", severity: "High", progress: 100, startedAt: "1h ago", profile: "Standard", modules: 31, operator: "alex.chen" },
  { id: "scan_7df0", target: "192.168.10.0/16", status: "completed", severity: "Medium", progress: 100, startedAt: "3h ago", profile: "Recon", modules: 18, operator: "ops.bot" },
  { id: "scan_7dee", target: "ad.corp.local", status: "failed", severity: "Critical", progress: 38, startedAt: "5h ago", profile: "Red-Team", modules: 64, operator: "j.park" },
  { id: "scan_7ded", target: "aws://prod-vpc", status: "pending", severity: "Low", progress: 0, startedAt: "queued", profile: "Standard", modules: 31, operator: "alex.chen" },
  { id: "scan_7dec", target: "edge.atlas.io", status: "completed", severity: "Info", progress: 100, startedAt: "yesterday", profile: "Recon", modules: 18, operator: "ops.bot" },
  { id: "scan_7deb", target: "k8s://prod-cluster", status: "completed", severity: "High", progress: 100, startedAt: "2d ago", profile: "Deep", modules: 52, operator: "j.park" },
  { id: "scan_7dea", target: "github://atlas-org", status: "completed", severity: "Medium", progress: 100, startedAt: "3d ago", profile: "Standard", modules: 31, operator: "alex.chen" },
];

export interface MockFinding {
  cve: string;
  title: string;
  severity: Severity;
  asset: string;
  status: "open" | "triage" | "patching" | "remediated";
  detected: string;
  cvss?: number;
  exploit?: string;
}

export const findings: MockFinding[] = [
  { cve: "CVE-2024-21893", title: "Ivanti Connect Secure SSRF", severity: "Critical", asset: "10.20.14.42", status: "open", detected: "2h ago", cvss: 9.8, exploit: "weaponized" },
  { cve: "CVE-2024-3094", title: "XZ Utils backdoor", severity: "High", asset: "build-srv-01", status: "triage", detected: "4h ago", cvss: 8.1, exploit: "poc" },
  { cve: "CVE-2023-4863", title: "libwebp heap overflow", severity: "High", asset: "edge.atlas.io", status: "open", detected: "1d ago", cvss: 8.8, exploit: "weaponized" },
  { cve: "CVE-2024-1086", title: "Linux netfilter UAF", severity: "Medium", asset: "vault.atlas.io", status: "patching", detected: "1d ago", cvss: 7.8, exploit: "poc" },
  { cve: "CVE-2024-6387", title: "regreSSHion (OpenSSH)", severity: "Critical", asset: "10.20.14.51", status: "remediated", detected: "3d ago", cvss: 9.2, exploit: "weaponized" },
  { cve: "CVE-2023-46604", title: "ActiveMQ RCE", severity: "Medium", asset: "mq.prod.local", status: "open", detected: "3d ago", cvss: 7.4, exploit: "weaponized" },
  { cve: "CVE-2024-23897", title: "Jenkins CLI arbitrary read", severity: "High", asset: "ci.atlas.io", status: "triage", detected: "5d ago", cvss: 8.4, exploit: "weaponized" },
  { cve: "CVE-2023-50164", title: "Struts2 path traversal RCE", severity: "Critical", asset: "legacy-app-03", status: "open", detected: "5d ago", cvss: 9.6, exploit: "weaponized" },
];

export const severityBars = [
  { l: "Critical" as Severity, v: 88, c: "from-cyber-red to-cyber-red/40" },
  { l: "High" as Severity, v: 64, c: "from-cyber-orange to-cyber-orange/40" },
  { l: "Medium" as Severity, v: 48, c: "from-cyber-yellow to-cyber-yellow/40" },
  { l: "Low" as Severity, v: 30, c: "from-primary to-primary/30" },
  { l: "Info" as Severity, v: 18, c: "from-secondary to-secondary/30" },
];

export const terminalLines = [
  "[+] aethersec cognitive-engine v2.0.1",
  "[*] target acquired: 10.20.14.0/24",
  "[*] phase=recon  module=nmap         hosts=42  ports=1284",
  "[*] phase=recon  module=httpx        web=18    tls=12",
  "[*] phase=recon  module=subfinder    subs=64",
  "[+] enumerated AD: corp.local (3 DCs, 412 users)",
  "[*] phase=exploit module=nuclei      templates=4821",
  "[!] CVE-2024-21893 confirmed on 10.20.14.42 (Ivanti)",
  "[*] reasoning: pivot via SSRF → metadata svc",
  "[+] foothold established: web-edge-01",
  "[*] phase=lateral module=impacket    cred=NTLM/relay",
  "[!] dumped DCSync hashes (krbtgt)",
  "[*] attack-path: edge → web → DC → tier-0",
  "[+] mission complete. evidence pack signed.",
];

export interface MockAsset {
  id: string;
  name: string;
  type: "host" | "domain" | "container" | "cloud" | "repo";
  env: "prod" | "stage" | "dev";
  exposure: "internet" | "internal" | "restricted";
  risk: Severity;
  findings: number;
  lastSeen: string;
}

export const assets: MockAsset[] = [
  { id: "a01", name: "10.20.14.42", type: "host", env: "prod", exposure: "internet", risk: "Critical", findings: 7, lastSeen: "2m ago" },
  { id: "a02", name: "vault.atlas.io", type: "domain", env: "prod", exposure: "internet", risk: "High", findings: 4, lastSeen: "1h ago" },
  { id: "a03", name: "edge.atlas.io", type: "domain", env: "prod", exposure: "internet", risk: "High", findings: 3, lastSeen: "1h ago" },
  { id: "a04", name: "k8s://prod-cluster/web-edge", type: "container", env: "prod", exposure: "internet", risk: "Medium", findings: 5, lastSeen: "3h ago" },
  { id: "a05", name: "aws://prod-vpc/i-08af...", type: "cloud", env: "prod", exposure: "internal", risk: "Medium", findings: 2, lastSeen: "3h ago" },
  { id: "a06", name: "ad.corp.local", type: "host", env: "prod", exposure: "restricted", risk: "Critical", findings: 9, lastSeen: "5h ago" },
  { id: "a07", name: "github://atlas-org/payments", type: "repo", env: "prod", exposure: "internal", risk: "Low", findings: 1, lastSeen: "3d ago" },
  { id: "a08", name: "build-srv-01", type: "host", env: "stage", exposure: "internal", risk: "High", findings: 2, lastSeen: "4h ago" },
  { id: "a09", name: "ci.atlas.io", type: "domain", env: "prod", exposure: "internal", risk: "High", findings: 3, lastSeen: "5d ago" },
  { id: "a10", name: "legacy-app-03", type: "host", env: "prod", exposure: "internet", risk: "Critical", findings: 6, lastSeen: "5d ago" },
];

export interface MockReport {
  id: string;
  title: string;
  engagement: string;
  generated: string;
  pages: number;
  status: "ready" | "generating" | "draft";
  format: "PDF" | "Markdown" | "JSON";
}

export const reports: MockReport[] = [
  { id: "rpt_412", title: "Q2 Red-Team — Atlas Production", engagement: "scan_7dee", generated: "1h ago", pages: 84, status: "ready", format: "PDF" },
  { id: "rpt_411", title: "Vault perimeter assessment", engagement: "scan_7df1", generated: "3h ago", pages: 32, status: "ready", format: "PDF" },
  { id: "rpt_410", title: "Internal recon — 192.168/16", engagement: "scan_7df0", generated: "yesterday", pages: 21, status: "ready", format: "Markdown" },
  { id: "rpt_409", title: "K8s cluster posture", engagement: "scan_7deb", generated: "2d ago", pages: 47, status: "ready", format: "PDF" },
  { id: "rpt_408", title: "Supply-chain audit — github://atlas-org", engagement: "scan_7dea", generated: "generating", pages: 0, status: "generating", format: "PDF" },
];

export interface MockIntegration {
  id: string;
  name: string;
  category: "SIEM" | "Ticketing" | "Chat" | "Code" | "Cloud";
  status: "connected" | "available" | "error";
  detail: string;
}

export const integrations: MockIntegration[] = [
  { id: "jira", name: "Jira", category: "Ticketing", status: "connected", detail: "atlas-ops · 142 issues synced" },
  { id: "slack", name: "Slack", category: "Chat", status: "connected", detail: "#sec-ops · realtime alerts" },
  { id: "splunk", name: "Splunk", category: "SIEM", status: "error", detail: "auth expired · re-authorize" },
  { id: "github", name: "GitHub", category: "Code", status: "connected", detail: "atlas-org · 14 repos" },
  { id: "aws", name: "AWS", category: "Cloud", status: "connected", detail: "2 accounts · 14 regions" },
  { id: "gcp", name: "Google Cloud", category: "Cloud", status: "available", detail: "connect to enumerate projects" },
  { id: "azure", name: "Azure", category: "Cloud", status: "available", detail: "connect tenant for scanning" },
  { id: "elastic", name: "Elastic SIEM", category: "SIEM", status: "available", detail: "stream findings into ECS" },
  { id: "linear", name: "Linear", category: "Ticketing", status: "available", detail: "auto-create issues from findings" },
  { id: "teams", name: "MS Teams", category: "Chat", status: "available", detail: "channel alerts + summaries" },
];

export interface MockPathNode {
  id: string;
  label: string;
  kind: "edge" | "host" | "service" | "identity" | "data";
  severity: Severity;
}

export const attackPath = {
  nodes: [
    { id: "n1", label: "edge.atlas.io", kind: "edge", severity: "High" },
    { id: "n2", label: "web-edge-01", kind: "host", severity: "Critical" },
    { id: "n3", label: "metadata svc", kind: "service", severity: "High" },
    { id: "n4", label: "iam-role/build", kind: "identity", severity: "High" },
    { id: "n5", label: "ad.corp.local", kind: "host", severity: "Critical" },
    { id: "n6", label: "krbtgt", kind: "identity", severity: "Critical" },
    { id: "n7", label: "tier-0 vault", kind: "data", severity: "Critical" },
  ] as MockPathNode[],
  edges: [
    { from: "n1", to: "n2", label: "SSRF (CVE-2024-21893)" },
    { from: "n2", to: "n3", label: "metadata leak" },
    { from: "n3", to: "n4", label: "assume-role" },
    { from: "n2", to: "n5", label: "NTLM relay" },
    { from: "n5", to: "n6", label: "DCSync" },
    { from: "n6", to: "n7", label: "golden ticket" },
  ],
};

export interface MockNotification {
  id: string;
  title: string;
  body: string;
  severity: Severity;
  time: string;
  read: boolean;
}

export const notifications: MockNotification[] = [
  { id: "n01", title: "Critical: regreSSHion confirmed", body: "10.20.14.51 · exploit weaponized", severity: "Critical", time: "2m", read: false },
  { id: "n02", title: "Scan completed", body: "vault.atlas.io · 4 new findings", severity: "High", time: "1h", read: false },
  { id: "n03", title: "Jira sync ok", body: "12 issues opened in atlas-ops", severity: "Info", time: "1h", read: true },
  { id: "n04", title: "Splunk connector failed", body: "re-authorize in Integrations", severity: "Medium", time: "3h", read: true },
  { id: "n05", title: "Weekly report ready", body: "Q2 Red-Team — Atlas Production", severity: "Info", time: "1d", read: true },
];

export const teamMembers = [
  { id: "u1", name: "Alex Chen", email: "alex@atlas.io", role: "owner", initials: "AC", status: "online" },
  { id: "u2", name: "Jamie Park", email: "jamie@atlas.io", role: "operator", initials: "JP", status: "online" },
  { id: "u3", name: "Rin Okafor", email: "rin@atlas.io", role: "analyst", initials: "RO", status: "idle" },
  { id: "u4", name: "Marco Diaz", email: "marco@atlas.io", role: "auditor", initials: "MD", status: "offline" },
];
