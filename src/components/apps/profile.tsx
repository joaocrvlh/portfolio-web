"use client";

import Image from "next/image";
import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Typewriter from "typewriter-effect";
import { AppHeading } from "@/components/apps/app-heading";
import { socials } from "@/lib/links";
import { cn } from "@/lib/utils";

const round = [
  {
    label: "LinkedIn",
    href: socials.linkedin,
    icon: Linkedin,
    tone: "bg-background text-foreground",
    external: true,
  },
  {
    label: "GitHub",
    href: socials.github,
    icon: Github,
    tone: "bg-foreground text-background",
    external: true,
  },
  {
    label: "Email",
    href: socials.email,
    icon: Mail,
    tone: "bg-secondary text-secondary-foreground",
    external: false,
  },
];

export function ProfileApp() {
  const t = useTranslations("Hero");
  const tAbout = useTranslations("About");

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-6 sm:flex-row">
        <Image
          src="/images/avatar.png"
          alt="João Carvalho"
          width={176}
          height={176}
          className="size-36 shrink-0 rounded-full border-2 bg-accent object-cover shadow-retro sm:size-44"
        />

        <div className="min-w-0 space-y-3 text-center sm:text-left">
          <span className="inline-block rounded-full border-2 bg-primary px-3 py-0.5 text-[11px] font-bold tracking-wide text-primary-foreground uppercase">
            João Carvalho · v1.0
          </span>
          <h2 className="min-h-[2.2em] text-3xl leading-[1.1] font-extrabold tracking-tight sm:text-4xl">
            <Typewriter
              options={{
                strings: [t("typewriter.0"), t("typewriter.1"), t("typewriter.2")],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </h2>
          <p className="text-base font-medium text-muted-foreground">
            {t("installer.tagline")}
          </p>
          <div className="flex justify-center gap-2 sm:justify-start">
            {round.map(({ label, href, icon: Icon, tone, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 shadow-retro-sm transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                  tone,
                )}
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <AppHeading as="h3">{tAbout("title")}</AppHeading>
        <p className="leading-relaxed text-foreground/90">
          {tAbout("description1")}
        </p>
      </div>
    </div>
  );
}
