import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(100, "Title must be 100 characters or less."),

  description: z
    .string()
    .trim()
    .max(500, "Description must be 500 characters or less."),
});

export type TaskFormState = {
  error: string;
  fieldErrors: {
    title: string;
    description: string;
  };
};

export const emptyFieldErrors = {
  title: "",
  description: "",
};
