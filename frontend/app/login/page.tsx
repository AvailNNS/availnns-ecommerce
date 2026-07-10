"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      if (!data?.success) {
        throw new Error(data?.message || "Login failed");
      }

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow"
      >
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-3"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-3"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          disabled={loading}
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}