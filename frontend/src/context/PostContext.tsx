'use client'
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
  likes: number;
  liked: boolean;
  replies: Reply[];
};

type PostContextType = {
  posts: Post[];
  addComment: (postId: number, comment: Reply) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window !== "undefined") {
      const storedPosts = localStorage.getItem("posts");
      return storedPosts ? JSON.parse(storedPosts) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addComment = (postId: number, comment: Reply) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, replies: [...post.replies, comment] } : post
    );
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts)); // Cập nhật localStorage ngay lập tức
  };

  return (
    <PostContext.Provider value={{ posts, addComment }}>
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
