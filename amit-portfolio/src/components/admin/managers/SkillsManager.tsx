"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Skill {
  _id: string;
  name: string;
  level: string;
  category: string;
}

export function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await apiClient.getAll("skills");
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingId) {
        await apiClient.update("skills", editingId, formData);
      } else {
        await apiClient.create("skills", formData);
      }
      await fetchSkills();
      setEditingId(null);
      setShowAddForm(false);
      setFormData({ name: "", level: "", category: "" });
    } catch (error) {
      console.error("Error saving skill:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill._id);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      try {
        await apiClient.delete("skills", id);
        await fetchSkills();
      } catch (error) {
        console.error("Error deleting skill:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: "", level: "", category: "" });
  };

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
  const categories = [
    "Programming Languages",
    "Frontend",
    "Backend",
    "Database",
    "Tools",
    "Other",
  ];

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Skills Management</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card className="bg-white border border-gray-300 rounded-lg overflow-visible shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">
              {editingId ? "Edit Skill" : "Add New Skill"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 overflow-visible relative z-10">
            <Input
              placeholder="Skill Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-gray-100 border border-gray-300 text-gray-900"
            />

            <Select
              value={formData.level}
              onValueChange={(value) =>
                setFormData({ ...formData, level: value })
              }
            >
              <SelectTrigger className="bg-gray-900 border border-gray-700 text-white">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white z-50">
                {levels.map((level) => (
                  <SelectItem key={level} value={level} className="text-white">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="bg-gray-900 border border-gray-700 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 text-white z-50">
                {categories.map((category) => (
                  <SelectItem
                    key={category}
                    value={category}
                    className="text-white"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                onClick={handleSave}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <Card
            key={skill._id}
            className="bg-white border border-gray-300 shadow-sm"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{skill.name}</h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(skill)}
                    className="text-gray-700 hover:text-purple-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(skill._id)}
                    className="text-gray-700 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Badge
                variant="secondary"
                className="mb-2 bg-purple-600 text-white"
              >
                {skill.level}
              </Badge>
              <p className="text-sm text-gray-500">{skill.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
