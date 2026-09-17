"use client";

import Link from "next/link";
import { useOptimistic } from "react";

import { toggleTask } from "./actions";
import SubmitButton from "./SubmitButton";
import DeleteTaskButton from "./DeleteTaskButton";
import type { Task } from "@/lib/types";

type TaskItemProps = { task: Task };

export default function TaskItem({ task }: TaskItemProps) {
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(task.completed);

  async function handleToggle(formData: FormData) {
    setOptimisticCompleted(!optimisticCompleted);
    await toggleTask(formData);
  }

  return (
    <article className={`group relative overflow-hidden rounded-2xl border bg-white p-5 shadow-sm shadow-slate-900/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md ${optimisticCompleted ? "border-[#dce9df]" : "border-slate-200 hover:border-[#bcd0c1]"}`}>
      <div className={`absolute inset-y-0 left-0 w-1 ${optimisticCompleted ? "bg-[#8bb297]" : "bg-[#dbe7dd]"}`} />
      <div className="flex flex-col gap-5 pl-2 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <form action={handleToggle} className="mt-0.5"><input type="hidden" name="taskId" value={task.id} /><input type="hidden" name="completed" value={optimisticCompleted.toString()} /><SubmitButton pendingText="…" className={`grid size-6 place-items-center rounded-full border text-xs font-bold transition ${optimisticCompleted ? "border-[#6a9077] bg-[#6a9077] text-white" : "border-slate-300 text-transparent hover:border-[#6a9077] hover:text-[#6a9077]"}`}>✓</SubmitButton></form>
            <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className={`text-base font-semibold ${optimisticCompleted ? "text-slate-400 line-through" : "text-[#1e2933]"}`}>{task.title}</h3><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${optimisticCompleted ? "bg-[#e8f1e9] text-[#52735e]" : "bg-[#f7f1df] text-[#8a6b25]"}`}>{optimisticCompleted ? "Completed" : "In progress"}</span></div>{task.description && <p className={`mt-2 max-w-2xl text-sm leading-6 ${optimisticCompleted ? "text-slate-400" : "text-slate-600"}`}>{task.description}</p>}<p className="mt-3 text-xs font-medium text-slate-400">Created {new Date(task.created_at).toLocaleDateString()}</p></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:justify-end"><Link href={`/dashboard/tasks/${task.id}`} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-[#1e2933]">Details</Link><Link href={`/dashboard/tasks/${task.id}/edit`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Edit</Link><DeleteTaskButton taskId={task.id} taskTitle={task.title} /></div>
      </div>
    </article>
  );
}
