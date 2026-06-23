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
}

export const scans: MockScan[] = [
  { id: "scan_7df2", target: "10.20.14.0/24", status: "running", severity: "Critical", progress: 64, startedAt: "2m ago" },
  { id: "scan_7df1", target: "vault.atlas.io", status: "completed", severity: "High", progress: 100, startedAt: "1h ago" },
  { id: "scan_7df0", target: "192.168.10.0/16", status: "completed", severity: "Medium", progress: 100, startedAt: "3h ago" },
  { id: "scan_7dee", target: "ad.corp.local", status: "failed", severity: "Critical", progress: 38, startedAt: "5h ago" },
  { id: "scan_7ded", target: "aws://prod-vpc", status: "pending", severity: "Low", progress: 0, startedAt: "queued" },
  { id: "scan_7dec", target: "edge.atlas.io", status: "completed", severity: "Info", progress: 100, startedAt: "yesterday" },
];

export interface MockFinding {
  cve: string;
  title: string;
  severity: Severity;
  asset: string;
  status: "open" | "triage" | "patching" | "remediated";
  detected: string;
}

export const findings: MockFinding[] = [
  { cve: "CVE-2024-21893", title: "Ivanti Connect Secure SSRF", severity: "Critical", asset: "10.20.14.42", status: "open", detected: "2h ago" },
  { cve: "CVE-2024-3094", title: "XZ Utils backdoor", severity: "High", asset: "build-srv-01", status: "triage", detected: "4h ago" },
  { cve: "CVE-2023-4863", title: "libwebp heap overflow", severity: "High", asset: "edge.atlas.io", status: "open", detected: "1d ago" },
  { cve: "CVE-2024-1086", title: "Linux netfilter UAF", severity: "Medium", asset: "vault.atlas.io", status: "patching", detected: "1d ago" },
  { cve: "CVE-2024-6387", title: "regreSSHion (OpenSSH)", severity: "Critical", asset: "10.20.14.51", status: "remediated", detected: "3d ago" },
  { cve: "CVE-2023-46604", title: "ActiveMQ RCE", severity: "Medium", asset: "mq.prod.local", status: "open", detected: "3d ago" },
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
