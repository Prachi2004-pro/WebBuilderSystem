"use client";
import Button from "@/components/ui/Button";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState, useRef } from "react";
import React from "react";
import { RiAddLine } from "react-icons/ri";
import { Trash2, MoreVertical, Pencil, Eye } from "lucide-react";

function TemplateCard({ template, handleDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative border border-gray-700 rounded-lg overflow-hidden hover:border-blue-500 h-fit transition-colors duration-200">
      {/* Three-dot menu button */}
      <div ref={menuRef} className="absolute top-2 right-2 z-10">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="bg-black/60 hover:bg-black/80 backdrop-blur-sm text-white rounded-full p-1.5 transition-all duration-150 shadow-lg"
        >
          <MoreVertical size={18} />
        </button>

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 mt-1 w-44 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
            <button
              onClick={() => {
                (window.location.href = `/editor/${template._id}`)
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-200 hover:bg-blue-700 hover:text-white transition-colors"
            >
              <Pencil size={15} />
              Edit Project
            </button>

            <button
              onClick={() => {
                window.location.href = `/preview/${template._id}`;
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-200 hover:bg-green-700 hover:text-white transition-colors"
            >
              <Eye size={15} />
              View Project
            </button>
            <div className="border-t border-gray-700" />
            <button
              onClick={() => {
                handleDelete(template._id);
                setMenuOpen(false);
              }}
              className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-700 hover:text-white transition-colors"
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="aspect-square h-3/4 bg-gray-800 text-white flex items-center justify-center overflow-hidden">
        {template?.heroSection?.heroImage ? (
          <img
            src={template.heroSection.heroImage}
            alt={template?.heroSection?.title || "Hero Image"}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}
      </div>

      {/* Text */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-xl mb-1">
          {template?.heroSection?.title || "Untitled Project"}
        </h3>
        <p className="text-gray-400 text-sm">
          {template?.heroSection?.description || "No description available."}
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [templateList, setTemplateList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const token = Cookies.get("auth_token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/template/list`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setTemplateList(res.data);
      } catch (error) {
        console.log("Error fetching templates:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleDelete = async (templateId) => {
    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/template/delete/${templateId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTemplateList((prev) =>
        prev.filter((template) => template._id !== templateId),
      );
      alert("Template deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      alert(error.response?.data?.message || "Failed to delete project");
    }
  };

  if (isLoading) {
    return <div className="text-xl text-white">Loading Templates...</div>;
  }

  return (
    <div className="bg-[#242424] min-h-screen w-full">
      <div className="flex flex-row items-start justify-between p-6">
        <h1 className="text-white text-3xl font-bold">My Projects</h1>
        <a href="/template">
          <Button className="flex items-center gap-2 hover:shadow-xl focus:ring-blue-300 focus:ring-offset-1">
            <RiAddLine size={20} className="text-white" />
            Create New Project
          </Button>
        </a>
      </div>

      <div>
        {templateList.length === 0 ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center items-center text-white text-2xl p-4 border border-gray-700 rounded-2xl w-fit hover:bg-gray-800 hover:border-blue-500">
            No templates Created yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {templateList.map((template) => (
              <TemplateCard
                key={template._id}
                template={template}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
