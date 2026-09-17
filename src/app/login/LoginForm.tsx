"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import SubmitButton from "@/app/dashboard/SubmitButton";

export default function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfaf8] p-6">
      <div className="absolute -left-24 top-10 size-80 rounded-full bg-[#e2efe4] blur-3xl" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3 text-lg font-semibold tracking-tight">
          <span className="grid size-9 place-items-center rounded-xl bg-[#1e2933] text-sm font-bold text-white">T</span> Taskflow
        </Link>
        <form
          onSubmit={handleLogin}
          className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-8"
        >
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63816d]">Welcome back</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">Your day, in focus.</h1>

            <p className="mt-2 text-sm text-slate-500">
              Log in to pick up where you left off.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-slate-200 px-3.5 py-3 outline-none transition focus:border-[#6a9077] focus:ring-4 focus:ring-[#e8f1e9]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your password"
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3 pr-20 outline-none transition focus:border-[#6a9077] focus:ring-4 focus:ring-[#e8f1e9]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-medium text-slate-500 hover:text-[#1e2933]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#1e2933] px-4 py-3 font-semibold text-white transition hover:bg-[#33414c] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Signup link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#52735e] hover:underline"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
