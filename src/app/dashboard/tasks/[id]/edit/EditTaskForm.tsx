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
    <form action={formAction} className="mt-8 space-y-4 rounded-lg border p-6">
      <input type="hidden" name="taskId" value={task.id} />

      <div>
        <label htmlFor="title" className="mb-1 block font-medium">
          Title
        </label>

        <input
          id="title"
          name="title"
          defaultValue={task.title}
          className="w-full rounded border p-2"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block font-medium">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          defaultValue={task.description ?? ""}
          className="w-full rounded border p-2"
          rows={5}
        />
      </div>

      {state.error && <p className="text-sm text-red-500">{state.error}</p>}

      <div className="flex gap-2">
        <SubmitButton
          pendingText="Saving..."
          className="rounded bg-black px-4 py-2 text-white"
        >
          Save Changes
        </SubmitButton>
      </div>
    </form>
  );
}
