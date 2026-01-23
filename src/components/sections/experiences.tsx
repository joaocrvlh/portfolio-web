"use client";

import { useTranslations } from "next-intl";
import { SectionReveal } from "../section-reveal";
import { Briefcase, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Experience() {
  const t = useTranslations("Experience");

  const items = [
    {
      role: t("items.0.role"),
      company: t("items.0.company"),
      date: t("items.0.date"),
      description: t("items.0.description"),
    },
  ];

  return (
    <section id="experience" className="container py-24 space-y-8">
      <SectionReveal>
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l border-muted ml-4 md:ml-6 space-y-12">
            {items.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-12">
                <span className="absolute -left-[11px] top-1 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </span>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-xl font-bold leading-none">
                      {item.role}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="w-fit flex gap-1 items-center text-xs font-normal"
                    >
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm font-medium">{item.company}</span>
                  </div>

                  <p className="text-muted-foreground text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
