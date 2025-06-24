import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Award, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { CertificatesProps } from "@/lib/types"

export function Certificates({ certificates }: CertificatesProps) {
  if (certificates.length === 0) return null

  return (
    <section id="certificates" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Certificates & Achievements
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900">
                  {certificate.image_url ? (
                    <Image
                      src={certificate.image_url || "/placeholder.svg"}
                      alt={certificate.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Award className="h-16 w-16 text-yellow-600" />
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-xl">{certificate.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span>{certificate.issuer}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(certificate.issue_date).getFullYear()}
                    </span>
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {certificate.credential_id && (
                    <div className="mb-4">
                      <Badge variant="secondary">ID: {certificate.credential_id}</Badge>
                    </div>
                  )}

                  {certificate.credential_url && (
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={certificate.credential_url} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Certificate
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
