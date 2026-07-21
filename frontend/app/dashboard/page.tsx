"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  RotateCcw,
  Wallet,
  Heart,
  MapPin,
  ShieldCheck,
  QrCode,
  ChevronRight,
  User as UserIcon,
  Loader2,
  AlertCircle,
  RefreshCw,
  Globe,
  Bell,
  LogOut,
} from "lucide-react";
import { getUserDashboard } from "@/services/user.service";

interface UserData {
  name?: string;
  email?: string;
  avatar?: string;
}

interface DashboardStats {
  totalOrders?: number;
  pendingOrders?: number;
  deliveredOrders?: number;
  totalSpent?: number;
  activeReturns?: number;
  credits?: number;
  wishlistCount?: number;
}

interface DashboardResponse {
  user?: UserData;
  orders?: any[];
  stats?: DashboardStats;
}

export default function DashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getUserDashboard();
      setData(result);
    } catch (err: any) {
      console.error("Dashboard Error:", err?.response?.data || err.message);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Logout Functionality
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      // Clear authentication tokens/data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Redirect to login page
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-slate-900" size={28} />
        <p className="text-xs font-medium text-slate-500 tracking-wide uppercase">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[300px] flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 text-center space-y-3 shadow-xl shadow-slate-200/50 max-w-sm w-full">
          <AlertCircle size={32} className="mx-auto text-rose-500" />
          <p className="text-xs font-semibold text-slate-700">{error}</p>
          <button
            onClick={loadDashboard}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-medium hover:bg-slate-800 transition active:scale-95 shadow-md shadow-slate-900/10"
          >
            <RefreshCw size={14} /> Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const { user, stats } = data;

  const accountLinks = [
    { label: "Addresses", href: "/dashboard/address", icon: MapPin },
    { label: "Security", href: "/dashboard/security", icon: ShieldCheck },
    { label: "Country", href: "/dashboard/country", icon: Globe },
    { label: "Notification", href: "/dashboard/notifications", icon: Bell },
    { label: "QR Code", href: "/dashboard/qr-code", icon: QrCode },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4 font-sans text-slate-900 antialiased pb-8">
      
      {/* 1. USER PROFILE SECTION */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-900 to-slate-700 flex items-center justify-center overflow-hidden shrink-0 shadow-md p-0.5">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user?.name || "User Profile"}
                fill
                unoptimized
                className="object-cover rounded-[14px]"
              />
            ) : (
              <UserIcon size={24} className="text-slate-100" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {user?.name || "Customer"}
              </h2>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                Member
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              {user?.email || "user@email.com"}
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/profile"
          className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl hover:bg-slate-100 hover:text-slate-900 transition active:scale-95 shadow-2xs"
        >
          Edit Profile
        </Link>
      </div>

      {/* 2. GRID STAT CARDS */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Orders Card */}
        <Link
          href="/dashboard/orders"
          className="group bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[105px]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
              Orders
            </span>
            <div className="p-2 bg-slate-50 text-slate-700 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <Package size={18} />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-lg font-extrabold text-slate-900">
              {stats?.totalOrders !== undefined ? stats.totalOrders : 0}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">Total Orders placed</p>
          </div>
        </Link>

        {/* Returns Card */}
        <div className="group bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[105px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
              Returns
            </span>
            <div className="p-2 bg-slate-50 text-slate-700 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <RotateCcw size={18} />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-lg font-extrabold text-slate-900">
              {stats?.activeReturns || 0}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">Active Requests</p>
          </div>
        </div>

        {/* Credits / Total Spent Card */}
        <div className="group bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[105px]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
              Total Spent
            </span>
            <div className="p-2 bg-slate-50 text-slate-700 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
              <Wallet size={18} />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-lg font-extrabold text-slate-900">
              ${Number(stats?.credits ?? stats?.totalSpent ?? 0).toFixed(2)}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">Lifetime Spend</p>
          </div>
        </div>

        {/* Wishlist Card */}
        <Link
          href="/dashboard/wishlist"
          className="group bg-white p-4 rounded-2xl border border-slate-200/70 shadow-2xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[105px]"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-900 transition-colors">
              Wishlist
            </span>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <Heart size={18} />
            </div>
          </div>
          <div>
            <p className="text-base sm:text-lg font-extrabold text-slate-900">
              {stats?.wishlistCount || 0}
            </p>
            <p className="text-[11px] text-slate-400 font-medium">Saved Items</p>
          </div>
        </Link>
      </div>

      {/* 3. MY ACCOUNT LIST & LOGOUT */}
      <div className="space-y-2 pt-2">
        <h3 className="text-xs font-bold tracking-wider uppercase text-slate-400 px-1">
          Account Settings
        </h3>

        <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {accountLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                href={item.href}
                className="p-3.5 sm:p-4 flex items-center justify-between hover:bg-slate-50/80 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2 bg-slate-100/70 text-slate-700 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Icon size={16} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                    {item.label}
                  </span>
                </div>
                <ChevronRight size={16} className="text-slate-300 group-hover:text-slate-600 group-hover:translate-x-0.5 transition-all" />
              </Link>
            );
          })}

          {/* Logout Option */}
          <button
            onClick={handleLogout}
            className="w-full p-3.5 sm:p-4 flex items-center justify-between hover:bg-rose-50/60 transition cursor-pointer group text-left"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-rose-50 text-rose-600 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <LogOut size={16} />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-rose-600 group-hover:text-rose-700">
                Log Out
              </span>
            </div>
            <ChevronRight size={16} className="text-rose-300 group-hover:text-rose-600 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>
      </div>

    </div>
  );
}
