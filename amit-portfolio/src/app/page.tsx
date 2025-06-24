import { getDatabase } from "@/lib/db"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Education } from "@/components/education"
import Contact from "@/components/contact"
import { Certificates } from "@/components/certificates"
import type { Project, Skill, Education as EducationType, Certificate } from "@/lib/types"

async function getPortfolioData() {
  try {
    const db = await getDatabase()

    const [projectsData, skillsData, educationData, certificatesData] = await Promise.all([
      db.collection("projects").find({ featured: true }).sort({ created_at: -1 }).limit(6).toArray(),
      db.collection("skills").find({}).sort({ category: 1, name: 1 }).toArray(),
      db.collection("education").find({}).sort({ start_date: -1 }).toArray(),
      db.collection("certificates").find({}).sort({ issue_date: -1 }).limit(6).toArray(),
    ])

    // Transform projects with proper typing
    const projects: Project[] = projectsData.map((item: any) => ({
      id: item._id.toString(),
      title: item.title || "Untitled Project",
      description: item.description || "No description available",
      technologies: Array.isArray(item.technologies) ? item.technologies : [],
      github_url: item.github_url || undefined,
      live_url: item.live_url || undefined,
      image_url: item.image_url || undefined,
      image_public_id: item.image_public_id || undefined,
      featured: Boolean(item.featured),
      created_at: item.created_at?.toISOString(),
      updated_at: item.updated_at?.toISOString(),
    }))

    // Transform skills with proper typing
    const skills: Skill[] = skillsData.map((item: any) => ({
      id: item._id.toString(),
      name: item.name || "Unknown Skill",
      category: item.category || "Other",
      proficiency: Number(item.proficiency) || 1,
      created_at: item.created_at?.toISOString(),
    }))

    // Transform education with proper typing
    const education: EducationType[] = educationData.map((item: any) => ({
      id: item._id.toString(),
      institution: item.institution || "Unknown Institution",
      degree: item.degree || "Unknown Degree",
      field_of_study: item.field_of_study || undefined,
      start_date: item.start_date ? item.start_date.toISOString() : new Date().toISOString(),
      end_date: item.end_date ? item.end_date.toISOString() : null,
      grade: item.grade || undefined,
      description: item.description || undefined,
      created_at: item.created_at?.toISOString(),
    }))

    // Transform certificates with proper typing
    const certificates: Certificate[] = certificatesData.map((item: any) => ({
      id: item._id.toString(),
      title: item.title || "Unknown Certificate",
      issuer: item.issuer || "Unknown Issuer",
      issue_date: item.issue_date ? item.issue_date.toISOString() : new Date().toISOString(),
      credential_id: item.credential_id || undefined,
      credential_url: item.credential_url || undefined,
      image_url: item.image_url || undefined,
      image_public_id: item.image_public_id || undefined,
      created_at: item.created_at?.toISOString(),
    }))

    console.log("Portfolio data loaded:", {
      projects: projects.length,
      skills: skills.length,
      education: education.length,
      certificates: certificates.length,
    })

    return {
      projects,
      skills,
      education,
      certificates,
    }
  } catch (error) {
    console.error("Error fetching portfolio data:", error)

    // Return empty arrays with proper typing
    return {
      projects: [] as Project[],
      skills: [] as Skill[],
      education: [] as EducationType[],
      certificates: [] as Certificate[],
    }
  }
}

export default async function HomePage() {
  const { projects, skills, education, certificates } = await getPortfolioData()

  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Education education={education} />
      <Certificates certificates={certificates} />
      <Contact />
    </main>
  )
}
