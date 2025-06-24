import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { ProjectsProps } from "@/lib/types"

export function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Featured Projects</h2>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No projects to display yet.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
                    {project.image_url ? (
                      <Image
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={225}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-500">{project.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={project.github_url} target="_blank">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      )}
                      {project.live_url && (
                        <Button size="sm" asChild>
                          <Link href={project.live_url} target="_blank">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/admin/projects">Manage Projects</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
