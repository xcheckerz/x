/**
 * MountainBackground Component
 * Design: Frost Clinic — 雪山の背景SVG
 * 参照サイトの雪山シルエットを再現
 */

export default function MountainBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0"
      style={{ zIndex: 0 }}
    >
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
        preserveAspectRatio="xMidYMax slice"
        style={{ height: "60vh", minHeight: "420px", zIndex: 0 }}
        viewBox="0 0 1440 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mt-back" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c7d2fe" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#a5b4fc" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="mt-mid" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#93c5fd" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="mt-front" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="mt-snow-cap" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Back mountains */}
        <path
          d="M0,420 L120,300 L220,360 L340,240 L450,320 L560,260 L700,340 L830,220 L950,300 L1080,240 L1200,320 L1320,260 L1440,340 L1440,600 L0,600 Z"
          fill="url(#mt-back)"
        />
        <path
          d="M0,420 L120,300 L220,360 L340,240 L450,320 L560,260 L700,340 L830,220 L950,300 L1080,240 L1200,320 L1320,260 L1440,340 L1440,380 L0,460 Z"
          fill="url(#mt-snow-cap)"
          opacity="0.8"
        />

        {/* Mid mountains */}
        <path
          d="M0,500 L100,420 L200,470 L320,360 L440,440 L580,380 L720,460 L860,360 L1000,420 L1140,380 L1260,440 L1380,400 L1440,440 L1440,600 L0,600 Z"
          fill="url(#mt-mid)"
        />
        <path
          d="M0,500 L100,420 L200,470 L320,360 L440,440 L580,380 L720,460 L860,360 L1000,420 L1140,380 L1260,440 L1380,400 L1440,440 L1440,470 L0,530 Z"
          fill="url(#mt-snow-cap)"
          opacity="0.7"
        />

        {/* Front mountains */}
        <path
          d="M0,560 L80,510 L180,550 L280,470 L380,530 L500,490 L620,540 L740,480 L860,520 L980,500 L1120,540 L1260,490 L1380,530 L1440,510 L1440,600 L0,600 Z"
          fill="url(#mt-front)"
        />

        {/* Snow lines */}
        <g fill="none" stroke="rgba(147,197,253,0.45)" strokeWidth="1.2">
          <path d="M0,540 Q180,520 360,545 T720,540 T1080,545 T1440,540" />
          <path d="M0,575 Q180,565 360,582 T720,578 T1080,582 T1440,578" opacity="0.6" />
        </g>
        <g fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.9">
          <path d="M0,558 Q200,548 400,562 T800,560 T1200,562 T1440,560" />
        </g>
      </svg>
    </div>
  );
}
