"use client";

import { Button } from "@/components/ui/button"
import { url } from "inspector";
import { Github, Linkedin, Mail, Download, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
        backgroundImage: "url('/portfolio1.jpeg')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-indigo-900/90" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Content */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium mb-6">
                Welcome to my portfolio
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
              <span className="block">Amit Kumar</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Sharma
              </span>
            </h1>
            
            <div className="space-y-4 mb-8">
              <p className="text-xl sm:text-2xl md:text-3xl text-blue-200 font-light">
                Full Stack Developer & Software Engineer
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
            </div>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              Computer Science graduate from Shahjalal University of Science and Technology, 
              passionate about creating innovative web solutions and modern applications that solve real-world problems.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
  <a 
    href="/Amit-Sharma.pdf" 
    download 
    className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 px-8 py-3 text-lg font-semibold flex items-center justify-center gap-2 rounded-lg"
  >
    <Download className="h-5 w-5" />
    Download CV
  </a>
</div>


            {/* Social Links */}
            <div className="flex justify-center space-x-8 mb-16">
              <Link
                href="https://github.com"
                className="group p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="h-6 w-6 text-white group-hover:text-blue-300 transition-colors duration-300" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="group p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="h-6 w-6 text-white group-hover:text-blue-300 transition-colors duration-300" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:amit@example.com"
                className="group p-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110"
              >
                <Mail className="h-6 w-6 text-white group-hover:text-blue-300 transition-colors duration-300" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center text-white/70">
              <span className="text-sm mb-2 hidden sm:block">Scroll to explore</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse hidden lg:block" />
      <div className="absolute top-1/2 left-20 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl animate-pulse hidden xl:block" />
    </section>
  )
}