"use client";

/**
 * Window-chromed visual placeholder used in the 4-step scroll story.
 * Each variant renders a different CSS-only graphic so the section reads
 * like a product gallery without needing real screenshots. Drop a real
 * image into `/public` and pass it via `src` to override the visual.
 */
export default function StepVisual({ variant, label, footer, src, alt }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-black/5 shadow-card-hover">
      {/* Window chrome */}
      <div className="flex items-center justify-between bg-ink-900/95 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <div className="font-mono text-[11px] text-white/40">
          Pushable AI — {label}
        </div>
        <div className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
          ● LIVE
        </div>
      </div>

      {/* Body — image takes precedence; fallback variants below */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || label}
            className="h-full w-full object-cover"
          />
        ) : (
          <Variant kind={variant} />
        )}

        {/* Floating footer pill — sits over the image */}
        {footer && (
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-800/85 px-3 py-2 text-xs text-white backdrop-blur">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-red/20 text-brand-red">
              {footer.icon}
            </span>
            <div className="leading-tight">
              <div className="font-medium">{footer.title}</div>
              <div className="text-[10px] text-white/55">{footer.subtitle}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// CSS-only fallback graphics, one per step
function Variant({ kind }) {
  if (kind === "design") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(239,68,68,0.25), transparent 55%), radial-gradient(ellipse at 70% 70%, rgba(99,102,241,0.25), transparent 55%), linear-gradient(135deg, #1A1A1A, #0A0A0A)",
        }}
      >
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Faux flow nodes */}
        <div className="absolute left-[18%] top-[40%] h-14 w-28 rounded-md border border-brand-red/40 bg-brand-red/10" />
        <div className="absolute left-[48%] top-[28%] h-14 w-28 rounded-md border border-emerald-400/40 bg-emerald-400/10" />
        <div className="absolute left-[72%] top-[58%] h-14 w-28 rounded-md border border-indigo-400/40 bg-indigo-400/10" />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 28 48 Q 42 36 50 36"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.4"
          />
          <path
            d="M 64 36 Q 70 50 78 64"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="0.4"
          />
        </svg>
      </div>
    );
  }

  if (kind === "connect") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.25), transparent 60%), linear-gradient(135deg, #0F1A14, #0A0A0A)",
        }}
      >
        {/* Server-rack-ish vertical bands */}
        <div className="absolute inset-0 grid grid-cols-12 gap-1 p-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="rounded bg-gradient-to-b from-emerald-400/10 via-amber-400/10 to-rose-400/10"
              style={{ opacity: 0.3 + (i % 4) * 0.15 }}
            />
          ))}
        </div>
        {/* Pulse dots */}
        <div className="absolute left-[20%] top-[50%] h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
        <div
          className="absolute left-[70%] top-[35%] h-2 w-2 animate-pulse rounded-full bg-amber-400"
          style={{ animationDelay: "0.4s" }}
        />
        <div
          className="absolute left-[55%] top-[70%] h-2 w-2 animate-pulse rounded-full bg-brand-red"
          style={{ animationDelay: "0.8s" }}
        />
      </div>
    );
  }

  if (kind === "execute") {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(245,158,11,0.25), transparent 55%), linear-gradient(135deg, #1A1208, #0A0A0A)",
        }}
      >
        {/* Faux dashboard chart */}
        <div className="absolute inset-x-12 bottom-12 flex h-2/3 items-end gap-1.5">
          {[28, 42, 36, 58, 49, 71, 64, 80, 68, 92, 76, 88, 72, 95].map(
            (h, i) => (
              <div
                key={i}
                className="w-full rounded-t bg-gradient-to-t from-amber-500/30 to-amber-300"
                style={{ height: `${h}%` }}
              />
            )
          )}
        </div>
        {/* Tooltip */}
        <div className="absolute left-[42%] top-[28%] rounded-lg border border-white/15 bg-ink-800/90 px-3 py-2 text-[10px] text-white backdrop-blur">
          <div className="text-white/50">Active runs</div>
          <div className="font-display text-base font-semibold text-amber-400">
            2,481
          </div>
        </div>
      </div>
    );
  }

  // optimize
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at 30% 70%, rgba(59,130,246,0.3), transparent 60%), linear-gradient(135deg, #0B1424, #0A0A0A)",
      }}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 60"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 0 50 Q 20 45 30 38 T 60 22 T 100 8"
          stroke="rgba(96,165,250,0.9)"
          strokeWidth="0.6"
        />
        <path
          d="M 0 55 Q 20 52 30 48 T 60 36 T 100 22"
          stroke="rgba(96,165,250,0.4)"
          strokeWidth="0.4"
        />
      </svg>
      {/* Stat pills */}
      <div className="absolute left-6 top-6 rounded-lg border border-white/10 bg-ink-800/80 px-3 py-2 text-[10px] backdrop-blur">
        <div className="text-white/50">Latency</div>
        <div className="font-display text-base font-semibold text-blue-300">
          412ms
        </div>
      </div>
      <div className="absolute right-6 bottom-12 rounded-lg border border-white/10 bg-ink-800/80 px-3 py-2 text-[10px] backdrop-blur">
        <div className="text-white/50">Success</div>
        <div className="font-display text-base font-semibold text-emerald-400">
          99.4%
        </div>
      </div>
    </div>
  );
}
