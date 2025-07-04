// src/components/BlogForm.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // To check if we are editing

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        setLoading(true);
        try {
          // Replace with your actual API endpoint for fetching a single blog
          const response = await axios.get(
            `http://localhost:3000/api/blogs/${id}`
          );
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error("Failed to fetch blog post", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const blogData = { title, content };

    try {
      if (id) {
        // Update existing blog
        await axios.put(`http://localhost:3000/api/blogs/${id}`, blogData);
      } else {
        // Create new blog
        await axios.post("http://localhost:3000/api/blogs", blogData);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to save blog post", error);
      // You can add error handling feedback to the user here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {id ? "Edit Post" : "Create New Post"}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8"
        >
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-2 mr-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-orange-300"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
