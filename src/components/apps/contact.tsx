"use client";

import { ArrowUpRight, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { AppHeading } from "@/components/apps/app-heading";
import { socials } from "@/lib/links";
import { cn } from "@/lib/utils";

const links: {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
  tone: string;
}[] = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/joaocrvlh",
    href: socials.linkedin,
    icon: Linkedin,
    external: true,
    tone: "bg-background text-foreground",
  },
  {
    label: "GitHub",
    value: "github.com/joaocrvlh",
    href: socials.github,
    icon: Github,
    external: true,
    tone: "bg-foreground text-background",
  },
  {
    label: "Email",
    value: "contatojaumcarvalho@gmail.com",
    href: socials.email,
    icon: Mail,
    external: false,
    tone: "bg-secondary text-secondary-foreground",
  },
];

export function ContactApp() {
  const t = useTranslations("Footer");

  return (
    <div className="space-y-5">
      <AppHeading>{t("connect")}</AppHeading>
      <ul className="space-y-3">
        {links.map(({ label, value, href, icon: Icon, external, tone }, i) => (
          <li
            key={label}
            style={{ animationDelay: `${100 + i * 80}ms` }}
            className="animate-rise-in"
          >
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={cn(
                "group flex items-center gap-3 rounded-full border-2 p-1.5 pr-4 shadow-retro-sm transition-[transform,box-shadow] hover:-translate-x-px hover:-translate-y-px hover:shadow-retro active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
                tone,
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-background text-foreground">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm leading-tight font-bold">
                  {label}
                </span>
                <span className="block truncate text-xs opacity-80">
                  {value}
                </span>
              </span>
              <ArrowUpRight
                className="size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
