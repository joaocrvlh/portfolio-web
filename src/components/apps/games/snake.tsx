"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { themeColors } from "@/components/apps/games/theme-colors";
import { useBest } from "@/components/apps/games/use-best";

const COLS = 18;
const ROWS = 18;
const CELL = 20;
const BEST_KEY = "portfolio-snake-best";

type Vec = { x: number; y: number };
type Status = "idle" | "playing" | "over";

const DIRS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
} as const;

const KEYS: Record<string, Vec> = {
  ArrowUp: DIRS.up,
  w: DIRS.up,
  ArrowDown: DIRS.down,
  s: DIRS.down,
  ArrowLeft: DIRS.left,
  a: DIRS.left,
  ArrowRight: DIRS.right,
  d: DIRS.right,
};

function randomFood(snake: Vec[]): Vec {
  const free: Vec[] = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (!snake.some((s) => s.x === x && s.y === y)) free.push({ x, y });
    }
  }
  return free[Math.floor(Math.random() * free.length)] ?? { x: 0, y: 0 };
}

function freshGame() {
  const snake: Vec[] = [
    { x: 9, y: 9 },
    { x: 8, y: 9 },
    { x: 7, y: 9 },
  ];
  return {
    snake,
    dir: { ...DIRS.right } as Vec,
    next: { ...DIRS.right } as Vec,
    food: randomFood(snake),
    speed: 140,
    score: 0,
  };
}

export function SnakeGame() {
  const t = useTranslations("Game");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const game = useRef(freshGame());
  const touchStart = useRef<Vec | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [score, setScore] = useState(0);
  const { best, submit } = useBest(BEST_KEY);

  useEffect(() => {
    boardRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (status !== "playing") return;
    let id: ReturnType<typeof setTimeout>;

    const step = () => {
      const g = game.current;
      g.dir = g.next;
      const head = { x: g.snake[0].x + g.dir.x, y: g.snake[0].y + g.dir.y };
      const ate = head.x === g.food.x && head.y === g.food.y;
      const body = ate ? g.snake : g.snake.slice(0, -1);
      const hit =
        head.x < 0 ||
        head.y < 0 ||
        head.x >= COLS ||
        head.y >= ROWS ||
        body.some((s) => s.x === head.x && s.y === head.y);

      if (hit) {
        submit(g.score);
        setStatus("over");
        return;
      }

      g.snake = [head, ...body];
      if (ate) {
        g.score += 1;
        g.speed = Math.max(70, g.speed - 4);
        g.food = randomFood(g.snake);
        setScore(g.score);
      }
      id = setTimeout(step, g.speed);
    };

    id = setTimeout(step, game.current.speed);
    return () => clearTimeout(id);
  }, [status, submit]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let raf = 0;

    const draw = (time: number) => {
      const { bg, fg } = themeColors(canvas);
      const g = game.current;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, COLS * CELL, ROWS * CELL);

      ctx.fillStyle = fg;
      ctx.globalAlpha = 0.25;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);
        }
      }
      ctx.globalAlpha = 1;

      g.snake.forEach((s, i) => {
        ctx.fillStyle = fg;
        ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
        if (i !== 0) return;
        ctx.fillStyle = bg;
        const horizontal = g.dir.x !== 0;
        const along = (g.dir.x > 0 || g.dir.y > 0 ? CELL - 8 : 4) - 1;
        const a = horizontal
          ? { x: s.x * CELL + along, y: s.y * CELL + 5 }
          : { x: s.x * CELL + 5, y: s.y * CELL + along };
        const b = horizontal
          ? { x: a.x, y: s.y * CELL + CELL - 9 }
          : { x: s.x * CELL + CELL - 9, y: a.y };
        ctx.fillRect(a.x, a.y, 4, 4);
        ctx.fillRect(b.x, b.y, 4, 4);
      });

      const r = CELL / 2 - 3 + Math.sin(time / 150) * 1.5;
      const cx = g.food.x * CELL + CELL / 2;
      const cy = g.food.y * CELL + CELL / 2;
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx + r, cy);
      ctx.lineTo(cx, cy + r);
      ctx.lineTo(cx - r, cy);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = bg;
      ctx.fillRect(cx - 1.5, cy - 1.5, 3, 3);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const start = () => {
    game.current = freshGame();
    setScore(0);
    setStatus("playing");
    boardRef.current?.focus({ preventScroll: true });
  };

  const steer = (d: Vec) => {
    if (status !== "playing") start();
    const g = game.current;
    if (d.x === -g.dir.x && d.y === -g.dir.y) return;
    g.next = d;
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const d = KEYS[key];
    if (d) {
      e.preventDefault();
      steer(d);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (status !== "playing") start();
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (e: TouchEvent) => {
    const from = touchStart.current;
    const touch = e.changedTouches[0];
    touchStart.current = null;
    if (!from) return;
    const dx = touch.clientX - from.x;
    const dy = touch.clientY - from.y;
    if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
    if (Math.abs(dx) > Math.abs(dy)) steer(dx > 0 ? DIRS.right : DIRS.left);
    else steer(dy > 0 ? DIRS.down : DIRS.up);
  };

  const pad = [
    { dir: DIRS.up, icon: ArrowUp, label: "up", col: "col-start-2" },
    { dir: DIRS.left, icon: ArrowLeft, label: "left", col: "col-start-1" },
    { dir: DIRS.right, icon: ArrowRight, label: "right", col: "col-start-3" },
    { dir: DIRS.down, icon: ArrowDown, label: "down", col: "col-start-2" },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-[22.5rem] items-center justify-between font-mono text-sm font-bold">
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
        aria-label={t("games.snake")}
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative w-full max-w-[22.5rem] touch-none overflow-hidden rounded-2xl border-2 shadow-retro outline-none"
      >
        <canvas
          ref={canvasRef}
          width={COLS * CELL}
          height={ROWS * CELL}
          className="block aspect-square w-full"
        />
        {status !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/85 px-4 text-center">
            <p className="text-3xl font-extrabold">
              {status === "over" ? t("over") : t("games.snake")}
            </p>
            {status === "over" && (
              <p className="font-mono text-sm font-bold">
                {t("score")}: {score}
              </p>
            )}
            <Button onClick={start}>
              {status === "over" ? t("restart") : t("start")}
            </Button>
            <p className="text-xs text-muted-foreground">{t("controls")}</p>
          </div>
        )}
      </div>

      <div className="grid w-40 grid-cols-3 gap-2 sm:hidden">
        {pad.map(({ dir, icon: Icon, label, col }) => (
          <Button
            key={label}
            variant="outline"
            size="icon-lg"
            aria-label={label}
            onPointerDown={() => steer(dir)}
            className={col}
          >
            <Icon />
          </Button>
        ))}
      </div>
    </div>
  );
}
