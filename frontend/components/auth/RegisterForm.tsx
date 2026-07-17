"use client";

import { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";

import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";

const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name is required"),

    email: z
      .string()
      .email("Invalid email"),

    password: z
      .string()
      .min(
        6,
        "Password must be at least 6 characters"
      ),

    confirmPassword: z
      .string(),

    terms: z
      .boolean()
      .refine(
        (val) => val === true,
        {
          message:
            "Accept terms and conditions",
        }
      ),
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

type RegisterFormData =
  z.infer<
    typeof registerSchema
  >;

export default function RegisterForm() {

  const { register: signup } =
    useAuth();

  const [loading, setLoading] =
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
    watch,
    formState: { errors },
  } = useForm<
    RegisterFormData
  >({
    resolver:
      zodResolver(
        registerSchema
      ),
  });

  const password =
    watch("password");

  const getStrength = () => {

    if (!password)
      return 0;

    if (
      password.length < 6
    )
      return 1;

    if (
      password.length < 8
    )
      return 2;

    if (
      password.length < 12
    )
      return 3;

    return 4;
  };

  const strength =
    getStrength();

  const onSubmit = async (
    data: RegisterFormData
  ) => {

    try {

      setLoading(true);

      await signup({
        name: data.name,
        email: data.email,
        password:
          data.password,
      });

      toast.success(
        "Account created successfully"
      );

    } catch (error: any) {

      toast.error(
        error?.response?.data
          ?.message ||
          "Registration failed"
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

      {/* Name */}

      <div>

        <label className="text-sm font-medium">
          Full Name
        </label>

        <input
          type="text"
          {...register(
            "name"
          )}
          className="
          mt-2
          w-full
          rounded-2xl
          border
          px-4
          py-3
          "
          placeholder="John Doe"
        />

        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors.name
                .message
            }
          </p>
        )}

      </div>

      {/* Email */}

      <div>

        <label className="text-sm font-medium">
          Email
        </label>

        <input
          type="email"
          {...register(
            "email"
          )}
          className="
          mt-2
          w-full
          rounded-2xl
          border
          px-4
          py-3
          "
          placeholder="you@example.com"
        />

        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {
              errors.email
                .message
            }
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

        {/* Strength */}

        <div className="flex gap-2 mt-3">

          {[1,2,3,4].map(
            (item) => (
              <div
                key={item}
                className={`
                h-2
                flex-1
                rounded-full
                ${
                  strength >=
                  item
                    ? "bg-green-500"
                    : "bg-gray-200"
                }
                `}
              />
            )
          )}

        </div>

      </div>

      {/* Confirm Password */}

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

      {/* Terms */}

      <label className="flex items-start gap-2 text-sm">

        <input
          type="checkbox"
          {...register(
            "terms"
          )}
        />

        <span>
          I agree to the Terms &
          Conditions
        </span>

      </label>

      {errors.terms && (
        <p className="text-red-500 text-sm">
          {
            errors.terms
              .message
          }
        </p>
      )}

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
        "
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2
              size={18}
              className="animate-spin"
            />
            Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>

      <div className="text-center text-sm">

        Already have an account?

        <Link
          href="/login"
          className="ml-2 font-semibold"
        >
          Sign In
        </Link>

      </div>

    </form>
  );
}