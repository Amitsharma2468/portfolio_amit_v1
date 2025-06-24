"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addSkill, updateSkill } from "@/app/actions"
import type { Skill } from "@/lib/types"

interface SkillDialogProps {
  children: React.ReactNode
  skill?: Skill
}

export function SkillDialog({ children, skill }: SkillDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const action = skill ? updateSkill : addSkill
    const result = await action(formData)

    if (result.success) {
      setOpen(false)
    } else {
      console.error(result.error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{skill ? "Edit Skill" : "Add New Skill"}</DialogTitle>
          <DialogDescription>
            {skill ? "Update skill information" : "Add a new skill to your portfolio"}
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {skill && <input type="hidden" name="id" value={skill.id} />}

          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="JavaScript, React, Node.js, etc."
              defaultValue={skill?.name}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={skill?.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Programming Languages">Programming Languages</SelectItem>
                <SelectItem value="Frontend Frameworks">Frontend Frameworks</SelectItem>
                <SelectItem value="Backend Technologies">Backend Technologies</SelectItem>
                <SelectItem value="Databases">Databases</SelectItem>
                <SelectItem value="Tools">Tools</SelectItem>
                <SelectItem value="Styling">Styling</SelectItem>
                <SelectItem value="Cloud Services">Cloud Services</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="proficiency">Proficiency Level (1-5)</Label>
            <Select name="proficiency" defaultValue={skill?.proficiency?.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Select proficiency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 - Beginner</SelectItem>
                <SelectItem value="2">2 - Basic</SelectItem>
                <SelectItem value="3">3 - Intermediate</SelectItem>
                <SelectItem value="4">4 - Advanced</SelectItem>
                <SelectItem value="5">5 - Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            {skill ? "Update Skill" : "Add Skill"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
