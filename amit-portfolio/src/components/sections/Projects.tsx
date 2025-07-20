"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Folder } from "lucide-react";
import { apiClient } from "@/lib/api";
import { OptimizedImage } from "@/components/ui/optimized-image";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  codeLink: string;
  technologies: string[];
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await apiClient.getAll("projects");
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            Loading Projects...
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Folder className="mx-auto mb-2 text-4xl text-gray-950" />
          <h2 className="text-4xl font-bold text-[#113F67] mb-4">Projects</h2>
          <p className="text-gray-600 text-lg">
            Some of my recent work and personal projects
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="border-4 border-[#113F67] shadow-md hover:shadow-lg transition-all rounded-xl overflow-hidden"
            >
              {project.image && (
                <div className="aspect-video overflow-hidden mt-4 mx-4 rounded-lg">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-lg"
                  />
                </div>
              )}

              <CardHeader className="pt-4 px-6">
                <CardTitle className="text-[#113F67] text-xl font-semibold">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 px-6 pb-6">
                <p className="text-gray-800 text-sm">{project.description}</p>

                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-[#113F67] text-white"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  {project.liveLink && (
                    <Button
                      size="sm"
                      className="bg-[#113F67] hover:bg-indigo-900 text-white"
                      asChild
                    >
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Live
                      </a>
                    </Button>
                  )}
                  {project.codeLink && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#113F67] hover:text-indigo-900 flex items-center"
                      >
                        <Github className="h-4 w-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
