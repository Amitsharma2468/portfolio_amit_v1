import { redirect } from "next/navigation"
import { verifyAdmin } from "@/lib/auth"
import { getDatabase } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminNav } from "@/components/admin-nav"
import { Edit, Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import type { Skill } from "@/lib/types"
import { SkillDialog } from "@/components/admin/skill-dialog"
import { DeleteSkillButton } from "@/components/admin/delete-actions"

async function getSkills(): Promise<Skill[]> {
  try {
    const db = await getDatabase()
    const skills = await db.collection("skills").find({}).sort({ category: 1, name: 1 }).toArray()

    return skills.map(
      (skill): Skill => ({
        id: skill._id.toString(),
        name: skill.name || "",
        category: skill.category || "Other",
        proficiency: Number(skill.proficiency) || 1,
        created_at: skill.created_at?.toISOString(),
      }),
    )
  } catch (error) {
    console.error("Error fetching skills:", error)
    return []
  }
}

export default async function AdminSkills() {
  const isAdmin = await verifyAdmin()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  const skills = await getSkills()
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Skills</h1>
            <SkillDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </SkillDialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-xl">{category}</CardTitle>
                  <CardDescription>{categorySkills.length} skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.proficiency}/5</span>
                        </div>
                        <Progress value={skill.proficiency * 20} className="h-2" />
                      </div>
                      <div className="flex gap-1 ml-4">
                        <SkillDialog skill={skill}>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </SkillDialog>

                        <DeleteSkillButton skillId={skill.id} />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}

            {Object.keys(groupedSkills).length === 0 && (
              <div className="col-span-full">
                <Card>
                  <CardContent className="text-center py-12">
                    <p className="text-gray-500 mb-4">No skills yet. Add your first skill!</p>
                    <SkillDialog>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Skill
                      </Button>
                    </SkillDialog>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
