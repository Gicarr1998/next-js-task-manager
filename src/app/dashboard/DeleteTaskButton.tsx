"use client";

import { useState } from "react";
import { deleteTask } from "./actions";
import SubmitButton from "./SubmitButton";

type DeleteTaskButtonProps = {
  taskId: number;
  taskTitle: string;
};

export default function DeleteTaskButton({
  taskId,
  taskTitle,
}: DeleteTaskButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-semibold">Delete task?</h2>

            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-[#1e2933]">"{taskTitle}"</span>?
            </p>

            <p className="mt-1 text-sm text-slate-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>

              <form action={deleteTask}>
                <input type="hidden" name="taskId" value={taskId} />

                <SubmitButton
                  pendingText="Deleting..."
                  className="rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800"
                >
                  Delete
                </SubmitButton>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
