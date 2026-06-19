"use client";

import { Briefcase } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Contribution {
  text: string;
}

interface ExperienceProject {
  name: string;
  tag: string;
  tagVariant: "frontend" | "fullstack" | "ai" | "backend";
  contributions: Contribution[];
}

interface ExperienceItem {
  company: string;
  logo: string;
  role: string;
  location: string;
  period: string;
  projects: ExperienceProject[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Kaz Software",
    logo: "/image4.jpg",
    role: "Software Engineer Intern",
    location: "Dhaka, Bangladesh",
    period: "Feb 2026 – Jul 2026",
    projects: [
      {
        name: "Dariba — Invoice Validation & Compliance Platform (UAE)",
        tag: "Frontend",
        tagVariant: "frontend",
        contributions: [
          {
            text: "Built a type-aware Expression Builder in the Rule Engine using React with AST generation for backend validation.",
          },
          {
            text: "Developed a paginated audit activity feed with date-range and workspace filters, real-time formatting for 40+ event types, and SuperAdmin-scoped access control.",
          },
        ],
      },
      {
        name: "NASTA Management System — In-house",
        tag: "Full-stack",
        tagVariant: "fullstack",
        contributions: [
          {
            text: "Built the frontend with Next.js using clean architecture and developed a scalable ASP.NET Core backend with Dependency Injection and role-based authentication.",
          },
          {
            text: "Implemented real-time SignalR in-app notifications ensuring secure and maintainable system design.",
          },
        ],
      },
      {
        name: "RegAgent — AI Regulatory Intelligence Pipeline",
        tag: "AI",
        tagVariant: "ai",
        contributions: [
          {
            text: "Migrated LLM integration from OpenAI dependency to locally hosted Qwen3.5 9B via Ollama, reducing external API costs and improving data privacy.",
          },
        ],
      },
    ],
  },
];

const tagStyles: Record<string, string> = {
  frontend: "bg-blue-100 text-blue-800",
  fullstack: "bg-green-100 text-green-800",
  ai: "bg-purple-100 text-purple-800",
  backend: "bg-orange-100 text-orange-800",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Briefcase className="mx-auto mb-2 text-4xl text-gray-950" />
          <h2 className="text-4xl font-bold text-[#113F67] mb-4">Experience</h2>
          <p className="text-gray-600 text-lg">Where I&apos;ve worked and what I built</p>
        </div>

        <motion.div
          className="flex flex-col gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {experiences.map((exp, i) => (
            <motion.div key={i} variants={item}>
              <div className="bg-white border border-[#113F67]/20 rounded-xl overflow-hidden hover:border-[#113F67]/50 transition-colors">
                {/* Header */}
                <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
                  <div className="w-[52px] h-[52px] rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden flex-shrink-0">
                    <Image
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      width={52}
                      height={52}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-[#113F67]">
                      {exp.company}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                      <span className="text-sm text-gray-500">{exp.role}</span>
                      <span className="text-gray-300 text-xs">•</span>
                      <span className="text-sm text-gray-500">{exp.location}</span>
                    </div>
                  </div>

                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-800 whitespace-nowrap flex-shrink-0">
                    {exp.period}
                  </span>
                </div>

                {/* Projects */}
                <div className="px-6 pb-2">
                  {exp.projects.map((proj, j) => (
                    <div
                      key={j}
                      className={`py-4 ${
                        j < exp.projects.length - 1
                          ? "border-b border-gray-100"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <p className="text-sm font-semibold text-[#113F67]">
                          {proj.name}
                        </p>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tagStyles[proj.tagVariant]}`}
                        >
                          {proj.tag}
                        </span>
                      </div>

                      <ul className="space-y-2">
                        {proj.contributions.map((c, k) => (
                          <li key={k} className="flex gap-2.5 text-xs text-gray-500 leading-relaxed">
                            <span className="text-[#113F67] mt-0.5 flex-shrink-0 font-medium">—</span>
                            <span>{c.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}