"use client"
import React, { useState, useEffect } from 'react';
import { Activity, Heart, MessageCircle, Repeat, BellRing, UserPlus } from 'lucide-react';

interface Notification {
  id: string;
  type: 'like' | 'comment' | 'repeat' | 'follow';
  username: string;
  postId?: string;
  timestamp: Date;
  read: boolean;
}

const ActivityPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mock fetching notifications from an API
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        const mockNotifications: Notification[] = [
          {
            id: '1',
            type: 'like',
            username: 'john_doe',
            postId: 'post123',
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            read: false,
          },
          {
            id: '2',
            type: 'comment',
            username: 'jane_smith',
            postId: 'post123',
            timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
            read: false,
          },
          {
            id: '3',
            type: 'repeat',
            username: 'alice_wonderland',
            postId: 'post456',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
            read: true,
          },
          {
            id: '4',
            type: 'follow',
            username: 'bob_builder',
            timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            read: false,
          },
        ];

        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();

    // Set up a polling interval to check for new notifications
    const interval = setInterval(() => {
      fetchNotifications();
    }, 60000); // Poll every minute

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-purple-500" />;
      case 'repeat':
        return <Repeat className="h-5 w-5 text-green-500" />;
      case 'follow':
        return <UserPlus className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="flex items-center mb-4">
        <Activity className="h-6 w-6 mr-2" />
        <h1 className="text-xl font-bold">Activity</h1>
      </div>
     <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-xl">
     {loading ? (
        <div className="flex justify-center items-center h-32">
          <p>Loading activity...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-8">
          <BellRing className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">No new activity to show.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex items-start">
                <div className="mr-3">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="font-bold">{notification.username}</span>
                    {notification.type === 'like' && ' liked your post'}
                    {notification.type === 'comment' && ' commented on your post'}
                    {notification.type === 'repeat' && ' repeated your post'}
                    {notification.type === 'follow' && ' followed you'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
     </div>
    </div>
  );
};

export default ActivityPage;