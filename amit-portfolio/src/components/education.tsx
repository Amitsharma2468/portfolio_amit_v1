import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"
import type { EducationProps } from "@/lib/types"

export function Education({ education }: EducationProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear()
  }

  if (education.length === 0) {
    return (
      <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Education</h2>
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No education records to display yet.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="education" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">Education</h2>

          <div className="space-y-6">
            {education.map((edu) => (
              <Card key={edu.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <GraduationCap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{edu.degree}</CardTitle>
                      <CardDescription className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {edu.institution}
                      </CardDescription>
                      {edu.field_of_study && (
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{edu.field_of_study}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : "Present"}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                {(edu.description || edu.grade) && (
                  <CardContent>
                    {edu.grade && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <strong>Grade:</strong> {edu.grade}
                      </p>
                    )}
                    {edu.description && <p className="text-gray-700 dark:text-gray-300">{edu.description}</p>}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
