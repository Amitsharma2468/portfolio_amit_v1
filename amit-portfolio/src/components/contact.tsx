import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"
import ContactForm from "./contactform"

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Get In Touch
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Let's work together
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                I'm always interested in new opportunities and exciting projects.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">
                    amitkmrsharma292@gmail.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">
                    +880 123 456 789
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Sylhet, Bangladesh
                  </span>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>
                  Fill out the form below and I&apos;ll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
