"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-16 bg-white text-black"
    >
      {/* Text container first for desktop left */}
      <div className="w-full md:w-1/2 max-w-lg text-center md:text-left space-y-5 order-2 md:order-1">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-black">
          Amit Kumar{" "}
          <span className="block text-gray-600 mt-1 md:mt-0">Sharma</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto md:mx-0">
          Software Engineering Student at Shahjalal University of Science and
          Technology, Sylhet
        </p>

        <p className="text-base text-gray-500 max-w-md mx-auto md:mx-0">
          Passionate about building innovative solutions and solving complex
          problems through code.
        </p>

        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {/* Internal link with Button styling */}
          <Link href="/#contact" className="w-max">
            <Button
              size="lg"
              className="bg-[#113F67] hover:bg-[#0e2f55] text-white flex items-center"
            >
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </Button>
          </Link>

          {/* External links */}
          <a
            href="https://github.com/Amitsharma2468"
            target="_blank"
            rel="noopener noreferrer"
            className="w-max"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-[#113F67] text-[#113F67] hover:bg-[#113F67] hover:text-white flex items-center"
            >
              <Github className="h-5 w-5" />
              <span className="ml-2 hidden md:inline">View GitHub</span>
            </Button>
          </a>

          <a
            href="https://www.linkedin.com/in/amit-kumar-sharma-sust/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-max"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-[#113F67] text-[#113F67] hover:bg-[#113F67] hover:text-white flex items-center"
            >
              <Linkedin className="h-5 w-5" />
              <span className="ml-2 hidden md:inline">LinkedIn</span>
            </Button>
          </a>
        </div>

        <div className="pt-8">
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-[#113F67] mx-auto md:mx-0" />
          </div>
        </div>
      </div>

      {/* Image container second for desktop right */}
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 order-1 md:order-2 -mt-10 md:-mt-16">
        <div className="relative w-44 h-44 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#113F67]">
          <Image
            src="/portfolioamtt.jpeg"
            alt="Amit Kumar Sharma"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
