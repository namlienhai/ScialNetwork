"use client"
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Tab } from '@headlessui/react'
import { MessageCircle, Heart, Repeat, MoreHorizontal } from "lucide-react";
import { useParams } from 'next/navigation'

interface Post {
  id: string
  content: string
  author: {
    name: string
    username: string
    avatarUrl?: string
  }
  createdAt: string
  likes: number
  replies: number
  reposts: number
  images?: string[]
}

export default function ProfilePage() {
  const params = useParams()
  const userId = params.userId as string

  // Mock data - replace with API calls later
  const user = {
    id: userId,
    name: 'Đặng Nin',
    username: 'nindang84',
    followers: 3,
    bio: '2k4 nhà',
    avatarUrl: '/avatar.png' // Fixed: Added leading slash for public directory
  }

  const posts: Post[] = [
    {
      id: '1',
      content: 'Hôm nay trời đẹp quá! 🌞',
      author: {
        name: user.name,
        username: user.username,
        avatarUrl: user.avatarUrl
      },
      createdAt: '2024-03-20T10:00:00Z',
      likes: 12,
      replies: 3,
      reposts: 2,
      images: ['/avatar.png']
    },
    {
      id: '2',
      content: 'Hôm nay trời đẹp quá! 🌞',
      author: {
        name: user.name,
        username: user.username,
        avatarUrl: user.avatarUrl
      },
      createdAt: '2024-03-20T10:00:00Z',
      likes: 12,
      replies: 3,
      reposts: 2,
      images: ['/avatar.png']
    }
  ]

  const PostCard = ({ post }: { post: Post }) => (
    <div className="border-b border-gray-200 py-4">
      <div className="flex space-x-4">
        {post.author.avatarUrl && (
          <Image
            src={post.author.avatarUrl}
            alt={post.author.name}
            width={40}
            height={40}
            className="rounded-full object-cover w-8 h-8"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{post.author.name}</span>
            <span className="text-gray-500">@{post.author.username}</span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
          <p className="mt-2 text-gray-900">{post.content}</p>
          {post.images && post.images.length > 0 && (
            <div className="mt-3 w-full h-[400px]">
              <Image
                src={post.images[0]}
                alt="Post image"
                width={500}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          )}
          <div className="mt-3 flex items-center space-x-8 text-gray-500">
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <Heart className="h-5 w-5" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500">
              <MessageCircle className="h-5 w-5" />
              <span>{post.replies}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-red-500">
              <Repeat className="h-5 w-5" />
              <span>{post.reposts}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const EmptyState = ({ message }: { message: string }) => (
    <div className="py-8 text-center text-gray-500">
      <p>{message}</p>
    </div>
  )

  if (!user) {
    notFound()
  }

  return (
    <main className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
      <span className='text-sm font-bold mb-4'>{user.username}</span>
      <div className='max-w-xl w-full h-auto bg-white rounded-2xl shadow-md p-4 space-y-4'>
        {/* Profile Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-gray-600">{user.username}</p>
            </div>
            <p className="mt-4">{user.bio}</p>
            <p className="text-gray-600 mt-2">{user.followers} người theo dõi</p>
          </div>

          <div className="shrink-0">
            <Image
              src={user.avatarUrl}
              alt={`${user.name}'s avatar`}
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button className="flex-1 bg-black text-white py-2 rounded-lg font-medium">
            Theo dõi
          </button>
          <button className="flex-1 bg-white border border-gray-300 py-2 rounded-lg font-medium">
            Nhắc đến
          </button>
        </div>

        {/* Content Tabs */}
        <Tab.Group>
          <Tab.List className="flex border-b border-gray-200">
            <Tab className={({ selected }: { selected: boolean }) =>
              `px-1 py-4 font-medium outline-none w-1/3 ${
                selected 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-500'
              }`
            }>
              Thread
            </Tab>
            <Tab className={({ selected }: { selected: boolean }) =>
              `px-1 py-4 font-medium ml-8 outline-none w-1/3 ${
                selected 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-500'
              }`
            }>
              Đã thích
            </Tab>
            <Tab className={({ selected }: { selected: boolean }) =>
              `px-1 py-4 font-medium ml-8 outline-none w-1/3 ${
                selected 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-500'
              }`
            }>
              Bài đăng lại
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              {posts.length > 0 ? (
                <div className="divide-y divide-gray-200 h-[540px] overflow-y-auto">
                  {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <EmptyState message="Chưa có thread nào." />
              )}
            </Tab.Panel>
            <Tab.Panel>
              <EmptyState message="Chưa có bài viết đã thích nào." />
            </Tab.Panel>
            <Tab.Panel>
              <EmptyState message="Chưa có bài đăng lại nào." />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </main>
  )
}
