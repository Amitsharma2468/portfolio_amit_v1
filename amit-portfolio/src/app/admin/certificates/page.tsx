import { redirect } from "next/navigation"
import { verifyAdmin } from "@/lib/auth"
import { getDatabase } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AdminNav } from "@/components/admin-nav"
import { Edit, Plus, ExternalLink, Award } from "lucide-react"
import Image from "next/image"
import type { Certificate } from "@/lib/types"
import { CertificateDialog } from "@/components/admin/certificate-dialog"
import { DeleteCertificateButton } from "@/components/admin/delete-actions"

async function getCertificates(): Promise<Certificate[]> {
  try {
    const db = await getDatabase()
    const certificates = await db.collection("certificates").find({}).sort({ issue_date: -1 }).toArray()

    return certificates.map(
      (cert): Certificate => ({
        id: cert._id.toString(),
        title: cert.title || "",
        issuer: cert.issuer || "",
        issue_date: cert.issue_date
          ? cert.issue_date.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        credential_id: cert.credential_id,
        credential_url: cert.credential_url,
        image_url: cert.image_url,
        image_public_id: cert.image_public_id,
        created_at: cert.created_at?.toISOString(),
      }),
    )
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return []
  }
}

export default async function AdminCertificates() {
  const isAdmin = await verifyAdmin()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  const certificates = await getCertificates()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Manage Certificates</h1>
            <CertificateDialog>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Certificate
              </Button>
            </CertificateDialog>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="overflow-hidden">
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
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{certificate.title}</CardTitle>
                      <CardDescription>{certificate.issuer}</CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <CertificateDialog certificate={certificate}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CertificateDialog>

                      <DeleteCertificateButton certificateId={certificate.id} />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>Issue Date:</strong> {new Date(certificate.issue_date).toLocaleDateString()}
                    </p>
                    {certificate.credential_id && (
                      <p>
                        <strong>Credential ID:</strong> {certificate.credential_id}
                      </p>
                    )}
                    {certificate.credential_url && (
                      <Button variant="outline" size="sm" asChild className="w-full mt-2">
                        <a href={certificate.credential_url} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Certificate
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {certificates.length === 0 && (
              <div className="col-span-full">
                <Card>
                  <CardContent className="text-center py-12">
                    <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No certificates yet. Add your first certificate!</p>
                    <CertificateDialog>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Your First Certificate
                      </Button>
                    </CertificateDialog>
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
