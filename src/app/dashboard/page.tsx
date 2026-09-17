import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import CreateTaskForm from "./CreateTaskForm";
import TaskList from "./TaskList";
import Navbar from "./Navbar";
import Pagination from "./Pagination";
import TaskFilters from "./TaskFilters";
import TaskToast from "./TaskToast";

type DashboardPageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sort?: string;
    message?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const supabase = await createClient();

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Read URL parameters
  const params = await searchParams;

  const currentPage = Math.max(1, Number(params.page ?? "1"));

  const search = params.search ?? "";
  const status = params.status ?? "all";
  const sort = params.sort ?? "newest";

  // Pagination
  const pageSize = 10;

  const from = (currentPage - 1) * pageSize;
  const to = from + pageSize - 1;

  // --------------------------------------------------
  // TASK QUERY
  // --------------------------------------------------

  let taskQuery = supabase.from("tasks").select("*", {
    count: "exact",
  });

  // Search title and description
  if (search.trim()) {
    taskQuery = taskQuery.or(
      `title.ilike.%${search.trim()}%,description.ilike.%${search.trim()}%`,
    );
  }

  // Filter by status
  if (status === "pending") {
    taskQuery = taskQuery.eq("completed", false);
  }

  if (status === "completed") {
    taskQuery = taskQuery.eq("completed", true);
  }

  // Sort
  if (sort === "oldest") {
    taskQuery = taskQuery.order("created_at", {
      ascending: true,
    });
  } else {
    taskQuery = taskQuery.order("created_at", {
      ascending: false,
    });
  }

  // Pagination
  const {
    data: tasks,
    error: tasksError,
    count,
  } = await taskQuery.range(from, to);

  if (tasksError) {
    throw new Error(tasksError.message);
  }

  // --------------------------------------------------
  // STATISTICS
  // --------------------------------------------------

  const { count: totalCount } = await supabase.from("tasks").select("*", {
    count: "exact",
    head: true,
  });

  const { count: completedCount } = await supabase
    .from("tasks")
    .select("*", {
      count: "exact",
      head: true,
    })
    .eq("completed", true);

  const totalTaskCount = totalCount ?? 0;

  const completedTaskCount = completedCount ?? 0;

  const pendingTaskCount = totalTaskCount - completedTaskCount;

  // --------------------------------------------------
  // PAGINATION INFO
  // --------------------------------------------------

  const totalPages = Math.ceil((count ?? 0) / pageSize);

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#1e2933]">
      <TaskToast />

      <Navbar email={user.email ?? ""} />

      <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="mb-10"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#63816d]">Your workspace</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">A clear plan for today.</h1></div>
        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5">
            <p className="text-sm font-medium text-slate-500">Total tasks</p>

            <p className="mt-2 text-3xl font-bold">{totalTaskCount}</p>
          </div>

          {/* Completed */}
          <div className="rounded-2xl border border-slate-200 bg-[#eaf2eb] p-5 shadow-sm shadow-slate-900/5">
            <p className="text-sm font-medium text-[#52735e]">Completed</p>

            <p className="mt-2 text-3xl font-bold">{completedTaskCount}</p>
          </div>

          {/* Pending */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/5">
            <p className="text-sm font-medium text-slate-500">In progress</p>

            <p className="mt-2 text-3xl font-bold">{pendingTaskCount}</p>
          </div>
        </div>

        {/* Create Task */}
        <CreateTaskForm />

        {/* Search / Filter / Sort */}
        <TaskFilters />

        {/* Tasks */}
        <TaskList tasks={tasks ?? []} />

        {/* Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </main>
  );
}
