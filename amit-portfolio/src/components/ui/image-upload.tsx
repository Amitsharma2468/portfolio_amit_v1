"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Link, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    setUploading(true);
    try {
      const imageUrl = await uploadToCloudinary(file);
      onChange(imageUrl);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput("");
      setShowUrlInput(false);
    }
  };

  const removeImage = () => {
    onChange("");
    setUrlInput("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {value ? (
        <Card className="bg-slate-700 border-purple-500/20">
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={value}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          <Card
            className={`bg-slate-700 border-2 border-dashed transition-colors ${
              dragActive
                ? "border-purple-400 bg-purple-500/10"
                : "border-purple-500/20 hover:border-purple-500/40"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <CardContent className="p-8">
              <div className="text-center">
                {uploading ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
                    <p className="text-gray-300">Uploading image...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-4">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        Drag and drop an image here, or click to select
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports: JPG, PNG, GIF, WebP (max 10MB)
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowUrlInput(!showUrlInput)}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        Use URL
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {showUrlInput && (
            <Card className="bg-slate-700 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter image URL"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="bg-slate-600 border-purple-500/20 text-white"
                    onKeyPress={(e) => e.key === "Enter" && handleUrlSubmit()}
                  />
                  <Button onClick={handleUrlSubmit} disabled={!urlInput.trim()}>
                    Add
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUrlInput(false);
                      setUrlInput("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
