"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
          return;
        }

        const { data } = await api.get("/users/me");

        if (!data?.success) {
          throw new Error(data?.message || "Failed to load profile");
        }

        setUser(data.user);

      } catch (error) {
        console.log(error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    getUser();

  }, [router]);


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }


  return (
    <div className="mx-auto max-w-5xl px-6 py-10">

      <h1 className="mb-8 text-3xl font-bold">
        My Dashboard
      </h1>


      <div className="rounded-xl border bg-white p-6 shadow">

        <h2 className="mb-4 text-xl font-semibold">
          Profile Information
        </h2>


        <div className="space-y-3">

          <p>
            <span className="font-medium">
              Name:
            </span>{" "}
            {user?.name}
          </p>


          <p>
            <span className="font-medium">
              Email:
            </span>{" "}
            {user?.email}
          </p>


          <p>
            <span className="font-medium">
              Role:
            </span>{" "}
            {user?.role}
          </p>

        </div>

      </div>


      <div className="mt-6 grid gap-4 md:grid-cols-3">

        <div className="rounded-xl border p-5">
          <h3 className="font-semibold">
            My Orders
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            View your orders
          </p>
        </div>


        <div className="rounded-xl border p-5">
          <h3 className="font-semibold">
            Wishlist
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Your favorite products
          </p>
        </div>


        <div className="rounded-xl border p-5">
          <h3 className="font-semibold">
            Settings
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Update profile & password
          </p>
        </div>

      </div>

    </div>
  );
}