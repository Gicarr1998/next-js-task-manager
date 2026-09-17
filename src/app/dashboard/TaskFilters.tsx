"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function TaskFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const status = searchParams.get("status") ?? "all";

  const sort = searchParams.get("sort") ?? "newest";

  function updateParams(updates: Record<string, string>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    params.set("page", "1");

    router.push(`/dashboard?${params.toString()}`);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    updateParams({
      search,
    });
  }

  return (
    <div className="mt-8 space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search tasks..."
          className="flex-1 rounded-lg border bg-white px-4 py-2 outline-none focus:border-black"
        />

        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateParams({ status: "all" })}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            status === "all"
              ? "bg-black text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => updateParams({ status: "pending" })}
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            status === "pending"
              ? "bg-black text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          Pending
        </button>

        <button
          type="button"
          onClick={() =>
            updateParams({
              status: "completed",
            })
          }
          className={`rounded-lg px-4 py-2 text-sm font-medium ${
            status === "completed"
              ? "bg-black text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          Completed
        </button>
      </div>

      <div>
        <select
          value={sort}
          onChange={(event) =>
            updateParams({
              sort: event.target.value,
            })
          }
          className="rounded-lg border bg-white px-4 py-2 text-sm"
        >
          <option value="newest">Newest first</option>

          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
}
