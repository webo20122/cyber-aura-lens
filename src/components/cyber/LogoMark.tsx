import { Shield } from "lucide-react";

export function LogoMark({ size = 8 }: { size?: number }) {
  return (
    <div
      className="relative rounded-md cyber-card flex items-center justify-center overflow-hidden shrink-0"
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20" />
      <Shield
        className="relative text-primary"
        style={{ width: `${size * 2}px`, height: `${size * 2}px` }}
        strokeWidth={2.2}
      />
    </div>
  );
}

export function WordMark({ pro = true }: { pro?: boolean }) {
  return (
    <span className="flex items-center gap-2 min-w-0">
      <LogoMark />
      <span className="font-semibold tracking-tight text-lg truncate">
        Aether<span className="text-primary">Sec</span>
      </span>
      {pro && (
        <span className="hidden sm:inline ml-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">
          Pro
        </span>
      )}
    </span>
  );
}
