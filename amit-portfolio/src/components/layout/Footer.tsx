"use client";

import { Github, Linkedin, Mail, Heart, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-purple-500/20 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold text-white">
                Amit Kumar Sharma
              </span>
            </div>
            <p className="text-gray-400">
              Software Engineering Student passionate about building innovative
              solutions
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <a
                href="#home"
                className="block text-gray-400 hover:text-purple-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#skills"
                className="block text-gray-400 hover:text-purple-400 transition-colors"
              >
                Skills
              </a>
              <a
                href="#projects"
                className="block text-gray-400 hover:text-purple-400 transition-colors"
              >
                Projects
              </a>
              <a
                href="#contact"
                className="block text-gray-400 hover:text-purple-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Connect With Me
            </h3>
            <div className="flex space-x-4">
              <a
                href="mailto:amitkmrsharma292@gmail.com"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400" />
            <span>by Amit Kumar Sharma © {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
