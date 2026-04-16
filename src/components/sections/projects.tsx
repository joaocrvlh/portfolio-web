"use client";

import { motion } from "framer-motion";
import { SectionReveal } from "../section-reveal";
import { ProjectCard } from "@/components/ui/project-card";
import { useTranslations } from "next-intl";

const projects = [
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
    delay: 0,
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
    delay: 0.1,
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
    delay: 0.2,
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
    delay: 0.3,
  },
];

export default function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <section id="projects" className="container py-24 space-y-12">
      <SectionReveal>
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: project.delay }}
            >
              <ProjectCard
                title={t(`items.${project.id - 1}.title`)}
                description={t(`items.${project.id - 1}.description`)}
                tags={project.tags}
                images={project.images}
                githubUrl={project.githubUrl}
                deployUrl={project.deployUrl}
                type={project.type}
                codeLabel={t("actions.code")}
                deployLabel={
                  project.type === "Mobile"
                    ? t("actions.download")
                    : t("actions.demo")
                }
              />
            </motion.div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
