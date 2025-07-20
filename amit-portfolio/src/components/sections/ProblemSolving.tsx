"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code, Brain } from "lucide-react";
import { apiClient } from "@/lib/api";

interface ProblemSolving {
  _id: string;
  title: string;
  description: string;
  link: string;
  platform: string;
}

export function ProblemSolving() {
  const [problemSolving, setProblemSolving] = useState<ProblemSolving[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProblemSolving = async () => {
      try {
        const data = await apiClient.getAll("problem-solving");
        setProblemSolving(data);
      } catch (error) {
        console.error("Error fetching problem solving:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProblemSolving();
  }, []);

  const platformColors: Record<string, string> = {
    LeetCode: "bg-orange-500",
    HackerRank: "bg-green-600",
    CodeChef: "bg-purple-700",
    Codeforces: "bg-blue-600",
    AtCoder: "bg-red-500",
    Other: "bg-gray-500",
  };

  if (loading) {
    return (
      <section id="problem-solving" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Loading Problem Solving...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="problem-solving" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Brain className="h-12 w-12 text-indigo-700 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">
            Problem Solving
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Competitive programming and algorithmic challenges
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemSolving.map((item) => (
            <Card
              key={item._id}
              className="border border-gray-200 shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-800 text-lg flex items-center gap-2">
                    <Code className="h-5 w-5 text-indigo-700" />
                    {item.title}
                  </CardTitle>
                  <Badge
                    className={`text-white text-xs px-3 py-1 rounded-full ${
                      platformColors[item.platform] || platformColors.Other
                    }`}
                  >
                    {item.platform}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm line-clamp-3">
                  {item.description}
                </p>
                {item.link && (
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                    asChild
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Solution
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
