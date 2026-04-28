"use client";

// Static SVG neural-network backdrop used in WorkflowShowcase.
// Dark deep-space feel with red-accented active nodes and animated pulses.

const NODES = [
  // top row
  { id:  0, x: 140,  y: 148, r: 3.0, active: true  },
  { id:  1, x: 318,  y:  78, r: 2.5, active: false },
  { id:  2, x: 500,  y: 158, r: 4.0, active: true  },
  { id:  3, x: 668,  y:  88, r: 2.5, active: false },
  { id:  4, x: 848,  y: 152, r: 3.5, active: false },
  { id:  5, x:1028,  y:  95, r: 2.5, active: true  },
  { id:  6, x:1198,  y: 162, r: 3.0, active: false },
  { id:  7, x:1370,  y: 118, r: 2.5, active: false },
  // middle row
  { id:  8, x:  58,  y: 375, r: 2.5, active: false },
  { id:  9, x: 238,  y: 335, r: 3.5, active: true  },
  { id: 10, x: 428,  y: 405, r: 2.5, active: false },
  { id: 11, x: 638,  y: 358, r: 5.0, active: true  }, // central hub
  { id: 12, x: 828,  y: 418, r: 3.0, active: false },
  { id: 13, x:1018,  y: 352, r: 3.5, active: true  },
  { id: 14, x:1218,  y: 398, r: 2.5, active: false },
  { id: 15, x:1392,  y: 368, r: 3.0, active: false },
  // bottom row
  { id: 16, x: 158,  y: 628, r: 2.5, active: false },
  { id: 17, x: 358,  y: 678, r: 3.0, active: true  },
  { id: 18, x: 548,  y: 608, r: 2.5, active: false },
  { id: 19, x: 728,  y: 668, r: 3.5, active: false },
  { id: 20, x: 908,  y: 618, r: 2.5, active: true  },
  { id: 21, x:1088,  y: 678, r: 3.0, active: false },
  { id: 22, x:1278,  y: 628, r: 3.5, active: false },
  { id: 23, x:1418,  y: 688, r: 2.5, active: false },
];

const EDGES = [
  // top row horizontal
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
  // mid row horizontal
  [8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],
  // bottom row horizontal
  [16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],
  // top→mid vertical
  [0,8],[1,9],[2,10],[3,11],[4,12],[5,13],[6,14],[7,15],
  // mid→bottom vertical
  [8,16],[9,17],[10,18],[11,19],[12,20],[13,21],[14,22],[15,23],
  // diagonals (adds visual complexity)
  [0,9],[1,10],[2,11],[3,12],[4,13],[5,14],[6,15],
  [9,18],[10,19],[11,20],[12,21],[13,22],[14,23],
];

export default function AINetworkBg() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep space gradient base */}
      <div className="absolute inset-0 bg-[#04040e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_20%_40%,rgba(239,68,68,0.09)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_65%,rgba(139,92,246,0.07)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_55%_10%,rgba(239,68,68,0.06)_0%,transparent_50%)]" />

      {/* SVG network */}
      <svg
        viewBox="0 0 1440 900"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Active node glow */}
          <filter id="glow-red" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-soft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {/* Animated dash for "data flowing" on select edges */}
          <style>{`
            @keyframes dash-flow {
              to { stroke-dashoffset: -40; }
            }
            @keyframes node-pulse {
              0%,100% { opacity: 0.9; r: var(--r); }
              50%      { opacity: 1;   r: calc(var(--r) + 2px); }
            }
            .flow-edge {
              stroke-dasharray: 6 10;
              animation: dash-flow 2.4s linear infinite;
            }
            .pulse-node {
              animation: node-pulse 2.8s ease-in-out infinite;
            }
          `}</style>
        </defs>

        {/* Edges */}
        {EDGES.map(([a, b], i) => {
          const na = NODES[a], nb = NODES[b];
          const isFlow = (na.active && nb.active);
          return (
            <line
              key={i}
              x1={na.x} y1={na.y}
              x2={nb.x} y2={nb.y}
              stroke={isFlow ? "rgba(239,68,68,0.30)" : "rgba(255,255,255,0.07)"}
              strokeWidth={isFlow ? 1.2 : 0.8}
              className={isFlow ? "flow-edge" : ""}
              style={isFlow ? { animationDelay: `${i * 0.18}s` } : {}}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((n) => (
          <g key={n.id} filter={n.active ? "url(#glow-red)" : "url(#glow-soft)"}>
            {/* outer halo for active nodes */}
            {n.active && (
              <circle
                cx={n.x} cy={n.y} r={n.r + 5}
                fill="none"
                stroke="rgba(239,68,68,0.18)"
                strokeWidth="1"
              />
            )}
            <circle
              cx={n.x} cy={n.y} r={n.r}
              fill={n.active ? "#ef4444" : "rgba(255,255,255,0.55)"}
              className={n.active ? "pulse-node" : ""}
              style={{ "--r": `${n.r}px` }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
