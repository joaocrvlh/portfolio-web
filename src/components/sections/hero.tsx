"use client";

import { Mouse } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import Typewriter from "typewriter-effect";

export default function Hero() {
  const t = useTranslations("Hero");

  const { scrollY } = useScroll();
  const scrollOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  const typewriterStrings = [
    t("typewriter.0"),
    t("typewriter.1"),
    t("typewriter.2"),
  ];

  return (
    <section className="relative flex flex-col justify-center items-center min-h-[calc(100vh-3.5rem)] overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

      <div className="container flex items-center justify-center text-center -mt-32">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
          <Typewriter
            options={{
              strings: typewriterStrings,
              autoStart: true,
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </h1>
      </div>

      <motion.div
        className="absolute bottom-20 flex flex-col items-center gap-2 text-muted-foreground/60"
        style={{ opacity: scrollOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1, duration: 1 },
          y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
        }}
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          {t("scroll")}
        </span>
        <Mouse className="h-8 w-8" />
      </motion.div>
    </section>
  );
}
