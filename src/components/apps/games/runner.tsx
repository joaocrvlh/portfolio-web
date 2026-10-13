"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { themeColors } from "@/components/apps/games/theme-colors";
import { useBest } from "@/components/apps/games/use-best";

const W = 480;
const H = 180;
const GROUND = 150;
const PLAYER = { x: 48, size: 26 };
const GRAVITY = 2400;
const JUMP = 760;
const BEST_KEY = "portfolio-runner-best";

type Status = "idle" | "playing" | "over";
type Obstacle = { x: number; w: number; h: number };

function freshRun() {
  return {
    y: 0,
    vy: 0,
    speed: 260,
    distance: 0,
    obstacles: [] as Obstacle[],
    nextSpawn: 0.9,
    shown: 0,
  };
}

export function RunnerGame() {
  const t = useTranslations("Game");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const run = useRef(freshRun());
  const statusRef = useRef<Status>("idle");
  const { best, submit } = useBest(BEST_KEY);
  const submitRef = useRef(submit);

  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);

  useEffect(() => {
    submitRef.current = submit;
  });

  useEffect(() => {
    boardRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const r = run.current;
      const { bg, fg } = themeColors(canvas);

      if (statusRef.current === "playing") {
        r.vy -= GRAVITY * dt;
        r.y = Math.max(0, r.y + r.vy * dt);
        if (r.y === 0) r.vy = 0;
        r.speed += 6 * dt;
        r.distance += r.speed * dt;

        r.nextSpawn -= dt;
        if (r.nextSpawn <= 0) {
          const h = 22 + Math.random() * 26;
          r.obstacles.push({ x: W + 10, w: 14 + Math.random() * 14, h });
          r.nextSpawn = 0.75 + Math.random() * 0.9 - Math.min(0.3, r.speed / 2500);
        }
        r.obstacles = r.obstacles
          .map((o) => ({ ...o, x: o.x - r.speed * dt }))
          .filter((o) => o.x + o.w > -10);

        const hit = r.obstacles.some(
          (o) =>
            o.x < PLAYER.x + PLAYER.size - 4 &&
            o.x + o.w > PLAYER.x + 4 &&
            r.y < o.h - 4,
        );
        const points = Math.floor(r.distance / 20);
        if (points !== r.shown) {
          r.shown = points;
          setScore(points);
        }
        if (hit) {
          statusRef.current = "over";
          submitRef.current(points);
          setStatus("over");
        }
      }

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = fg;
      ctx.fillRect(0, GROUND, W, 2);
      const dashOffset = r.distance % 40;
      for (let x = -dashOffset; x < W; x += 40) {
        ctx.fillRect(x + 12, GROUND + 10, 14, 2);
        ctx.fillRect(x + 30, GROUND + 18, 6, 2);
      }

      for (const o of r.obstacles) {
        ctx.fillRect(o.x, GROUND - o.h, o.w, o.h);
      }

      const top = GROUND - PLAYER.size - r.y;
      ctx.fillRect(PLAYER.x, top, PLAYER.size, PLAYER.size);
      ctx.fillStyle = bg;
      ctx.fillRect(PLAYER.x + PLAYER.size - 10, top + 6, 5, 5);

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const start = () => {
    run.current = freshRun();
    statusRef.current = "playing";
    setScore(0);
    setStatus("playing");
    boardRef.current?.focus({ preventScroll: true });
  };

  const jump = () => {
    if (statusRef.current !== "playing") {
      start();
      return;
    }
    if (run.current.y === 0) run.current.vy = JUMP;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "Enter") {
      e.preventDefault();
      jump();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-[26rem] items-center justify-between font-mono text-sm font-bold">
        <span>
          {t("score")}: {score}
        </span>
        <span>
          {t("best")}: {best}
        </span>
      </div>

      <div
        ref={boardRef}
        tabIndex={0}
        role="application"
        aria-label={t("games.runner")}
        onKeyDown={onKeyDown}
        onPointerDown={jump}
        className="relative w-full max-w-[26rem] touch-none overflow-hidden rounded-2xl border-2 shadow-retro outline-none"
      >
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="block w-full"
          style={{ aspectRatio: `${W} / ${H}` }}
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/85 px-4 text-center">
            <p className="text-2xl font-extrabold">
              {status === "over" ? t("over") : t("games.runner")}
            </p>
            <Button
              size="sm"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={start}
            >
              {status === "over" ? t("restart") : t("start")}
            </Button>
            <p className="text-xs text-muted-foreground">{t("runner.hint")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
