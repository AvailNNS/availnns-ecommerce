"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export default function UserNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/api/notifications", {
        withCredentials: true,
      });
      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.put(`/api/notifications/${id}/read`, {}, {
        withCredentials: true,
      });
      setNotifications(
        notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await axios.put("/api/notifications/read-all", {}, {
        withCredentials: true,
      });
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  if (loading) {
    return <div className="text-center py-6 text-gray-500">লোড হচ্ছে...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">আপনার নোটিফিকেশনসমূহ</h2>
        {notifications.some((n) => !n.isRead) && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            সব পড়া হয়েছে হিসেবে মার্ক করুন
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-4">কোনো নোটিফিকেশন নেই।</p>
      ) : (
        <div className="space-y-3">
          {notifications.map((item) => (
            <div
              key={item._id}
              onClick={() => !item.isRead && handleMarkAsRead(item._id)}
              className={`p-4 rounded-lg border transition duration-200 cursor-pointer ${
                item.isRead
                  ? "bg-white border-gray-200 text-gray-600"
                  : "bg-blue-50 border-blue-200 text-gray-900 font-medium"
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-base">{item.title}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 uppercase">
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{item.message}</p>
              
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                {!item.isRead && (
                  <span className="text-blue-600 font-semibold">পড়া হয়নি (Click to read)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
