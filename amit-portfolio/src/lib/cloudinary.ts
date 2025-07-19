// Cloudinary configuration and utilities
export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_IMG_UPLOAD_PRESET, // ✅ Fixed key
};
// Upload image to Cloudinary
export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryConfig.uploadPreset!);
  formData.append("folder", "portfolio");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Upload failed");
    }

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
};

// Get optimized image URL
export const getOptimizedImageUrl = (
  url: string,
  options?: {
    width?: number;
    height?: number;
    quality?: string;
    format?: string;
  }
) => {
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }

  const {
    width = 800,
    height = 600,
    quality = "auto",
    format = "auto",
  } = options || {};

  // Insert transformation parameters into the Cloudinary URL
  const transformations = `w_${width},h_${height},c_fill,q_${quality},f_${format}`;
  return url.replace("/upload/", `/upload/${transformations}/`);
};

// Extract public ID from Cloudinary URL
export const extractPublicId = (url: string): string => {
  if (!url || !url.includes("cloudinary.com")) return url;

  const parts = url.split("/");
  const uploadIndex = parts.findIndex((part) => part === "upload");
  if (uploadIndex === -1) return url;

  // Get everything after the transformation parameters
  const afterUpload = parts.slice(uploadIndex + 1);
  const publicIdParts = afterUpload.filter(
    (part) =>
      !part.startsWith("w_") &&
      !part.startsWith("h_") &&
      !part.startsWith("c_") &&
      !part.startsWith("q_") &&
      !part.startsWith("f_")
  );

  return publicIdParts.join("/").replace(/\.[^/.]+$/, ""); // Remove file extension
};

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    // Note: Deletion requires server-side implementation with API secret
    // For now, we'll just log the deletion attempt
    console.log("Image deletion requested for:", publicId);
    // In a production environment, you would call your backend API to delete the image
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw new Error("Failed to delete image");
  }
};
