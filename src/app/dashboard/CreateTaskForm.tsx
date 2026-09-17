"use client";

import { useActionState } from "react";

import { createTask } from "./actions";
import SubmitButton from "./SubmitButton";

import { emptyFieldErrors, type TaskFormState } from "@/lib/validation";

const initialState: TaskFormState = {
  error: "",
  fieldErrors: emptyFieldErrors,
};

export default function CreateTaskForm() {
  const [state, formAction] = useActionState(createTask, initialState);

  return (
    <form
      action={formAction}
      className="mt-8 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#63816d]">Capture a task</p><h2 className="mt-2 text-xl font-semibold">What needs your attention?</h2>

        <p className="mt-1 text-sm text-slate-500">
          Create a new task to keep track of your work.
        </p>
      </div>

      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
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
          className="w-full rounded-xl border border-slate-200 px-3.5 py-3 outline-none transition focus:border-[#6a9077] focus:ring-4 focus:ring-[#e8f1e9]"
        />

        {state.fieldErrors.title && (
          <p className="mt-1 text-sm text-red-600">{state.fieldErrors.title}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          maxLength={500}
          rows={4}
          className="w-full rounded-xl border border-slate-200 px-3.5 py-3 outline-none transition focus:border-[#6a9077] focus:ring-4 focus:ring-[#e8f1e9]"
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
        className="rounded-full bg-[#1e2933] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#33414c]"
      >
        Add Task
      </SubmitButton>
    </form>
  );
}
