"use client";

import { useTranslations } from "next-intl";
import { Briefcase, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { AppHeading } from "@/components/apps/app-heading";

export function ExperienceApp() {
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
    <div className="space-y-6">
      <AppHeading>{t("title")}</AppHeading>

      <ol className="relative ml-3 space-y-10 border-l-2 border-dashed">
        {items.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + 0.15 * index, duration: 0.4 }}
            className="relative pl-8"
          >
            <span className="absolute top-1 -left-[13px] flex size-6 items-center justify-center rounded-full border-2 bg-background">
              <span className="animate-blink size-2.5 rounded-full bg-foreground" />
            </span>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold">
                  {item.role}
                </h3>
                <Badge variant="secondary" className="w-fit">
                  <Calendar />
                  {item.date}
                </Badge>
              </div>

              <p className="flex items-center gap-2 text-sm font-semibold text-accent-text">
                <Briefcase className="size-4" />
                {item.company}
              </p>

              <p className="leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
