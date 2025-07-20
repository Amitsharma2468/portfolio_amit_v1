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

  const levelColors: Record<string, string> = {
    Beginner: "bg-green-100 text-green-800",
    Intermediate: "bg-yellow-100 text-yellow-800",
    Advanced: "bg-orange-100 text-orange-800",
    Expert: "bg-red-100 text-red-800",
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 px-4 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Loading Skills...
        </h2>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">Skills</h2>
          <p className="text-gray-600 text-lg">
            My technical expertise and proficiency levels
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card
              key={category}
              className="bg-white border border-gray-200 shadow-md rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-indigo-600 mb-4">
                  {category}
                </h3>

                <div className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div
                      key={skill._id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700 font-medium">
                        {skill.name}
                      </span>
                      <Badge
                        className={`${
                          levelColors[skill.level] ||
                          "bg-gray-200 text-gray-800"
                        } px-3 py-1 text-sm font-semibold rounded-full`}
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
