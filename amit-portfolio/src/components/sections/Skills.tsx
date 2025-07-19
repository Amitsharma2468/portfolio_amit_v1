"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api";

interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
}

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await apiClient.getAll("skills");
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const levelColors = {
    Beginner: "bg-green-500",
    Intermediate: "bg-yellow-500",
    Advanced: "bg-orange-500",
    Expert: "bg-red-500",
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loading Skills...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Skills</h2>
          <p className="text-gray-300 text-lg">
            My technical expertise and proficiency levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category} className="bg-slate-800 border-purple-500/20">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  {category}
                </h3>
                <div className="space-y-3">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill._id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-300">{skill.name}</span>
                      <Badge
                        variant="secondary"
                        className={`${
                          levelColors[skill.level as keyof typeof levelColors]
                        } text-white`}
                      >
                        {skill.level}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
