import { redirect } from "next/navigation"
import { verifyAdmin } from "@/lib/auth"
import { getDatabase } from "@/lib/db"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminNav } from "@/components/admin-nav"
import { Mail, MailOpen, Calendar, User } from "lucide-react"
import type { ContactMessage } from "@/lib/types"
import { DeleteMessageButton, MarkAsReadButton } from "@/components/admin/delete-actions"

async function getMessages(): Promise<ContactMessage[]> {
  try {
    const db = await getDatabase()
    const messages = await db.collection("contact_messages").find({}).sort({ created_at: -1 }).toArray()

    return messages.map(
      (message): ContactMessage => ({
        id: message._id.toString(),
        name: message.name || "",
        email: message.email || "",
        subject: message.subject,
        message: message.message || "",
        read: Boolean(message.read),
        created_at: message.created_at ? message.created_at.toISOString() : new Date().toISOString(),
      }),
    )
  } catch (error) {
    console.error("Error fetching messages:", error)
    return []
  }
}

export default async function AdminMessages() {
  const isAdmin = await verifyAdmin()

  if (!isAdmin) {
    redirect("/admin/login")
  }

  const messages = await getMessages()
  const unreadCount = messages.filter((msg) => !msg.read).length

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNav />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Contact Messages</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {messages.length} total messages, {unreadCount} unread
              </p>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-lg px-3 py-1">
                {unreadCount} New
              </Badge>
            )}
          </div>

          <div className="space-y-4">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`${!message.read ? "border-blue-200 bg-blue-50/50 dark:bg-blue-900/10" : ""}`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {message.read ? (
                        <MailOpen className="h-5 w-5 text-gray-500" />
                      ) : (
                        <Mail className="h-5 w-5 text-blue-600" />
                      )}
                      <div>
                        <CardTitle className="text-lg">{message.subject || "No Subject"}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {message.name} ({message.email})
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(message.created_at).toLocaleDateString()}
                          </span>
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!message.read && <MarkAsReadButton messageId={message.id} />}
                      <DeleteMessageButton messageId={message.id} />
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{message.message}</p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={`mailto:${message.email}?subject=Re: ${message.subject || "Your message"}`}>
                        Reply via Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {messages.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Mail className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No messages yet. When visitors contact you, they'll appear here.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
