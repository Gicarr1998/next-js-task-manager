"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ToastMessage from "@/components/ToastMessage";

export default function TaskToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const displayedMessage = useRef<string | null>(null);

  const message = searchParams.get("message");

  useEffect(() => {
    if (!message) {
      return;
    }

    if (displayedMessage.current === message) {
      return;
    }

    displayedMessage.current = message;

    const params = new URLSearchParams(searchParams.toString());

    params.delete("message");

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, [message, pathname, router, searchParams]);

  return <ToastMessage message={message ?? undefined} />;
}
