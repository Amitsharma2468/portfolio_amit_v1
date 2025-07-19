import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Technologies } from "@/components/sections/Technologies";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { ProblemSolving } from "@/components/sections/ProblemSolving";
import { Contact } from "@/components/sections/Contact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <Hero />
      <Skills />
      <Technologies />
      <Projects />
      <Achievements />
      <ProblemSolving />
      <Contact />
      <Footer />
    </main>
  );
}
