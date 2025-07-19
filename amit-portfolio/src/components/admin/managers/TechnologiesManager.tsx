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
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { apiClient } from "@/lib/api";

interface Technology {
  _id: string;
  name: string;
  icon: string;
  category: string;
}

export function TechnologiesManager() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTechnologies();
  }, []);

  const fetchTechnologies = async () => {
    try {
      const data = await apiClient.getAll("technologies");
      setTechnologies(data);
    } catch (error) {
      console.error("Error fetching technologies:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingId) {
        await apiClient.update("technologies", editingId, formData);
      } else {
        await apiClient.create("technologies", formData);
      }
      await fetchTechnologies();
      setEditingId(null);
      setShowAddForm(false);
      setFormData({ name: "", icon: "", category: "" });
    } catch (error) {
      console.error("Error saving technology:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tech: Technology) => {
    setEditingId(tech._id);
    setFormData({
      name: tech.name,
      icon: tech.icon,
      category: tech.category,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this technology?")) {
      try {
        await apiClient.delete("technologies", id);
        await fetchTechnologies();
      } catch (error) {
        console.error("Error deleting technology:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ name: "", icon: "", category: "" });
  };

  const categories = [
    "Frontend",
    "Backend",
    "Database",
    "Mobile",
    "DevOps",
    "Cloud",
    "Design",
    "Other",
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Technologies & Tools Management
        </h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Technology
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card className="bg-slate-800 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">
              {editingId ? "Edit Technology" : "Add New Technology"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Technology Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-slate-700 border-purple-500/20 text-white"
            />

            <Input
              placeholder="Icon (emoji or text)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              className="bg-slate-700 border-purple-500/20 text-white"
            />

            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger className="bg-slate-700 border-purple-500/20 text-white">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
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
        {technologies.map((tech) => (
          <Card key={tech._id} className="bg-slate-800 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{tech.icon}</span>
                  <h3 className="font-semibold text-white">{tech.name}</h3>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(tech)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(tech._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-400">{tech.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
