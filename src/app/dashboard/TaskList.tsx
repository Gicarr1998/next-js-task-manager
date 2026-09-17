import TaskItem from "./TaskItem";
import type { Task } from "@/lib/types";

type TaskListProps = { tasks: Task[] };

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63816d]">Your plan</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">Tasks</h2></div><span className="rounded-full bg-[#eef4ef] px-3 py-1.5 text-sm font-semibold text-[#52735e]">{tasks.length} {tasks.length === 1 ? "task" : "tasks"}</span></div>
      <div className="space-y-3">
        {tasks.length === 0 ? <div className="rounded-2xl border border-dashed border-[#bfd2c3] bg-[#f4f8f4] px-6 py-12 text-center"><span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#dcece0] text-xl text-[#52735e]">✓</span><h3 className="mt-4 text-lg font-semibold">Your list is clear</h3><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">No tasks match this view. Adjust your filters or add the next thing you want to move forward.</p></div> : tasks.map((task) => <TaskItem key={task.id} task={task} />)}
      </div>
    </section>
  );
}
