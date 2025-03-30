'use client'
import { MessageCircle, Heart, Repeat, Smile, Image, MapPin, AlignLeft, X, MoreHorizontal, Ellipsis } from "lucide-react";
import { useState,ReactNode, useEffect  } from "react";
import { useRouter } from "next/navigation";
import { usePostContext } from "@/context/PostContext"; 
import { useParams } from "next/navigation";
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
  const router = useRouter();
  const { posts, setPosts } = usePostContext(); // 🟢 Dùng context thay vì state cục bộ
  const [showUploadPost, setShowUploadPost] = useState(false);
  const [content, setContent] = useState("");

  const onClose = () => {
    setShowUploadPost(false);
  };

  const handlePost = () => {
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      avatar: "https://placehold.co/40x40",
      username: "username",
      time: "Vừa xong",
      content: content,
      image: "https://placehold.co/500x200",
      likes: 0,
      comments: 0,
      reposts: 0,
      replies: [],
    };

    setPosts([newPost, ...posts]); // 🟢 Cập nhật posts trong context
    localStorage.setItem("posts", JSON.stringify([newPost, ...posts]));
    setContent("");
    setShowUploadPost(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Trang chủ</h1>
      <div className="max-w-xl w-full h-auto">
        <div className="bg-white rounded-2xl shadow-md p-4 space-y-4">
          <div
            className="flex items-center space-x-3 border-b pb-3"
            onClick={() => setShowUploadPost((prev) => !prev)}
          >
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

          {showUploadPost && (
            <div className="fixed inset-0 h-full flex items-center justify-center bg-black/50">
              <div className="bg-white w-[600px] rounded-2xl shadow-lg p-4 translate-x-10">
                <div className="flex justify-between items-center border-b pb-2">
                  <button className="text-gray-600 hover:text-black">
                    <X size={22} onClick={onClose} className="cursor-pointer" />
                  </button>
                  <h2 className="text-lg font-semibold">Thread mới</h2>
                  <div></div>
                </div>

                <div className="p-3 space-y-3">
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
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && content.trim()) {
                            e.preventDefault();
                            handlePost();
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center text-gray-500 space-x-4">
                    <Image size={20} className="cursor-pointer hover:text-black" />
                  </div>

                  <div className="flex justify-between items-center border-t pt-3">
                    <button className="text-gray-500 text-sm">
                      Bất kỳ ai cũng có thể trả lời và trích dẫn
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold ${
                        content.trim() ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!content.trim()}
                      onClick={handlePost}
                    >
                      Đăng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 max-h-[80vh] overflow-y-auto">
          {posts.map((post) => (
            <div key={post.id} onClick={() => router.push(`/comment/${post.id}`)} className="cursor-pointer">
              <Post postId={post.id} {...post} /> {/* ✅ Thêm `postId` */}
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Component cho Post
interface PostProps {
  id: string;
  avatar: string;
  username: string;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  reposts: number;
  saves: number;
  onClick?: () => void;
}

function Post({ postId }: { postId: number }) {
  const { posts, addComment, editPost, deletePost  } = usePostContext();
  const post = posts.find((p) => p.id === postId);

  if (!post) return null; // Tránh lỗi nếu không tìm thấy bài viết

  const { id, avatar, username, time, content, image, replies  } = post;

  const [showComment, setShowComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [reposted, setReposted] = useState(false);
  const [repostCount, setRepostCount] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post?.replies?.length || 0);
  const [showOptions, setShowOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const onClose = () => {
    setShowComment(false);
  };

  // 🟢 Xử lý Like
  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev: number) => (liked ? prev - 1 : prev + 1));
  };

  // 🟢 Xử lý Repost
  const handleRepost = () => {
    setReposted(!reposted);
    setRepostCount((prev: number) => (reposted ? prev - 1 : prev + 1));
  };

  // 🟢 Xử lý thêm comment
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
  const handleEditPost = () => {
    if (!editedContent.trim()) return;
    editPost(postId, editedContent);
    setEditMode(false);
  };
  
  // 🟢 Xử lý xóa bài viết
  const handleDeletePost = () => {
    deletePost(postId);
  };

  // State for follow/unfollow functionality
  const [isFollowing, setIsFollowing] = useState(false);

  // Handle follow/unfollow action
  const handleFollowToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(prev => !prev);
    // Here you would typically make an API call to update follow status
  };

  // 🟢 Hiển thị UI sửa bài viết
  const renderContent = () => {
    return editMode ? (
      <div className="mt-2" onClick={(e) => e.stopPropagation()}>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <div className="flex justify-end gap-2 mt-2">
          <button onClick={() => setEditMode(false)} className="px-4 py-1 bg-gray-300 text-black rounded-lg">
            Hủy
          </button>
          <button onClick={handleEditPost} className="px-4 py-1 bg-blue-500 text-white rounded-lg">
            Lưu
          </button>
        </div>
      </div>
    ) : (
      <p className="mt-2">{content}</p>
    );
  };
  return (
    <div className="bg-white p-4 shadow-md w-full rounded-lg border">
      
      {/* Header */}
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
          <div>
          <div className="flex items-center gap-2">
            <div>
              <p className="font-semibold">{username}</p>
              <p className="text-sm text-gray-500">{time}</p>
            </div>
            <button
              onClick={handleFollowToggle}
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                isFollowing
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
            </button>
          </div>
          </div>
        </div>
        <div className="hover:bg-gray-100 p-2 rounded-full flex justify-center items-center w-8 h-8" onClick={(e) => {e.stopPropagation()}}>
          <Ellipsis 
            size={20} 
            className="cursor-pointer hover:text-black" 
            onClick={() => {
            setShowOptions((prev) => !prev)}
          }/>
          
        </div>
        {
          showOptions && (
            <div className="absolute bg-white border border-gray-200 shadow-md p-2 rounded-lg translate-x-[230%] translate-y-7" onClick={(e) => {
              e.stopPropagation();
            }}>
              <button className="w-full text-left hover:bg-gray-100 p-2" onClick={() => {setEditMode(true);setShowOptions(false);}}>Chỉnh sửa</button>
              <button className="w-full text-left hover:bg-gray-100 p-2" onClick={handleDeletePost}>Xóa</button>
            </div>
          )
        }
        
      </div>

      {/* Content */}
      <p className="mt-2">{renderContent()}</p>
      {image && <img src={image} alt="Post" className="mt-2 rounded-lg" />}

      {/* Action Buttons */}
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
      {showComment && (
        <div 
        className="fixed inset-0 flex items-center justify-center bg-black/50" 
        onClick={(e) => {
          e.stopPropagation(); 
        }}
        >
        <div className="bg-white w-[500px] rounded-xl shadow-lg translate-x-10">
          
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <button className="text-gray-600 hover:text-black">
              <X size={20} onClick={onClose} className="cursor-pointer"/>
            </button>
            <p className="text-sm font-semibold">Thread trả lời</p>
            <button className="text-gray-600 hover:text-black">
              <MoreHorizontal size={20} />
            </button>
          </div>
  
          {/* Nội dung thread */}
          <div className="p-4">
            <div className="flex space-x-3">
              <img
                src="https://placehold.co/40x40"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm">{username} <span className="text-gray-500 text-xs">• {time}</span></p>
                <p className="text-sm text-gray-800">{content}</p>
              </div>
            </div>
          </div>
  
          {/* Ô nhập phản hồi */}
          <div className="p-4">
            <div className="flex space-x-3">
              <img
                src="https://placehold.co/40x40"
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={`Trả lời ${username}`}
                  className="w-full border-none outline-none bg-transparent text-sm text-gray-800"
                />
                <div className="flex space-x-3 text-gray-500 mt-2">
                  <button><Image size={18} /></button>
                </div>
              </div>
            </div>
          </div>
  
          {/* Nút Đăng */}
          <div className="p-4">
            <button className="w-full bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed" onClick={handleComment}>
              Đăng
            </button>
          </div>
  
        </div>
      </div>
      )}
    </div>
  );
}

// Component cho nút bấm
function ActionButton({ 
  icon, 
  count, 
  onClick 
}: { 
  icon: ReactNode; 
  count: number; 
  onClick?: (e: React.MouseEvent) => void; 
}) {
  return (
    <button 
      className="flex items-center space-x-1 hover:text-black"
      onClick={(e) => {
        e.stopPropagation(); // Ngăn sự kiện click lan lên cha
        onClick?.(e);
      }}
    >
      {icon}
      <span>{count}</span>
    </button>
  );
}
