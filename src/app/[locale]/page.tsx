import About from "@/components/sections/about";
import Experience from "@/components/sections/experiences";
import Footer from "@/components/sections/footer";
import Hero from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects";
import Skills from "@/components/sections/stacks";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Skills />
      <Experience />
      <ProjectsSection />
      <About />
      <Footer />
    </main>
  );
}
