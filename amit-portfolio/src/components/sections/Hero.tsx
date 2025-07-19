"use client";

import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-16"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Amit Kumar
              </span>
              <br />
              <span className="text-slate-300">Sharma</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Software Engineering Student at Shahjalal University of Science
              and Technology, Sylhet
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Passionate about building innovative solutions and solving complex
              problems through code
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </Button>
            <Button variant="outline" size="lg">
              <Github className="h-5 w-5 mr-2" />
              View GitHub
            </Button>
            <Button variant="outline" size="lg">
              <Linkedin className="h-5 w-5 mr-2" />
              LinkedIn
            </Button>
          </div>

          <div className="pt-8">
            <div className="animate-bounce">
              <ArrowDown className="h-6 w-6 text-purple-400 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
