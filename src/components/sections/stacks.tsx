"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionReveal } from "../section-reveal";

const stackCategories = [
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

function StackRow({
  title,
  items,
}: {
  title: string;
  items: { name: string; slug: string }[];
}) {
  return (
    <div className="space-y-4 mb-10">
      <h3 className="text-lg font-semibold text-muted-foreground text-center">
        {title}
      </h3>

      <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6">
        {items.map((tech) => (
          <div
            key={tech.name}
            className="relative flex flex-col items-center gap-2 group"
          >
            <div className="relative h-14 w-14 transition-transform duration-300 group-hover:scale-110">
              <Image
                src={`/images/${tech.slug}.svg`}
                alt={tech.name}
                fill
                sizes="56px"
                className="object-contain dark:invert"
              />
            </div>
            <span className="text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5 whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stack() {
  const t = useTranslations("Stack");

  return (
    <section id="stack" className="py-24 space-y-8">
      <SectionReveal>
        <div className="container text-center space-y-4 mb-12 mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {stackCategories.map((category) => (
            <StackRow
              key={category.key}
              title={t(`categories.${category.key}` as any)}
              items={category.items}
            />
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
