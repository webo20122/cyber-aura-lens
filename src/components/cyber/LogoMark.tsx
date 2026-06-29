import markUrl from "@/assets/aethersec-mark-white.png";

export function LogoMark({
  size = 8,
  variant = "crown",
}: {
  size?: number;
  variant?: "equal" | "crown";
}) {
  const px = size * 4;

  if (variant === "crown") {
    return (
      <svg
        width={px}
        height={px}
        viewBox="0 0 32 32"
        fill="none"
        className="shrink-0 drop-shadow-[0_0_6px_rgba(45,212,191,0.45)]"
        aria-label="AetherSec"
      >
        {/* three diagonal slashes, middle tallest */}
        <path
          d="M8 22L14 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M14 24L20 8"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M20 22L26 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

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
        className="w-full h-full object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.25)]"
        loading="lazy"
      />
    </div>
  );
}

export function WordMark({ pro = true }: { pro?: boolean }) {
  return (
    <span className="flex items-center gap-2 min-w-0 text-white">
      <LogoMark variant="crown" />
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
