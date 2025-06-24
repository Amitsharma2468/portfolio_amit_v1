"use server"

import { getDatabase } from "@/lib/db"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { ObjectId } from "mongodb"
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/cloudinary"
import { revalidatePath } from "next/cache"

async function verifyAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin-token")
  return token?.value === "admin-authenticated"
}

// Contact Form
export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  try {
    const db = await getDatabase()

    await db.collection("contact_messages").insertOne({
      name,
      email,
      subject,
      message,
      read: false,
      created_at: new Date(),
    })

    return { success: true, message: "Message sent successfully!" }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return { success: false, error: "Failed to send message" }
  }
}

// Authentication
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (email === "amitkmrsharma292@gmail.com" && password === "admin123") {
    const cookieStore = await cookies()
    cookieStore.set("admin-token", "admin-authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    })

    redirect("/admin")
  } else {
    redirect("/admin/login?error=invalid")
  }
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("admin-token")
  redirect("/admin/login")
}

// PROJECT CRUD OPERATIONS
export async function addProject(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    let imageUrl = ""
    let imagePublicId = ""

    // Handle image upload
    const imageFile = formData.get("image") as File
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile, "portfolio/projects")
      imageUrl = (uploadResult as any).secure_url
      imagePublicId = (uploadResult as any).public_id
    }

    const project = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      technologies: (formData.get("technologies") as string).split(",").map((t) => t.trim()),
      github_url: formData.get("github_url") as string,
      live_url: formData.get("live_url") as string,
      image_url: imageUrl,
      image_public_id: imagePublicId,
      featured: formData.get("featured") === "on",
      created_at: new Date(),
      updated_at: new Date(),
    }

    await db.collection("projects").insertOne(project)
    revalidatePath("/admin/projects")
    revalidatePath("/")
    return { success: true, message: "Project added successfully!" }
  } catch (error) {
    console.error("Error adding project:", error)
    return { success: false, error: "Failed to add project" }
  }
}

export async function updateProject(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    const projectId = formData.get("id") as string
    let imageUrl = formData.get("current_image_url") as string
    let imagePublicId = formData.get("current_image_public_id") as string

    // Handle new image upload
    const imageFile = formData.get("image") as File
    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId)
      }

      // Upload new image
      const uploadResult = await uploadToCloudinary(imageFile, "portfolio/projects")
      imageUrl = (uploadResult as any).secure_url
      imagePublicId = (uploadResult as any).public_id
    }

    const updateData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      technologies: (formData.get("technologies") as string).split(",").map((t) => t.trim()),
      github_url: formData.get("github_url") as string,
      live_url: formData.get("live_url") as string,
      image_url: imageUrl,
      image_public_id: imagePublicId,
      featured: formData.get("featured") === "on",
      updated_at: new Date(),
    }

    await db.collection("projects").updateOne({ _id: new ObjectId(projectId) }, { $set: updateData })

    revalidatePath("/admin/projects")
    revalidatePath("/")
    return { success: true, message: "Project updated successfully!" }
  } catch (error) {
    console.error("Error updating project:", error)
    return { success: false, error: "Failed to update project" }
  }
}

export async function deleteProject(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    const projectId = formData.get("id") as string

    // Get project to delete image
    const project = await db.collection("projects").findOne({ _id: new ObjectId(projectId) })
    if (project?.image_public_id) {
      await deleteFromCloudinary(project.image_public_id)
    }

    await db.collection("projects").deleteOne({ _id: new ObjectId(projectId) })

    revalidatePath("/admin/projects")
    revalidatePath("/")
    return { success: true, message: "Project deleted successfully!" }
  } catch (error) {
    console.error("Error deleting project:", error)
    return { success: false, error: "Failed to delete project" }
  }
}

// CERTIFICATE CRUD OPERATIONS
export async function addCertificate(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    let imageUrl = ""
    let imagePublicId = ""

    // Handle image upload
    const imageFile = formData.get("image") as File
    if (imageFile && imageFile.size > 0) {
      const uploadResult = await uploadToCloudinary(imageFile, "portfolio/certificates")
      imageUrl = (uploadResult as any).secure_url
      imagePublicId = (uploadResult as any).public_id
    }

    const certificate = {
      title: formData.get("title") as string,
      issuer: formData.get("issuer") as string,
      issue_date: new Date(formData.get("issue_date") as string),
      credential_id: formData.get("credential_id") as string,
      credential_url: formData.get("credential_url") as string,
      image_url: imageUrl,
      image_public_id: imagePublicId,
      created_at: new Date(),
    }

    await db.collection("certificates").insertOne(certificate)
    revalidatePath("/admin/certificates")
    revalidatePath("/")
    return { success: true, message: "Certificate added successfully!" }
  } catch (error) {
    console.error("Error adding certificate:", error)
    return { success: false, error: "Failed to add certificate" }
  }
}

export async function updateCertificate(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    const certificateId = formData.get("id") as string
    let imageUrl = formData.get("current_image_url") as string
    let imagePublicId = formData.get("current_image_public_id") as string

    // Handle new image upload
    const imageFile = formData.get("image") as File
    if (imageFile && imageFile.size > 0) {
      // Delete old image if exists
      if (imagePublicId) {
        await deleteFromCloudinary(imagePublicId)
      }

      // Upload new image
      const uploadResult = await uploadToCloudinary(imageFile, "portfolio/certificates")
      imageUrl = (uploadResult as any).secure_url
      imagePublicId = (uploadResult as any).public_id
    }

    const updateData = {
      title: formData.get("title") as string,
      issuer: formData.get("issuer") as string,
      issue_date: new Date(formData.get("issue_date") as string),
      credential_id: formData.get("credential_id") as string,
      credential_url: formData.get("credential_url") as string,
      image_url: imageUrl,
      image_public_id: imagePublicId,
      updated_at: new Date(),
    }

    await db.collection("certificates").updateOne({ _id: new ObjectId(certificateId) }, { $set: updateData })

    revalidatePath("/admin/certificates")
    revalidatePath("/")
    return { success: true, message: "Certificate updated successfully!" }
  } catch (error) {
    console.error("Error updating certificate:", error)
    return { success: false, error: "Failed to update certificate" }
  }
}

export async function deleteCertificate(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    const certificateId = formData.get("id") as string

    // Get certificate to delete image
    const certificate = await db.collection("certificates").findOne({ _id: new ObjectId(certificateId) })
    if (certificate?.image_public_id) {
      await deleteFromCloudinary(certificate.image_public_id)
    }

    await db.collection("certificates").deleteOne({ _id: new ObjectId(certificateId) })

    revalidatePath("/admin/certificates")
    revalidatePath("/")
    return { success: true, message: "Certificate deleted successfully!" }
  } catch (error) {
    console.error("Error deleting certificate:", error)
    return { success: false, error: "Failed to delete certificate" }
  }
}

// SKILL CRUD OPERATIONS
export async function addSkill(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()

    const skill = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      proficiency: Number.parseInt(formData.get("proficiency") as string),
      created_at: new Date(),
    }

    await db.collection("skills").insertOne(skill)
    revalidatePath("/admin/skills")
    revalidatePath("/")
    return { success: true, message: "Skill added successfully!" }
  } catch (error) {
    console.error("Error adding skill:", error)
    return { success: false, error: "Failed to add skill" }
  }
}

export async function updateSkill(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    const skillId = formData.get("id") as string

    const updateData = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      proficiency: Number.parseInt(formData.get("proficiency") as string),
      updated_at: new Date(),
    }

    await db.collection("skills").updateOne({ _id: new ObjectId(skillId) }, { $set: updateData })

    revalidatePath("/admin/skills")
    revalidatePath("/")
    return { success: true, message: "Skill updated successfully!" }
  } catch (error) {
    console.error("Error updating skill:", error)
    return { success: false, error: "Failed to update skill" }
  }
}

export async function deleteSkill(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    const skillId = formData.get("id") as string

    await db.collection("skills").deleteOne({ _id: new ObjectId(skillId) })

    revalidatePath("/admin/skills")
    revalidatePath("/")
    return { success: true, message: "Skill deleted successfully!" }
  } catch (error) {
    console.error("Error deleting skill:", error)
    return { success: false, error: "Failed to delete skill" }
  }
}

// CONTACT MESSAGE OPERATIONS
export async function markMessageAsRead(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    const messageId = formData.get("id") as string

    await db.collection("contact_messages").updateOne({ _id: new ObjectId(messageId) }, { $set: { read: true } })

    revalidatePath("/admin/messages")
    return { success: true }
  } catch (error) {
    console.error("Error marking message as read:", error)
    return { success: false, error: "Failed to update message" }
  }
}

export async function deleteMessage(formData: FormData) {
  const isAdmin = await verifyAdmin()
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const db = await getDatabase()
    const messageId = formData.get("id") as string

    await db.collection("contact_messages").deleteOne({ _id: new ObjectId(messageId) })

    revalidatePath("/admin/messages")
    return { success: true, message: "Message deleted successfully!" }
  } catch (error) {
    console.error("Error deleting message:", error)
    return { success: false, error: "Failed to delete message" }
  }
}
