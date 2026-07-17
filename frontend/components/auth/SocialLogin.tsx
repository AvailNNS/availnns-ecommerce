"use client";

import { useState } from "react";

import { Loader2 } from "lucide-react";

import { FcGoogle } from "react-icons/fc";

import { FaFacebookF } from "react-icons/fa";

export default function SocialLogin() {

  const [loading, setLoading] =
    useState<
      "google" |
      "facebook" |
      null
    >(null);

  const handleGoogleLogin =
    async () => {

      try {

        setLoading("google");

        // Google OAuth

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(null);

      }

    };

  const handleFacebookLogin =
    async () => {

      try {

        setLoading("facebook");

        // Facebook OAuth

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(null);

      }

    };

  return (

    <div className="grid grid-cols-2 gap-4">

      {/* Google */}

      <button
        onClick={handleGoogleLogin}
        disabled={loading !== null}
        className="
        flex
        items-center
        justify-center
        gap-3
        py-3
        rounded-2xl
        border
        border-slate-200
        bg-white
        hover:bg-slate-50
        hover:shadow-md
        transition-all
        font-medium
        "
      >
        {loading === "google" ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <FcGoogle size={20} />
        )}

        Google
      </button>

      {/* Facebook */}

      <button
        onClick={handleFacebookLogin}
        disabled={loading !== null}
        className="
        flex
        items-center
        justify-center
        gap-3
        py-3
        rounded-2xl
        border
        border-slate-200
        bg-white
        hover:bg-slate-50
        hover:shadow-md
        transition-all
        font-medium
        "
      >
        {loading === "facebook" ? (
          <Loader2
            size={18}
            className="animate-spin"
          />
        ) : (
          <FaFacebookF
            size={18}
            className="text-blue-600"
          />
        )}

        Facebook
      </button>

    </div>

  );

}