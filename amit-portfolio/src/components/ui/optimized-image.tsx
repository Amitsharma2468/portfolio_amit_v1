"use client";

import { useState } from "react";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { ImageIcon } from "lucide-react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  quality?: string;
  format?: string;
}

export function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  quality = "auto",
  format = "auto",
}: OptimizedImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-700 ${className}`}
      >
        <ImageIcon className="h-8 w-8 text-gray-400" />
      </div>
    );
  }

  const optimizedSrc = getOptimizedImageUrl(src, {
    width,
    height,
    quality,
    format,
  });

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-700 ${className}`}
      >
        <div className="text-center text-gray-400">
          <ImageIcon className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">Failed to load image</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
          <div className="animate-pulse">
            <ImageIcon className="h-8 w-8 text-gray-400" />
          </div>
        </div>
      )}
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        unoptimized
      />
    </div>
  );
}
