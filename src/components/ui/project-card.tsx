"use client";

import Image from "next/image";
import { Github, Globe, Smartphone, FolderGit2 } from "lucide-react";
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
  imageUrl?: string;
  githubUrl?: string;
  deployUrl?: string;
  type?: "Mobile" | "Web" | "Research";
}

export function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  deployUrl,
  type = "Web",
}: ProjectProps) {
  const TypeIcon = {
    Mobile: Smartphone,
    Web: Globe,
    Research: FolderGit2,
  }[type];

  return (
    <Card className="group overflow-hidden border-muted-foreground/20 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <TypeIcon className="h-12 w-12 opacity-20" />
          </div>
        )}

        {/* Badge do Tipo (Mobile, Web, etc) flutuando sobre a imagem */}
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

      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <Separator className="bg-muted/50" />

      <CardFooter className="pt-4 gap-2">
        {githubUrl && (
          <Button variant="outline" size="sm" className="w-full gap-2" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" /> Code
            </a>
          </Button>
        )}

        {/* Se for App Mobile, o texto muda para "Download" ou "Ver Demo" */}
        {deployUrl && (
          <Button size="sm" className="w-full gap-2" asChild>
            <a href={deployUrl} target="_blank" rel="noopener noreferrer">
              {type === "Mobile" ? (
                <Smartphone className="h-4 w-4" />
              ) : (
                <Globe className="h-4 w-4" />
              )}
              {type === "Mobile" ? "APK / Demo" : "Live Demo"}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
