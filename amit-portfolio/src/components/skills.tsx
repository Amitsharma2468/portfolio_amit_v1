import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Skill {
  _id: string
  name: string
  category: string
  level?: string
}

interface SkillsProps {
  skills: Skill[]
}

export default function Skills({ skills }: SkillsProps) {
  // Default core languages
  const coreLanguages: Skill[] = [
    { _id: "core-cpp", name: "C++", category: "Programming Languages" },
    { _id: "core-c", name: "C", category: "Programming Languages" },
    { _id: "core-java", name: "Java", category: "Programming Languages" },
    { _id: "core-js", name: "JavaScript", category: "Programming Languages" },
    { _id: "core-python", name: "Python", category: "Programming Languages" },
    { _id: "core-sql", name: "SQL", category: "Database" },
  ]

  // Combine core languages with admin-added skills
  const allSkills = [...coreLanguages, ...skills]

  // Group skills by category
  const groupedSkills = allSkills.reduce(
    (acc, skill) => {
      const category = skill.category || "Other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">My Skills</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Here are the technologies and tools I work with</p>
        </div>

        <div className="grid gap-8">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {categorySkills.map((skill, index) => (
                    <Badge
                      key={skill._id || `${skill.name}-${index}`}
                      variant="secondary"
                      className="text-sm py-2 px-4 bg-blue-100 text-blue-800 hover:bg-blue-200"
                    >
                      {skill.name}
                      {skill.level && <span className="ml-2 text-xs opacity-75">({skill.level})</span>}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
