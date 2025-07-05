import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Code, Heart } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Me</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what skills I have
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Get to know me!</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                I'm a <strong>Software Engineering</strong> student at Shahjalal University of Science and Technology,
                Sylhet, passionate about building innovative software solutions and learning cutting-edge technologies.
              </p>
              <p>
                I enjoy tackling complex problems and turning ideas into reality through code. My journey in software
                development has been driven by curiosity and a desire to create meaningful applications that can make a
                difference.
              </p>
              <p>
                I'm always eager to learn new technologies, collaborate with fellow developers, and contribute to
                open-source projects. I believe in writing clean, efficient code and following best practices in
                software development.
              </p>
              <p>
                I'm <strong>open to job opportunities</strong> where I can contribute, learn and grow. If you have a
                good opportunity that matches my skills and experience then don't hesitate to contact me.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
                  <h4 className="text-xl font-semibold text-gray-900">Education</h4>
                </div>
                <p className="text-gray-600">
                  Bachelor of Science in Software Engineering
                  <br />
                  Shahjalal University of Science and Technology
                  <br />
                  Sylhet, Bangladesh
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Code className="h-8 w-8 text-blue-600 mr-3" />
                  <h4 className="text-xl font-semibold text-gray-900">Focus Areas</h4>
                </div>
                <p className="text-gray-600">
                  Full-Stack Development, Web Applications, Database Design, Software Architecture, Problem Solving &
                  Algorithm Design
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Heart className="h-8 w-8 text-blue-600 mr-3" />
                  <h4 className="text-xl font-semibold text-gray-900">Interests</h4>
                </div>
                <p className="text-gray-600">
                  Open Source Contribution, Competitive Programming, Technology Trends, Continuous Learning, Building
                  Innovative Solutions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
