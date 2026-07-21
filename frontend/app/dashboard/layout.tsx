"use client";

import React from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans py-6 px-4 sm:px-6">
        <main className="max-w-2xl mx-auto w-full">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
