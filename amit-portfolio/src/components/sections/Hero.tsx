"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  // Track which parts have appeared
  const [showPart, setShowPart] = useState(0);

  useEffect(() => {
    // Show each part one by one every 400ms
    if (showPart < 3) {
      const timer = setTimeout(() => setShowPart(showPart + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [showPart]);

  // Helper to apply animation classes conditionally
  function animateClass(visible: boolean, direction: "left" | "right") {
    return `
      transition-all duration-700 ease-out
      ${
        visible
          ? "opacity-100 translate-x-0"
          : direction === "left"
          ? "-translate-x-10 opacity-0"
          : "translate-x-10 opacity-0"
      }
    `;
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 pt-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-12 w-full">
        {/* Left Container */}
        <div className="left-container flex-1 flex flex-col text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            {/* Part 1: "Amit Kumar" slides in from left */}
            <span
              className={
                animateClass(showPart >= 1, "left") +
                " block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              }
            >
              Amit Kumar
            </span>

            {/* Part 2: "Sharma" slides in from right */}
            <span
              className={
                animateClass(showPart >= 2, "right") + " block text-slate-300"
              }
            >
              Sharma
            </span>
          </h1>

          {/* Part 3: description fades in from left */}
          <p
            className={
              animateClass(showPart >= 3, "left") +
              " text-xl md:text-2xl text-gray-300 max-w-lg mx-auto md:mx-0"
            }
          >
            Software Engineering Student at Shahjalal University of Science and
            Technology, Sylhet
          </p>

          <p className="text-lg text-gray-400 max-w-lg mx-auto md:mx-0">
            Passionate about building innovative solutions and solving complex
            problems through code
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
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
              <ArrowDown className="h-6 w-6 text-purple-400 mx-auto md:mx-0" />
            </div>
          </div>
        </div>

        {/* Right Container */}
        <div className="right-container flex-1 max-w-sm w-full relative rounded-full overflow-hidden border-4 border-purple-600 h-72 md:h-96 mx-auto md:mx-0">
          <Image
            src="/portfolioamit.jpeg"
            alt="Amit Kumar Sharma"
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </div>
      </div>
    </section>
  );
}
