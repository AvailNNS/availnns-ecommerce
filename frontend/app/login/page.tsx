"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShoppingBag,
} from "lucide-react";
import {loginUser} from "@/services/auth.service";

import api from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.data.user)
      );

      router.push("/");
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
    <div className="min-h-screen grid lg:grid-cols-2 bg-gray-100">
      {/* Left Side */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-black text-white px-10">
        <ShoppingBag size={60} />

        <h1 className="mt-6 text-5xl font-bold">
          AvailNNS
        </h1>

        <p className="mt-4 max-w-md text-center text-lg text-gray-300">
          Welcome to the professional e-commerce platform.
          Manage your products, orders and customers easily.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center px-6 py-10">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
        >
          <h2 className="text-3xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-gray-500">
            Sign in to your account
          </p>

          {error && (
            <div className="mt-5 rounded-lg bg-red-100 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="relative mt-6">
            <Mail
              size={20}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-4 outline-none transition focus:border-black"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 py-3 pl-11 pr-12 outline-none transition focus:border-black"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
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

          {/* Remember */}
          <div className="mt-5 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Login"}
          </button>

          {/* Register */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}