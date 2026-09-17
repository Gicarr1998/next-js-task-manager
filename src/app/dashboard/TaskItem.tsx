"use client";

import Link from "next/link";
import { useOptimistic } from "react";

import { toggleTask, deleteTask } from "./actions";
import SubmitButton from "./SubmitButton";
import DeleteTaskButton from "./DeleteTaskButton";
import type { Task } from "@/lib/types";

type TaskItemProps = {
  task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    task.completed,
  );

  async function handleToggle(formData: FormData) {
    setOptimisticCompleted(!optimisticCompleted);

    await toggleTask(formData);
  }

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={`truncate font-semibold ${
                optimisticCompleted
                  ? "text-gray-400 line-through"
                  : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>

            {optimisticCompleted ? (
              <span className="shrink-0 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                Completed
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-700">
                Pending
              </span>
            )}
          </div>

          {task.description && (
            <p
              className={`mt-2 text-sm ${
                optimisticCompleted ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {task.description}
            </p>
          )}

          <p className="mt-3 text-xs text-gray-400">
            Created {new Date(task.created_at).toLocaleDateString()}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <Link
            href={`/dashboard/tasks/${task.id}`}
            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            View
          </Link>

          {/* Complete / Undo */}
          <form action={handleToggle}>
            <input type="hidden" name="taskId" value={task.id} />

            <input
              type="hidden"
              name="completed"
              value={optimisticCompleted.toString()}
            />

            <SubmitButton
              pendingText="..."
              className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                optimisticCompleted ? "hover:bg-gray-50" : "hover:bg-green-50"
              }`}
            >
              {optimisticCompleted ? "Undo" : "Complete"}
            </SubmitButton>
          </form>

          {/* Edit */}
          <Link
            href={`/dashboard/tasks/${task.id}/edit`}
            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Edit
          </Link>

          {/* Delete */}
          <DeleteTaskButton taskId={task.id} taskTitle={task.title} />
        </div>
      </div>
    </div>
  );
}
