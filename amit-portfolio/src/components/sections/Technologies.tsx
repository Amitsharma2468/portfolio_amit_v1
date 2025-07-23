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
  SiCss3,
} from "react-icons/si";
import { FaInfinity, FaTools } from "react-icons/fa";
import { GiMaterialsScience } from "react-icons/gi";
import { SiSocketdotio } from "react-icons/si";
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
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss style={{ color: themeColor }} />,
  },
  {
    name: "Material UI",
    icon: <GiMaterialsScience style={{ color: themeColor }} />,
  },
  { name: "Express.js", icon: <SiExpress style={{ color: themeColor }} /> },
  { name: "Node.js", icon: <SiNodedotjs style={{ color: themeColor }} /> },
  { name: "MongoDB", icon: <SiMongodb style={{ color: "#276749" }} /> },
  { name: "MySQL", icon: <SiMysql style={{ color: "#276749" }} /> },
  { name: "PostgreSQL", icon: <SiPostgresql style={{ color: "#276749" }} /> },
  {
    name: "GitHub Actions",
    icon: <SiGithubactions style={{ color: themeColor }} />,
  },
  { name: "Git", icon: <SiGit style={{ color: themeColor }} /> },
  { name: "Leaflet", icon: <SiLeaflet style={{ color: themeColor }} /> },
  { name: "Firebase", icon: <SiFirebase style={{ color: "#F97316" }} /> },
  { name: "Cloudinary", icon: <SiCloudinary style={{ color: themeColor }} /> },
  {
    name: "Infinite Scroll",
    icon: <FaInfinity style={{ color: themeColor }} />,
  },
  { name: "WebSocket", icon: <SiSocketdotio style={{ color: themeColor }} /> },
  { name: "JavaScript", icon: <SiJavascript style={{ color: "#F7DF1E" }} /> },
  { name: "TypeScript", icon: <SiTypescript style={{ color: themeColor }} /> },
  { name: "Vite", icon: <SiVite style={{ color: themeColor }} /> },
  { name: "HTML5", icon: <SiHtml5 style={{ color: "#E34F26" }} /> },
  { name: "CSS3", icon: <SiCss3 style={{ color: "#1572B6" }} /> },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Technologies() {
  return (
    <section id="technologies" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaTools className="mx-auto mb-2 text-4xl text-gray-950" />
          <h2 className="text-4xl font-bold mb-4" style={{ color: themeColor }}>
            Technologies &amp; Tools
          </h2>
          <p className="text-gray-600 text-lg">
            Technologies and tools I work with
          </p>
        </div>

        {/* Technologies Grid with Motion */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {technologies.map((tech) => (
            <motion.div key={tech.name} variants={item}>
              <Card
                className="bg-white border shadow-sm hover:shadow-md transition duration-300 rounded-xl"
                style={{ borderColor: themeColor }}
              >
                <CardContent className="p-5 text-center flex flex-col items-center">
                  <div className="text-3xl mb-3" style={{ color: themeColor }}>
                    {tech.icon}
                  </div>
                  <p className="text-gray-700 font-medium text-sm">
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
