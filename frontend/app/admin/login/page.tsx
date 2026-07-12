"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";


export default function AdminLoginPage() {

  const router = useRouter();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);



  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    try {

      setLoading(true);
      setError("");



      const { data } = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );



      if (!data.success) {

        throw new Error(
          data.message || "Login failed"
        );

      }



      const user = data.data.user;



      // Admin role check

      if (user.role !== "admin") {

        setError(
          "You are not an admin"
        );

        return;

      }



      // Save auth data

      localStorage.setItem(
        "token",
        data.data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );



      // Redirect Admin Dashboard

      router.push("/admin");

      router.refresh();



    } catch (err: any) {


      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );


    } finally {

      setLoading(false);

    }

  };




  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      px-4
    ">


      <form
        onSubmit={handleLogin}
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-xl
          p-8
        "
      >


        <h1 className="
          text-3xl
          font-bold
          text-center
        ">
          Admin Login
        </h1>



        <p className="
          text-center
          text-gray-500
          mt-2
          mb-6
        ">
          Login to management panel
        </p>




        {error && (

          <div className="
            bg-red-100
            text-red-600
            p-3
            rounded-lg
            mb-5
            text-sm
          ">

            {error}

          </div>

        )}






        <input

          type="email"

          placeholder="Admin Email"

          className="
            w-full
            border
            rounded-lg
            p-3
            mb-4
            outline-none
            focus:border-black
          "

          value={email}

          onChange={(e)=>
            setEmail(e.target.value)
          }

          required

        />






        <input

          type="password"

          placeholder="Password"

          className="
            w-full
            border
            rounded-lg
            p-3
            mb-6
            outline-none
            focus:border-black
          "

          value={password}

          onChange={(e)=>
            setPassword(e.target.value)
          }

          required

        />







        <button

          type="submit"

          disabled={loading}

          className="
            w-full
            bg-black
            text-white
            py-3
            rounded-lg
            font-semibold
            hover:bg-gray-800
            transition
            disabled:opacity-50
          "

        >

          {
            loading
            ? "Logging in..."
            : "Admin Login"
          }


        </button>




      </form>


    </div>

  );

}