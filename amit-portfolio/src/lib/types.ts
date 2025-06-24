// Database entity types
export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  image_public_id?: string
  featured?: boolean
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id: string
  name: string
  category: string
  proficiency: number
  created_at?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field_of_study?: string
  start_date: string
  end_date?: string | null
  grade?: string
  description?: string
  created_at?: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  issue_date: string
  credential_id?: string
  credential_url?: string
  image_url?: string
  image_public_id?: string
  created_at?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject?: string
  message: string
  read: boolean
  created_at: string
}

export interface AdminUser {
  id: string
  email: string
  password_hash: string
  created_at: string
}

// Component Props Types
export interface ProjectsProps {
  projects: Project[]
}

export interface SkillsProps {
  skills: Skill[]
}

export interface EducationProps {
  education: Education[]
}

export interface CertificatesProps {
  certificates: Certificate[]
}

// Admin Form Props Types
export interface ProjectFormProps {
  project?: Project
}

export interface SkillFormProps {
  skill?: Skill
}

export interface CertificateFormProps {
  certificate?: Certificate
}

// Dashboard Stats Type
export interface DashboardStats {
  projects: number
  skills: number
  education: number
  certificates: number
  unreadMessages: number
}

// Server Action Response Types
export interface ActionResponse {
  success: boolean
  message?: string
  error?: string
}
