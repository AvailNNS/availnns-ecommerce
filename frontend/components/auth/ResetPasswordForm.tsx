"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import api from "@/services/api";

const schema = z
  .object({
    password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters"
      ),

    confirmPassword:
      z.string(),
  })
  .refine(
    (data) =>
      data.password ===
      data.confirmPassword,
    {
      path: [
        "confirmPassword",
      ],
      message:
        "Passwords do not match",
    }
  );

type FormData =
  z.infer<typeof schema>;

export default function ResetPasswordForm({
  token,
}: {
  token: string;
}) {

  const router =
    useRouter();

  const [loading,setLoading] =
    useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState:{errors},
  } = useForm<FormData>({
    resolver:
      zodResolver(schema),
  });

  const onSubmit = async (
    data:FormData
  ) => {

    try {

      setLoading(true);

      await api.post(
        `/auth/reset-password/${token}`,
        {
          password:
            data.password,
        }
      );

      toast.success(
        "Password updated successfully"
      );

      router.push("/login");

    } catch (error:any) {

      toast.error(
        error?.response?.data?.message ||
        "Reset failed"
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

      {/* Password */}

      <div>

        <label className="text-sm font-medium">
          New Password
        </label>

        <div className="relative mt-2">

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            {...register(
              "password"
            )}
            className="
            w-full
            rounded-2xl
            border
            px-4
            py-3
            pr-12
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
            {errors.password.message}
          </p>
        )}

      </div>

      {/* Confirm */}

      <div>

        <label className="text-sm font-medium">
          Confirm Password
        </label>

        <div className="relative mt-2">

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            {...register(
              "confirmPassword"
            )}
            className="
            w-full
            rounded-2xl
            border
            px-4
            py-3
            pr-12
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            "
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors
                .confirmPassword
                .message
            }
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
            Updating...
          </span>
        ) : (
          "Reset Password"
        )}
      </button>

    </form>

  );

}