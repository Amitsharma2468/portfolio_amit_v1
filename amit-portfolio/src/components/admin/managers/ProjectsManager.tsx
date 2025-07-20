"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "@/components/ui/image-upload";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ExternalLink,
  Github,
} from "lucide-react";
import { apiClient } from "@/lib/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  codeLink: string;
  technologies: string[];
}

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    liveLink: "",
    codeLink: "",
    technologies: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await apiClient.getAll("projects");
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((tech) => tech.trim())
          .filter((tech) => tech),
      };

      if (editingId) {
        await apiClient.update("projects", editingId, projectData);
      } else {
        await apiClient.create("projects", projectData);
      }
      await fetchProjects();
      setEditingId(null);
      setShowAddForm(false);
      setFormData({
        title: "",
        description: "",
        image: "",
        liveLink: "",
        codeLink: "",
        technologies: "",
      });
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      liveLink: project.liveLink,
      codeLink: project.codeLink,
      technologies: project.technologies.join(", "),
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await apiClient.delete("projects", id);
        await fetchProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({
      title: "",
      description: "",
      image: "",
      liveLink: "",
      codeLink: "",
      technologies: "",
    });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#113F67]">
          Projects Management
        </h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-[#113F67] hover:bg-[#0d2c4f] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card className="bg-gray-50 border border-[#113F67] rounded-lg shadow-md">
          <CardHeader>
            <CardTitle className="text-[#113F67]">
              {editingId ? "Edit Project" : "Add New Project"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-white border border-[#113F67] text-[#113F67] placeholder-gray-500"
            />

            <Textarea
              placeholder="Project Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-white border border-[#113F67] text-[#113F67] placeholder-gray-500"
              rows={3}
            />

            <div>
              <label className="text-sm font-medium text-[#113F67] mb-2 block">
                Project Image
              </label>
              <ImageUpload
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
              />
            </div>

            <Input
              placeholder="Live Demo Link"
              value={formData.liveLink}
              onChange={(e) =>
                setFormData({ ...formData, liveLink: e.target.value })
              }
              className="bg-white border border-[#113F67] text-[#113F67] placeholder-gray-500"
            />

            <Input
              placeholder="Code Repository Link"
              value={formData.codeLink}
              onChange={(e) =>
                setFormData({ ...formData, codeLink: e.target.value })
              }
              className="bg-white border border-[#113F67] text-[#113F67] placeholder-gray-500"
            />

            <Input
              placeholder="Technologies (comma separated)"
              value={formData.technologies}
              onChange={(e) =>
                setFormData({ ...formData, technologies: e.target.value })
              }
              className="bg-white border border-[#113F67] text-[#113F67] placeholder-gray-500"
            />

            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-700 hover:bg-green-800 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border border-[#113F67] text-[#113F67] hover:bg-[#0d2c4f] hover:text-white"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project._id}
            className="bg-gray-50 border border-[#113F67] rounded-lg shadow-md"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-[#113F67] text-lg">
                  {project.title}
                </h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-[#113F67] hover:text-[#0d2c4f]"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(project._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {project.image && (
                <OptimizedImage
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={200}
                  className="w-full h-32 object-cover rounded mb-3"
                />
              )}

              <p className="text-sm text-gray-700 mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#113F67] text-white text-xs"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-3">
                {project.liveLink && (
                  <Button
                    size="sm"
                    className="bg-[#113F67] hover:bg-[#0d2c4f] text-white"
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
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-[#113F67] text-[#113F67] hover:bg-[#0d2c4f] hover:text-white"
                    asChild
                  >
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
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
  );
}
