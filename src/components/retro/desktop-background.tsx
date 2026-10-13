export function DesktopBackground() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-desktop"
      >
        <svg
          className="animate-drift absolute -inset-[6%] h-[112%] w-[112%]"
          viewBox="0 0 1000 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            fill="var(--wave-1)"
            d="M-100 120 C 120 40, 300 260, 560 170 S 920 -20, 1100 90 L1100 330 C 900 230, 780 420, 520 380 S 140 250, -100 360 Z"
          />
          <path
            fill="var(--wave-2)"
            d="M-100 520 C 160 430, 320 640, 600 560 S 900 420, 1100 520 L1100 900 L-100 900 Z"
          />
          <path
            fill="var(--wave-1)"
            d="M-100 700 C 200 620, 400 780, 700 700 S 950 640, 1100 700 L1100 900 L-100 900 Z"
          />
        </svg>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--grid-line) 1.5px, transparent 1.6px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
      <div aria-hidden className="grain" />
    </>
  );
}
