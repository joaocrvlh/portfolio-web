"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLUGS = [
  "react",
  "nextdotjs",
  "typescript",
  "nodedotjs",
  "postgresql",
  "docker",
  "git",
  "tailwindcss",
];

type Card = { id: number; slug: string };

function shuffledDeck(): Card[] {
  const cards = [...SLUGS, ...SLUGS].map((slug, id) => ({ id, slug }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export function MemoryGame() {
  const t = useTranslations("Game");
  const [deck, setDeck] = useState<Card[]>(shuffledDeck);
  const [open, setOpen] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const won = matched.length === deck.length;

  useEffect(() => {
    if (open.length !== 2) return;
    const [a, b] = open;
    const isMatch = deck[a].slug === deck[b].slug;
    const id = setTimeout(
      () => {
        if (isMatch) setMatched((m) => [...m, a, b]);
        setOpen([]);
      },
      isMatch ? 350 : 800,
    );
    return () => clearTimeout(id);
  }, [open, deck]);

  const flip = (index: number) => {
    if (open.length >= 2 || open.includes(index) || matched.includes(index)) {
      return;
    }
    setOpen((o) => [...o, index]);
    if (open.length === 1) setMoves((m) => m + 1);
  };

  const restart = () => {
    setDeck(shuffledDeck());
    setOpen([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-[22.5rem] items-center justify-between font-mono text-sm font-bold">
        <span>
          {t("memory.moves")}: {moves}
        </span>
        <span className="text-muted-foreground">
          {matched.length / 2}/{SLUGS.length}
        </span>
      </div>

      <div className="relative w-full max-w-[22.5rem]">
        <div className="grid grid-cols-4 gap-2">
          {deck.map((card, index) => {
            const faceUp = open.includes(index) || matched.includes(index);
            const isMatched = matched.includes(index);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => flip(index)}
                aria-label={faceUp ? card.slug : t("memory.hidden")}
                className={cn(
                  "aspect-square rounded-xl border-2 shadow-retro-sm transition-[translate,box-shadow] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                  faceUp ? "bg-background" : "bg-foreground",
                  isMatched && "bg-secondary",
                )}
              >
                <motion.div
                  key={faceUp ? "face" : "back"}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.15 }}
                  className="flex size-full items-center justify-center p-2"
                >
                  {faceUp ? (
                    <Image
                      src={`/images/stacks/${card.slug}.svg`}
                      alt=""
                      width={40}
                      height={40}
                      className="size-full object-contain dark:invert"
                    />
                  ) : (
                    <span className="font-mono text-lg font-bold text-background">
                      ?
                    </span>
                  )}
                </motion.div>
              </button>
            );
          })}
        </div>

        {won && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-background/90 px-4 text-center">
            <p className="text-2xl font-extrabold">
              {t("memory.won", { moves })}
            </p>
            <Button onClick={restart}>{t("restart")}</Button>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">{t("memory.hint")}</p>
      {!won && (
        <Button variant="outline" size="sm" onClick={restart}>
          {t("restart")}
        </Button>
      )}
    </div>
  );
}
