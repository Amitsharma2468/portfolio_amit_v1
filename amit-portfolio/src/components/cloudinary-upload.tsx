"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { useToast } from "../hooks/use-toast"
import Image from "next/image"

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void
  currentImage?: string
  folder?: string
  maxFiles?: number
  acceptedTypes?: string[]
}

export default function CloudinaryUpload({
  onUploadSuccess,
  currentImage,
  folder = "portfolio",
  maxFiles = 1,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"],
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState<string>(currentImage || "")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
    formData.append("folder", folder)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    )

    if (!response.ok) {
      throw new Error("Upload failed")
    }

    const data = await response.json()
    return data.secure_url
  }

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please select a valid image file (JPEG, PNG, WebP, or GIF)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      })
      return
    }

    setUploading(true)

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Upload to Cloudinary
      const uploadedUrl = await uploadToCloudinary(file)

      // Clean up preview URL
      URL.revokeObjectURL(previewUrl)

      // Set the actual uploaded URL
      setPreview(uploadedUrl)
      onUploadSuccess(uploadedUrl)

      toast({
        title: "Upload successful",
        description: "Image has been uploaded successfully",
      })
    } catch (error) {
      console.error("Upload error:", error)
      setPreview(currentImage || "")
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files)
    }
  }

  const removeImage = () => {
    setPreview("")
    onUploadSuccess("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <Label>Image Upload</Label>

      {preview ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
                disabled={uploading}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2 truncate">{preview}</p>
          </CardContent>
        </Card>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="flex justify-center">
              {uploading ? (
                <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              ) : (
                <ImageIcon className="h-12 w-12 text-gray-400" />
              )}
            </div>

            <div>
              <p className="text-lg font-medium text-gray-900">{uploading ? "Uploading..." : "Drop your image here"}</p>
              <p className="text-sm text-gray-500">or click to browse (JPEG, PNG, WebP, GIF up to 10MB)</p>
            </div>

            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </div>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(",")}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
      />
    </div>
  )
}
