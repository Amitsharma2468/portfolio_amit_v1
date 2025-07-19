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

  const platformColors = {
    LeetCode: "bg-orange-500",
    HackerRank: "bg-green-500",
    CodeChef: "bg-brown-500",
    Codeforces: "bg-blue-500",
    AtCoder: "bg-red-500",
    Other: "bg-gray-500",
  };

  if (loading) {
    return (
      <section id="problem-solving" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Loading Problem Solving...
            </h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="problem-solving" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Brain className="h-12 w-12 text-blue-400 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Problem Solving
          </h2>
          <p className="text-gray-300 text-lg">
            Competitive programming and algorithmic challenges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problemSolving.map((item) => (
            <Card
              key={item._id}
              className="bg-slate-800 border-purple-500/20 hover:border-blue-500/40 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-400" />
                  {item.title}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className={`${
                    platformColors[
                      item.platform as keyof typeof platformColors
                    ] || platformColors.Other
                  } text-white w-fit`}
                >
                  {item.platform}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-4">{item.description}</p>

                {item.link && (
                  <Button size="sm" asChild>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
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
