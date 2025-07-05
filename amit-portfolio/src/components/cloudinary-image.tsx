"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CloudinaryImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  sizes?: string
  priority?: boolean
  quality?: number
  format?: "auto" | "webp" | "avif" | "jpg" | "png"
  crop?: "fill" | "fit" | "scale" | "crop" | "thumb"
  gravity?: "auto" | "face" | "center" | "north" | "south" | "east" | "west"
  blur?: number
  brightness?: number
  contrast?: number
  saturation?: number
  overlay?: string
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export default function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  sizes,
  priority = false,
  quality = 80,
  format = "auto",
  crop = "fill",
  gravity = "auto",
  blur,
  brightness,
  contrast,
  saturation,
  overlay,
  placeholder,
  blurDataURL,
  ...props
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Check if the src is a Cloudinary URL
  const isCloudinaryUrl = src.includes("cloudinary.com") || src.includes("res.cloudinary.com")

  const buildCloudinaryUrl = (originalUrl: string) => {
    if (!isCloudinaryUrl) return originalUrl

    try {
      const url = new URL(originalUrl)
      const pathParts = url.pathname.split("/")

      // Find the version and public_id parts
      const uploadIndex = pathParts.findIndex((part) => part === "upload")
      if (uploadIndex === -1) return originalUrl

      const transformations = []

      // Quality
      if (quality !== 80) {
        transformations.push(`q_${quality}`)
      }

      // Format
      if (format !== "auto") {
        transformations.push(`f_${format}`)
      } else {
        transformations.push("f_auto")
      }

      // Dimensions and crop
      if (width && height) {
        transformations.push(`w_${width},h_${height},c_${crop}`)
      } else if (width) {
        transformations.push(`w_${width}`)
      } else if (height) {
        transformations.push(`h_${height}`)
      }

      // Gravity
      if (gravity !== "auto" && crop === "fill") {
        transformations.push(`g_${gravity}`)
      }

      // Effects
      if (blur) transformations.push(`e_blur:${blur}`)
      if (brightness) transformations.push(`e_brightness:${brightness}`)
      if (contrast) transformations.push(`e_contrast:${contrast}`)
      if (saturation) transformations.push(`e_saturation:${saturation}`)
      if (overlay) transformations.push(`l_${overlay}`)

      // Add DPR for retina displays
      transformations.push("dpr_auto")

      // Construct the new URL
      const transformationString = transformations.join(",")
      pathParts.splice(uploadIndex + 1, 0, transformationString)

      url.pathname = pathParts.join("/")
      return url.toString()
    } catch (error) {
      console.error("Error building Cloudinary URL:", error)
      return originalUrl
    }
  }

  const optimizedSrc = buildCloudinaryUrl(src)

  const generateBlurDataURL = (imageUrl: string) => {
    if (!isCloudinaryUrl) return undefined

    try {
      const url = new URL(imageUrl)
      const pathParts = url.pathname.split("/")
      const uploadIndex = pathParts.findIndex((part) => part === "upload")

      if (uploadIndex !== -1) {
        pathParts.splice(uploadIndex + 1, 0, "w_10,h_10,e_blur:1000,f_auto,q_auto")
        url.pathname = pathParts.join("/")
        return url.toString()
      }
    } catch (error) {
      console.error("Error generating blur data URL:", error)
    }

    return undefined
  }

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={cn("flex items-center justify-center bg-gray-200 text-gray-400", className)}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-2xl mb-2">📷</div>
          <div className="text-sm">Image not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={optimizedSrc || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        placeholder={placeholder || (isCloudinaryUrl ? "blur" : "empty")}
        blurDataURL={blurDataURL || generateBlurDataURL(src)}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
          <div className="text-gray-400">Loading...</div>
        </div>
      )}
    </div>
  )
}
