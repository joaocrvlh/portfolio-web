"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { stackCategories } from "@/components/apps/stack";
import { projects } from "@/components/apps/works";
import type { AppId, AppProps } from "@/lib/apps";
import { socials } from "@/lib/links";

type Line = { id: number; kind: "cmd" | "out"; text: string };

const COMMANDS = [
  "help",
  "about",
  "projects",
  "experience",
  "stack",
  "contact",
  "ls",
  "open",
  "play",
  "theme",
  "lang",
  "whoami",
  "date",
  "echo",
  "clear",
];

const HELP_USAGE: Record<string, string> = {
  open: "open <app>",
  play: "play [game]",
  lang: "lang <pt|en>",
  echo: "echo <text>",
};

const GAMES = ["snake", "memory", "tictactoe", "runner"];

const OPEN_TARGETS: Record<string, { id: AppId; arg?: string }> = {
  about: { id: "profile" },
  profile: { id: "profile" },
  projects: { id: "works" },
  works: { id: "works" },
  experience: { id: "experience" },
  stack: { id: "stack" },
  contact: { id: "contact" },
  terminal: { id: "terminal" },
  arcade: { id: "game" },
  game: { id: "game" },
  ...Object.fromEntries(GAMES.map((g) => [g, { id: "game" as AppId, arg: g }])),
};

const PROMPT = "joao@portfolio:~$";

export function TerminalApp({ onOpen }: AppProps) {
  const t = useTranslations("Terminal");
  const tAbout = useTranslations("About");
  const tProjects = useTranslations("Projects");
  const tExperience = useTranslations("Experience");
  const tStack = useTranslations("Stack");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();

  const nextId = useRef(2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useRef<string[]>([]);
  const cursor = useRef(0);

  const [value, setValue] = useState("");
  const [lines, setLines] = useState<Line[]>(() => [
    { id: 0, kind: "out", text: t("welcome") },
    { id: 1, kind: "out", text: t("hint") },
  ]);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = (kind: Line["kind"], text: string) =>
    setLines((ls) => [...ls, { id: nextId.current++, kind, text }]);

  const execute = (raw: string) => {
    const [name = "", ...args] = raw.trim().split(/\s+/);
    const cmd = name.toLowerCase();
    const arg = args.join(" ");

    switch (cmd) {
      case "":
        return;
      case "clear":
        setLines([]);
        return;
      case "help": {
        const rows = COMMANDS.map(
          (c) => `  ${(HELP_USAGE[c] ?? c).padEnd(16)}${t(`help.${c}`)}`,
        );
        return push("out", [t("help.title"), ...rows].join("\n"));
      }
      case "about":
        return push("out", tAbout("description1"));
      case "projects": {
        const rows = projects.map((p, i) => {
          const url = p.deployUrl ?? p.githubUrl;
          return [
            `[${i + 1}] ${tProjects(`items.${p.id - 1}.title`)} (${p.type})`,
            `    ${tProjects(`items.${p.id - 1}.description`)}`,
            url ? `    ${url}` : "",
          ]
            .filter(Boolean)
            .join("\n");
        });
        return push("out", rows.join("\n\n"));
      }
      case "experience":
        return push(
          "out",
          [
            `${tExperience("items.0.role")} @ ${tExperience("items.0.company")}`,
            tExperience("items.0.date"),
            "",
            tExperience("items.0.description"),
          ].join("\n"),
        );
      case "stack": {
        const rows = stackCategories.map(
          (c) =>
            `${tStack(`categories.${c.key}` as Parameters<typeof tStack>[0]).padEnd(14)}${c.items
              .map((i) => i.name)
              .join(", ")}`,
        );
        return push("out", rows.join("\n"));
      }
      case "contact":
        return push(
          "out",
          [
            `github    ${socials.github}`,
            `linkedin  ${socials.linkedin}`,
            `email     ${socials.email.replace("mailto:", "")}`,
          ].join("\n"),
        );
      case "ls":
        return push(
          "out",
          "profile/  works/  experience/  stack/  contact/  terminal  arcade/",
        );
      case "open": {
        const target = OPEN_TARGETS[arg.toLowerCase()];
        if (!target) return push("out", t("openUsage"));
        push("out", t("opening", { name: arg.toLowerCase() }));
        return onOpen(target.id, target.arg);
      }
      case "play": {
        const game = arg.toLowerCase();
        if (game && !GAMES.includes(game)) return push("out", t("playUsage"));
        push("out", t("playStart", { name: game || "snake" }));
        return onOpen("game", game || undefined);
      }
      case "theme": {
        const next = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(next);
        return push("out", t("themeSet", { mode: next }));
      }
      case "lang": {
        const next = arg.toLowerCase();
        if (next !== "pt" && next !== "en") return push("out", t("langUsage"));
        if (next === locale) return push("out", t("langSame"));
        push("out", t("langSwitching"));
        const path = pathname.replace(/^\/(en|pt)/, "") || "/";
        return router.push(`/${next}${path}`);
      }
      case "whoami":
        return push("out", "joao");
      case "date":
        return push("out", new Date().toLocaleString(locale));
      case "echo":
        return push("out", arg);
      case "sudo":
        return push("out", t("sudo"));
      case "rm":
        return push("out", t("rm"));
      default:
        return push("out", t("notFound", { cmd: name }));
    }
  };

  const submit = () => {
    const raw = value;
    push("cmd", raw);
    if (raw.trim()) history.current.push(raw);
    cursor.current = history.current.length;
    setValue("");
    execute(raw);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cursor.current > 0) {
        cursor.current -= 1;
        setValue(history.current[cursor.current] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor.current < history.current.length) {
        cursor.current += 1;
        setValue(history.current[cursor.current] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = COMMANDS.filter((c) => c.startsWith(value.toLowerCase()));
      if (value && matches.length === 1) setValue(matches[0]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <div
      ref={scrollRef}
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      className="h-[min(28rem,60dvh)] cursor-text overscroll-contain max-sm:h-full overflow-y-auto bg-black p-4 font-mono text-[13px] leading-relaxed text-neutral-100 sm:text-sm"
    >
      {lines.map((line) => (
        <p key={line.id} className="break-words whitespace-pre-wrap">
          {line.kind === "cmd" ? (
            <>
              <span className="font-bold">{PROMPT} </span>
              {line.text}
            </>
          ) : (
            <span className="text-neutral-300">{line.text}</span>
          )}
        </p>
      ))}
      <label className="flex items-center gap-2">
        <span className="shrink-0 font-bold">{PROMPT}</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="terminal"
          className="min-w-0 flex-1 bg-transparent text-base text-neutral-100 caret-white outline-none sm:text-sm"
        />
      </label>
    </div>
  );
}
