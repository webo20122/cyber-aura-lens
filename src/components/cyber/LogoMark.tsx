import markUrl from "@/assets/aethersec-mark.png";

export function LogoMark({ size = 8 }: { size?: number }) {
  const px = size * 4;
  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: `${px}px`, height: `${px}px` }}
    >
      <img
        src={markUrl}
        alt="AetherSec"
        width={px}
        height={px}
        className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(45,212,191,0.45)]"
        loading="lazy"
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
