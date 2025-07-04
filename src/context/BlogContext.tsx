import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogContextType {
  posts: Post[];
  loading: boolean;
  addPost: (postData: { title: string; content: string }) => Promise<void>;
  updatePost: (
    id: string,
    postData: { title: string; content: string }
  ) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  fetchPosts: () => Promise<void>;
}

interface BlogProviderProps {
  children: ReactNode;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      fetchPosts();
    }
  }, [token]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/blogs");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData: { title: string; content: string }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/blogs",
        postData
      );
      setPosts([response.data, ...posts]);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const updatePost = async (
    id: string,
    postData: { title: string; content: string }
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/blogs/${id}`,
        postData
      );
      setPosts(posts.map((post) => (post._id === id ? response.data : post)));
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/blogs/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const value: BlogContextType = {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
    fetchPosts,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
