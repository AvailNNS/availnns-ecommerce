"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function useAdminAuth() {

  const router = useRouter();

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const checkAdmin = () => {

      const user = localStorage.getItem("user");


      // User login না থাকলে
      if (!user) {

        router.push("/admin/login");

        return;

      }


      try {

        const admin = JSON.parse(user);


        // Admin role check
        if (admin.role !== "admin") {

          router.push("/admin/login");

          return;

        }


        // Admin valid
        setLoading(false);


      } catch (error) {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        router.push("/admin/login");

      }

    };


    checkAdmin();


  }, [router]);



  return {
    loading,
  };

}