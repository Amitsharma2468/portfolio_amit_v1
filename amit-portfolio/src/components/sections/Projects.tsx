"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Folder, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  period: string;
  technologies: string[];
  liveLink?: string;
  codeLink?: string;
  badge: string;
  badgeClass: string;
}

const projects: Project[] = [
    {
    title: "ICERIE 2025 — Conference Platform",
    description:
      "Registration for 800+ participants, processing 2M+ BDT via SUST e-Payment Gateway.",
    period: "Apr 2024 – May 2025",
    badge: "Conference",
    badgeClass: "bg-purple-100 text-purple-800",
    technologies: ["Next.js", "Express.js", "Node.js", "MongoDB"],
    liveLink: "https://icerie2025.sust.edu/",
  },
  {
    title: "Electro — Smart Mobility Platform",
    description:
      "Frontend lead for Electralink's EV platform. Delivered 4 core features with SSR for improved SEO.",
    period: "Jul 2025 – Present",
    badge: "Production",
    badgeClass: "bg-green-100 text-green-800",
    technologies: ["Next.js", "Tailwind CSS", "ShadCn UI"],
    liveLink: "https://electro-navy.vercel.app/",
  },
  {
    title: "AllForU — Sponsorship Platform",
    description:
      "5-step sponsorship form with smooth navigation, infinite scroll, and 4 admin modules including CRM.",
    period: "Nov 2024 – Jun 2025",
    badge: "Production",
    badgeClass: "bg-green-100 text-green-800",
    technologies: ["Next.js", "React Query", "Material UI"],
    liveLink: "https://portal.afu.sg/",
  },
  {
    title: "Service Connect — On-demand Services",
    description:
      "Map-based service discovery, real-time WebSocket messaging, and SSLCommerz payment integration.",
    period: "Dec 2024 – Jun 2025",
    badge: "Full-stack",
    badgeClass: "bg-blue-100 text-blue-800",
    technologies: ["Next.js", "Express.js", "MongoDB", "WebSocket"],
    codeLink: "https://github.com/Amitsharma2468/Service-Connect-350/",
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Folder className="mx-auto mb-2 text-4xl text-gray-950" />
          <h2 className="text-4xl font-bold text-[#113F67] mb-4">Projects</h2>
          <p className="text-gray-600 text-lg">
            Selected builds — from platforms to real-time systems
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {projects.map((project, i) => (
            <Card
              key={i}
              className="border border-[#113F67]/20 hover:border-[#113F67]/60 transition-colors rounded-xl overflow-hidden flex flex-col shadow-none"
            >
              <CardContent className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${project.badgeClass}`}
                  >
                    {project.badge}
                  </span>
                  <span className="text-[11px] text-gray-400">
                    {project.period}
                  </span>
                </div>

                <p className="text-sm font-semibold text-[#113F67] leading-snug">
                  {project.title}
                </p>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.technologies.map((tech, k) => (
                    <Badge
                      key={k}
                      variant="secondary"
                      className="bg-[#113F67] text-white text-[10px] px-2 py-0.5 font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  {project.liveLink && (
                    <Button
                      size="sm"
                      className="h-7 px-3 text-xs bg-[#113F67] hover:bg-[#0d2f50] text-white"
                      asChild
                    >
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.codeLink && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-3 text-xs border-[#113F67] text-[#113F67] hover:bg-[#113F67]/5"
                      asChild
                    >
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}