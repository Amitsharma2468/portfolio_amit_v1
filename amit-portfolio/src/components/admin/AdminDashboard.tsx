"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LogOut,
  Users,
  Briefcase,
  Award,
  Code,
  MessageSquare,
  Settings,
} from "lucide-react";
import { SkillsManager } from "./managers/SkillsManager";
import { TechnologiesManager } from "./managers/TechnologiesManager";
import { ProjectsManager } from "./managers/ProjectsManager";
import { AchievementsManager } from "./managers/AchievementsManager";
import { ProblemSolvingManager } from "./managers/ProblemSolvingManager";
import { ContactManager } from "./managers/ContactManager";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("skills");

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-300 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-indigo-700">
              Admin Dashboard
            </h1>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="text-indigo-700 border-indigo-700 hover:bg-indigo-100"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6 border border-indigo-300 bg-indigo-50 rounded-lg">
            <TabsTrigger
              value="skills"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="technologies"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Technologies
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="problem-solving"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <Code className="h-4 w-4 mr-2" />
              Problem Solving
            </TabsTrigger>
            <TabsTrigger
              value="contacts"
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="technologies">
            <TechnologiesManager />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="achievements">
            <AchievementsManager />
          </TabsContent>

          <TabsContent value="problem-solving">
            <ProblemSolvingManager />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
