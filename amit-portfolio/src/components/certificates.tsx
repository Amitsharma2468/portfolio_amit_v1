import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"
import CloudinaryImage from "@/components/cloudinary-image"

interface Certificate {
  _id: string
  title: string
  description: string
  image: string
  link: string
  issuer?: string
  date?: string
}

interface CertificatesProps {
  certificates: Certificate[]
}

export default function Certificates({ certificates }: CertificatesProps) {
  return (
    <section id="certificates" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Certificates</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">My professional certifications and achievements</p>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No certificates available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate) => (
              <Card key={certificate._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  {certificate.image ? (
                    <CloudinaryImage
                      src={certificate.image || "/placeholder.svg?height=192&width=384"}
                      alt={certificate.title}
                      fill
                      className="object-cover"
                      crop="fill"
                      gravity="center"
                      quality={85}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <Award className="h-12 w-12" />
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{certificate.title}</CardTitle>
                  {certificate.issuer && <p className="text-sm text-gray-500">Issued by {certificate.issuer}</p>}
                  {certificate.date && <p className="text-sm text-gray-500">{certificate.date}</p>}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{certificate.description}</p>

                  {certificate.link && (
                    <Button asChild size="sm">
                      <a href={certificate.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Certificate
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
