"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Reply = {
  id: number;
  username: string;
  avatar: string;
  time: string;
  content: string;
};

type Post = {
  id: number;
  username: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  replies?: Reply[]; // 🟢 Danh sách comment
};

type PostContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  addComment: (postId: number, comment: Reply) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window === "undefined") return []; // Tránh lỗi khi SSR
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  const addComment = (postId: number, comment: Reply) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, replies: [...(post.replies || []), comment] }
          : post
      )
    );
  };

  return (
    <PostContext.Provider value={{ posts,setPosts , addComment }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
