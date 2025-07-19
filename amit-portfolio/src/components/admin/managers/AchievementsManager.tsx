"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ExternalLink,
  Trophy,
} from "lucide-react";
import { apiClient } from "@/lib/api";

interface Achievement {
  _id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  date: string;
}

export function AchievementsManager() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const data = await apiClient.getAll("achievements");
      setAchievements(data);
    } catch (error) {
      console.error("Error fetching achievements:", error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (editingId) {
        await apiClient.update("achievements", editingId, formData);
      } else {
        await apiClient.create("achievements", formData);
      }
      await fetchAchievements();
      setEditingId(null);
      setShowAddForm(false);
      setFormData({
        title: "",
        description: "",
        image: "",
        link: "",
        date: "",
      });
    } catch (error) {
      console.error("Error saving achievement:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setEditingId(achievement._id);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      image: achievement.image,
      link: achievement.link,
      date: achievement.date ? achievement.date.split("T")[0] : "",
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this achievement?")) {
      try {
        await apiClient.delete("achievements", id);
        await fetchAchievements();
      } catch (error) {
        console.error("Error deleting achievement:", error);
      }
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setFormData({ title: "", description: "", image: "", link: "", date: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">
          Achievements Management
        </h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {(showAddForm || editingId) && (
        <Card className="bg-slate-800 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-white">
              {editingId ? "Edit Achievement" : "Add New Achievement"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Achievement Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-slate-700 border-purple-500/20 text-white"
            />

            <Textarea
              placeholder="Achievement Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="bg-slate-700 border-purple-500/20 text-white"
              rows={3}
            />

            <div>
              <label className="text-sm font-medium text-gray-300 mb-2 block">
                Achievement Image
              </label>
              <ImageUpload
                value={formData.image}
                onChange={(value) => setFormData({ ...formData, image: value })}
              />
            </div>

            <Input
              placeholder="Certificate/Link URL"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
              className="bg-slate-700 border-purple-500/20 text-white"
            />

            <Input
              type="date"
              placeholder="Achievement Date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement) => (
          <Card
            key={achievement._id}
            className="bg-slate-800 border-purple-500/20"
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-white text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  {achievement.title}
                </h3>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleEdit(achievement)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(achievement._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {achievement.date && (
                <p className="text-gray-400 text-sm mb-2">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
              )}

              {achievement.image && (
                <OptimizedImage
                  src={achievement.image}
                  alt={achievement.title}
                  width={400}
                  height={200}
                  className="w-full h-32 object-cover rounded mb-2"
                />
              )}

              <p className="text-sm text-gray-300 mb-3">
                {achievement.description}
              </p>

              {achievement.link && (
                <Button size="sm" asChild>
                  <a
                    href={achievement.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Certificate
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
