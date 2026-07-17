"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {

    if (
      !loading &&
      !user
    ) {

      router.replace(
        "/login"
      );

    }

  }, [
    user,
    loading,
    router,
  ]);

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="w-10 h-10 border-4 border-slate-200 border-t-black rounded-full animate-spin" />

      </div>
    );

  }

  if (!user) {
    return null;
  }

  return (
    <>
      {children}
    </>
  );

}