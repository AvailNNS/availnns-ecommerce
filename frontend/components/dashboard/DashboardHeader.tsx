"use client";

import Image from "next/image";
import { User, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
    isVerified?: boolean;
  };
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const isVerified = user?.isVerified ?? true;

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 sm:p-6 mb-6 overflow-hidden transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        
        {/* User Info Section */}
        <div className="flex items-center gap-4 sm:gap-5">
          {/* Avatar Container */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200/80 overflow-hidden shadow-inner">
            {user?.avatar ? (
              <Image
                src={user.avatar}
                alt={user?.name || "User Avatar"}
                fill
                sizes="(max-width: 640px) 56px, 64px"
                unoptimized
                className="object-cover"
              />
            ) : (
              <User size={28} className="text-slate-400" />
            )}
          </div>

          {/* User Text Details */}
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight truncate">
                Welcome back, {user?.name || "Customer"}
              </h1>
              <Sparkles size={18} className="text-amber-500 fill-amber-500 shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-slate-500 font-normal truncate">
              {user?.email || "Manage your preferences and track your orders"}
            </p>
          </div>
        </div>

        {/* Account Status Badge */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/70 rounded-xl px-4 py-2.5 shrink-0 self-start sm:self-auto">
          <div className={`p-1.5 rounded-lg shrink-0 ${isVerified ? "bg-emerald-100 text-emerald-600" : "bg-slate-200 text-slate-600"}`}>
            {isVerified ? <CheckCircle2 size={16} /> : <ShieldCheck size={16} />}
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase block leading-none mb-0.5">
              Account Status
            </span>
            <span className={`text-xs font-bold leading-none ${isVerified ? "text-emerald-700" : "text-slate-700"}`}>
              {isVerified ? "Verified Member" : "Standard Account"}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
