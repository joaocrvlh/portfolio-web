"use client";

import Image from "next/image";
import { ArrowUpRight, Github, Globe, Smartphone, FolderGit2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectProps {
  title: string;
  description: string;
  tags: string[];
  images?: string[];
  githubUrl?: string;
  deployUrl?: string;
  type?: "Mobile" | "Web" | "Research";
  codeLabel?: string;
  deployLabel?: string;
  delay?: number;
}

const tagTones = [
  "bg-foreground text-background",
  "bg-secondary text-secondary-foreground",
  "bg-background text-foreground",
  "bg-accent text-accent-foreground",
];

export function ProjectCard({
  title,
  description,
  tags,
  images = [],
  githubUrl,
  deployUrl,
  type = "Web",
  codeLabel = "Code",
  deployLabel,
  delay = 0,
}: ProjectProps) {
  const TypeIcon = {
    Mobile: Smartphone,
    Web: Globe,
    Research: FolderGit2,
  }[type];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay }}
      className="flex h-full flex-col gap-4 rounded-3xl border-2 bg-background p-3 shadow-retro transition-[translate,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-retro-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-2 bg-muted">
        {images.length > 0 ? (
          <>
            <div
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{
                width: `${images.length * 100}%`,
                transform: `translateX(-${(currentIndex * 100) / images.length}%)`,
              }}
            >
              {images.map((src, i) => (
                <div
                  key={i}
                  className="relative h-full shrink-0"
                  style={{ width: `${100 / images.length}%` }}
                >
                  <Image
                    src={src}
                    alt={`${title} ${i + 1}`}
                    fill
                    sizes="(min-width: 768px) 576px, 100vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <div
                aria-hidden
                className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border-2 bg-background px-2 py-1"
              >
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300",
                      i === currentIndex
                        ? "w-4 bg-foreground"
                        : "w-1.5 bg-muted-foreground/40",
                    )}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <TypeIcon className="size-12 opacity-30" />
          </div>
        )}

        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="shadow-retro-sm">
            <TypeIcon />
            {type}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2 pb-2">
        <h3 className="text-xl leading-tight font-bold">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="flex grow flex-wrap content-start gap-1.5">
          {tags.map((tag, i) => (
            <Badge key={tag} className={tagTones[i % tagTones.length]}>
              {tag}
            </Badge>
          ))}
        </div>

        {(githubUrl || deployUrl) && (
          <div className="flex flex-wrap gap-3 pt-2">
            {githubUrl && (
              <Button variant="outline" size="sm" className="max-sm:h-10" asChild>
                <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github /> {codeLabel}
                </a>
              </Button>
            )}

            {deployUrl && (
              <Button size="sm" className="max-sm:h-10" asChild>
                <a href={deployUrl} target="_blank" rel="noopener noreferrer">
                  {deployLabel ??
                    (type === "Mobile" ? "APK / Demo" : "Live Demo")}
                  <span className="flex size-5 items-center justify-center rounded-full border-2 bg-background text-foreground">
                    <ArrowUpRight className="size-3" strokeWidth={3} />
                  </span>
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
