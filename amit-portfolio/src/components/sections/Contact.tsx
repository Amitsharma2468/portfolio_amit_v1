"use client";

import { Mail, MapPin, Github, Linkedin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Mail className="h-10 w-10 text-gray-950 mx-auto mb-3" />
          <h2 className="text-4xl font-bold text-[#113F67] mb-3">
            Get In Touch
          </h2>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Open to opportunities, collaborations, or just a conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <a
            href="mailto:amitkmrsharma292@gmail.com"
            className="group flex items-center gap-4 border border-[#113F67]/20 hover:border-[#113F67] rounded-xl p-5 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#113F67]/8 group-hover:bg-[#113F67]/15 flex items-center justify-center flex-shrink-0 transition-colors">
              <Mail className="w-5 h-5 text-[#113F67]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Email</p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-[#113F67] transition-colors break-all">
                amitkmrsharma292@gmail.com
              </p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+8801792325654"
            className="group flex items-center gap-4 border border-[#113F67]/20 hover:border-[#113F67] rounded-xl p-5 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#113F67]/8 group-hover:bg-[#113F67]/15 flex items-center justify-center flex-shrink-0 transition-colors">
              <Phone className="w-5 h-5 text-[#113F67]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Phone</p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-[#113F67] transition-colors">
                +880 1792 325654
              </p>
            </div>
          </a>

          {/* Location */}
          <div className="flex items-center gap-4 border border-[#113F67]/20 rounded-xl p-5">
            <div className="w-10 h-10 rounded-lg bg-[#113F67]/8 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#113F67]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Location</p>
              <p className="text-sm font-medium text-gray-700">
                Sylhet, Bangladesh
              </p>
            </div>
          </div>

          {/* GitHub */}
          <a
            href="https://github.com/Amitsharma2468"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border border-[#113F67]/20 hover:border-[#113F67] rounded-xl p-5 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-[#113F67]/8 group-hover:bg-[#113F67]/15 flex items-center justify-center flex-shrink-0 transition-colors">
              <Github className="w-5 h-5 text-[#113F67]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">GitHub</p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-[#113F67] transition-colors">
                github.com/Amitsharma2468
              </p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/amit-kumar-sharma-sust/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 border border-[#113F67]/20 hover:border-[#113F67] rounded-xl p-5 transition-all sm:col-span-2"
          >
            <div className="w-10 h-10 rounded-lg bg-[#113F67]/8 group-hover:bg-[#113F67]/15 flex items-center justify-center flex-shrink-0 transition-colors">
              <Linkedin className="w-5 h-5 text-[#113F67]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">LinkedIn</p>
              <p className="text-sm font-medium text-gray-700 group-hover:text-[#113F67] transition-colors">
                Amit Kumar Sharma
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}