"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trophy } from "lucide-react";
import { apiClient } from "@/lib/api";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
}

export function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const data = await apiClient.getAll("achievements");
        setAchievements(data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <section id="achievements" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Loading Achievements...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">
            Achievements
          </h2>
          <p className="text-gray-600 text-lg">
            Recognition and accomplishments in my journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <Card
              key={achievement._id}
              className="border border-gray-200 shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden"
            >
              {achievement.image && (
                <div className="aspect-video overflow-hidden">
                  <OptimizedImage
                    src={achievement.image}
                    alt={achievement.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-gray-800 text-xl font-semibold flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  {achievement.title}
                </CardTitle>
                {achievement.date && (
                  <p className="text-sm text-gray-500">
                    {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  {achievement.description}
                </p>

                {achievement.link && (
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                    asChild
                  >
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">View Certificate</span>
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
