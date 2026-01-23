"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { SectionReveal } from "../section-reveal";
import { Code2 } from "lucide-react";

const placeholders = [
  {
    id: 1,
    category: "Mobile",
    icon: <Code2 className="h-8 w-8" />,
    delay: 0,
  },
  {
    id: 2,
    category: "Web",
    icon: <Code2 className="h-8 w-8" />,
    delay: 0.1,
  },
  {
    id: 3,
    category: "Web",
    icon: <Code2 className="h-8 w-8" />,
    delay: 0.2,
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="container py-24 space-y-12">
      <SectionReveal>
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Projetos
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: item.delay }}
            >
              <Card className="h-[300px] flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-muted-foreground/20 bg-muted/5 hover:bg-muted/10 transition-colors cursor-default">
                <CardContent className="space-y-6 flex flex-col items-center p-0">
                  <div className="h-16 w-16 rounded-full bg-background border flex items-center justify-center shadow-sm text-muted-foreground">
                    {item.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl">Em Breve</h3>
                    <p className="text-sm text-muted-foreground max-w-[200px]">
                      ...
                    </p>
                  </div>

                  <Badge variant="secondary" className="opacity-70">
                    {item.category}
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </SectionReveal>
    </section>
  );
}
