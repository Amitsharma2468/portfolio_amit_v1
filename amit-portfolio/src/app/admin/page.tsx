import { redirect } from "next/navigation"
import { verifyAdmin } from "@/lib/auth"
import { getDatabase } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminNav } from "@/components/admin-nav"
import { logoutAction } from "@/app/actions"
import { FolderOpen, Award, GraduationCap, Mail } from "lucide-react"
import type { DashboardStats } from "@/lib/types"

async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const db = await getDatabase()

    const [projects, skills, education, messages, certificates] = await Promise.all([
      db.collection("projects").countDocuments(),
      db.collection("skills").countDocuments(),
      db.collection("education").countDocuments(),
      db.collection("contact_messages").countDocuments({ read: false }),
      db.collection("certificates").countDocuments(),
    ])

    return {
      projects,
      skills,
      education,
      unreadMessages: messages,
      certificates,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return { projects: 0, skills: 0, education: 0, unreadMessages: 0, certificates: 0 }
  }
}

export default async function AdminDashboard() {
  const isAdmin = await verifyAdmin()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  const stats = await getDashboardStats()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <form action={logoutAction}>
            <Button variant="outline" type="submit">
              Logout
            </Button>
          </form>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Projects</CardTitle>
              <FolderOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.projects}</div>
              <p className="text-xs text-muted-foreground">Total projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Skills</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.skills}</div>
              <p className="text-xs text-muted-foreground">Total skills</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Education</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.education}</div>
              <p className="text-xs text-muted-foreground">Education records</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.unreadMessages}</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.certificates}</div>
              <p className="text-xs text-muted-foreground">Total certificates</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your portfolio content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/projects">Manage Projects</a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/skills">Manage Skills</a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/education">Manage Education</a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/messages">View Messages</a>
              </Button>
              <Button className="w-full justify-start" variant="outline" asChild>
                <a href="/admin/certificates">Manage Certificates</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Overview</CardTitle>
              <CardDescription>Your portfolio at a glance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Portfolio Status:</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Updated:</span>
                  <span className="text-gray-600">Today</span>
                </div>
                <Button className="w-full" asChild>
                  <a href="/" target="_blank" rel="noreferrer">
                    View Live Portfolio
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
