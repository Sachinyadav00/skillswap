import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../utils/axiosInstance";
import toast from "react-hot-toast";

const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await axiosInstance.get(`/api/v1/skills/${id}`);
        console.log(res.data);
        setSkill(res.data.data); // store the skill object
      } catch (error) {
        toast.error("Failed to load skill details");
      }
    };
    fetchSkill();
  }, [id]);

  // Helper function to format date to IST
  const formatIST = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });
  };

  if (!skill) {
    return (
      <div className="flex items-center justify-center h-40 ">
        Loading skill details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <h1 className="text-4xl font-bold mb-4">{skill.title}</h1>

      {/* Thumbnail */}
      <img
        src={skill.thumbnail}
        alt={skill.title}
        className="w-full max-h-96 object-cover rounded-lg mb-6"
      />

      {/* Description */}
      <p className="text-lg mb-4">{skill.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {skill.category && (
          <span className="bg-blue-500  px-3 py-1 rounded-full text-sm">
            {skill.category}
          </span>
        )}
        {skill.experienceLevel && (
          <span className="bg-green-500  px-3 py-1 rounded-full text-sm">
            {skill.experienceLevel}
          </span>
        )}
        {skill.mode && (
          <span className="bg-purple-500  px-3 py-1 rounded-full text-sm">
            {skill.mode}
          </span>
        )}
      </div>

      {/* Details */}
      <ul className="space-y-2 text-base">
  <li>
    <strong>Available Times:</strong>{" "}
    {skill.availableTimes?.join(", ") || "Not specified"}
  </li>
  <li>
    <strong>Location:</strong> {skill.location || "N/A"}
  </li>
  <li>
    <strong>Created By:</strong> {skill.createdBy?.username || "Unknown Creator"}
  </li>
  <li>
    <strong>Email:</strong> {skill.createdBy?.email || "N/A"}
  </li>
  <li>
    <strong>Created At:</strong> {formatIST(skill.createdAt)}
  </li>
  <li>
    <strong>Updated At:</strong> {formatIST(skill.updatedAt)}
  </li>
</ul>

    </div>
  );
};

export default SkillDetails;
