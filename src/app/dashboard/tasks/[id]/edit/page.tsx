import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import EditTaskForm from "./EditTaskForm";
import { notFound } from "next/navigation";

type EditTaskPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTaskPage({ params }: EditTaskPageProps) {
  const { id } = await params;

  const taskId = Number(id);

  if (!taskId) {
    redirect("/dashboard");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .eq("user_id", user.id)
    .single();

  if (error || !task) {
    redirect("/dashboard");
  }

  if (!task) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fbfaf8] px-6 py-10 text-[#1e2933] lg:px-8">
      <div className="mx-auto max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#63816d]">Task details</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">Edit task</h1>

      <EditTaskForm task={task} />

      <Link
        href="/dashboard"
        className="mt-5 inline-block rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        Cancel
      </Link></div>
    </main>
  );
}
