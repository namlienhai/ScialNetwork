"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const CommentPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState("");

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const foundPost = storedPosts.find((p) => p.id === Number(id));
    setPost(foundPost || null);
  }, [id]);

  // Xử lý đăng comment
  const handleComment = () => {
    if (!newComment.trim()) return;

    const newReply = {
      id: Date.now(),
      username: "User",
      avatar: "https://placehold.co/40x40",
      time: "Vừa xong",
      content: newComment,
    };

    const updatedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const postIndex = updatedPosts.findIndex((p) => p.id === Number(id));

    if (postIndex !== -1) {
      updatedPosts[postIndex].replies = [...(updatedPosts[postIndex].replies || []), newReply];
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setPost(updatedPosts[postIndex]); // Cập nhật lại UI
      setNewComment("");
    }
  };

  if (!post) return <p className="text-center text-gray-500">Đang tải...</p>;

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Trang chủ</h1>
      <div className="min-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
        {/* Post chính */}
        <div className="border-b pb-4">
          <div className="flex items-center gap-2">
            <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">{post.username}</p>
              <p className="text-sm text-gray-500">{post.time}</p>
            </div>
          </div>
          <p className="mt-2">{post.content}</p>
        </div>

        {/* Danh sách comment */}
        <div className="mt-4">
          <p className="font-semibold">Thread trả lời</p>
          {post.replies?.length > 0 ? (
            post.replies.map((reply) => (
              <div key={reply.id} className="flex items-start gap-2 mt-2">
                <img src={reply.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="font-semibold">{reply.username}</p>
                  <p className="text-sm text-gray-500">{reply.time}</p>
                  <p className="mt-1">{reply.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm mt-2">Chưa có bình luận nào.</p>
          )}
        </div>

        {/* Ô nhập comment */}
        <div className="mt-4 flex gap-2 border-t pt-4">
          <input
            type="text"
            placeholder="Viết bình luận..."
            className="flex-grow border p-2 rounded-lg"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
            onClick={handleComment}
            disabled={!newComment.trim()}
          >
            Đăng
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
