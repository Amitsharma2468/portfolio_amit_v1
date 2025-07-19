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
      <section id="technologies" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loading Technologies...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="technologies" className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Technologies & Tools
          </h2>
          <p className="text-gray-300 text-lg">
            Technologies and tools I work with
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedTechnologies).map(
            ([category, categoryTechs]) => (
              <div key={category}>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {categoryTechs.map((tech) => (
                    <Card
                      key={tech._id}
                      className="bg-slate-700 border-purple-500/20 hover:border-purple-500/40 transition-colors"
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{tech.icon}</div>
                        <p className="text-sm text-gray-300">{tech.name}</p>
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
