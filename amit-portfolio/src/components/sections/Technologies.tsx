"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { apiClient } from "@/lib/api";

interface Technology {
  _id: string;
  name: string;
  icon: string;
  category: string;
}

export function Technologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const data = await apiClient.getAll("technologies");
        setTechnologies(data);
      } catch (error) {
        console.error("Error fetching technologies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = [];
    }
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

  if (loading) {
    return (
      <section id="technologies" className="py-20 px-4 bg-white text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Loading Technologies...
        </h2>
      </section>
    );
  }

  return (
    <section id="technologies" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">
            Technologies & Tools
          </h2>
          <p className="text-gray-600 text-lg">
            Technologies and tools I work with
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="space-y-12">
          {Object.entries(groupedTechnologies).map(
            ([category, categoryTechs]) => (
              <div key={category}>
                <h3 className="text-2xl font-semibold text-indigo-600 mb-6 text-center md:text-left">
                  {category}
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {categoryTechs.map((tech) => (
                    <Card
                      key={tech._id}
                      className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition duration-300 rounded-xl"
                    >
                      <CardContent className="p-5 text-center">
                        <div className="text-3xl mb-3">{tech.icon}</div>
                        <p className="text-gray-700 font-medium text-sm">
                          {tech.name}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
