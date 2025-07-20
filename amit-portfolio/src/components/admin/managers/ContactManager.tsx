"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Eye, Trash2, AreaChart as MarkAsUnread } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
}

export function ContactManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await apiClient.getAll("contact");
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const markAsRead = async (id: string) => {
    setLoading(true);
    try {
      await apiClient.update("contact", id, { status: "read" });
      await fetchContacts();
    } catch (error) {
      console.error("Error marking as read:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsUnread = async (id: string) => {
    setLoading(true);
    try {
      await apiClient.update("contact", id, { status: "unread" });
      await fetchContacts();
    } catch (error) {
      console.error("Error marking as unread:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact message?")) {
      try {
        await apiClient.delete("contact", id);
        await fetchContacts();
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  const unreadCount = contacts.filter(
    (contact) => contact.status === "unread"
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="bg-red-600">
              {unreadCount} Unread
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <Card className="bg-white border border-gray-300 shadow-sm">
            <CardContent className="p-8 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No contact messages yet.</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card
              key={contact._id}
              className={`bg-white border border-gray-300 shadow-sm ${
                contact.status === "unread" ? "ring-2 ring-yellow-500/30" : ""
              }`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-gray-900 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      {contact.name}
                      {contact.status === "unread" && (
                        <Badge
                          variant="outline"
                          className="border-yellow-500 text-yellow-500"
                        >
                          New
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-gray-600 text-sm">{contact.email}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {contact.status === "unread" ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsRead(contact._id)}
                        disabled={loading}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markAsUnread(contact._id)}
                        disabled={loading}
                      >
                        <MarkAsUnread className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteContact(contact._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {contact.message}
                </p>
                <div className="mt-4">
                  <Button
                    size="sm"
                    className="bg-[#113F67] hover:bg-[#0d2c4f] text-white"
                    asChild
                  >
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                        contact.email
                      )}&su=${encodeURIComponent(
                        "Re: Contact from Portfolio"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Reply via Gmail
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
