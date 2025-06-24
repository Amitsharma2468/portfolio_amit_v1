import { redirect } from "next/navigation"
import { verifyAdmin } from "@/lib/auth"
import { getDatabase } from "@/lib/db"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminNav } from "@/components/admin-nav"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import type { Project } from "@/lib/types"
import { ProjectDialog } from "@/components/admin/project-dialog"
import { DeleteProjectButton } from "@/components/admin/delete-actions"

async function getProjects(): Promise<Project[]> {
  try {
    const db = await getDatabase()
    const projects = await db.collection("projects").find({}).sort({ created_at: -1 }).toArray()

    return projects.map(
      (project): Project => ({
        id: project._id.toString(),
        title: project.title || "",
        description: project.description || "",
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        github_url: project.github_url,
        live_url: project.live_url,
        image_url: project.image_url,
        image_public_id: project.image_public_id,
        featured: Boolean(project.featured),
        created_at: project.created_at?.toISOString(),
        updated_at: project.updated_at?.toISOString(),
      }),
    )
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export default async function AdminProjects() {
  const isAdmin = await verifyAdmin()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Projects</h1>
            <ProjectDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </ProjectDialog>
          </div>

          <div className="grid gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    {project.image_url ? (
                      <Image
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 md:h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                        <span className="text-4xl font-bold text-gray-500">{project.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        {project.featured && <Badge className="mb-2">Featured</Badge>}
                      </div>
                      <div className="flex gap-2">
                        <ProjectDialog project={project}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </ProjectDialog>

                        <DeleteProjectButton projectId={project.id} />
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      {project.github_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.github_url} target="_blank" rel="noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            GitHub
                          </a>
                        </Button>
                      )}
                      {project.live_url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.live_url} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {projects.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500 mb-4">No projects yet. Add your first project!</p>
                  <ProjectDialog>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Project
                    </Button>
                  </ProjectDialog>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
