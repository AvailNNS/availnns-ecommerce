import api from "./api";

export interface NotificationItem {
  _id?: string;
  id?: string;
  title: string;
  message: string;
  type: "order" | "security" | "promo" | "system";
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export const notificationService = {
  // ১. সব নোটিফিকেশন গেট করা
  getNotifications: async () => {
    const response = await api.get("/notifications");
    return response.data?.notifications || response.data || [];
  },

  // ২. নির্দিষ্ট নোটিফিকেশন রিড করা
  markAsRead: async (id: string) => {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  },

  // ৩. সব নোটিফিকেশন একসাথে রিড করা
  markAllAsRead: async () => {
    const response = await api.put("/notifications/read-all");
    return response.data;
  },

  // ৪. নির্দিষ্ট নোটিফিকেশন ডিলিট করা
  deleteNotification: async (id: string) => {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },
};
