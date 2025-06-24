import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, FolderOpen, Award, GraduationCap, Mail } from "lucide-react"

export function AdminNav() {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="text-xl font-bold text-gray-900 dark:text-white">
              Portfolio Admin
            </Link>

            <div className="hidden md:flex space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin" className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/projects" className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Projects
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/skills" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Skills
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/education" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  Education
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/messages" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Messages
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/certificates" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Certificates
                </Link>
              </Button>
            </div>
          </div>

          <Button variant="outline" size="sm" asChild>
            <Link href="/" target="_blank">
              View Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
