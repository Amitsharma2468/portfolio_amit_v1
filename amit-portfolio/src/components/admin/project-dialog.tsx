"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addProject, updateProject } from "@/app/actions"
import Image from "next/image"
import type { Project } from "@/lib/types"

interface ProjectDialogProps {
  children: React.ReactNode
  project?: Project
}

export function ProjectDialog({ children, project }: ProjectDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const action = project ? updateProject : addProject
    const result = await action(formData)

    if (result.success) {
      setOpen(false)
      // Optionally show success message
    } else {
      // Handle error
      console.error(result.error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Update project information" : "Create a new project for your portfolio"}
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {project && <input type="hidden" name="id" value={project.id} />}
          {project && <input type="hidden" name="current_image_url" value={project.image_url || ""} />}
          {project && <input type="hidden" name="current_image_public_id" value={project.image_public_id || ""} />}

          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" name="title" placeholder="My Awesome Project" defaultValue={project?.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Brief description of your project..."
              rows={3}
              defaultValue={project?.description}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma-separated)</Label>
            <Input
              id="technologies"
              name="technologies"
              placeholder="React, Next.js, TypeScript, MongoDB"
              defaultValue={project?.technologies?.join(", ")}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                name="github_url"
                type="url"
                placeholder="https://github.com/..."
                defaultValue={project?.github_url}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="live_url">Live Demo URL</Label>
              <Input
                id="live_url"
                name="live_url"
                type="url"
                placeholder="https://myproject.vercel.app"
                defaultValue={project?.live_url}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Project Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
            {project?.image_url && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current image:</p>
                <Image
                  src={project.image_url || "/placeholder.svg"}
                  alt="Current project image"
                  width={200}
                  height={120}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="featured" name="featured" defaultChecked={project?.featured} />
            <Label htmlFor="featured">Featured Project</Label>
          </div>

          <Button type="submit" className="w-full">
            {project ? "Update Project" : "Add Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
