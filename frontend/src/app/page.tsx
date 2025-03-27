"use client"
import { MessageCircle, Heart, Repeat, Smile, Image, MapPin, AlignLeft, X, MoreHorizontal, Copy } from "lucide-react";
import { useState } from "react";
import { ReactNode } from "react";

const posts = [
  {
    id: 1,
    avatar: "https://placehold.co/40x40",
    username: "username",
    time: "19 giờ",
    content: "content",
    image: "https://placehold.co/500x200",
    likes: 474,
    comments: 3,
    reposts: 27,
    saves: 8,
  },
  {
    id: 2,
    avatar: "https://placehold.co/40x40",
    username: "username",
    time: "1 ngày",
    content: "content",
    image: "https://placehold.co/500x200",
    likes: 320,
    comments: 5,
    reposts: 15,
    saves: 6,
  },
  {
    id: 3,
    avatar: "https://placehold.co/40x40",
    username: "randomuser",
    time: "2 ngày",
    content: "Just finished my first marathon! 🏃‍♂️",
    image: "https://placehold.co/500x200",
    likes: 289,
    comments: 12,
    reposts: 9,
    saves: 4,
  },
];

export default function Home() {
  const[showUploadPost, setShowUploadPost] =useState(false)
  const [content, setContent] = useState("");
  const onClose = () => {
    setShowUploadPost(false);
  };
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
  <h1 className="text-xl font-bold mb-4">Trang chủ</h1>
  <div className="max-w-xl w-full h-auto">
    {/* Post Input & List */}
    <div className="bg-white rounded-2xl shadow-md p-4 space-y-4">
      {/* Post Input */}
      <div 
      className="flex items-center space-x-3 border-b pb-3"
      onClick={() => setShowUploadPost((prev) => !prev)}>
        <img src="https://placehold.co/40" alt="Avatar" className="w-10 h-10 rounded-full" />
        <div className="flex-1 flex gap-2">
          <input 
            type="text" 
            placeholder="Có gì mới?" 
            className="flex-1 p-2 border rounded-lg focus:outline-none" 
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold">Đăng</button>
        </div>
      </div>
      {showUploadPost&&(
        <div className="fixed inset-0 h-full flex items-center justify-center bg-black/50">
          <div className="bg-white w-[600px] rounded-2xl shadow-lg p-4 translate-x-10">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2">
              <button className="text-gray-600 hover:text-black">
                <X size={22} onClick={onClose} />
              </button>
              <h2 className="text-lg font-semibold">Thread mới</h2>
              <div></div>
            </div>
        
            {/* Content */}
            <div className="p-3 space-y-3">
              {/* User Info & Input */}
              <div className="flex items-start space-x-3">
                <img src="https://placehold.co/40" alt="Avatar" className="w-10 h-10 rounded-full" />
                <div className="w-full">
                  <p className="text-sm font-semibold">
                    nindang035 <span className="text-gray-500">› Thêm chủ đề</span>
                  </p>
                  <textarea
                    className="w-full mt-1 p-2 text-sm border-none outline-none resize-none"
                    rows={2}
                    placeholder="Có gì mới?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
        
              {/* Attachments */}
              <div className="flex items-center text-gray-500 space-x-4">
                <Image size={20} className="cursor-pointer hover:text-black" />
                <Smile size={20} className="cursor-pointer hover:text-black" />
                <AlignLeft size={20} className="cursor-pointer hover:text-black" />
                <MapPin size={20} className="cursor-pointer hover:text-black" />
              </div>
        
              {/* Footer */}
              <div className="flex justify-between items-center border-t pt-3">
                <button className="text-gray-500 text-sm">Bất kỳ ai cũng có thể trả lời và trích dẫn</button>
                <button
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    content.trim() ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={!content.trim()}
                >
                  Đăng
                </button>
              </div>
            </div>
          </div>
        </div>
      )

      }
      {/* Post List */}
      <div className="space-y-4 max-h-[80vh] overflow-y-auto">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </div>
  </div>
</div>


  );
}

// Component cho Post
interface PostProps {
  avatar: string;
  username: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  saves: number;
}

function Post({ avatar, username, time, content, image, likes, comments, reposts, saves }: PostProps) {
  const[showComment, setShowComment] = useState(false)
  return (
    <div className="bg-white p-4 shadow-md w-full rounded-lg border">
      
      {/* Header */}
      <div className="flex items-center space-x-3">
        <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{username}</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>

      {/* Content */}
      <p className="mt-2">{content}</p>
      {image && <img src={image} alt="Post" className="mt-2 rounded-lg" />}

      {/* Action Buttons */}
      <div className="flex gap-4 text-gray-500 mt-3">
        <ActionButton icon={<Heart size={18} />} count={likes} />
        <ActionButton icon={<MessageCircle size={18} />} count={comments} onClick={() => setShowComment((prev) => !prev)}/>
        <ActionButton icon={<Repeat size={18} />} count={reposts} />
      </div>

    </div>
  );
}

// Component cho nút bấm
function ActionButton({ icon, count, onClick }: { icon: ReactNode; count: number; onClick?: () => void }) {
  return (
    <button className="flex items-center space-x-1 hover:text-black">
      {icon}
      <span>{count}</span>
    </button>
  );
}
