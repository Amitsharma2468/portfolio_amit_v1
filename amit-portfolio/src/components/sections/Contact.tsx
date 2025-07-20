"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send } from "lucide-react";
import { apiClient } from "@/lib/api";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiClient.sendContact(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Mail className="h-12 w-12 text-gray-950 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-[#113F67] mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-700 text-lg max-w-xl mx-auto">
            Let us discuss opportunities and collaborations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Information */}
          <Card className="border-4 border-[#113F67] shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-[#113F67]">
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-950" />
                <span className="text-gray-800">
                  amitkmrsharma292@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-950" />
                <span className="text-gray-800">
                  Shahjalal University of Science and Technology, Sylhet
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="border-4 border-[#113F67] shadow-md rounded-xl">
            <CardHeader>
              <CardTitle className="text-[#113F67]">
                Send Me a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="text-center py-8">
                  <div className="text-green-600 text-lg mb-2">
                    Message Sent Successfully!
                  </div>
                  <p className="text-gray-800">
                    Thank you for reaching out. I will get back to you soon.
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
                    className="mt-4 border border-[#113F67] text-[#113F67] hover:bg-[#e0e7ff]"
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white border border-[#113F67] text-gray-900 placeholder-gray-400"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white border border-[#113F67] text-gray-900 placeholder-gray-400"
                  />
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="bg-white border border-[#113F67] text-gray-900 placeholder-gray-400"
                  />

                  {error && <div className="text-red-600 text-sm">{error}</div>}

                  <Button
                    type="submit"
                    className="w-full bg-[#113F67] hover:bg-[#0d2c4f] text-white flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
