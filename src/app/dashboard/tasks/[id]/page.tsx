import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import DeleteTaskButton from "../../DeleteTaskButton";

type TaskDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get the ID from the URL
  const { id } = await params;

  const taskId = Number(id);

  // Make sure the ID is a valid integer
  if (!Number.isInteger(taskId)) {
    notFound();
  }

  // Get the task
  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .eq("user_id", user.id)
    .single();

  // Task doesn't exist or doesn't belong to this user
  if (error || !task) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-[#1e2933]">
      <div className="mx-auto max-w-3xl px-6 py-10 lg:px-8">
        {/* Back */}
        <Link
          href="/dashboard"
          className="text-sm font-semibold text-[#52735e] hover:text-[#1e2933]"
        >
          ← Back to Dashboard
        </Link>

        {/* Task */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1
                className={`text-2xl font-bold ${
                  task.completed
                    ? "text-slate-400 line-through"
                    : "text-[#1e2933]"
                }`}
              >
                {task.title}
              </h1>

              {task.completed ? (
                <span className="mt-3 inline-block rounded-full bg-[#e8f1e9] px-3 py-1 text-sm font-semibold text-[#52735e]">
                  Completed
                </span>
              ) : (
                <span className="mt-3 inline-block rounded-full bg-[#f7f1df] px-3 py-1 text-sm font-semibold text-[#8a6b25]">
                  Pending
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-sm font-medium text-slate-500">Description</h2>

            <p className="mt-2 whitespace-pre-wrap text-slate-700">
              {task.description || "No description provided."}
            </p>
          </div>

          {/* Created */}
          <div className="mt-8 border-t pt-6">
            <p className="text-sm text-slate-500">
              Created {new Date(task.created_at).toLocaleString()}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-2">
            <Link
              href={`/dashboard/tasks/${task.id}/edit`}
              className="rounded-full bg-[#1e2933] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#33414c]"
            >
              Edit Task
            </Link>

            <DeleteTaskButton taskId={task.id} taskTitle={task.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
