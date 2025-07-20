"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Briefcase, Award, MessageSquare } from "lucide-react";

import { ProjectsManager } from "./managers/ProjectsManager";
import { AchievementsManager } from "./managers/AchievementsManager";
import { ContactManager } from "./managers/ContactManager";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-[#113F67] bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-3xl font-extrabold text-[#113F67] tracking-tight">
              Admin Dashboard
            </h1>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="text-[#113F67] border-[#113F67] hover:bg-[#e0e7ff]"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid w-full grid-cols-3 border border-[#113F67] bg-[#f0f4ff] rounded-lg shadow-sm">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-[#113F67] data-[state=active]:text-white font-semibold"
            >
              <Briefcase className="h-5 w-5 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-[#113F67] data-[state=active]:text-white font-semibold"
            >
              <Award className="h-5 w-5 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-[#113F67] data-[state=active]:text-white font-semibold"
            >
              <MessageSquare className="h-5 w-5 mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="projects"
            className="bg-white rounded-lg shadow p-6"
          >
            <ProjectsManager />
          </TabsContent>

          <TabsContent
            value="achievements"
            className="bg-white rounded-lg shadow p-6"
          >
            <AchievementsManager />
          </TabsContent>

          <TabsContent
            value="contacts"
            className="bg-white rounded-lg shadow p-6"
          >
            <ContactManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
