"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface Achievement {
  title: string;
  description: string;
  link: string;
  category: "competitive" | "certificate" | "event";
}

const achievements: Achievement[] = [
  {
    title: "Codeforces — Pupil (1218)",
    description: "Solved 650+ problems. Rated Pupil on Codeforces.",
    link: "https://codeforces.com/profile/AmitSharma",
    category: "competitive",
  },
  {
    title: "CodeChef — 3 Star (1626)",
    description: "Solved 100+ problems. Rated 3-Star on CodeChef.",
    link: "https://www.codechef.com/users/amitsharma_km",
    category: "competitive",
  },
  {
    title: "ICPC 2021 — Asia Dhaka Regional",
    description: "Participated in 2021 Asia Dhaka ICPC Preliminary Regional contest.",
    link: "https://drive.google.com/file/d/1xlrohr4K-0pAoZqVYWwlhykzWhvJqsHf/view",
    category: "competitive",
  },
  {
    title: "HackerRank — SQL Intermediate",
    description: "Earned SQL Intermediate certificate on HackerRank.",
    link: "https://drive.google.com/file/d/1LsshY_BjdX1E9zG3HGq6nwulnRqaZMCB/view",
    category: "certificate",
  },
  {
    title: "ICERIE 2025 — Web Development",
    description: "Certificate for Registration & Payment Integration for ICERIE 2025.",
    link: "https://www.linkedin.com/posts/amit-kumar-sharma-sust_excited-to-share-that-ive-successfully-completed-share-7343079096135950336-ec2D/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADszPYIBis858hq8uR289JWXAM5lh_wZ6VQ",
    category: "event",
  },
  {
    title: "BCC EDGE Project — Python & Data Science",
    description: "Completed training under EDGE Project of BCC, ICT Division.",
    link: "https://www.linkedin.com/posts/amit-kumar-sharma-sust_excited-to-share-that-ive-successfully-completed-share-7343079096135950336-ec2D/?utm_source=share&utm_medium=member_desktop&rcm=ACoAADszPYIBis858hq8uR289JWXAM5lh_wZ6VQ",
    category: "certificate",
  },
];

const categoryStyle: Record<Achievement["category"], string> = {
  competitive: "bg-blue-100 text-blue-800",
  certificate: "bg-green-100 text-green-800",
  event: "bg-purple-100 text-purple-800",
};

const categoryLabel: Record<Achievement["category"], string> = {
  competitive: "Competitive",
  certificate: "Certificate",
  event: "Event",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Achievements() {
  return (
    <section id="achievements" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Trophy className="mx-auto mb-2 text-4xl text-gray-950" />
          <h2 className="text-4xl font-bold text-[#113F67] mb-4">
            Achievements
          </h2>
          <p className="text-gray-600 text-lg">
            Competitions, certifications, and recognitions
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {achievements.map((ach, i) => (
            <motion.div key={i} variants={item}>
              <a
                href={ach.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <Card className="h-full border border-[#113F67]/20 hover:border-[#113F67]/60 shadow-none hover:shadow-sm transition-all rounded-xl cursor-pointer">
                  <CardContent className="p-4 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${categoryStyle[ach.category]}`}
                      >
                        {categoryLabel[ach.category]}
                      </span>
                      <span className="text-[11px] text-[#113F67] font-medium opacity-60">
                        ↗
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-[#113F67] leading-snug">
                      {ach.title}
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {ach.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}