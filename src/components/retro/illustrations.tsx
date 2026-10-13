const keyRows = [
  { y: 160, count: 10, x: 46 },
  { y: 171, count: 9, x: 54 },
];

export function RetroComputer({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 200"
      role="img"
      aria-label="Retro computer"
      className={className}
      strokeLinejoin="round"
    >
      <g
        className="animate-float"
        style={{ ["--float-rot" as string]: "12deg", transformOrigin: "190px 28px" }}
      >
        <rect
          x="172"
          y="10"
          width="38"
          height="38"
          className="fill-primary stroke-foreground"
          strokeWidth="3"
        />
        <rect x="178" y="10" width="22" height="13" className="fill-accent" />
        <rect x="181" y="30" width="26" height="14" className="fill-background" />
      </g>

      <rect
        x="34"
        y="12"
        width="140"
        height="112"
        rx="6"
        className="fill-background stroke-foreground"
        strokeWidth="4"
      />
      <rect
        x="48"
        y="26"
        width="112"
        height="80"
        rx="4"
        className="fill-black stroke-foreground"
        strokeWidth="4"
      />
      <g className="fill-white">
        <rect x="58" y="40" width="52" height="6" />
        <rect x="58" y="54" width="74" height="6" />
        <rect x="58" y="68" width="38" height="6" />
        <rect x="58" y="82" width="62" height="6" />
      </g>
      <rect
        x="102"
        y="67"
        width="10"
        height="8"
        className="animate-blink fill-white"
      />
      <circle cx="154" cy="116" r="3" className="fill-primary" />

      <rect
        x="78"
        y="124"
        width="52"
        height="10"
        className="fill-background stroke-foreground"
        strokeWidth="4"
      />
      <rect
        x="58"
        y="134"
        width="92"
        height="9"
        className="fill-accent stroke-foreground"
        strokeWidth="4"
      />

      <rect
        x="30"
        y="150"
        width="148"
        height="38"
        rx="3"
        className="fill-accent stroke-foreground"
        strokeWidth="4"
      />
      {keyRows.map((row) =>
        Array.from({ length: row.count }, (_, i) => (
          <rect
            key={`${row.y}-${i}`}
            x={row.x + i * 12.5}
            y={row.y}
            width="9"
            height="6"
            className="fill-background"
          />
        )),
      )}
      <rect x="66" y="179" width="76" height="5" className="fill-background" />
    </svg>
  );
}

export function PixelCursor({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 28"
      aria-hidden
      className={className}
      strokeLinejoin="miter"
    >
      <polygon
        points="2,2 2,22 7,17.5 10.5,25.5 14,24 10.5,16 17,16"
        className="fill-foreground stroke-background"
        strokeWidth="2"
      />
    </svg>
  );
}
