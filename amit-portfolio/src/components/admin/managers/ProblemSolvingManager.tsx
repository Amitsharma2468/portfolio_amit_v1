"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, X, ExternalLink, Code } from "lucide-react";
import { apiClient } from "@/lib/api";

interface ProblemSolving {
  _id: string;
  title: string;
  description: string;
  link: string;
  platform: string;
}

export function ProblemSolvingManager() {
  const [problemSolving, setProblemSolving] = useState<ProblemSolving[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    platform: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProblemSolving();
  }, []);

  const fetchProblemSolving = async () => {
    try {
      const data = await apiClient.getAll("problem-solving");
      setProblemSolving(data);
    } catch (error) {
      console.error("Error fetching problem solving:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingId) {
        await apiClient.update("problem-solving", editingId, formData);
      } else {
        await apiClient.create("problem-solving", formData);
      }
      await fetchProblemSolving();
      setEditingId(null);
      setShowAddForm(false);
      setFormData({ title: "", description: "", link: "", platform: "" });
    } catch (error) {
      console.error("Error saving problem solving:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: ProblemSolving) => {
    setEditingId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      link: item.link,
      platform: item.platform,
    });
  };

  const handleDelete = async (id: string) => {
    if (
      confirm("Are you sure you want to delete this problem solving entry?")
    ) {
      try {
        await apiClient.delete("problem-solving", id);
        await fetchProblemSolving();
      } catch (error) {
        console.error("Error deleting problem solving:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ title: "", description: "", link: "", platform: "" });
  };

  const platforms = [
    "LeetCode",
    "HackerRank",
    "CodeChef",
    "Codeforces",
    "AtCoder",
    "Other",
  ];
  const platformColors = {
    LeetCode: "bg-orange-500",
    HackerRank: "bg-green-500",
    CodeChef: "bg-brown-500",
    Codeforces: "bg-blue-500",
    AtCoder: "bg-red-500",
    Other: "bg-gray-500",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Problem Solving Management
        </h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Problem Solution
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card className="bg-slate-800 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">
              {editingId ? "Edit Problem Solution" : "Add New Problem Solution"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Problem Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-slate-700 border-purple-500/20 text-white"
            />

            <Textarea
              placeholder="Problem Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-slate-700 border-purple-500/20 text-white"
              rows={3}
            />

            <Select
              value={formData.platform}
              onValueChange={(value) =>
                setFormData({ ...formData, platform: value })
              }
            >
              <SelectTrigger className="bg-slate-700 border-purple-500/20 text-white">
                <SelectValue placeholder="Select Platform" />
              </SelectTrigger>
              <SelectContent>
                {platforms.map((platform) => (
                  <SelectItem key={platform} value={platform}>
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Solution Link"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="bg-slate-700 border-purple-500/20 text-white"
            />

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
        {problemSolving.map((item) => (
          <Card key={item._id} className="bg-slate-800 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white flex items-center gap-2">
                  <Code className="h-4 w-4 text-blue-400" />
                  {item.title}
                </h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Badge
                variant="secondary"
                className={`${
                  platformColors[
                    item.platform as keyof typeof platformColors
                  ] || platformColors.Other
                } text-white mb-2`}
              >
                {item.platform}
              </Badge>

              <p className="text-sm text-gray-300 mb-3">{item.description}</p>

              {item.link && (
                <Button size="sm" asChild>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Solution
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
