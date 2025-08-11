import React, { useState } from "react";
import axios from "axios";

const CATEGORIES = [
  "Programming",
  "Music",
  "Art",
  "Language",
  "Fitness",
  "Cooking",
  "Other",
];

const LEVELS = ["Beginner", "Intermediate", "Expert"];
const AVAILABLE_TIMES = ["Mornings", "Afternoons", "Evenings", "Weekends"];

export default function AddSkillForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Programming",
    experienceLevel: "Beginner",
    availableTimes: [],
    mode: "online",
    location: "",
    thumbnailFile: null,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const toggleAvailableTime = (time) => {
    setForm((p) => {
      const exists = p.availableTimes.includes(time);
      return {
        ...p,
        availableTimes: exists
          ? p.availableTimes.filter((t) => t !== time)
          : [...p.availableTimes, time],
      };
    });
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setForm((p) => ({ ...p, thumbnailFile: null }));
      setThumbnailPreview(null);
      return;
    }
    setForm((p) => ({ ...p, thumbnailFile: file }));
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    if (!form.title.trim() || form.title.length < 3) {
      return "Title must be at least 3 characters";
    }
    if (!form.description.trim() || form.description.length < 10) {
      return "Description must be at least 10 characters";
    }
    if (!form.availableTimes.length) {
      return "Choose at least one available time";
    }
    if (form.mode === "offline" && !form.location.trim()) {
      return "Location is required for offline mode";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      let response;
      if (form.thumbnailFile) {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("category", form.category);
        fd.append("experienceLevel", form.experienceLevel);
        form.availableTimes.forEach((t) => fd.append("availableTimes[]", t));
        fd.append("mode", form.mode);
        if (form.location) fd.append("location", form.location);
        fd.append("thumbnail", form.thumbnailFile);

        response = await axios.post("/api/skills", fd, {
          withCredentials: true,
          headers: { Accept: "application/json" },
        });
      } else {
        const payload = {
          title: form.title,
          description: form.description,
          category: form.category,
          experienceLevel: form.experienceLevel,
          availableTimes: form.availableTimes,
          mode: form.mode,
          location: form.location,
        };
        response = await axios.post("/api/skills", payload, {
          withCredentials: true,
        });
      }

      setSuccessMsg(response.data?.message || "Skill created");
      setForm({
        title: "",
        description: "",
        category: form.category,
        experienceLevel: "Beginner",
        availableTimes: [],
        mode: "online",
        location: "",
        thumbnailFile: null,
      });
      setThumbnailPreview(null);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto my-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a Skill</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., Beginner Guitar"
            className="accent-purple-500/25 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What will learners gain from this skill?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm h-28 resize-y focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
          />
        </div>

        {/* Category & Level */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="w-36">
            <label className="block text-sm text-gray-600 mb-1">Level</label>
            <select
              name="experienceLevel"
              value={form.experienceLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Available Times */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Available Times
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {AVAILABLE_TIMES.map((t) => (
              <label
                key={t}
                className="flex items-center gap-2 p-2 border border-gray-300 rounded-lg text-sm cursor-pointer hover:border-gray-400"
              >
                <input
                  type="checkbox"
                  checked={form.availableTimes.includes(t)}
                  onChange={() => toggleAvailableTime(t)}
                  className="h-4 w-4 accent-purple-500/25"
                />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mode */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">Mode</label>
          <div className="flex gap-4">
            {["online", "offline"].map((m) => (
              <label key={m} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="mode"
                  value={m}
                  checked={form.mode === m}
                  onChange={handleChange}
                  className="h-4 w-4 accent-purple-500/25"
                />
                <span className="text-sm capitalize">{m}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Location */}
        {form.mode === "offline" && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Location</label>
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="City, area (e.g., New Delhi)"
              className="accent-purple-500/25 w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-400"
            />
          </div>
        )}

        {/* Thumbnail */}
        <div>
          <label className="block text-sm text-gray-600 mb-2">
            Thumbnail (optional)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnail}
              className="text-sm accent-purple-500/25"
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="preview"
                className="w-20 h-20 object-cover rounded-lg border border-gray-300"
              />
            )}
          </div>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded-lg">
            {error}
          </div>
        )}
        {successMsg && (
          <div className="text-sm text-green-700 bg-green-50 p-2 rounded-lg">
            {successMsg}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Skill"}
        </button>
      </form>
    </div>
  );
}
