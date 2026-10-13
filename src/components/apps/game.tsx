"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MemoryGame } from "@/components/apps/games/memory";
import { RunnerGame } from "@/components/apps/games/runner";
import { SnakeGame } from "@/components/apps/games/snake";
import { TicTacToeGame } from "@/components/apps/games/tictactoe";
import type { AppProps } from "@/lib/apps";
import { cn } from "@/lib/utils";

const GAMES = [
  { id: "snake", Component: SnakeGame },
  { id: "memory", Component: MemoryGame },
  { id: "tictactoe", Component: TicTacToeGame },
  { id: "runner", Component: RunnerGame },
] as const;

export function GameApp({ arg }: AppProps) {
  const t = useTranslations("Game");
  const [picked, setPicked] = useState<string | null>(null);
  const [seenArg, setSeenArg] = useState(arg);

  if (arg !== seenArg) {
    setSeenArg(arg);
    setPicked(null);
  }

  const current = GAMES.find((g) => g.id === (picked ?? arg)) ?? GAMES[0];

  return (
    <div className="space-y-5">
      <div
        role="tablist"
        aria-label={t("arcade")}
        className="flex flex-wrap justify-center gap-2"
      >
        {GAMES.map((game) => {
          const active = game.id === current.id;
          return (
            <button
              key={game.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setPicked(game.id)}
              className={cn(
                "rounded-full border-2 px-3 py-1 text-xs font-bold shadow-retro-sm transition-[translate,box-shadow,background-color] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                active
                  ? "bg-foreground text-background"
                  : "bg-background hover:bg-accent",
              )}
            >
              {t(`games.${game.id}`)}
            </button>
          );
        })}
      </div>

      <current.Component key={current.id} />
    </div>
  );
}
