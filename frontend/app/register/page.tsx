"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      router.push("/login");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md space-y-4 rounded-xl border p-6 shadow"
      >
        <h1 className="text-2xl font-bold">
          Create Account
        </h1>

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <input
          name="name"
          placeholder="Name"
          className="w-full rounded border p-3"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded border p-3"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full rounded border p-3"
          value={form.password}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full rounded bg-black p-3 text-white"
        >
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
}