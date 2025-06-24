"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addCertificate, updateCertificate } from "@/app/actions"
import Image from "next/image"
import type { Certificate } from "@/lib/types"

interface CertificateDialogProps {
  children: React.ReactNode
  certificate?: Certificate
}

export function CertificateDialog({ children, certificate }: CertificateDialogProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const action = certificate ? updateCertificate : addCertificate
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{certificate ? "Edit Certificate" : "Add New Certificate"}</DialogTitle>
          <DialogDescription>
            {certificate ? "Update certificate information" : "Add a new certificate to your portfolio"}
          </DialogDescription>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {certificate && <input type="hidden" name="id" value={certificate.id} />}
          {certificate && <input type="hidden" name="current_image_url" value={certificate.image_url || ""} />}
          {certificate && (
            <input type="hidden" name="current_image_public_id" value={certificate.image_public_id || ""} />
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Certificate Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="React Developer Certification"
              defaultValue={certificate?.title}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input
              id="issuer"
              name="issuer"
              placeholder="Meta, Google, Microsoft, etc."
              defaultValue={certificate?.issuer}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue_date">Issue Date</Label>
            <Input id="issue_date" name="issue_date" type="date" defaultValue={certificate?.issue_date} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credential_id">Credential ID (Optional)</Label>
            <Input
              id="credential_id"
              name="credential_id"
              placeholder="ABC123XYZ"
              defaultValue={certificate?.credential_id}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credential_url">Certificate URL (Optional)</Label>
            <Input
              id="credential_url"
              name="credential_url"
              type="url"
              placeholder="https://coursera.org/verify/..."
              defaultValue={certificate?.credential_url}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Certificate Image</Label>
            <Input id="image" name="image" type="file" accept="image/*" />
            {certificate?.image_url && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Current image:</p>
                <Image
                  src={certificate.image_url || "/placeholder.svg"}
                  alt="Current certificate image"
                  width={200}
                  height={120}
                  className="rounded-lg object-cover"
                />
              </div>
            )}
          </div>

          <Button type="submit" className="w-full">
            {certificate ? "Update Certificate" : "Add Certificate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
