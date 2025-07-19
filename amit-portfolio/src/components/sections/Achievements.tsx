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
      <section id="achievements" className="py-20 px-4 bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loading Achievements...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-20 px-4 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Trophy className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">Achievements</h2>
          <p className="text-gray-300 text-lg">
            Recognition and accomplishments in my journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement) => (
            <Card
              key={achievement._id}
              className="bg-slate-800 border-purple-500/20 hover:border-yellow-500/40 transition-all duration-300"
            >
              {achievement.image && (
                <div className="aspect-video overflow-hidden rounded-t-lg">
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
                <CardTitle className="text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  {achievement.title}
                </CardTitle>
                {achievement.date && (
                  <p className="text-gray-400 text-sm">
                    {new Date(achievement.date).toLocaleDateString()}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{achievement.description}</p>

                {achievement.link && (
                  <Button size="sm" asChild>
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Certificate
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
