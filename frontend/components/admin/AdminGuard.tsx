"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
  usePathname,
} from "next/navigation";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const pathname =
    usePathname();

  const [checking, setChecking] =
    useState(true);

  useEffect(() => {

    const check = () => {

      try {

        const user =
          localStorage.getItem("user");

        const token =
          localStorage.getItem("token");

        if (!user || !token) {

          setChecking(false);

          if (
            pathname !==
            "/admin/login"
          ) {

            router.replace(
              "/admin/login"
            );

          }

          return;

        }

        const data =
          JSON.parse(user);

        if (
          data.role !==
          "admin"
        ) {

          localStorage.removeItem(
            "user"
          );

          localStorage.removeItem(
            "token"
          );

          setChecking(false);

          router.replace(
            "/admin/login"
          );

          return;

        }

        setChecking(false);

      } catch {

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "token"
        );

        setChecking(false);

        router.replace(
          "/admin/login"
        );

      }

    };

    check();

  }, [
    router,
    pathname,
  ]);

  if (checking) {

    return (

      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-zinc-100
        "
      >

        <div
          className="
          flex
          items-center
          gap-3
          text-gray-600
          "
        >

          <div
            className="
            h-6
            w-6
            border-2
            border-black
            border-t-transparent
            rounded-full
            animate-spin
            "
          />

          <span>
            Checking Admin Access...
          </span>

        </div>

      </div>

    );

  }

  return (

    <div
      className="
      min-h-screen
      bg-zinc-100
      flex
      "
    >

      <AdminSidebar />

      <div
        className="
        flex-1
        lg:ml-72
        "
      >

        <AdminHeader />

        <main
          className="
          p-4
          sm:p-6
          lg:p-8
          "
        >
          {children}
        </main>

      </div>

    </div>

  );

}