"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function SignupForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    /*
     * If email confirmation is enabled in Supabase,
     * the user may not have a session yet.
     */
    if (!data.session) {
      router.push(
        "/login?message=Check%20your%20email%20to%20confirm%20your%20account",
      );

      router.refresh();
      return;
    }

    /*
     * Email confirmation is disabled,
     * so the user is logged in immediately.
     */
    router.push("/dashboard?message=Account%20created%20successfully");

    router.refresh();
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfaf8] p-6">
      <div className="absolute -right-24 bottom-10 size-80 rounded-full bg-[#e2efe4] blur-3xl" />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3 text-lg font-semibold tracking-tight"><span className="grid size-9 place-items-center rounded-xl bg-[#1e2933] text-sm font-bold text-white">T</span> Taskflow</Link>
        <form
          onSubmit={handleSignup}
          className="rounded-[1.5rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/5 sm:p-8"
        >
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63816d]">Start simply</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Create your workspace.</h1>

            <p className="mt-2 text-sm text-slate-500">
              Bring clarity to the work ahead.
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
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  minLength={6}
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
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </div>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#52735e] hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
