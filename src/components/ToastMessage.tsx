"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

type ToastMessageProps = {
  message?: string;
  type?: "success" | "error";
};

export default function ToastMessage({
  message,
  type = "success",
}: ToastMessageProps) {
  const displayedMessage = useRef<string | null>(null);

  useEffect(() => {
    if (!message) {
      return;
    }

    if (displayedMessage.current === message) {
      return;
    }

    displayedMessage.current = message;

    if (type === "error") {
      toast.error(message);
    } else {
      toast.success(message);
    }
  }, [message, type]);

  return null;
}
