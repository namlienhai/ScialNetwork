"use client"
import React, { useState, useEffect } from 'react';
import { Search, User, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'posts' | 'users'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredResults, setFilteredResults] = useState<Post[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<string[]>([]);

  useEffect(() => {
    // Get posts from localStorage
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts);
      setPosts(parsedPosts);

      const uniqueUsers = [...new Set(parsedPosts.map((post: Post) => post.author))];
      setUsers(uniqueUsers as string[]);
    }
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredResults(posts);
      setFilteredUsers(users);
      return;
    }

    if (searchType === 'posts') {
      const results = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      const results = users.filter(user =>
        user.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    }
  }, [searchTerm, searchType, posts, users]);

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
        <h1 className="text-xl font-bold mb-4">Search</h1>
        <div className="bg-white p-6 rounded-2xl min-w-xl">
          <div className="flex items-center mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder={`Search ${searchType === 'posts' ? 'posts' : 'users'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="ml-4 flex space-x-2">
              <button
                className={`flex items-center px-4 py-2 rounded-md ${
                  searchType === 'posts'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSearchType('posts')}
              >
                <FileText className="h-5 w-5 mr-2" />
                Posts
              </button>
              <button
                className={`flex items-center px-4 py-2 rounded-md ${
                  searchType === 'users'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setSearchType('users')}
              >
                <User className="h-5 w-5 mr-2" />
                Users
              </button>
            </div>
          </div>
              
          {searchType === 'posts' ? (
            <div className="space-y-4 overflow-y-auto max-h-[80vh]">
              <h2 className="text-xl font-semibold">Posts ({filteredResults.length})</h2>
              {filteredResults.length > 0 ? (
                filteredResults.map((post) => (
                  <div key={post.id} onClick={() => router.push(`/comment/${post.id}`)} className="p-4 border border-gray-200 rounded-md cursor-pointer">
                    <h3 className="text-lg font-medium">{post.title}</h3>
                    <p className="text-gray-600 mt-1">{post.content.substring(0, 100)}...</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No posts found matching your search.</p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Users ({filteredUsers.length})</h2>
              {filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredUsers.map((user) => (
                    <div key={user} className="p-4 border border-gray-200 rounded-md flex items-center">
                      <div className="bg-gray-200 rounded-full p-3 mr-3">
                        <User className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{user}</h3>
                        <p className="text-sm text-gray-500">
                          {posts.filter(post => post.author === user).length} posts
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No users found matching your search.</p>
              )}
            </div>
          )}
        </div>
      
    </div>
  );
};
