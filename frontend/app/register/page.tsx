"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShoppingBag,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://effective-telegram-qvvpg7qv66p9h9r79-5000.app.github.dev/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      router.push("/login");

    } catch (err: any) {
      setError(
        err.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">

      {/* Left */}

      <div className="hidden lg:flex flex-col items-center justify-center bg-black text-white px-10">

        <ShoppingBag size={60} />

        <h1 className="mt-6 text-5xl font-bold">
          AvailNNS
        </h1>

        <p className="mt-4 max-w-md text-center text-lg text-gray-300">
          Create your account and start
          shopping with thousands of
          amazing products.
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center justify-center px-6 py-10">

        <form
          onSubmit={handleRegister}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        >

          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-gray-500">
            Join AvailNNS today
          </p>

          {error && (
            <div className="mt-5 rounded-lg bg-red-100 p-3 text-red-600">
              {error}
            </div>
          )}

          {/* Name */}

          <div className="relative mt-6">

            <User
              size={20}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              name="name"
              placeholder="Full Name"
              className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none focus:border-black"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>

          {/* Email */}

          <div className="relative mt-5">

            <Mail
              size={20}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full rounded-lg border py-3 pl-11 pr-4 outline-none focus:border-black"
              value={form.email}
              onChange={handleChange}
              required
            />

          </div>

          {/* Password */}

          <div className="relative mt-5">

            <Lock
              size={20}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              className="w-full rounded-lg border py-3 pl-11 pr-12 outline-none focus:border-black"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>

          </div>

          {/* Register */}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

          {/* Login */}

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </Link>
          </div>

        </form>

      </div>

    </div>
  );
}