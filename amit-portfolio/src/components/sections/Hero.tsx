"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center px-6 pt-16 bg-white text-black"
    >
      {/* Text container first for desktop left */}
      <motion.div
        className="w-full md:w-1/2 max-w-lg text-center md:text-left space-y-5 order-2 md:order-1"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold leading-tight text-black"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          Amit Kumar{" "}
          <span className="block text-gray-600 mt-1 md:mt-0">Sharma</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-600 max-w-md mx-auto md:mx-0"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          Software Engineering Student at Shahjalal University of Science and
          Technology, Sylhet
        </motion.p>

        <motion.p
          className="text-base text-gray-500 max-w-md mx-auto md:mx-0"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          Passionate about building innovative solutions and solving complex
          problems through code.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center md:justify-start gap-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6 }}
        >
          {/* CV Download Button */}
          <a href="/Amit Kumar Sharma.pdf" download className="w-max">
            <Button
              size="lg"
              className="bg-[#113F67] hover:bg-[#0e2f55] text-white flex items-center"
            >
              <FileText className="h-5 w-5 mr-2" />
              MY CV
            </Button>
          </a>

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
        </motion.div>

        <motion.div
          className="pt-8"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="animate-bounce">
            <ArrowDown className="h-6 w-6 text-[#113F67] mx-auto md:mx-0" />
          </div>
        </motion.div>
      </motion.div>

      {/* Image container second for desktop right */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0 order-1 md:order-2 -mt-10 md:-mt-16"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative w-44 h-44 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#113F67]">
          <Image
            src="/portfolioamtt.jpeg"
            alt="Amit Kumar Sharma"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
