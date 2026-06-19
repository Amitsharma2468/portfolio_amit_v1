"use client";

import { motion } from "framer-motion";
import { Code2, Trophy, Briefcase, GraduationCap } from "lucide-react";

const stats = [
  { icon: Code2, label: "Problems Solved", value: "750+" },
  { icon: Trophy, label: "Codeforces Rating", value: "1218" },
  { icon: Briefcase, label: "Production Apps", value: "3" },
  { icon: GraduationCap, label: "CGPA", value: "3.48" },
];

export function About() {
  return (
    <section
      id="about"
      className="py-20 px-6 bg-white w-full overflow-hidden"
    >
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#113F67] mb-4">
            About Me
          </h2>

          <p className="text-gray-500 text-lg">
            A quick look at who I am and what I do
          </p>
        </div>


        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="
                flex flex-col 
                items-center 
                justify-center 
                gap-2
                bg-gray-50 
                border 
                border-[#113F67]/10 
                rounded-xl
                px-3
                py-5
                min-h-[120px]
              "
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
              }}
            >
              <stat.icon
                className="w-5 h-5 text-[#113F67]"
                strokeWidth={1.5}
              />

              <p className="text-xl sm:text-2xl font-bold text-[#113F67]">
                {stat.value}
              </p>

              <p className="text-[11px] sm:text-xs text-gray-500 text-center leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>



        {/* Bio */}
        <motion.div
          className="
            border 
            border-[#113F67]/20 
            rounded-2xl 
            p-6 sm:p-8
            space-y-4
          "
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
          }}
        >

          <p className="text-gray-700 leading-relaxed">
            I&apos;m a Software Engineering graduate from{" "}
            <span className="font-medium text-[#113F67]">
              Shahjalal University of Science and Technology (SUST)
            </span>
            , currently interning at{" "}
            <span className="font-medium text-[#113F67]">
              Kaz Software
            </span>{" "}
            as a Software Engineer. My work there spans building a
            type-aware Expression Builder for a UAE invoice compliance
            platform, a real-time SignalR notification system, and migrating
            an AI regulatory pipeline to a locally hosted LLM via Ollama.
          </p>


          <p className="text-gray-700 leading-relaxed">
            On the product side, I&apos;ve shipped multiple production
            applications — including a smart mobility platform for Electralink,
            a sponsorship platform for event organisers, and a conference
            system for ICERIE 2025 that processed over 2M BDT in payments.
            I work primarily with{" "}
            <span className="font-medium text-[#113F67]">
              Next.js, React, Node.js, ASP.NET Core
            </span>
            , and a range of SQL and NoSQL databases.
          </p>


          <p className="text-gray-700 leading-relaxed">
            I&apos;m also an active competitive programmer — Pupil on
            Codeforces (1218) and 3-Star on CodeChef (1626) — with 750+
            problems solved across Codeforces, CodeChef, and LeetCode.
            I participated in the 2021 Asia Dhaka ICPC Preliminary Regional
            contest.
          </p>

        </motion.div>

      </div>
    </section>
  );
}