"use client";

import { useActionState } from "react";
import { updateTask } from "../../../actions";
import SubmitButton from "../../../SubmitButton";
import { emptyFieldErrors, type TaskFormState } from "@/lib/validation";

type Task = {
  id: number;
  title: string;
  description: string | null;
};

type EditTaskFormProps = {
  task: Task;
};

const initialState: TaskFormState = {
  error: "",
  fieldErrors: emptyFieldErrors,
};

export default function EditTaskForm({ task }: EditTaskFormProps) {
  const [state, formAction] = useActionState(updateTask, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
      <input type="hidden" name="taskId" value={task.id} />

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          id="title"
          name="title"
          defaultValue={task.title}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-3 outline-none transition focus:border-[#6a9077] focus:ring-4 focus:ring-[#e8f1e9]"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          defaultValue={task.description ?? ""}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-3 outline-none transition focus:border-[#6a9077] focus:ring-4 focus:ring-[#e8f1e9]"
          rows={5}
        />
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <div className="flex gap-2">
        <SubmitButton
          pendingText="Saving..."
          className="rounded-full bg-[#1e2933] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#33414c]"
        >
          Save Changes
        </SubmitButton>
      </div>
    </form>
  );
}
