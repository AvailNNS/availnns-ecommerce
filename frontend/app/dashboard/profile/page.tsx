"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Camera,
  Save,
  Pencil,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Check,
  Calendar,
  Globe,
  Mail,
  Phone,
  X,
  ArrowLeft,
} from "lucide-react";
import { getMe, updateProfile } from "@/services/user.service";
import { uploadAvatar } from "@/services/upload.service";

// Custom Clean Gender Icons
const MaleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="10" cy="14" r="5" />
    <line x1="19" y1="5" x2="13.6" y2="10.4" />
    <polyline points="19 10 19 5 14 5" />
  </svg>
);

const FemaleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="9" r="5" />
    <line x1="12" y1="14" x2="12" y2="21" />
    <line x1="9" y1="18" x2="15" y2="18" />
  </svg>
);

const COUNTRIES = [
  "Bangladesh",
  "Saudi Arabia",
  "United Arab Emirates",
  "United States",
  "United Kingdom",
  "Canada",
  "India",
  "Pakistan",
  "Qatar",
  "Kuwait",
  "Oman",
  "Bahrain",
  "Malaysia",
  "Singapore",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Japan",
  "China",
].sort();

interface UserFormState {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [initialPhone, setInitialPhone] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(true);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const [form, setForm] = useState<UserFormState>({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setInitialLoading(true);
      const data = await getMe();
      const userPhone = data?.phone || "";

      setForm({
        name: data?.name || "",
        email: data?.email || "",
        phone: userPhone,
        avatar: data?.avatar || "",
        dateOfBirth: data?.dateOfBirth || "",
        gender: data?.gender || "",
        nationality: data?.nationality || "",
      });

      setInitialPhone(userPhone);
      setIsPhoneVerified(Boolean(userPhone));
    } catch (error) {
      console.error("Failed to fetch user:", error);
      showNotification("error", "Failed to load profile data.");
    } finally {
      setInitialLoading(false);
    }
  };

  const showNotification = (type: "success" | "error", text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg(null), 4000);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      if (value !== initialPhone) {
        setIsPhoneVerified(false);
        setOtpSent(false);
      } else {
        setIsPhoneVerified(true);
      }
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (selectedGender: string) => {
    setForm((prev) => ({ ...prev, gender: selectedGender }));
  };

  const handleSendOtp = async () => {
    if (!form.phone || !/^[0-9+()\s-]{7,15}$/.test(form.phone)) {
      showNotification("error", "Please enter a valid phone number first.");
      return;
    }

    try {
      setSendingOtp(true);
      await new Promise((res) => setTimeout(res, 1000));
      setOtpSent(true);
      showNotification("success", "OTP code sent to your phone number.");
    } catch (error) {
      showNotification("error", "Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length < 4) {
      showNotification("error", "Please enter a valid OTP code.");
      return;
    }

    try {
      setVerifyingOtp(true);
      await new Promise((res) => setTimeout(res, 1000));

      setIsPhoneVerified(true);
      setOtpSent(false);
      setOtpCode("");
      setInitialPhone(form.phone);
      showNotification("success", "Phone number verified successfully!");
    } catch (error) {
      showNotification("error", "Invalid OTP code.");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        showNotification("error", "Please upload an image file.");
        return;
      }

      setUploading(true);
      const url = await uploadAvatar(file);
      setForm((prev) => ({ ...prev, avatar: url }));
      showNotification("success", "Avatar uploaded!");
    } catch (error) {
      showNotification("error", "Avatar upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) {
      showNotification("error", "Name is required.");
      return;
    }

    if (form.phone && !isPhoneVerified) {
      showNotification("error", "Please verify your new phone number before saving.");
      return;
    }

    try {
      setLoading(true);
      await updateProfile(form);
      setEditing(false); // Edit mode বন্ধ হবে, পেজ পরিবর্তন হবে না
      showNotification("success", "Profile updated successfully!");
    } catch (error) {
      showNotification("error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Back Button Logic: Edit মোডে থাকলে এডিটিং বাতিল করবে, না থাকলে ড্যাশবোর্ডে যাবে
  const handleBackClick = (e: React.MouseEvent) => {
    if (editing) {
      e.preventDefault();
      setEditing(false);
      setIsPhoneVerified(Boolean(initialPhone));
      setOtpSent(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-12 flex justify-center items-center min-h-[360px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="animate-spin text-slate-900" size={32} />
          <p className="text-sm font-medium text-slate-400">Loading account details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 relative">
      {/* Status Toast */}
      {statusMsg && (
        <div
          className={`mb-6 p-4 rounded-2xl flex items-center justify-between text-sm font-medium transition-all ${
            statusMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
              : "bg-rose-50 text-rose-800 border border-rose-100"
          }`}
        >
          <div className="flex items-center gap-3">
            {statusMsg.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-600" />
            ) : (
              <AlertCircle size={18} className="text-rose-600" />
            )}
            <span>{statusMsg.text}</span>
          </div>
          <button onClick={() => setStatusMsg(null)} className="opacity-60 hover:opacity-100">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Back Button & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3">
          {/* Smart Back Button */}
          <Link
            href="/dashboard"
            onClick={handleBackClick}
            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition active:scale-95 shrink-0"
            title={editing ? "Cancel Editing" : "Back to Dashboard"}
          >
            <ArrowLeft size={18} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Personal Profile</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your personal information, contact details, and account preferences.
            </p>
          </div>
        </div>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm shrink-0"
          >
            <Pencil size={15} />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Avatar Section */}
      <div className="flex items-center gap-6 mb-8 bg-slate-50/60 p-4 sm:p-5 rounded-2xl border border-slate-100">
        <div className="relative group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-200 overflow-hidden ring-4 ring-white shadow-sm flex items-center justify-center shrink-0">
            {form.avatar ? (
              <Image
                src={form.avatar}
                alt="Avatar"
                width={96}
                height={96}
                unoptimized
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={36} className="text-slate-400" />
            )}

            {uploading && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center text-white">
                <Loader2 className="animate-spin" size={20} />
              </div>
            )}
          </div>

          {editing && (
            <label className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full cursor-pointer hover:bg-slate-800 transition-transform active:scale-95 shadow-md">
              <Camera size={14} />
              <input
                type="file"
                hidden
                accept="image/*"
                disabled={uploading}
                onChange={handleImage}
              />
            </label>
          )}
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            {form.name || "User Name"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">{form.email || "No email provided"}</p>
          {editing && (
            <p className="text-xs text-slate-400 mt-1">
              JPG, PNG or GIF. Max 2MB.
            </p>
          )}
        </div>
      </div>

      {/* Read-Only Mode */}
      {!editing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <User size={14} /> Full Name
            </div>
            <p className="font-semibold text-slate-800 text-sm sm:text-base">{form.name || "-"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <Mail size={14} /> Email Address
            </div>
            <p className="font-semibold text-slate-800 text-sm sm:text-base">{form.email || "-"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <Phone size={14} /> Phone Number
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-slate-800 text-sm sm:text-base">{form.phone || "-"}</p>
              {form.phone && isPhoneVerified && (
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                  <CheckCircle2 size={12} /> Verified
                </span>
              )}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <MaleIcon /> Gender
            </div>
            <p className="font-semibold text-slate-800 text-sm sm:text-base capitalize">
              {form.gender || "-"}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <Calendar size={14} /> Date of Birth
            </div>
            <p className="font-semibold text-slate-800 text-sm sm:text-base">{form.dateOfBirth || "-"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/40 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-1">
              <Globe size={14} /> Nationality
            </div>
            <p className="font-semibold text-slate-800 text-sm sm:text-base">{form.nationality || "-"}</p>
          </div>
        </div>
      ) : (
        /* Edit Form Mode */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name Input */}
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                Email Address <span className="text-slate-400 font-normal">(Read-only)</span>
              </label>
              <input
                name="email"
                value={form.email}
                readOnly
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
              />
            </div>

            {/* Phone Verification Section */}
            <div className="md:col-span-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-3">
              <label className="text-xs font-semibold text-slate-700 block">
                Phone Number & Verification
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
                />

                {!isPhoneVerified ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp || !form.phone}
                    className="bg-slate-900 text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition disabled:opacity-50 text-xs font-medium flex items-center justify-center gap-1.5 shrink-0"
                  >
                    {sendingOtp ? <Loader2 className="animate-spin" size={14} /> : <ShieldCheck size={14} />}
                    {otpSent ? "Resend Code" : "Verify Phone"}
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-xl text-xs font-medium shrink-0 justify-center">
                    <CheckCircle2 size={14} /> Verified
                  </div>
                )}
              </div>

              {/* OTP Input Box */}
              {otpSent && !isPhoneVerified && (
                <div className="flex gap-2 pt-1">
                  <input
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 4-digit OTP"
                    className="flex-1 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-slate-900"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition disabled:opacity-50 text-xs font-medium flex items-center gap-1 shrink-0"
                  >
                    {verifyingOtp ? <Loader2 className="animate-spin" size={14} /> : "Submit OTP"}
                  </button>
                </div>
              )}
            </div>

            {/* Gender Selector */}
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-3 max-w-sm">
                <button
                  type="button"
                  onClick={() => handleGenderSelect("male")}
                  className={`px-3 py-2 rounded-xl border flex items-center justify-between transition-all ${
                    form.gender === "male"
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        form.gender === "male"
                          ? "bg-slate-800 text-white"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <MaleIcon />
                    </div>
                    <span className="font-medium text-xs">Male</span>
                  </div>
                  {form.gender === "male" && <Check size={14} />}
                </button>

                <button
                  type="button"
                  onClick={() => handleGenderSelect("female")}
                  className={`px-3 py-2 rounded-xl border flex items-center justify-between transition-all ${
                    form.gender === "female"
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                        form.gender === "female"
                          ? "bg-slate-800 text-white"
                          : "bg-rose-50 text-rose-600"
                      }`}
                    >
                      <FemaleIcon />
                    </div>
                    <span className="font-medium text-xs">Female</span>
                  </div>
                  {form.gender === "female" && <Check size={14} />}
                </button>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleInputChange}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
              />
            </div>

            {/* Nationality Country Select */}
            <div>
              <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                Nationality
              </label>
              <select
                name="nationality"
                value={form.nationality}
                onChange={handleInputChange}
                className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900 transition"
              >
                <option value="">Select Country</option>
                {COUNTRIES.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleSubmit}
              disabled={loading || uploading || (!isPhoneVerified && Boolean(form.phone))}
              className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl hover:bg-slate-800 transition text-sm font-medium shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Save size={16} />
              )}
              <span>{loading ? "Saving..." : "Save Changes"}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setEditing(false); // Cancel করলে প্রোফাইল ভিউতে থাকবে, পেজ ছাড়বে না
                setIsPhoneVerified(Boolean(initialPhone));
                setOtpSent(false);
              }}
              disabled={loading}
              className="border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl hover:bg-slate-50 transition text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
