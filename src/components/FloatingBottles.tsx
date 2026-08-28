import { useEffect, useRef } from "react";

import bottle1 from "@/assets/bottle-1.png";
import bottle2 from "@/assets/bottle-2.png";
import bottle3 from "@/assets/bottle-3.png";
import bottle4 from "@/assets/bottle-4.png";
import bottle5 from "@/assets/bottle-5.png";
import bottle6 from "@/assets/bottle-6.png";
import bottle7 from "@/assets/bottle-7.png";
import bottle8 from "@/assets/bottle-8.png";
import bottle9 from "@/assets/bottle-9.png";
import bottle10 from "@/assets/bottle-10.png";

interface BottleSpec {
  src: string;
  alt: string;
  /** position as % of viewport */
  top: number;
  left: number;
  /** bottle height in px (desktop baseline, scales with clamp) */
  size: number;
  /** parallax depth: higher = moves more with the mouse */
  depth: number;
  tilt: number;
  dur: number;
  delay: number;
  driftX: number;
  floatY: number;
  halo: string;
  z: number;
}

const BOTTLES: BottleSpec[] = [
  { src: bottle1, alt: "Amber glass bottle", top: 12, left: 6, size: 300, depth: 1.4, tilt: -8, dur: 9.5, delay: -2, driftX: 18, floatY: 30, halo: "oklch(0.85 0.17 80 / 0.35)", z: 3 },
  { src: bottle2, alt: "Cobalt blue soda bottle", top: 55, left: 12, size: 260, depth: 0.8, tilt: 6, dur: 11, delay: -5, driftX: 14, floatY: 24, halo: "oklch(0.7 0.18 250 / 0.4)", z: 2 },
  { src: bottle3, alt: "Emerald green bottle", top: 18, left: 78, size: 280, depth: 1.2, tilt: 9, dur: 10, delay: -1, driftX: 20, floatY: 28, halo: "oklch(0.8 0.16 150 / 0.35)", z: 3 },
  { src: bottle4, alt: "Frosted pink bottle", top: 62, left: 84, size: 240, depth: 0.7, tilt: -6, dur: 12, delay: -7, driftX: 12, floatY: 22, halo: "oklch(0.8 0.15 10 / 0.4)", z: 2 },
  { src: bottle5, alt: "Vintage milk bottle", top: 6, left: 38, size: 230, depth: 0.6, tilt: 3, dur: 13, delay: -4, driftX: 10, floatY: 20, halo: "oklch(0.95 0.01 90 / 0.3)", z: 1 },
  { src: bottle6, alt: "Violet bottle with gold cap", top: 68, left: 40, size: 210, depth: 1.6, tilt: -10, dur: 8.5, delay: -3, driftX: 22, floatY: 34, halo: "oklch(0.65 0.22 300 / 0.45)", z: 4 },
  { src: bottle7, alt: "Turquoise craft soda bottle", top: 30, left: 55, size: 320, depth: 1.0, tilt: 5, dur: 10.5, delay: -6, driftX: 16, floatY: 26, halo: "oklch(0.85 0.14 185 / 0.4)", z: 3 },
  { src: bottle8, alt: "Ruby red bottle", top: 42, left: 28, size: 200, depth: 1.8, tilt: 12, dur: 8, delay: -1.5, driftX: 24, floatY: 36, halo: "oklch(0.7 0.22 25 / 0.45)", z: 4 },
  { src: bottle9, alt: "Smoked gray bottle", top: 70, left: 62, size: 250, depth: 0.9, tilt: -4, dur: 11.5, delay: -8, driftX: 13, floatY: 23, halo: "oklch(0.8 0.02 260 / 0.3)", z: 2 },
  { src: bottle10, alt: "Honey yellow bottle", top: 20, left: 20, size: 190, depth: 2.0, tilt: 14, dur: 7.5, delay: -2.5, driftX: 26, floatY: 38, halo: "oklch(0.88 0.16 95 / 0.45)", z: 5 },
];

const ORBS = [
  { top: "-10%", left: "-8%", size: "46vw", color: "oklch(0.55 0.18 300 / 0.28)", dur: 26, delay: 0 },
  { top: "50%", left: "62%", size: "42vw", color: "oklch(0.6 0.16 210 / 0.24)", dur: 22, delay: -8 },
  { top: "62%", left: "-6%", size: "34vw", color: "oklch(0.65 0.17 80 / 0.2)", dur: 30, delay: -14 },
  { top: "-6%", left: "58%", size: "30vw", color: "oklch(0.6 0.2 350 / 0.2)", dur: 24, delay: -4 },
];

const SPARKLES = Array.from({ length: 42 }, (_, i) => ({
  top: `${(i * 37.7) % 100}%`,
  left: `${(i * 61.3) % 100}%`,
  size: 1.5 + ((i * 7) % 3),
  dur: 3 + ((i * 13) % 5),
  delay: -((i * 17) % 8),
}));

/** Smooth lerped mouse parallax applied to the whole stage. */
function useParallax(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      x += (targetX - x) * 0.045;
      y += (targetY - y) * 0.045;
      stage.style.setProperty("--px", x.toFixed(4));
      stage.style.setProperty("--py", y.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

export function FloatingBottles() {
  const stageRef = useRef<HTMLDivElement>(null);
  useParallax(stageRef);

  return (
    <div
      ref={stageRef}
      className="relative h-dvh w-full overflow-hidden"
      style={{ "--px": 0, "--py": 0 } as React.CSSProperties}
      aria-label="Ten glowing bottles floating in a dark, atmospheric scene"
    >
      {/* Ambient light orbs */}
      {ORBS.map((o, i) => (
        <div
          key={i}
          className="light-orb"
          style={
            {
              top: o.top,
              left: o.left,
              width: o.size,
              height: o.size,
              background: o.color,
              "--dur": `${o.dur}s`,
              "--delay": `${o.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Fine vignette + grain feel via gradients */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 90% at 50% 45%, transparent 55%, oklch(0.08 0.02 280 / 0.8) 100%)",
        }}
      />

      {/* Sparkles */}
      {SPARKLES.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--dur": `${s.dur}s`,
              "--delay": `${s.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Bottles */}
      {BOTTLES.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            zIndex: b.z,
            transform: `translate3d(calc(var(--px) * ${b.depth * 28}px), calc(var(--py) * ${b.depth * 20}px), 0)`,
          }}
        >
          <img
            src={b.src}
            alt={b.alt}
            width={1024}
            height={1024}
            loading={i < 3 ? "eager" : "lazy"}
            draggable={false}
            className="bottle-float h-auto select-none"
            style={
              {
                width: `clamp(${Math.round(b.size * 0.55)}px, ${(b.size / 13.66).toFixed(1)}vw, ${b.size}px)`,
                "--tilt": `${b.tilt}deg`,
                "--tilt-amp": `${Math.max(3, Math.abs(b.tilt) * 0.5)}deg`,
                "--dur": `${b.dur}s`,
                "--delay": `${b.delay}s`,
                "--drift-x": `${b.driftX}px`,
                "--float-y": `${b.floatY}px`,
                "--halo": b.halo,
              } as React.CSSProperties
            }
          />
        </div>
      ))}

      {/* Copy overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
        <p
          className="fade-rise text-xs font-medium tracking-[0.5em] uppercase text-muted-foreground"
          style={{ "--delay": "0.2s" } as React.CSSProperties}
        >
          The Floating Cellar
        </p>
        <h1
          className="fade-rise shimmer-text mt-4 font-serif text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl"
          style={{ "--delay": "0.45s" } as React.CSSProperties}
        >
          Loosu Cuties,
          <br />
          goofy asss.
        </h1>
        <p
          className="fade-rise mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
          style={{ "--delay": "0.7s" } as React.CSSProperties}
        >
          Zero talent, 100% confidences
        </p>
      </div>

      {/* Bottom light bar */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, oklch(0.2 0.06 290 / 0.6), transparent)",
        }}
      />
    </div>
  );
}
