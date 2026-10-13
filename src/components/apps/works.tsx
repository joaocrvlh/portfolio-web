"use client";

import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/ui/project-card";
import { AppHeading } from "@/components/apps/app-heading";

export const projects = [
  {
    id: 1,
    type: "Web" as const,
    tags: ["React", "Shadcn UI", "Zustand", "TanStack", "Resend", "Supabase"],
    images: [
      "/images/projects/project-1/p1.jpeg",
      "/images/projects/project-1/p1-1.jpeg",
      "/images/projects/project-1/p1-2.jpeg",
      "/images/projects/project-1/p1-3.jpeg",
      "/images/projects/project-1/p1-4.jpeg",
      "/images/projects/project-1/p1-5.jpeg",
    ],
    githubUrl: undefined,
    deployUrl: "https://www.petieg.site/agendamento-monitoria",
  },
  {
    id: 2,
    type: "Web" as const,
    tags: ["React", "Shadcn UI", "Zustand", "TanStack"],
    images: [
      "/images/projects/project-2/p2-1.jpeg",
      "/images/projects/project-2/p2-11.jpeg",
      "/images/projects/project-2/p2-3.jpeg",
      "/images/projects/project-2/p2-4.jpeg",
      "/images/projects/project-2/p2-5.jpeg",
    ],
    githubUrl: undefined,
    deployUrl: undefined,
  },
  {
    id: 3,
    type: "Mobile" as const,
    tags: ["React Native", "Expo"],
    images: [
      "/images/projects/project-3/p3-1.jpeg",
      "/images/projects/project-3/p3-2.jpeg",
      "/images/projects/project-3/p3-3.jpeg",
      "/images/projects/project-3/p3-4.jpeg",
      "/images/projects/project-3/p3-5.jpeg",
      "/images/projects/project-3/p3-6.jpeg",
      "/images/projects/project-3/p3-7.jpeg",
      "/images/projects/project-3/p3-8.jpeg",
      "/images/projects/project-3/p3-9.jpeg",
    ],
    githubUrl: "https://github.com/JaumCarvalho/iron-tracker.git",
    deployUrl: "https://github.com/JaumCarvalho/iron-tracker/releases/tag/v1",
  },
  {
    id: 4,
    type: "Mobile" as const,
    tags: ["React Native", "Expo"],
    images: [
      "/images/projects/project-4/p-4.jpeg",
      "/images/projects/project-4/p4-1.jpeg",
      "/images/projects/project-4/p4-2.jpeg",
      "/images/projects/project-4/p4-3.jpeg",
    ],
    githubUrl: "https://github.com/JaumCarvalho/geotour",
    deployUrl: "https://github.com/JaumCarvalho/geotour/releases/tag/v1.0.0",
  },
];

export function WorksApp() {
  const t = useTranslations("Projects");

  return (
    <div className="space-y-6">
      <AppHeading>{t("title")}</AppHeading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            title={t(`items.${project.id - 1}.title`)}
            description={t(`items.${project.id - 1}.description`)}
            tags={project.tags}
            images={project.images}
            githubUrl={project.githubUrl}
            deployUrl={project.deployUrl}
            type={project.type}
            delay={0.1 + i * 0.08}
            codeLabel={t("actions.code")}
            deployLabel={
              project.type === "Mobile"
                ? t("actions.download")
                : t("actions.demo")
            }
          />
        ))}
      </div>
    </div>
  );
}
