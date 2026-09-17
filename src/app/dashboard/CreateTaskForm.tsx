"use client";

import { useActionState } from "react";

import { createTask } from "./actions";
import SubmitButton from "./SubmitButton";

import { emptyFieldErrors, type TaskFormState } from "@/lib/validation";

const initialState: TaskFormState = {
  error: "",
  success: "",
  fieldErrors: emptyFieldErrors,
};

export default function CreateTaskForm() {
  const [state, formAction] = useActionState(createTask, initialState);

  return (
    <form
      action={formAction}
      className="mt-8 space-y-4 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold">Add Task</h2>

        <p className="mt-1 text-sm text-gray-500">
          Create a new task to keep track of your work.
        </p>
      </div>

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          placeholder="Task title"
          minLength={3}
          maxLength={100}
          required
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
        />

        {state.fieldErrors.title && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          maxLength={500}
          rows={4}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black"
        />

        {state.fieldErrors.description && (
          <p className="mt-1 text-sm text-red-600">
            {state.fieldErrors.description}
          </p>
        )}
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <SubmitButton
        pendingText="Adding..."
        className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Add Task
      </SubmitButton>
    </form>
  );
}
