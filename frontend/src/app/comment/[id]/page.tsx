"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { usePostContext } from "@/context/PostContext"; // Import context đã sửa lỗi
import { MessageCircle, Heart, Repeat, Smile, Image, MapPin, AlignLeft, X, MoreHorizontal, Copy } from "lucide-react";
import { ReactNode } from "react";
const CommentPage = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const { posts, addComment } = usePostContext();
  const post = posts.find((p) => p.id === Number(id)) || null;
  const [newComment, setNewComment] = useState("");

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reposted, setReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(0);
  const [comments, setComments] = useState(post?.replies?.length || 0);
  const [showComment, setShowComment] = useState(false);
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

    addComment(Number(id), newReply);
    setComments((prev) => prev + 1);
    setNewComment("");
  };
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  // Xử lý repost
  const handleRepost = () => {
    setReposted(!reposted);
    setRepostCount((prev) => (reposted ? prev - 1 : prev + 1));
  };

  
  if (!post) return <p className="text-center text-gray-500">Đang tải...</p>;

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Trang chủ</h1>
      <div className="min-w-xl h-full mx-auto p-4 bg-white flex flex-col justify-between rounded-lg shadow-md">
        {/* Post chính */}
        <div className="flex flex-col">
          <div className="border-b pb-4">
            <div className="flex items-center gap-2">
              <img src={post.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
              <div>
                <p className="font-semibold">{post.username}</p>
                <p className="text-sm text-gray-500">{post.time}</p>
              </div>
            </div>
            <p className="mt-2">{post.content}</p>
            <div className="flex gap-4 text-gray-500 mt-3">
              <ActionButton 
                  icon={<Heart size={18} className={liked ? "text-red-500" : "text-gray-500"} />} 
                  count={likeCount} 
                  onClick={handleLike}
                />
                <ActionButton icon={<MessageCircle size={18} />} count={comments} onClick={() => setShowComment((prev) => !prev)}/>
                <ActionButton 
                  icon={<Repeat size={18} className={reposted ? "text-green-500" : "text-gray-500"} />} 
                  count={repostCount} 
                  onClick={handleRepost}
                />
            </div>
          </div>


          {/* Danh sách comment */}
          <div className="mt-4">
            <p className="font-semibold">Thread trả lời</p>
            {post.replies && post.replies.length > 0 ? (
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
        </div>

        {/* Ô nhập comment */}
        <div className="mt-4 flex gap-2 border-t pt-4 items-end">
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
function ActionButton({ icon, count, onClick }: { icon: ReactNode; count: number; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex items-center space-x-1 text-gray-500 hover:text-black">
      {icon}
      <span className="text-sm">{count}</span>
    </button>
  );
}