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
        className="rounded-lg border px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
      >
        Delete
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold">Delete task?</h2>

            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">"{taskTitle}"</span>?
            </p>

            <p className="mt-1 text-sm text-gray-500">
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
              >
                Cancel
              </button>

              <form action={deleteTask}>
                <input type="hidden" name="taskId" value={taskId} />

                <SubmitButton
                  pendingText="Deleting..."
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
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
