"use client";

// Orbital AI brain visualization — concentric rings of agent nodes
// with animated data flows and pulsing core. Matches the dark AI theme.

const cx = 210; // SVG center x
const cy = 210; // SVG center y

// ── Ring definitions ──────────────────────────────────────────────────────
const RINGS = [
  { r: 72,  speed: 28, nodes: ["Finance", "HR", "Sales", "Ops",   "Legal",  "Mkt"] },
  { r: 130, speed: 42, nodes: ["Invoice", "Hire", "CRM",  "SOP",  "Audit",  "SEO", "Pay",  "Onboard"] },
  { r: 188, speed: 60, nodes: ["API",  "Email", "PDF", "Sheet", "Slack", "Drive", "Notion", "HubSpot", "Xero", "Cal"] },
];

// Compute evenly-spaced node positions for a ring
function ringNodes(r, count, angleOffset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const angle = angleOffset + (i / count) * 2 * Math.PI;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
}

// A handful of "active" connection pairs (innerIdx → middleIdx etc.)
const SPOKES = [
  [0, 0], [1, 2], [2, 4], [3, 6], [4, 1], [5, 5],
];
const CROSS   = [[0, 0], [2, 3], [4, 6], [6, 9], [1, 2], [3, 5]];

export default function AIBrainVisual({ dimmed }) {
  const inner  = ringNodes(RINGS[0].r, RINGS[0].nodes.length, 0);
  const middle = ringNodes(RINGS[1].r, RINGS[1].nodes.length, 0.4);
  const outer  = ringNodes(RINGS[2].r, RINGS[2].nodes.length, 0.2);

  return (
    <div
      className="relative transition-opacity duration-700"
      style={{ opacity: dimmed ? 0.12 : 1, width: 420, height: 420 }}
    >
      <svg
        viewBox="0 0 420 420"
        width="420" height="420"
        className="overflow-visible"
      >
        <defs>
          {/* Core glow */}
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="1"   />
            <stop offset="50%"  stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0"   />
          </radialGradient>

          {/* Node glow */}
          <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0"   />
          </radialGradient>

          {/* Faint node */}
          <radialGradient id="nodeFaint" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0"   />
          </radialGradient>

          <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="softglow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="corebloom" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="14" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>

          <style>{`
            @keyframes spin-cw  { to { transform: rotate(360deg);  transform-origin: ${cx}px ${cy}px; } }
            @keyframes spin-ccw { to { transform: rotate(-360deg); transform-origin: ${cx}px ${cy}px; } }
            @keyframes pulse-core {
              0%,100% { opacity:.9; r:20; }
              50%     { opacity:1;  r:24; }
            }
            @keyframes pulse-node {
              0%,100% { opacity:.7; }
              50%     { opacity:1;  }
            }
            @keyframes dash-flow {
              to { stroke-dashoffset: -36; }
            }
            @keyframes particle {
              0%   { offset-distance: 0%;   opacity:0;   }
              10%  { opacity:1; }
              90%  { opacity:1; }
              100% { offset-distance: 100%; opacity:0; }
            }
            .ring-inner  { animation: spin-cw  ${RINGS[0].speed}s linear infinite; transform-origin: ${cx}px ${cy}px; }
            .ring-middle { animation: spin-ccw ${RINGS[1].speed}s linear infinite; transform-origin: ${cx}px ${cy}px; }
            .ring-outer  { animation: spin-cw  ${RINGS[2].speed}s linear infinite; transform-origin: ${cx}px ${cy}px; }
          `}</style>
        </defs>

        {/* ── Faint concentric reference circles ── */}
        {[RINGS[0].r, RINGS[1].r, RINGS[2].r].map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r}
            fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        ))}

        {/* ── Spoke lines: inner → middle (static faint) ── */}
        {SPOKES.map(([ii, mi], k) => (
          <line key={`s${k}`}
            x1={inner[ii].x}  y1={inner[ii].y}
            x2={middle[mi].x} y2={middle[mi].y}
            stroke="rgba(239,68,68,0.18)" strokeWidth="0.8"
            strokeDasharray="4 8"
            style={{ animation: `dash-flow ${2.5 + k * 0.4}s linear infinite` }}
          />
        ))}
        {/* middle → outer */}
        {CROSS.map(([mi, oi], k) => (
          <line key={`c${k}`}
            x1={middle[mi].x} y1={middle[mi].y}
            x2={outer[oi].x}  y2={outer[oi].y}
            stroke="rgba(255,255,255,0.07)" strokeWidth="0.7"
            strokeDasharray="3 10"
            style={{ animation: `dash-flow ${3 + k * 0.3}s linear infinite` }}
          />
        ))}
        {/* core → all inner nodes */}
        {inner.map((n, i) => (
          <line key={`ci${i}`}
            x1={cx} y1={cy} x2={n.x} y2={n.y}
            stroke="rgba(239,68,68,0.20)" strokeWidth="0.9"
            strokeDasharray="5 7"
            style={{ animation: `dash-flow ${2 + i * 0.2}s linear infinite` }}
          />
        ))}

        {/* ── Outer ring (rotates CW) ── */}
        <g className="ring-outer">
          {outer.map((n, i) => (
            <g key={`o${i}`} filter="url(#softglow)">
              <circle cx={n.x} cy={n.y} r={9}  fill="url(#nodeFaint)" opacity="0.3" />
              <circle cx={n.x} cy={n.y} r={3}  fill="rgba(255,255,255,0.55)" />
              <text x={n.x} y={n.y - 10} textAnchor="middle"
                fill="rgba(255,255,255,0.35)" fontSize="7" fontFamily="monospace">
                {RINGS[2].nodes[i]}
              </text>
            </g>
          ))}
        </g>

        {/* ── Middle ring (rotates CCW) ── */}
        <g className="ring-middle">
          {middle.map((n, i) => {
            const active = [0, 2, 5].includes(i);
            return (
              <g key={`m${i}`} filter={active ? "url(#glow)" : "url(#softglow)"}>
                <circle cx={n.x} cy={n.y} r={active ? 14 : 10}
                  fill={active ? "url(#nodeGrad)" : "url(#nodeFaint)"}
                  opacity={active ? 0.55 : 0.25}
                  style={active ? { animation: `pulse-node ${2.2 + i * 0.3}s ease-in-out infinite` } : {}}
                />
                <circle cx={n.x} cy={n.y} r={active ? 4 : 2.5}
                  fill={active ? "#ef4444" : "rgba(255,255,255,0.6)"}
                />
                <text x={n.x} y={n.y - 12} textAnchor="middle"
                  fill={active ? "rgba(239,68,68,0.9)" : "rgba(255,255,255,0.4)"}
                  fontSize="8" fontFamily="monospace" fontWeight={active ? "bold" : "normal"}>
                  {RINGS[1].nodes[i]}
                </text>
              </g>
            );
          })}
        </g>

        {/* ── Inner ring (rotates CW) ── */}
        <g className="ring-inner">
          {inner.map((n, i) => (
            <g key={`i${i}`} filter="url(#glow)">
              <circle cx={n.x} cy={n.y} r={18}
                fill="url(#nodeGrad)" opacity="0.45"
                style={{ animation: `pulse-node ${2.8 + i * 0.4}s ease-in-out infinite` }}
              />
              <circle cx={n.x} cy={n.y} r={5} fill="#ef4444" />
              <text x={n.x} y={n.y - 14} textAnchor="middle"
                fill="rgba(239,68,68,1)" fontSize="9" fontFamily="monospace" fontWeight="bold">
                {RINGS[0].nodes[i]}
              </text>
            </g>
          ))}
        </g>

        {/* ── Core ── */}
        <g filter="url(#corebloom)">
          <circle cx={cx} cy={cy} r={44} fill="url(#coreGrad)" opacity="0.35" />
        </g>
        <g filter="url(#glow)">
          <circle cx={cx} cy={cy} r={22} fill="#ef4444" opacity="0.25" />
          <circle cx={cx} cy={cy} r={20} fill="#ef4444"
            style={{ animation: "pulse-core 2s ease-in-out infinite" }} />
          <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle"
            fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">
            AI
          </text>
        </g>
      </svg>

    </div>
  );
}
