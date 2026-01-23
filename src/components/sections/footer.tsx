"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { SectionReveal } from "../section-reveal";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SectionReveal>
        <div className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">jaum.dev</h3>
            </div>

            <div className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#projects"
                    className="hover:text-primary transition-colors"
                  >
                    {tNav("projects")}
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="hover:text-primary transition-colors"
                  >
                    {tNav("experience")}
                  </a>
                </li>
                <li>
                  <a
                    href="#stack"
                    className="hover:text-primary transition-colors"
                  >
                    {tNav("stack")}
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-primary transition-colors"
                  >
                    {tNav("about")}
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">{t("connect")}</h3>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://github.com/jaumcarvalho"
                    target="_blank"
                    aria-label="Github"
                    rel="noreferrer"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="https://linkedin.com/in/jaum-carvalho"
                    target="_blank"
                    aria-label="Linkedin"
                    rel="noreferrer"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a
                    href="mailto:contatojaumcarvalho@gmail.com"
                    aria-label="Email"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} jaum.dev. {t("rights")}
            </p>
            <p>{t("madeWith")}</p>
          </div>
        </div>
      </SectionReveal>
    </footer>
  );
}
