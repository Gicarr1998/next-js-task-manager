"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const statuses = ["all", "pending", "completed"] as const;

export default function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const status = searchParams.get("status") ?? "all";
  const sort = searchParams.get("sort") ?? "newest";
  const hasFilters = Boolean(searchParams.get("search") || searchParams.get("status") || searchParams.get("sort"));

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && !(key === "sort" && value === "newest")) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1");
    router.push(`/dashboard?${params.toString()}`);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) { event.preventDefault(); updateParams({ search }); }
  function clearFilters() { setSearch(""); router.push("/dashboard"); }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-900/5 sm:p-5">
      <div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold">Find your focus</p>{hasFilters && <button type="button" onClick={clearFilters} className="text-sm font-semibold text-[#52735e] hover:text-[#1e2933]">Clear filters</button>}</div>
      <form onSubmit={handleSearch} className="flex gap-2"><div className="relative flex-1"><span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">⌕</span><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your tasks" className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-[#6a9077] focus:ring-4 focus:ring-[#e8f1e9]" /></div><button type="submit" className="rounded-xl bg-[#1e2933] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#33414c]">Search</button></form>
      <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex flex-wrap gap-2" aria-label="Task status filters">{statuses.map((item) => <button key={item} type="button" onClick={() => updateParams({ status: item })} className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${status === item ? "bg-[#1e2933] text-white shadow-sm" : "bg-[#f7f8f7] text-slate-600 hover:bg-[#e8f1e9]"}`}>{item === "all" ? "All tasks" : item}</button>)}</div><details className="group relative"><summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#bcd0c1] [&::-webkit-details-marker]:hidden"><span className="text-slate-400">Sort</span>{sort === "newest" ? "Newest first" : "Oldest first"}<span className="text-xs text-slate-400 transition group-open:rotate-180">⌄</span></summary><div className="absolute right-0 z-20 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10"><p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Order tasks</p>{(["newest", "oldest"] as const).map((option) => <button key={option} type="button" onClick={() => updateParams({ sort: option })} className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${sort === option ? "bg-[#e8f1e9] text-[#52735e]" : "text-slate-700 hover:bg-slate-50"}`}><span>{option === "newest" ? "Newest first" : "Oldest first"}</span><span className={sort === option ? "opacity-100" : "opacity-0"}>✓</span></button>)}</div></details></div>
    </section>
  );
}
