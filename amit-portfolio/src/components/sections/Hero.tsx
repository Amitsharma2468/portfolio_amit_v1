"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const [showPart, setShowPart] = useState(0);

  useEffect(() => {
    if (showPart < 3) {
      const timer = setTimeout(() => setShowPart(showPart + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [showPart]);

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
      className="min-h-screen flex items-center justify-center px-4 pt-16 bg-white text-neutral-800"
    >
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start gap-12 w-full">
        {/* Left Container */}
        <div className="left-container flex-1 flex flex-col text-center md:text-left space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span
              className={
                animateClass(showPart >= 1, "left") + " block text-indigo-600"
              }
            >
              Amit Kumar
            </span>
            <span
              className={
                animateClass(showPart >= 2, "right") + " block text-gray-700"
              }
            >
              Sharma
            </span>
          </h1>

          <p
            className={
              animateClass(showPart >= 3, "left") +
              " text-xl md:text-2xl text-gray-600 max-w-lg mx-auto md:mx-0"
            }
          >
            Software Engineering Student at Shahjalal University of Science and
            Technology, Sylhet
          </p>

          <p className="text-lg text-gray-500 max-w-lg mx-auto md:mx-0">
            Passionate about building innovative solutions and solving complex
            problems through code
          </p>

          <div className="flex flex-row flex-wrap gap-4 justify-center md:justify-start items-center">
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Mail className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Get In Touch</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
            >
              <Github className="h-5 w-5" />
              <span className="hidden md:inline ml-2">View GitHub</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-gray-300 hover:border-indigo-600 hover:text-indigo-600"
            >
              <Linkedin className="h-5 w-5" />
              <span className="hidden md:inline ml-2">LinkedIn</span>
            </Button>
          </div>

          <div className="pt-8">
            <div className="animate-bounce">
              <ArrowDown className="h-6 w-6 text-indigo-500 mx-auto md:mx-0" />
            </div>
          </div>
        </div>

        {/* Right Container: placed first in mobile view */}
        <div className="right-container flex-1 max-w-sm w-full relative rounded-full overflow-hidden border-4 border-indigo-600 h-72 md:h-96 mx-auto md:mx-0 shadow-xl">
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
