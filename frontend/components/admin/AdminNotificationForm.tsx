"use client";

import { useState } from "react";
import api from "@/services/api";
import { Loader2, Send } from "lucide-react";

export default function AdminNotificationForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("system");
  const [link, setLink] = useState("");
  const [recipientType, setRecipientType] = useState("all");
  const [userId, setUserId] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendNotification = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await api.post(
        "/admin/notifications/send",
        {
          title,
          message,
          type,
          link,
          recipientType,
          userId:
            recipientType === "specific"
              ? userId
              : undefined,
        }
      );

      if (res.data.success) {
        setSuccessMsg(
          res.data.message ||
            "Notification sent successfully."
        );

        setTitle("");
        setMessage("");
        setType("system");
        setLink("");
        setRecipientType("all");
        setUserId("");
      }
    } catch (error: any) {
      setErrorMsg(
        error?.response?.data?.message ||
          "Failed to send notification."
      );
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="max-w-2xl mx-auto rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Send Notification
      </h2>

      {successMsg && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSendNotification}
        className="space-y-5"
      >

        {/* Title */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Notification Title
          </label>

          <input
            type="text"
            required
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Flash Sale 50% OFF"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Message */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Message
          </label>

          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Write notification message..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        {/* Type + Link */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Notification Type
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="system">System</option>
              <option value="promo">Promotion</option>
              <option value="order">Order</option>
              <option value="security">Security</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Redirect Link (Optional)
            </label>

            <input
              type="text"
              value={link}
              onChange={(e) =>
                setLink(e.target.value)
              }
              placeholder="/orders"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

        </div>

                {/* Recipient */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Recipient
          </label>

          <select
            value={recipientType}
            onChange={(e) =>
              setRecipientType(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="all">
              All Users
            </option>

            <option value="specific">
              Specific User
            </option>
          </select>
        </div>

        {/* User ID */}

        {recipientType === "specific" && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              User ID
            </label>

            <input
              type="text"
              required
              value={userId}
              onChange={(e) =>
                setUserId(e.target.value)
              }
              placeholder="Enter MongoDB User ID"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        )}

        {/* Submit Button */}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Send Notification
            </>
          )}
        </button>

      </form>

    </div>
  );
}