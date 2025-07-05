"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus } from "lucide-react"
import { useToast } from "../../hooks/use-toast"
import CloudinaryUpload from "@/components/cloudinary-upload"

interface Skill {
  _id: string
  name: string
  category: string
  level?: string
}

interface Project {
  _id: string
  title: string
  description: string
  image: string
  link: string
  githubLink?: string
  technologies?: string[]
}

interface Certificate {
  _id: string
  title: string
  description: string
  image: string
  link: string
  issuer?: string
  date?: string
}

export default function AdminPanel() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Form states
  const [skillForm, setSkillForm] = useState({ name: "", category: "", level: "" })
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    githubLink: "",
    technologies: "",
  })
  const [certificateForm, setCertificateForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    issuer: "",
    date: "",
  })

  const [editingSkill, setEditingSkill] = useState<string | null>(null)
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [editingCertificate, setEditingCertificate] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [skillsRes, projectsRes, certificatesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates`),
      ])

      setSkills(await skillsRes.json())
      setProjects(await projectsRes.json())
      setCertificates(await certificatesRes.json())
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  // Skills CRUD
  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingSkill
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${editingSkill}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/skills`

      const method = editingSkill ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      })

      if (response.ok) {
        toast({ title: `Skill ${editingSkill ? "updated" : "added"} successfully!` })
        setSkillForm({ name: "", category: "", level: "" })
        setEditingSkill(null)
        fetchData()
      }
    } catch (error) {
      toast({ title: "Error saving skill", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteSkill = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({ title: "Skill deleted successfully!" })
        fetchData()
      }
    } catch (error) {
      toast({ title: "Error deleting skill", variant: "destructive" })
    }
  }

  // Projects CRUD
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const projectData = {
        ...projectForm,
        technologies: projectForm.technologies
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
      }

      const url = editingProject
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${editingProject}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/projects`

      const method = editingProject ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        toast({ title: `Project ${editingProject ? "updated" : "added"} successfully!` })
        setProjectForm({ title: "", description: "", image: "", link: "", githubLink: "", technologies: "" })
        setEditingProject(null)
        fetchData()
      }
    } catch (error) {
      toast({ title: "Error saving project", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({ title: "Project deleted successfully!" })
        fetchData()
      }
    } catch (error) {
      toast({ title: "Error deleting project", variant: "destructive" })
    }
  }

  // Certificates CRUD
  const handleCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const url = editingCertificate
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/certificates/${editingCertificate}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/certificates`

      const method = editingCertificate ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(certificateForm),
      })

      if (response.ok) {
        toast({ title: `Certificate ${editingCertificate ? "updated" : "added"} successfully!` })
        setCertificateForm({ title: "", description: "", image: "", link: "", issuer: "", date: "" })
        setEditingCertificate(null)
        fetchData()
      }
    } catch (error) {
      toast({ title: "Error saving certificate", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCertificate = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({ title: "Certificate deleted successfully!" })
        fetchData()
      }
    } catch (error) {
      toast({ title: "Error deleting certificate", variant: "destructive" })
    }
  }

  const editSkill = (skill: Skill) => {
    setSkillForm({ name: skill.name, category: skill.category, level: skill.level || "" })
    setEditingSkill(skill._id)
  }

  const editProject = (project: Project) => {
    setProjectForm({
      title: project.title,
      description: project.description,
      image: project.image,
      link: project.link,
      githubLink: project.githubLink || "",
      technologies: project.technologies?.join(", ") || "",
    })
    setEditingProject(project._id)
  }

  const editCertificate = (certificate: Certificate) => {
    setCertificateForm({
      title: certificate.title,
      description: certificate.description,
      image: certificate.image,
      link: certificate.link,
      issuer: certificate.issuer || "",
      date: certificate.date || "",
    })
    setEditingCertificate(certificate._id)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600">Manage your portfolio content</p>
        </div>

        <Tabs defaultValue="skills" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSkillSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <Input
                      placeholder="Skill Name"
                      value={skillForm.name}
                      onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                      required
                    />
                    <Select
                      value={skillForm.category}
                      onValueChange={(value) => setSkillForm({ ...skillForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Programming Languages">Programming Languages</SelectItem>
                        <SelectItem value="Web Technologies">Web Technologies</SelectItem>
                        <SelectItem value="Database">Database</SelectItem>
                        <SelectItem value="Tools & Frameworks">Tools & Frameworks</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Level (Optional)"
                      value={skillForm.level}
                      onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                      <Plus className="mr-2 h-4 w-4" />
                      {editingSkill ? "Update" : "Add"} Skill
                    </Button>
                    {editingSkill && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingSkill(null)
                          setSkillForm({ name: "", category: "", level: "" })
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary">{skill.name}</Badge>
                        <span className="text-sm text-gray-600">{skill.category}</span>
                        {skill.level && <span className="text-sm text-gray-500">({skill.level})</span>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => editSkill(skill)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteSkill(skill._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProjectSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Project Title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Live Demo Link"
                      value={projectForm.link}
                      onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <CloudinaryUpload
                      onUploadSuccess={(url) => setProjectForm({ ...projectForm, image: url })}
                      currentImage={projectForm.image}
                      folder="portfolio/projects"
                    />
                    <Input
                      placeholder="GitHub Link (Optional)"
                      value={projectForm.githubLink}
                      onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
                    />
                  </div>
                  <Input
                    placeholder="Technologies (comma separated)"
                    value={projectForm.technologies}
                    onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                  />
                  <Textarea
                    placeholder="Project Description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    required
                  />
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                      <Plus className="mr-2 h-4 w-4" />
                      {editingProject ? "Update" : "Add"} Project
                    </Button>
                    {editingProject && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingProject(null)
                          setProjectForm({
                            title: "",
                            description: "",
                            image: "",
                            link: "",
                            githubLink: "",
                            technologies: "",
                          })
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{project.title}</h4>
                        <p className="text-sm text-gray-600">{project.description.substring(0, 100)}...</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => editProject(project)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteProject(project._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{editingCertificate ? "Edit Certificate" : "Add New Certificate"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCertificateSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Certificate Title"
                      value={certificateForm.title}
                      onChange={(e) => setCertificateForm({ ...certificateForm, title: e.target.value })}
                      required
                    />
                    <Input
                      placeholder="Certificate Link"
                      value={certificateForm.link}
                      onChange={(e) => setCertificateForm({ ...certificateForm, link: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <CloudinaryUpload
                      onUploadSuccess={(url) => setCertificateForm({ ...certificateForm, image: url })}
                      currentImage={certificateForm.image}
                      folder="portfolio/certificates"
                    />
                    <Input
                      placeholder="Issuer (Optional)"
                      value={certificateForm.issuer}
                      onChange={(e) => setCertificateForm({ ...certificateForm, issuer: e.target.value })}
                    />
                    <Input
                      placeholder="Date (Optional)"
                      value={certificateForm.date}
                      onChange={(e) => setCertificateForm({ ...certificateForm, date: e.target.value })}
                    />
                  </div>
                  <Textarea
                    placeholder="Certificate Description"
                    value={certificateForm.description}
                    onChange={(e) => setCertificateForm({ ...certificateForm, description: e.target.value })}
                    required
                  />
                  <div className="flex gap-2">
                    <Button type="submit" disabled={isLoading}>
                      <Plus className="mr-2 h-4 w-4" />
                      {editingCertificate ? "Update" : "Add"} Certificate
                    </Button>
                    {editingCertificate && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingCertificate(null)
                          setCertificateForm({ title: "", description: "", image: "", link: "", issuer: "", date: "" })
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <div key={certificate._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{certificate.title}</h4>
                        <p className="text-sm text-gray-600">{certificate.description.substring(0, 100)}...</p>
                        {certificate.issuer && <p className="text-sm text-gray-500">Issued by {certificate.issuer}</p>}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => editCertificate(certificate)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteCertificate(certificate._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
