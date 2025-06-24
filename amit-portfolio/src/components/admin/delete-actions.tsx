"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { deleteProject, deleteCertificate, deleteSkill, deleteMessage } from "@/app/actions"

interface DeleteProjectButtonProps {
  projectId: string
}

export function DeleteProjectButton({ projectId }: DeleteProjectButtonProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return
    }

    const formData = new FormData()
    formData.append("id", projectId)

    const result = await deleteProject(formData)
    if (!result.success) {
      alert(result.error || "Failed to delete project")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}

interface DeleteCertificateButtonProps {
  certificateId: string
}

export function DeleteCertificateButton({ certificateId }: DeleteCertificateButtonProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this certificate?")) {
      return
    }

    const formData = new FormData()
    formData.append("id", certificateId)

    const result = await deleteCertificate(formData)
    if (!result.success) {
      alert(result.error || "Failed to delete certificate")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}

interface DeleteSkillButtonProps {
  skillId: string
}

export function DeleteSkillButton({ skillId }: DeleteSkillButtonProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this skill?")) {
      return
    }

    const formData = new FormData()
    formData.append("id", skillId)

    const result = await deleteSkill(formData)
    if (!result.success) {
      alert(result.error || "Failed to delete skill")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
      <Trash2 className="h-3 w-3" />
    </Button>
  )
}

interface DeleteMessageButtonProps {
  messageId: string
}

export function DeleteMessageButton({ messageId }: DeleteMessageButtonProps) {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this message?")) {
      return
    }

    const formData = new FormData()
    formData.append("id", messageId)

    const result = await deleteMessage(formData)
    if (!result.success) {
      alert(result.error || "Failed to delete message")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}

interface MarkAsReadButtonProps {
  messageId: string
}

export function MarkAsReadButton({ messageId }: MarkAsReadButtonProps) {
  const handleMarkAsRead = async () => {
    const formData = new FormData()
    formData.append("id", messageId)

    const result = await import("@/app/actions").then((actions) => actions.markMessageAsRead(formData))
    if (!result.success) {
      alert(result.error || "Failed to mark message as read")
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleMarkAsRead}>
      Mark as Read
    </Button>
  )
}
