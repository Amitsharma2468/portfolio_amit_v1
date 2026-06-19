"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiReacttable,
  SiTailwindcss,
  SiExpress,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGithubactions,
  SiGit,
  SiFirebase,
  SiCloudinary,
  SiJavascript,
  SiTypescript,
  SiShadcnui,
  SiLeaflet,
  SiVite,
  SiHtml5,
  SiCss,
  SiSocketdotio,
  SiDotnet,
  SiPrisma,
} from "react-icons/si";
import { FaInfinity, FaTools, FaJava, FaDatabase } from "react-icons/fa";
import { TbBrandAzure } from "react-icons/tb";
import { GiMaterialsScience } from "react-icons/gi";
import { motion } from "framer-motion";

interface Technology {
  name: string;
  icon: React.ReactNode;
}

const themeColor = "#113F67";

const technologies: Technology[] = [
  { name: "Next.js", icon: <SiNextdotjs style={{ color: themeColor }} /> },
  { name: "React", icon: <SiReact style={{ color: themeColor }} /> },
  { name: "React Query", icon: <SiReactquery style={{ color: themeColor }} /> },
  { name: "React Table", icon: <SiReacttable style={{ color: themeColor }} /> },
  { name: "ShadCN", icon: <SiShadcnui style={{ color: themeColor }} /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss style={{ color: themeColor }} /> },
  { name: "Material UI", icon: <GiMaterialsScience style={{ color: themeColor }} /> },
  { name: "Express.js", icon: <SiExpress style={{ color: themeColor }} /> },
  { name: "Node.js", icon: <SiNodedotjs style={{ color: themeColor }} /> },
  { name: "ASP.NET Core", icon: <SiDotnet style={{ color: "#512BD4" }} /> },
  { name: "SignalR", icon: <TbBrandAzure style={{ color: "#0078D4" }} /> },
  { name: "Prisma", icon: <SiPrisma style={{ color: themeColor }} /> },
  { name: "MongoDB", icon: <SiMongodb style={{ color: "#276749" }} /> },
  { name: "MySQL", icon: <SiMysql style={{ color: "#276749" }} /> },
  { name: "PostgreSQL", icon: <SiPostgresql style={{ color: "#276749" }} /> },
  { name: "MSSQL Server", icon: <FaDatabase style={{ color: "#CC2927" }} /> },
  { name: "GitHub Actions", icon: <SiGithubactions style={{ color: themeColor }} /> },
  { name: "Git", icon: <SiGit style={{ color: "#F05032" }} /> },
  { name: "Firebase", icon: <SiFirebase style={{ color: "#F97316" }} /> },
  { name: "Cloudinary", icon: <SiCloudinary style={{ color: themeColor }} /> },
  { name: "Leaflet", icon: <SiLeaflet style={{ color: "#199900" }} /> },
  { name: "WebSocket", icon: <SiSocketdotio style={{ color: themeColor }} /> },
  { name: "Infinite Scroll", icon: <FaInfinity style={{ color: themeColor }} /> },
  { name: "JavaScript", icon: <SiJavascript style={{ color: "#F7DF1E" }} /> },
  { name: "TypeScript", icon: <SiTypescript style={{ color: "#3178C6" }} /> },
  { name: "Java", icon: <FaJava style={{ color: "#E76F00" }} /> },
  { name: "Vite", icon: <SiVite style={{ color: "#646CFF" }} /> },
  { name: "HTML5", icon: <SiHtml5 style={{ color: "#E34F26" }} /> },
  { name: "CSS3", icon: <SiCss style={{ color: "#1572B6" }} /> },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Technologies() {
  return (
    <section id="technologies" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <FaTools className="mx-auto mb-2 text-4xl text-gray-950" />
          <h2 className="text-4xl font-bold mb-4" style={{ color: themeColor }}>
            Technologies &amp; Tools
          </h2>
          <p className="text-gray-600 text-lg">
            Technologies and tools I work with
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {technologies.map((tech) => (
            <motion.div key={tech.name} variants={item}>
              <Card
                className="bg-white border shadow-none hover:shadow-sm transition duration-200 rounded-xl"
                style={{ borderColor: `${themeColor}33` }}
              >
                <CardContent className="p-4 text-center flex flex-col items-center gap-2">
                  <div className="text-2xl">{tech.icon}</div>
                  <p className="text-gray-700 font-medium text-xs leading-tight">
                    {tech.name}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}