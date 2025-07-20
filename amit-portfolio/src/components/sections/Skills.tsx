"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SiJavascript, SiPython, SiCplusplus, SiMysql } from "react-icons/si";
import { DiJava } from "react-icons/di";
import { AiFillEdit } from "react-icons/ai";

const themeColor = "#113F67";

const languages = [
  {
    name: "TypeScript",
    icon: <SiJavascript className="h-6 w-6" style={{ color: themeColor }} />,
  },
  {
    name: "JavaScript",
    icon: <SiJavascript className="h-6 w-6 text-yellow-500" />,
  },
  {
    name: "C++",
    icon: <SiCplusplus className="h-6 w-6" style={{ color: themeColor }} />,
  },
  { name: "Java", icon: <DiJava className="h-6 w-6 text-red-600" /> },
  {
    name: "Python",
    icon: <SiPython className="h-6 w-6" style={{ color: "#2b6cb0" }} />,
  },
  {
    name: "SQL",
    icon: <SiMysql className="h-6 w-6" style={{ color: "#276749" }} />,
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <AiFillEdit className="mx-auto mb-2 text-4xl text-gray-950" />
          <h2 className="text-4xl font-bold mb-4" style={{ color: themeColor }}>
            Skills & Expertise
          </h2>
          <p className="text-gray-700 text-lg max-w-xl mx-auto">
            Programming languages I work with
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {languages.map(({ name, icon }) => (
            <Card
              key={name}
              className="border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              style={{ borderColor: themeColor }}
            >
              <CardContent className="flex items-center space-x-4 p-6">
                <div>{icon}</div>
                <div
                  className="font-semibold text-lg"
                  style={{ color: themeColor }}
                >
                  {name}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
