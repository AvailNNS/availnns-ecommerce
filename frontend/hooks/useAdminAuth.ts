"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAdminAuth() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const checkAdmin = () => {

      try {

        const userData =
          localStorage.getItem("user");

        const token =
          localStorage.getItem("token");

        if (!userData || !token) {

          setLoading(false);

          router.replace("/admin/login");

          return;

        }

        const user =
          JSON.parse(userData);

        if (user.role !== "admin") {

          localStorage.removeItem("user");
          localStorage.removeItem("token");

          setLoading(false);

          router.replace("/admin/login");

          return;

        }

        setLoading(false);

      } catch (error) {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setLoading(false);

        router.replace("/admin/login");

      }

    };

    checkAdmin();

  }, [router]);

  return {
    loading,
  };

}