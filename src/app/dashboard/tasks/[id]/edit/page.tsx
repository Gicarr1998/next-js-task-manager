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
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">Edit Task</h1>

      <EditTaskForm task={task} />

      <Link
        href="/dashboard"
        className="mt-4 inline-block rounded border px-4 py-2"
      >
        Cancel
      </Link>
    </main>
  );
}
