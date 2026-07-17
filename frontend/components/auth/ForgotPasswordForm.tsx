"use client";

import { useState } from "react";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import api from "@/services/api";

const schema = z.object({
  email: z
    .string()
    .email("Enter a valid email"),
});

type FormData =
  z.infer<typeof schema>;

export default function ForgotPasswordForm() {

  const [loading,setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm<FormData>({
    resolver:zodResolver(schema),
  });

  const onSubmit = async (
    data:FormData
  ) => {

    try {

      setLoading(true);

      await api.post(
        "/auth/forgot-password",
        data
      );

      toast.success(
        "Password reset link sent"
      );

    } catch (error:any) {

      toast.error(
        error?.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >

      <div>

        <label className="text-sm font-medium">
          Email Address
        </label>

        <input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
          className="
          mt-2
          w-full
          rounded-2xl
          border
          px-4
          py-3
          "
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}

      </div>

      <button
        type="submit"
        disabled={loading}
        className="
        w-full
        bg-black
        text-white
        py-3
        rounded-2xl
        font-semibold
        "
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Sending...
          </span>
        ) : (
          "Send Reset Link"
        )}
      </button>

      <div className="text-center">

        <Link
          href="/login"
          className="text-sm font-medium"
        >
          Back to Login
        </Link>

      </div>

    </form>
  );
}