"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Circle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Mark = "X" | "O" | null;

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function findWinner(board: Mark[]) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { mark: board[a], line };
    }
  }
  return null;
}

function minimax(board: Mark[], turn: "X" | "O"): number {
  const win = findWinner(board);
  if (win) return win.mark === "O" ? 1 : -1;
  if (board.every(Boolean)) return 0;
  const scores = board.flatMap((cell, i) => {
    if (cell) return [];
    const next = [...board];
    next[i] = turn;
    return [minimax(next, turn === "O" ? "X" : "O")];
  });
  return turn === "O" ? Math.max(...scores) : Math.min(...scores);
}

function cpuMove(board: Mark[]): number {
  const free = board.flatMap((cell, i) => (cell ? [] : [i]));
  if (Math.random() < 0.2) return free[Math.floor(Math.random() * free.length)];
  let best = free[0];
  let bestScore = -Infinity;
  for (const i of free) {
    const next = [...board];
    next[i] = "O";
    const score = minimax(next, "X");
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  }
  return best;
}

export function TicTacToeGame() {
  const t = useTranslations("Game");
  const [board, setBoard] = useState<Mark[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [record, setRecord] = useState({ w: 0, l: 0, d: 0 });

  const winner = findWinner(board);
  const draw = !winner && board.every(Boolean);
  const finished = Boolean(winner) || draw;

  useEffect(() => {
    if (turn !== "O" || finished) return;
    const id = setTimeout(() => {
      const move = cpuMove(board);
      const next = [...board];
      next[move] = "O";
      setBoard(next);
      setTurn("X");
    }, 450);
    return () => clearTimeout(id);
  }, [turn, finished, board]);

  useEffect(() => {
    if (!finished) return;
    const id = setTimeout(() => {
      setRecord((r) =>
        draw
          ? { ...r, d: r.d + 1 }
          : winner?.mark === "X"
            ? { ...r, w: r.w + 1 }
            : { ...r, l: r.l + 1 },
      );
    }, 0);
    return () => clearTimeout(id);
  }, [finished, draw, winner?.mark]);

  const play = (i: number) => {
    if (board[i] || turn !== "X" || finished) return;
    const next = [...board];
    next[i] = "X";
    setBoard(next);
    setTurn("O");
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn("X");
  };

  const status = winner
    ? winner.mark === "X"
      ? t("ttt.youWin")
      : t("ttt.cpuWins")
    : draw
      ? t("ttt.draw")
      : turn === "X"
        ? t("ttt.yourTurn")
        : t("ttt.thinking");

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono text-sm font-bold" aria-live="polite">
        {status}
      </p>

      <div className="grid w-full max-w-[18rem] grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const highlighted = winner?.line.includes(i);
          return (
            <button
              key={i}
              type="button"
              onClick={() => play(i)}
              disabled={Boolean(cell) || finished || turn !== "X"}
              aria-label={cell ?? `${i + 1}`}
              className={cn(
                "flex aspect-square items-center justify-center rounded-xl border-2 shadow-retro-sm transition-[translate,box-shadow,background-color] enabled:hover:bg-accent enabled:active:translate-x-0.5 enabled:active:translate-y-0.5 enabled:active:shadow-none",
                highlighted ? "bg-foreground text-background" : "bg-background",
              )}
            >
              {cell && (
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                >
                  {cell === "X" ? (
                    <X className="size-10" strokeWidth={3.5} />
                  ) : (
                    <Circle className="size-9" strokeWidth={3.5} />
                  )}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={reset}>
          {t("restart")}
        </Button>
        <p className="font-mono text-xs text-muted-foreground">
          {t("ttt.record", record)}
        </p>
      </div>
    </div>
  );
}
