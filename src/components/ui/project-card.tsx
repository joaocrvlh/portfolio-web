"use client";

import Image from "next/image";
import { Github, Globe, Smartphone, FolderGit2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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
}

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
    <Card className="group overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <div
        className={`relative w-full overflow-hidden bg-muted ${"aspect-video"}`}
      >
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
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <TypeIcon className="h-12 w-12 opacity-20" />
          </div>
        )}

        <div className="absolute top-2 right-2">
          <Badge
            variant="secondary"
            className="backdrop-blur-md bg-background/80"
          >
            {type}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          {title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="grow">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <Separator className="bg-muted/50" />

      <CardFooter className="pt-4">
        <div className="flex flex-col gap-2 w-full">
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" /> {codeLabel}
              </a>
            </Button>
          )}

          {deployUrl && (
            <Button size="sm" className="w-full gap-2" asChild>
              <a href={deployUrl} target="_blank" rel="noopener noreferrer">
                {type === "Mobile" ? (
                  <Smartphone className="h-4 w-4" />
                ) : (
                  <Globe className="h-4 w-4" />
                )}
                {deployLabel ??
                  (type === "Mobile" ? "APK / Demo" : "Live Demo")}
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
