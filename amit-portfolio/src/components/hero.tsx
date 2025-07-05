"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold">
              {/* You can add a profile picture here later */}
              AKS
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Hi, I'm <span className="text-blue-600">Amit Kumar Sharma</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-4">Software Engineering Student</p>

          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto">
            Shahjalal University of Science and Technology, Sylhet
          </p>

          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Passionate about creating innovative solutions and building amazing software experiences. I love to code,
            learn new technologies, and solve complex problems.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button onClick={scrollToContact} size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="mailto:amit09@student.sust.edu" className="text-gray-600 hover:text-blue-600 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
