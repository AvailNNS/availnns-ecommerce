"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  KeyRound,
  Eye,
  EyeOff,
  Lock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import api from "@/services/api"; // আপনার আসল Axios instance

export default function SecurityPage() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Password Strength Logic
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "", score: 0, color: "" };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8 && /[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) && /[^A-Za-z0-9]/.test(pass)) score++;

    if (score === 1) return { label: "Weak", score: 33, color: "bg-rose-500" };
    if (score === 2) return { label: "Medium", score: 66, color: "bg-amber-500" };
    return { label: "Strong", score: 100, color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(formData.newPassword);

  // Real Backend API Call to Change Password
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      // ব্যাকএন্ডে রিয়েল API রিকোয়েস্ট
      const response = await api.put("/users/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      setSuccessMessage(
        response.data?.message || "Password updated successfully!"
      );
      
      // ইনপুট ফিল্ড ক্লিয়ার করা
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      console.error("Password Change Error:", err);
      // ব্যাকএন্ড থেকে আসা আসল এরর মেসেজ হ্যান্ডলিং
      setErrorMessage(
        err.response?.data?.message ||
          "Failed to update password. Please check your current password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 font-sans text-slate-900 antialiased p-4 sm:p-6">
      
      {/* 1. HEADER SECTION */}
      <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
        <Link
          href="/dashboard"
          className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition active:scale-95 shrink-0"
          title="Back to Dashboard"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Account Security
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your password and security settings.
          </p>
        </div>
      </div>

      {/* 2. PASSWORD CHANGE FORM */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 bg-slate-100 text-slate-800 rounded-xl">
            <KeyRound size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Change Password
            </h2>
            <p className="text-xs text-slate-500">
              Update your account password safely.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle size={16} className="text-rose-600 shrink-0" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          
          {/* Current Password */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
              Current Password *
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                required
                value={formData.currentPassword}
                onChange={(e) =>
                  setFormData({ ...formData, currentPassword: e.target.value })
                }
                placeholder="Enter current password"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-slate-900 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
              New Password *
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                required
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                placeholder="Enter new password"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-slate-900 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Password Strength Meter */}
            {formData.newPassword && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${strength.color}`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 font-medium">
                  Strength:{" "}
                  <span className="font-semibold text-slate-700">
                    {strength.label}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
              Confirm New Password *
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Re-enter new password"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 bg-white focus:outline-none focus:border-slate-900 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-800 transition active:scale-95 shadow-sm disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      {/* 3. SECURITY NOTICE */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-start gap-3">
        <ShieldCheck className="text-slate-600 shrink-0 mt-0.5" size={18} />
        <div className="text-xs text-slate-600 leading-relaxed">
          <p className="font-semibold text-slate-800">Security Recommendation</p>
          <p className="mt-0.5">
            Make sure your password is unique, contains uppercase letters, numbers, and symbols to ensure maximum protection for your account.
          </p>
        </div>
      </div>

    </div>
  );
}
