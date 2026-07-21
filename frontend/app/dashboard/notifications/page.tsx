"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CheckCheck,
  Package,
  ShieldAlert,
  Tag,
  Info,
  Trash2,
  Clock,
  ChevronRight,
  Loader2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { notificationService, NotificationItem } from "@/services/notification.service";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 1. Fetch Notifications from Backend API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notificationService.getNotifications();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error("Fetch Notifications Error:", err);
      setError("Failed to load notifications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Mark Single Notification as Read
  const handleMarkAsRead = async (id: string, isAlreadyRead: boolean) => {
    if (isAlreadyRead) return;

    setNotifications((prev) =>
      prev.map((item) =>
        (item._id || item.id) === id ? { ...item, isRead: true } : item
      )
    );

    try {
      await notificationService.markAsRead(id);
    } catch (err) {
      console.error("Mark Read Error:", err);
    }
  };

  // 3. Mark All Notifications as Read
  const handleMarkAllAsRead = async () => {
    setNotifications((prev) =>
      prev.map((item) => ({ ...item, isRead: true }))
    );

    try {
      await notificationService.markAllAsRead();
    } catch (err) {
      console.error("Mark All Read Error:", err);
      fetchNotifications();
    }
  };

  // 4. Delete Notification
  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setNotifications((prev) =>
      prev.filter((item) => (item._id || item.id) !== id)
    );

    try {
      await notificationService.deleteNotification(id);
    } catch (err) {
      console.error("Delete Notification Error:", err);
      fetchNotifications();
    }
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "order":
        return <Package size={16} className="text-emerald-600" />;
      case "security":
        return <ShieldAlert size={16} className="text-rose-600" />;
      case "promo":
        return <Tag size={16} className="text-amber-600" />;
      default:
        return <Info size={16} className="text-blue-600" />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.isRead;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3 font-sans">
        <Loader2 className="animate-spin text-slate-900" size={28} />
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
          Loading Notifications...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[300px] flex items-center justify-center p-4 font-sans">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center space-y-3 shadow-xl max-w-sm w-full">
          <AlertCircle size={32} className="mx-auto text-rose-500" />
          <p className="text-xs font-semibold text-slate-700">{error}</p>
          <button
            onClick={fetchNotifications}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-slate-800 transition active:scale-95"
          >
            <RefreshCw size={14} /> Retry Loading
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5 font-sans text-slate-900 antialiased p-4 sm:p-6 pb-12">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition active:scale-95 shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Notifications</h1>
              {unreadCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates about orders, account security, and activities.
            </p>
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-2 rounded-xl transition active:scale-95 shrink-0 self-start sm:self-auto"
          >
            <CheckCheck size={15} />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      {/* FILTER TABS */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
            filter === "all"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
            filter === "unread"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* NOTIFICATION LIST */}
      <div className="space-y-2.5">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
            <Bell className="mx-auto text-slate-300 mb-2" size={32} />
            <p className="text-xs font-semibold text-slate-700">No notifications found</p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {filter === "unread" ? "You have read all notifications." : "Your inbox is empty."}
            </p>
          </div>
        ) : (
          filteredNotifications.map((item) => {
            const itemId = item._id || item.id || "";
            const hasLink = Boolean(item.link && item.link.trim() !== "");

            return (
              <div
                key={itemId}
                onClick={() => handleMarkAsRead(itemId, item.isRead)}
                className={`group block bg-white p-4 rounded-2xl border transition-all duration-200 relative cursor-pointer ${
                  !item.isRead
                    ? "border-slate-300 ring-1 ring-slate-900/5 shadow-2xs"
                    : "border-slate-200/80 opacity-80 hover:opacity-100 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 w-full">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        item.type === "order"
                          ? "bg-emerald-50"
                          : item.type === "security"
                          ? "bg-rose-50"
                          : item.type === "promo"
                          ? "bg-amber-50"
                          : "bg-blue-50"
                      }`}
                    >
                      {getIcon(item.type)}
                    </div>

                    <div className="space-y-1 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                            {item.title}
                          </h3>
                          {!item.isRead && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                          )}
                        </div>

                        {hasLink && (
                          <Link
                            href={item.link!}
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 transition"
                          >
                            <span>View</span>
                            <ChevronRight size={14} />
                          </Link>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                          <Clock size={12} />
                          <span>
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "Recently"}
                          </span>
                        </div>

                        <button
                          onClick={(e) => handleDelete(itemId, e)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                          title="Delete notification"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
