"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Reply = {
  id: number;
  username: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  replies?: Reply[]; // 🔹 Cho phép reply lồng nhau
};

type Post = {
  id: number;
  username: string;
  avatar: string;
  time: string;
  content: string;
  image?: string;
  replies?: Reply[];
};

type PostContextType = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  addComment: (postId: number, comment: Reply) => void;
  addReply: (postId: number, commentId: number, reply: Reply) => void;
  editPost: (postId: number, newContent: string) => void;
  deletePost: (postId: number) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    if (typeof window === "undefined") return [];
    const storedPosts = localStorage.getItem("posts");
    return storedPosts ? JSON.parse(storedPosts) : [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("posts", JSON.stringify(posts));
    }
  }, [posts]);

  // 🔹 Thêm comment vào post
  const addComment = (postId: number, comment: Reply) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId
          ? { ...post, replies: [...(post.replies || []), comment] }
          : post
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  // 🔹 Thêm reply vào comment (có thể lồng nhiều cấp)
  const addReply = (postId: number, commentId: number, reply: Reply) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) => {
        if (post.id !== postId) return post;

        const updateReplies = (comments: Reply[]): Reply[] =>
          comments.map((cmt) => {
            if (cmt.id === commentId) {
              return { ...cmt, replies: [...(cmt.replies || []), reply] };
            }
            return cmt.replies ? { ...cmt, replies: updateReplies(cmt.replies) } : cmt;
          });

        return { ...post, replies: updateReplies(post.replies || []) };
      });

      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  // 🔹 Chỉnh sửa bài viết
  const editPost = (postId: number, newContent: string) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === postId ? { ...post, content: newContent } : post
      );
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      return updatedPosts;
    });
  };

  // 🔹 Xóa bài viết
  const deletePost = (postId: number) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, addComment, addReply, editPost, deletePost }}>
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
