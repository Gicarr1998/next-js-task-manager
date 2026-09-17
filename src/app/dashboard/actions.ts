"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { getAuthenticatedUser } from "@/lib/supabase/auth";

import type { TaskInsert } from "@/lib/types";

import {
  emptyFieldErrors,
  taskSchema,
  type TaskFormState,
} from "@/lib/validation";

function dashboardMessage(message: string) {
  return `/dashboard?message=${encodeURIComponent(message)}`;
}

/* -------------------------------- */
/* CREATE TASK */
/* -------------------------------- */

export async function createTask(
  previousState: TaskFormState,
  formData: FormData,
): Promise<TaskFormState> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return {
      error: "You must be logged in.",
      success: "",
      fieldErrors: emptyFieldErrors,
    };
  }

  const title = formData.get("title")?.toString() ?? "";

  const description = formData.get("description")?.toString() ?? "";

  const validation = taskSchema.safeParse({
    title,
    description,
  });

  if (!validation.success) {
    const fieldErrors = {
      ...emptyFieldErrors,
    };

    for (const issue of validation.error.issues) {
      const field = issue.path[0];

      if (field === "title" || field === "description") {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      error: "Please fix the errors below.",
      success: "",
      fieldErrors,
    };
  }

  const task: TaskInsert = {
    user_id: user.id,
    title: validation.data.title,
    description: validation.data.description || null,
  };

  const { error } = await supabase.from("tasks").insert(task);

  if (error) {
    return {
      error: error.message,
      success: "",
      fieldErrors: emptyFieldErrors,
    };
  }

  revalidatePath("/dashboard");

  redirect(dashboardMessage("Task created successfully."));
}

/* -------------------------------- */
/* UPDATE TASK */
/* -------------------------------- */

export async function updateTask(
  previousState: TaskFormState,
  formData: FormData,
): Promise<TaskFormState> {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    return {
      error: "You must be logged in.",
      success: "",
      fieldErrors: emptyFieldErrors,
    };
  }

  const taskIdValue = formData.get("taskId")?.toString() ?? "";

  const taskId = Number(taskIdValue);

  if (!Number.isInteger(taskId)) {
    return {
      error: "Invalid task ID.",
      success: "",
      fieldErrors: emptyFieldErrors,
    };
  }

  const title = formData.get("title")?.toString() ?? "";

  const description = formData.get("description")?.toString() ?? "";

  const validation = taskSchema.safeParse({
    title,
    description,
  });

  if (!validation.success) {
    const fieldErrors = {
      ...emptyFieldErrors,
    };

    for (const issue of validation.error.issues) {
      const field = issue.path[0];

      if (field === "title" || field === "description") {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      error: "Please fix the errors below.",
      success: "",
      fieldErrors,
    };
  }

  const { error } = await supabase
    .from("tasks")
    .update({
      title: validation.data.title,
      description: validation.data.description || null,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    return {
      error: error.message,
      success: "",
      fieldErrors: emptyFieldErrors,
    };
  }

  revalidatePath("/dashboard");

  redirect(dashboardMessage("Task updated successfully."));
}

/* -------------------------------- */
/* DELETE TASK */
/* -------------------------------- */

export async function deleteTask(formData: FormData) {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    redirect(dashboardMessage("You must be logged in."));
  }

  const taskIdValue = formData.get("taskId")?.toString() ?? "";

  const taskId = Number(taskIdValue);

  if (!Number.isInteger(taskId)) {
    redirect(dashboardMessage("Invalid task ID."));
  }

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    redirect(dashboardMessage(`Failed to delete task: ${error.message}`));
  }

  revalidatePath("/dashboard");

  redirect(dashboardMessage("Task deleted successfully."));
}

/* -------------------------------- */
/* TOGGLE TASK */
/* -------------------------------- */

export async function toggleTask(formData: FormData) {
  const { supabase, user } = await getAuthenticatedUser();

  if (!user) {
    redirect(dashboardMessage("You must be logged in."));
  }

  const taskIdValue = formData.get("taskId")?.toString() ?? "";

  const taskId = Number(taskIdValue);

  if (!Number.isInteger(taskId)) {
    redirect(dashboardMessage("Invalid task ID."));
  }

  const completed = formData.get("completed") === "true";

  const { error } = await supabase
    .from("tasks")
    .update({
      completed: !completed,
    })
    .eq("id", taskId)
    .eq("user_id", user.id);

  if (error) {
    redirect(dashboardMessage(`Failed to update task: ${error.message}`));
  }

  revalidatePath("/dashboard");

  redirect(
    dashboardMessage(
      completed ? "Task marked as pending." : "Task completed successfully.",
    ),
  );
}

/* -------------------------------- */
/* LOGOUT */
/* -------------------------------- */

export async function logout() {
  const { supabase } = await getAuthenticatedUser();

  await supabase.auth.signOut();

  redirect("/login");
}
