"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AppHeading } from "@/components/apps/app-heading";

export const stackCategories = [
  {
    key: "languages",
    items: [
      { name: "HTML5", slug: "html5" },
      { name: "CSS3", slug: "css" },
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Python", slug: "python" },
      { name: "Java", slug: "openjdk" },
      { name: "C", slug: "c" },
      { name: "Lua", slug: "lua" },
    ],
  },
  {
    key: "mobile",
    items: [
      { name: "React Native", slug: "react" },
      { name: "Expo", slug: "expo" },
      { name: "Android Studio", slug: "androidstudio" },
      { name: "Ionic", slug: "ionic" },
      { name: "Capacitor", slug: "capacitor" },
    ],
  },
  {
    key: "frontend",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Angular", slug: "angular" },
      { name: "Vue.js", slug: "vuedotjs" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "ShadcnUI", slug: "shadcnui" },
    ],
  },
  {
    key: "backend",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
      { name: "NestJS", slug: "nestjs" },
      { name: "Flask", slug: "flask" },
    ],
  },
  {
    key: "database",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MySQL", slug: "mysql" },
      { name: "SQLite", slug: "sqlite" },
      { name: "Supabase", slug: "supabase" },
      { name: "Firebase", slug: "firebase" },
    ],
  },
  {
    key: "tools",
    items: [
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "Docker", slug: "docker" },
      { name: "Shell Script", slug: "gnubash" },
      { name: "Linux", slug: "linux" },
    ],
  },
];

const headerTones = [
  "bg-foreground text-background",
  "bg-secondary text-secondary-foreground",
];

function StackPanel({
  title,
  items,
  tone,
}: {
  title: string;
  items: { name: string; slug: string }[];
  tone: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 bg-background shadow-retro-sm">
      <h3 className={`border-b-2 px-4 py-2 text-sm font-bold ${tone}`}>
        {title}
      </h3>

      <ul className="grid grid-cols-[repeat(auto-fill,minmax(4.5rem,1fr))] gap-3 p-4">
        {items.map((tech, i) => (
          <li
            key={tech.name}
            style={{ animationDelay: `${150 + i * 40}ms` }}
            className="group animate-pop-in flex flex-col items-center gap-2 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl border-2 bg-background p-2.5 shadow-retro-sm transition-[translate,background-color] group-hover:-translate-y-[3px] group-hover:bg-accent">
              <Image
                src={`/images/stacks/${tech.slug}.svg`}
                alt=""
                width={32}
                height={32}
                className="size-full object-contain dark:invert"
              />
            </span>
            <span className="text-[11px] leading-tight font-semibold">
              {tech.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StackApp() {
  const t = useTranslations("Stack");

  return (
    <div className="space-y-6">
      <AppHeading>{t("title")}</AppHeading>
      <div className="grid gap-5 md:grid-cols-2">
        {stackCategories.map((category, i) => (
          <StackPanel
            key={category.key}
            title={t(`categories.${category.key}` as Parameters<typeof t>[0])}
            items={category.items}
            tone={headerTones[i % headerTones.length]}
          />
        ))}
      </div>
    </div>
  );
}
