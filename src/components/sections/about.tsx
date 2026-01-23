import { useTranslations } from "next-intl";
import { SectionReveal } from "../section-reveal";

export default function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="container py-24 md:py-32">
      <SectionReveal>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed text-justify md:text-center">
            {t("description1")}
          </p>
        </div>
      </SectionReveal>
    </section>
  );
}
