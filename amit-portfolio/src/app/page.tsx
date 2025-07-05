"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Certificates from "@/components/certificates"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  const [skills, setSkills] = useState([])
  const [projects, setProjects] = useState([])
  const [certificates, setCertificates] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [skillsRes, projectsRes, certificatesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates`),
      ])

      const skillsData = await skillsRes.json()
      const projectsData = await projectsRes.json()
      const certificatesData = await certificatesRes.json()

      setSkills(skillsData)
      setProjects(projectsData)
      setCertificates(certificatesData)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Certificates certificates={certificates} />
      <Contact />
      <Footer />
    </div>
  )
}
