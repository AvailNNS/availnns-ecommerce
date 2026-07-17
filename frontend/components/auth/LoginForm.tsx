"use client";

import { useState } from "react";

import Link from "next/link";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";

const loginSchema = z.object({
  email: z
    .string()
    .email("Enter a valid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type LoginFormData =
  z.infer<typeof loginSchema>;

export default function LoginForm() {

  const { login } = useAuth();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver:
      zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {

    try {

      setLoading(true);

      await login(data);

      toast.success(
        "Login successful"
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data?.message ||
          "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-5"
    >

      {/* Email */}

      <div>

        <label className="text-sm font-medium">
          Email Address
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="
          mt-2
          w-full
          rounded-2xl
          border
          px-4
          py-3
          outline-none
          focus:ring-2
          focus:ring-black
          "
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}

      </div>

      {/* Password */}

      <div>

        <label className="text-sm font-medium">
          Password
        </label>

        <div className="relative mt-2">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Enter password"
            {...register("password")}
            className="
            w-full
            rounded-2xl
            border
            px-4
            py-3
            pr-12
            outline-none
            focus:ring-2
            focus:ring-black
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            "
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors.password
                .message
            }
          </p>
        )}

      </div>

      {/* Remember + Forgot */}

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"
          />

          Remember Me

        </label>

        <Link
          href="/forgot-password"
          className="
          text-sm
          font-medium
          hover:underline
          "
        >
          Forgot Password?
        </Link>

      </div>

      {/* Submit */}

      <button
        type="submit"
        disabled={loading}
        className="
        w-full
        rounded-2xl
        bg-black
        text-white
        py-3
        font-semibold
        hover:opacity-90
        transition
        disabled:opacity-50
        "
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Signing In...
          </span>
        ) : (
          "Sign In"
        )}
      </button>

      <div className="text-center text-sm">

        Don't have an account?

        <Link
          href="/register"
          className="
          ml-2
          font-semibold
          hover:underline
          "
        >
          Create Account
        </Link>

      </div>

    </form>
  );
}