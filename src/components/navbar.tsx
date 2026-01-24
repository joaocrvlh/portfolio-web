"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LangSwitcher } from "./lang-switcher";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Github, Linkedin, Menu } from "lucide-react";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isOpen, setIsOpen] = React.useState(false);

  const handleScrollToTop = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsOpen(false);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { href: "#projects", label: t("projects") },
    { href: "#experience", label: t("experience") },
    { href: "#stack", label: t("stack") },
    { href: "#about", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container relative flex h-14 items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/"
            onClick={handleScrollToTop}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/avatar.png"
              alt="Avatar Jaum Dev"
              width={35}
              height={35}
              className="object-cover"
            />
            <span className="font-bold inline-block text-lg tracking-tight">
              joaocrvlh.dev
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary hover:bg-accent/50 rounded-md"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex gap-1 mr-1">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex"
            >
              <a
                href="https://github.com/jaumcarvalho"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hidden sm:flex"
            >
              <a
                href="https://www.linkedin.com/in/jaum-carvalho"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <LangSwitcher />
          <ThemeToggle />

          <div className="md:hidden ml-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-full max-w-full border-none"
              >
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>

                <div className="flex flex-col h-full items-center justify-center -mt-10">
                  <div className="flex flex-col items-center gap-6 mb-12">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={handleLinkClick}
                        className="text-3xl font-bold hover:text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="w-16 h-[1px] bg-muted-foreground/20 mb-12" />

                  <div className="flex flex-col items-center gap-4">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                      Socials
                    </span>
                    <div className="flex gap-8">
                      <a
                        href="https://github.com/jaumcarvalho"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Github className="h-6 w-6" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/jaum-carvalho"
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-full bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <Linkedin className="h-6 w-6" />
                      </a>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
